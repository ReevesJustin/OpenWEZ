use wasm_ballistics::solver::calculate_trajectory;
use wasm_ballistics::types::{BallisticInputs, BallisticCoefficient, DragModel, EnvironmentalConditions};
use wasm_bindgen_test::*;

#[wasm_bindgen_test]
fn test_energy_calculation() {
    let inputs = BallisticInputs {
        muzzle_velocity: 2550.0,
        bullet_weight: 175.0,
        bullet_diameter: 0.308,
        bc: BallisticCoefficient {
            value: 0.505,
            drag_model: DragModel::G1,
        },
        zero_range: 100.0,
        sight_height: 1.5,
        environment: EnvironmentalConditions {
            temperature: 59.0,
            pressure: 29.92,
            humidity: 50.0,
            altitude: 0.0,
            wind_speed: 0.0,
            wind_direction: 0.0,
        },
    };

    let trajectory = calculate_trajectory(&inputs, 100.0, 50.0);

    // Check the energy at the muzzle (range = 0)
    let initial_point = &trajectory[0];
    let expected_energy = 2526.1; // Calculated manually
    let calculated_energy = initial_point.energy;

    assert!((calculated_energy - expected_energy).abs() < 1.0, "Energy at muzzle is incorrect. Expected: {}, Got: {}", expected_energy, calculated_energy);
}
