//! 3DoF point-mass ballistic trajectory solver
//! Uses 4th-order Runge-Kutta integration

use crate::atmosphere::{calculate_density_ratio, speed_of_sound};
use crate::drag_models::get_drag_coefficient;
use crate::types::{BallisticInputs, Trajectory, TrajectoryPoint, GRAVITY};

/// Ballistic state vector [x, y, z, vx, vy, vz]
#[derive(Debug, Clone, Copy)]
struct State {
    x: f64,  // Horizontal distance downrange (yards)
    y: f64,  // Vertical distance (inches, relative to bore)
    z: f64,  // Lateral distance / wind drift (inches)
    vx: f64, // Horizontal velocity downrange (fps)
    vy: f64, // Vertical velocity (fps)
    vz: f64, // Lateral velocity (fps)
}

/// Calculate trajectory using 3DoF point-mass model
pub fn calculate_trajectory(inputs: &BallisticInputs, max_range: f64, step: f64) -> Trajectory {
    let mut trajectory = Vec::new();
    let dt = 0.001; // Integration time step (seconds)

    // Initial conditions
    let density_ratio = calculate_density_ratio(&inputs.environment);
    let sight_angle = calculate_zero_angle(inputs);

    let mut state = State {
        x: 0.0,
        y: -inputs.sight_height / 12.0, // Start at bore (convert inches to feet)
        z: 0.0, // Start with no lateral displacement
        vx: inputs.muzzle_velocity * sight_angle.cos(),
        vy: inputs.muzzle_velocity * sight_angle.sin(),
        vz: 0.0, // No initial lateral velocity
    };

    let mut time = 0.0;
    let mut last_recorded_range = 0.0;

    // Integrate trajectory
    while state.x <= max_range && state.y > -1000.0 { // Stop at max_range
        // Calculate current velocity magnitude
        let velocity = (state.vx * state.vx + state.vy * state.vy + state.vz * state.vz).sqrt();

        // Early termination: stop if velocity reaches zero (prevents NaN/overflow)
        if velocity < 0.1 {
            break;
        }

        // Record trajectory point at intervals
        if state.x >= last_recorded_range {
            let point = create_trajectory_point(&state, time, inputs, density_ratio);
            trajectory.push(point);
            last_recorded_range += step;
        }

        // RK4 integration step
        state = rk4_step(state, dt, inputs, density_ratio);
        time += dt;

        // Prevent infinite loops
        if time > 30.0 {
            break;
        }
    }

    // Ensure we have a point at exactly max_range if we don't already
    if let Some(last_point) = trajectory.last() {
        if (last_point.range - max_range).abs() > 0.1 {
            // Simulate to exactly max_range
            let mut exact_state = State {
                x: 0.0,
                y: -inputs.sight_height / 12.0,
                z: 0.0,
                vx: inputs.muzzle_velocity * sight_angle.cos(),
                vy: inputs.muzzle_velocity * sight_angle.sin(),
                vz: 0.0,
            };

            let mut exact_time = 0.0;
            while exact_state.x < max_range && exact_time < 30.0 {
                let velocity = (exact_state.vx * exact_state.vx + exact_state.vy * exact_state.vy + exact_state.vz * exact_state.vz).sqrt();
                if velocity < 0.1 {
                    break;
                }
                exact_state = rk4_step(exact_state, dt, inputs, density_ratio);
                exact_time += dt;
            }

            let exact_point = create_trajectory_point(&exact_state, exact_time, inputs, density_ratio);
            trajectory.push(exact_point);
        }
    }

    trajectory
}

/// 4th-order Runge-Kutta integration step
fn rk4_step(state: State, dt: f64, inputs: &BallisticInputs, density_ratio: f64) -> State {
    let k1 = derivatives(state, inputs, density_ratio);
    let k2 = derivatives(advance_state(state, k1, dt * 0.5), inputs, density_ratio);
    let k3 = derivatives(advance_state(state, k2, dt * 0.5), inputs, density_ratio);
    let k4 = derivatives(advance_state(state, k3, dt), inputs, density_ratio);

    State {
        x: state.x + (k1.x + 2.0 * k2.x + 2.0 * k3.x + k4.x) * dt / 6.0,
        y: state.y + (k1.y + 2.0 * k2.y + 2.0 * k3.y + k4.y) * dt / 6.0,
        z: state.z + (k1.z + 2.0 * k2.z + 2.0 * k3.z + k4.z) * dt / 6.0,
        vx: state.vx + (k1.vx + 2.0 * k2.vx + 2.0 * k3.vx + k4.vx) * dt / 6.0,
        vy: state.vy + (k1.vy + 2.0 * k2.vy + 2.0 * k3.vy + k4.vy) * dt / 6.0,
        vz: state.vz + (k1.vz + 2.0 * k2.vz + 2.0 * k3.vz + k4.vz) * dt / 6.0,
    }
}

/// Calculate state derivatives (velocities and accelerations)
fn derivatives(state: State, inputs: &BallisticInputs, density_ratio: f64) -> State {
    let velocity = (state.vx * state.vx + state.vy * state.vy + state.vz * state.vz).sqrt();

    if velocity < 1.0 {
        return State { x: 0.0, y: 0.0, z: 0.0, vx: 0.0, vy: 0.0, vz: 0.0 };
    }

    // Calculate Mach number
    let sound_speed = speed_of_sound(inputs.environment.temperature);
    let mach = velocity / sound_speed;

    // Get drag coefficient
    let cd = get_drag_coefficient(mach, inputs.bc.drag_model);

    // Calculate drag force per unit mass
    // NOTE: Scaling factor of 1.66 is required for dimensional consistency in imperial units
    // This accounts for unit conversions in the drag formula when using:
    // - Velocity in fps, BC in lb/in², positions in feet (internally) / inches (output)
    let bc_standard = inputs.bc.value;
    let drag_accel = (density_ratio * velocity * cd) / (bc_standard * 1.66);

    // Wind effect in 3D
    // Wind direction: 0° = headwind, 90° = right-to-left crosswind, 180° = tailwind, 270° = left-to-right
    let wind_fps = inputs.environment.wind_speed * 1.46667; // mph to fps
    let wind_angle = inputs.environment.wind_direction.to_radians();

    // Wind components (clockwise from shooter's perspective)
    let wind_x = wind_fps * wind_angle.cos();  // Headwind/tailwind (0° = headwind)
    let wind_z = wind_fps * wind_angle.sin();  // Crosswind (90° = right-to-left)

    // Relative velocity (bullet velocity minus wind velocity)
    let relative_vx = state.vx - wind_x;
    let relative_vz = state.vz - wind_z;
    let relative_velocity = (relative_vx * relative_vx + state.vy * state.vy + relative_vz * relative_vz).sqrt();

    if relative_velocity < 0.1 {
        return State { x: 0.0, y: 0.0, z: 0.0, vx: 0.0, vy: 0.0, vz: 0.0 };
    }

    State {
        x: state.vx / 3.0, // Convert fps to yards/s
        y: state.vy, // fps (treating as ft/s since positions are actually in feet, not inches)
        z: state.vz, // fps
        vx: -drag_accel * relative_vx / relative_velocity,
        vy: -GRAVITY - drag_accel * state.vy / relative_velocity,
        vz: -drag_accel * relative_vz / relative_velocity,
    }
}

/// Advance state by increment
fn advance_state(state: State, derivative: State, dt: f64) -> State {
    State {
        x: state.x + derivative.x * dt,
        y: state.y + derivative.y * dt,
        z: state.z + derivative.z * dt,
        vx: state.vx + derivative.vx * dt,
        vy: state.vy + derivative.vy * dt,
        vz: state.vz + derivative.vz * dt,
    }
}

/// Calculate zero angle (bore angle relative to sight line)
fn calculate_zero_angle(inputs: &BallisticInputs) -> f64 {
    // Helper function to compute drop at zero range for a given angle
    let compute_drop = |angle: f64| -> f64 {
        let mut test_state = State {
            x: 0.0,
            y: -inputs.sight_height / 12.0, // Convert inches to feet
            z: 0.0,
            vx: inputs.muzzle_velocity * angle.cos(),
            vy: inputs.muzzle_velocity * angle.sin(),
            vz: 0.0,
        };

        let density_ratio = calculate_density_ratio(&inputs.environment);
        let dt = 0.01; // Larger dt for faster zero calculation
        let mut time = 0.0;

        // Simulate to zero range
        while test_state.x < inputs.zero_range && time < 10.0 {
            let velocity = (test_state.vx * test_state.vx + test_state.vy * test_state.vy + test_state.vz * test_state.vz).sqrt();
            if velocity < 0.1 {
                break;
            }
            test_state = rk4_step(test_state, dt, inputs, density_ratio);
            time += dt;
        }

        test_state.y + inputs.sight_height / 12.0 // Drop in feet, relative to sight line
    };

    // Bisection method to find zero angle
    let mut angle_low = -0.1; // -5.7 degrees
    let mut angle_high = 0.1; // +5.7 degrees

    for _ in 0..15 {
        let angle_mid = (angle_low + angle_high) / 2.0;
        let drop_mid = compute_drop(angle_mid);

        if drop_mid.abs() < 0.1 {
            return angle_mid;
        }

        if drop_mid < 0.0 {
            // Bullet is low, need more upward angle
            angle_low = angle_mid;
        } else {
            // Bullet is high, need less upward angle
            angle_high = angle_mid;
        }
    }

    (angle_low + angle_high) / 2.0
}

/// Create trajectory point from state
fn create_trajectory_point(
    state: &State,
    time: f64,
    inputs: &BallisticInputs,
    _density_ratio: f64,
) -> TrajectoryPoint {
    let velocity = (state.vx * state.vx + state.vy * state.vy + state.vz * state.vz).sqrt();
    // Standard ballistics energy formula: KE (ft-lbs) = weight (grains) × velocity² / 450240
    let energy = inputs.bullet_weight * velocity * velocity / 450240.0;

    TrajectoryPoint {
        range: state.x,
        drop: (state.y + inputs.sight_height / 12.0) * 12.0, // Convert feet to inches
        drift: state.z * 12.0, // Convert feet to inches
        velocity,
        energy,
        time_of_flight: time,
    }
}