# OpenWEZ Mathematical Equations

## Overview

This document describes the mathematical foundations of the OpenWEZ ballistic modeling system, including the 3-degree-of-freedom (3DoF) point-mass trajectory solver and Monte Carlo simulation for Weapon Employment Zone (WEZ) analysis.

---

## Table of Contents

1. [Coordinate System](#coordinate-system)
2. [3DoF Point-Mass Ballistic Equations](#3dof-point-mass-ballistic-equations)
3. [Atmospheric Model](#atmospheric-model)
4. [Drag Force and Ballistic Coefficient](#drag-force-and-ballistic-coefficient)
5. [Numerical Integration (Runge-Kutta 4)](#numerical-integration-runge-kutta-4)
6. [Zero Angle Calculation](#zero-angle-calculation)
7. [Monte Carlo Simulation](#monte-carlo-simulation)
8. [Hit Probability Analysis](#hit-probability-analysis)
9. [Statistical Measures](#statistical-measures)
10. [Twist Rate Calculations](#twist-rate-calculations)

---

## Coordinate System

The ballistic trajectory is computed in a 3D space with:

- **x-axis**: Horizontal distance downrange (yards)
- **y-axis**: Vertical distance (feet internally, inches in output, positive upward)
- **z-axis**: Lateral distance / wind drift (feet internally, inches in output)
- **Origin**: Bore centerline at muzzle

**Sight Line**: Offset above bore by sight height $h_s$ (typically 1.5 inches for rifles)

**Note**: Internal calculations use feet for y and z coordinates for dimensional consistency in the drag equations. Final output is converted to inches for user display.

---

## 3DoF Point-Mass Ballistic Equations

### State Vector

The trajectory state at time $t$ is described by:

$$
\mathbf{s}(t) = \begin{bmatrix} x(t) \\ y(t) \\ z(t) \\ v_x(t) \\ v_y(t) \\ v_z(t) \end{bmatrix}
$$

Where:
- $x(t)$ = horizontal position (yards)
- $y(t)$ = vertical position (feet, relative to bore)
- $z(t)$ = lateral position / wind drift (feet)
- $v_x(t)$ = horizontal velocity (fps)
- $v_y(t)$ = vertical velocity (fps)
- $v_z(t)$ = lateral velocity (fps)

### Differential Equations

The equations of motion for a point-mass projectile under gravity and drag:

$$
\frac{dx}{dt} = \frac{v_x}{3}
$$

$$
\frac{dy}{dt} = v_y
$$

$$
\frac{dz}{dt} = v_z
$$

$$
\frac{dv_x}{dt} = -a_D \cdot \frac{v_x - w_x}{v_{rel}}
$$

$$
\frac{dv_y}{dt} = -g - a_D \cdot \frac{v_y}{v_{rel}}
$$

$$
\frac{dv_z}{dt} = -a_D \cdot \frac{v_z - w_z}{v_{rel}}
$$

Where:
- $g = 32.174$ ft/s² (gravitational acceleration)
- $a_D$ = drag acceleration (see below)
- $v_{rel} = \sqrt{(v_x - w_x)^2 + v_y^2 + (v_z - w_z)^2}$ = relative velocity magnitude
- $w_x$ = headwind/tailwind component (fps)
- $w_z$ = crosswind component (fps)
- Factor of 3 in $dx/dt$ converts fps to yards/s

### Compact Form

$$
\frac{d\mathbf{s}}{dt} = \mathbf{f}(\mathbf{s}, t)
$$

Where $\mathbf{f}$ represents the system of differential equations above.

---

## Atmospheric Model

### Air Density

Air density affects drag force and is calculated from environmental conditions using the ideal gas law:

$$
\rho = \frac{P \cdot h_f}{R_{dry} \cdot T}
$$

Where:
- $\rho$ = air density (kg/m³)
- $P$ = atmospheric pressure (Pa)
- $T$ = absolute temperature (Kelvin)
- $R_{dry} = 287.058$ J/(kg·K) (specific gas constant for dry air)
- $h_f$ = humidity correction factor

#### Temperature Conversion

$$
T_K = (T_F - 32) \cdot \frac{5}{9} + 273.15
$$

Where:
- $T_K$ = temperature in Kelvin
- $T_F$ = temperature in Fahrenheit

#### Pressure Conversion

$$
P_{Pa} = P_{inHg} \cdot 3386.389
$$

#### Humidity Correction (Simplified)

$$
h_f = 1 - 0.01 \cdot H \cdot 0.00065
$$

Where $H$ is relative humidity (0-100%).

#### Density Conversion

$$
\rho_{lb/ft^3} = \rho_{kg/m^3} \cdot 0.062428
$$

### Density Ratio

The density ratio relative to standard conditions (59°F, 29.92 inHg):

$$
\rho_{ratio} = \frac{\rho}{\rho_{std}}
$$

Where $\rho_{std} = 0.0765$ lb/ft³.

### Speed of Sound

$$
c = \sqrt{\gamma \cdot R_{dry} \cdot T}
$$

Where $\gamma = 1.4$ (ratio of specific heats for air).

In fps:

$$
c_{fps} = c_{m/s} \cdot 3.28084
$$

---

## Drag Force and Ballistic Coefficient

### Drag Force

The aerodynamic drag force on the projectile:

$$
F_D = \frac{1}{2} \rho v^2 C_D A
$$

Where:
- $\rho$ = air density
- $v$ = velocity magnitude
- $C_D$ = drag coefficient (function of Mach number)
- $A$ = cross-sectional area

### Ballistic Coefficient

The ballistic coefficient (BC) relates projectile drag to a standard reference:

$$
BC = \frac{m}{C_D \cdot A}
$$

Higher BC means less drag and flatter trajectory.

### Drag Acceleration

In the implementation, drag force per unit mass is:

$$
a_D = \frac{\rho_{ratio} \cdot v \cdot C_D(M)}{BC \cdot 1.66}
$$

Where:
- $M = \frac{v}{c}$ = Mach number
- $C_D(M)$ = drag coefficient from G1 or G7 tables
- $1.66$ = dimensional scaling constant for imperial units (fps, grains, feet/inches)

**Note**: The scaling factor of 1.66 accounts for unit conversions in the drag formula when using mixed imperial units (velocity in fps, BC in lb/in², positions in feet internally). This was determined empirically by calibrating against JBM Ballistics reference data.

### Drag Models

#### G1 Model

Standard drag model based on a flat-base projectile. Drag coefficient $C_D$ varies with Mach number according to empirical tables.

Example points (Mach, $C_D$):
- (0.0, 0.2629)
- (1.0, 0.2993) ← transonic peak
- (2.0, 0.3440)

#### G7 Model

Optimized for long, boat-tail bullets (modern match ammunition).

Example points (Mach, $C_D$):
- (0.0, 0.1198)
- (1.0, 0.1362)
- (2.0, 0.2154)

#### Interpolation

Linear interpolation between table values:

$$
C_D(M) = C_{D,i} + \frac{M - M_i}{M_{i+1} - M_i} \cdot (C_{D,i+1} - C_{D,i})
$$

Where $M_i \leq M \leq M_{i+1}$.

---

## Numerical Integration (Runge-Kutta 4)

The differential equations are solved using the 4th-order Runge-Kutta method (RK4).

### RK4 Algorithm

Given state $\mathbf{s}_n$ at time $t_n$, compute $\mathbf{s}_{n+1}$ at time $t_{n+1} = t_n + \Delta t$:

$$
\mathbf{k}_1 = \mathbf{f}(\mathbf{s}_n, t_n)
$$

$$
\mathbf{k}_2 = \mathbf{f}\left(\mathbf{s}_n + \frac{\Delta t}{2}\mathbf{k}_1, t_n + \frac{\Delta t}{2}\right)
$$

$$
\mathbf{k}_3 = \mathbf{f}\left(\mathbf{s}_n + \frac{\Delta t}{2}\mathbf{k}_2, t_n + \frac{\Delta t}{2}\right)
$$

$$
\mathbf{k}_4 = \mathbf{f}(\mathbf{s}_n + \Delta t \mathbf{k}_3, t_n + \Delta t)
$$

$$
\mathbf{s}_{n+1} = \mathbf{s}_n + \frac{\Delta t}{6}\left(\mathbf{k}_1 + 2\mathbf{k}_2 + 2\mathbf{k}_3 + \mathbf{k}_4\right)
$$

### Time Step

OpenWEZ uses $\Delta t = 0.001$ seconds (1 millisecond) for numerical stability and accuracy.

### Convergence

RK4 is a 4th-order method with local truncation error:

$$
\epsilon = O(\Delta t^5)
$$

Global error accumulates as:

$$
E = O(\Delta t^4)
$$

---

## Zero Angle Calculation

The bore must be angled upward relative to the sight line to achieve zero at a specified range.

### Problem Statement

Find angle $\theta_0$ such that at range $R_{zero}$:

$$
y(R_{zero}) + \frac{h_s}{12} = 0
$$

(Bullet crosses sight line at zero range, with $h_s$ converted from inches to feet)

### Iterative Bisection Method

The implementation uses a bisection method to find $\theta_0$ that accounts for drag:

1. **Initialize bounds**: $\theta_{low} = -0.1$ rad, $\theta_{high} = 0.1$ rad

2. **Iteration** (up to 15 iterations):
   - Compute $\theta_{mid} = \frac{\theta_{low} + \theta_{high}}{2}$
   - Simulate trajectory to $R_{zero}$ with angle $\theta_{mid}$
   - Evaluate drop: $d = y(R_{zero}) + \frac{h_s}{12}$
   - If $|d| < 0.1$ feet, converged → return $\theta_{mid}$
   - If $d < 0$ (bullet low), set $\theta_{low} = \theta_{mid}$
   - If $d > 0$ (bullet high), set $\theta_{high} = \theta_{mid}$

3. **Return**: $\theta_0 = \theta_{mid}$

This method accounts for aerodynamic drag and is accurate for all zero ranges.

### Initial Velocity Components

$$
v_{x,0} = v_0 \cos(\theta_0)
$$

$$
v_{y,0} = v_0 \sin(\theta_0)
$$

$$
v_{z,0} = 0
$$

---

## Monte Carlo Simulation

Monte Carlo simulation introduces realistic uncertainties to model real-world shooting conditions.

### Uncertainty Parameters

Each parameter is perturbed using Gaussian (normal) distribution:

$$
\tilde{p} = p + \mathcal{N}(0, \sigma_p)
$$

Where:
- $p$ = nominal parameter value
- $\tilde{p}$ = perturbed value
- $\mathcal{N}(0, \sigma_p)$ = normal distribution with mean 0 and standard deviation $\sigma_p$

### Gaussian Random Variable Generation

Using the Box-Muller transform:

$$
Z_0 = \sqrt{-2 \ln U_1} \cos(2\pi U_2)
$$

$$
Z_1 = \sqrt{-2 \ln U_1} \sin(2\pi U_2)
$$

Where $U_1, U_2 \sim \text{Uniform}(0,1)$ and $Z_0, Z_1 \sim \mathcal{N}(0,1)$.

Then:

$$
X = \mu + \sigma Z_0
$$

gives $X \sim \mathcal{N}(\mu, \sigma^2)$.

### Perturbed Inputs

For each Monte Carlo iteration $i = 1, \ldots, N$:

#### Muzzle Velocity

$$
\tilde{v}_0^{(i)} = v_0 + \mathcal{N}(0, \sigma_v)
$$

Typical: $\sigma_v = 10-50$ fps

#### Wind Speed

$$
\tilde{w}^{(i)} = \max(0, w + \mathcal{N}(0, \sigma_w))
$$

Typical: $\sigma_w = 1-5$ mph

#### Wind Direction

$$
\tilde{\theta}_w^{(i)} = \theta_w + \mathcal{N}(0, \sigma_{\theta_w})
$$

Typical: $\sigma_{\theta_w} = 5-20$ degrees

#### Range Estimation Error

$$
\tilde{R}^{(i)} = R + \mathcal{N}(0, \sigma_R)
$$

Typical: $\sigma_R = 1-10$ yards

#### Ballistic Coefficient Uncertainty

BC measurement uncertainty is specified as a percentage:

$$
\tilde{BC}^{(i)} = \max(0.001, BC + \mathcal{N}(0, \sigma_{BC}))
$$

Where:

$$
\sigma_{BC} = BC \cdot \frac{\sigma_{BC,\%}}{100}
$$

Typical: $\sigma_{BC,\%} = 0.5-2.0\%$

**Confidence Levels:**
- High confidence: $\sigma_{BC,\%} = 0.5\%$ (well-tested match ammunition)
- Medium confidence: $\sigma_{BC,\%} = 1.0\%$ (standard uncertainty)
- Low confidence: $\sigma_{BC,\%} = 2.0\%$ (uncertain BC measurement)

BC uncertainty primarily affects vertical dispersion at long range, as BC variations alter trajectory drop.

### Simulation Process

1. Generate $N$ sets of perturbed inputs (typically $N = 1000-10000$)
2. Compute trajectory for each set: $\mathbf{s}^{(i)}(t)$
3. Record impact points at target range
4. Analyze statistical distribution

---

## Hit Probability Analysis

### Impact Point

For each iteration $i$, the impact point at range $R$ is:

$$
\mathbf{p}^{(i)} = \begin{bmatrix} x^{(i)} \\ y^{(i)} \end{bmatrix}
$$

Where:
- $x^{(i)}$ = horizontal displacement (wind drift, inches)
- $y^{(i)}$ = vertical displacement (drop, inches)

### Target Definition

Rectangular target with:
- Width: $W$ (inches)
- Height: $H$ (inches)

Centered at origin (aiming point).

### Hit Criterion

Impact $i$ is a hit if:

$$
|x^{(i)}| \leq \frac{W}{2} \quad \text{AND} \quad |y^{(i)}| \leq \frac{H}{2}
$$

### Probability of Hit

At range $R$, after $N$ iterations:

$$
P(\text{hit} | R) = \frac{1}{N} \sum_{i=1}^{N} \mathbb{1}_{\text{hit}}^{(i)}
$$

Where $\mathbb{1}_{\text{hit}}^{(i)}$ is the indicator function:

$$
\mathbb{1}_{\text{hit}}^{(i)} = \begin{cases}
1 & \text{if impact } i \text{ hits target} \\
0 & \text{otherwise}
\end{cases}
$$

### Confidence Intervals

95% confidence interval for $P(\text{hit})$ using normal approximation:

$$
CI_{95\%} = \hat{p} \pm 1.96 \sqrt{\frac{\hat{p}(1-\hat{p})}{N}}
$$

Where $\hat{p}$ is the estimated probability.

For better accuracy with $N \geq 1000$ iterations:

$$
\text{margin of error} \approx \frac{1}{\sqrt{N}}
$$

---

## Statistical Measures

### Mean Point of Impact (MPI)

$$
\bar{x} = \frac{1}{N} \sum_{i=1}^{N} x^{(i)}
$$

$$
\bar{y} = \frac{1}{N} \sum_{i=1}^{N} y^{(i)}
$$

### Standard Deviation

$$
\sigma_x = \sqrt{\frac{1}{N} \sum_{i=1}^{N} (x^{(i)} - \bar{x})^2}
$$

$$
\sigma_y = \sqrt{\frac{1}{N} \sum_{i=1}^{N} (y^{(i)} - \bar{y})^2}
$$

### Circular Error Probable (CEP)

Radius containing 50% of shots (for circular distributions):

$$
CEP \approx 0.5887(\sigma_x + \sigma_y)
$$

For 2D Rayleigh distribution with $\sigma_x \approx \sigma_y = \sigma$:

$$
CEP = 1.1774 \sigma
$$

### 95% Confidence Ellipse

The 95% confidence ellipse has semi-axes determined by the covariance matrix:

$$
\mathbf{C} = \begin{bmatrix}
\sigma_x^2 & \rho \sigma_x \sigma_y \\
\rho \sigma_x \sigma_y & \sigma_y^2
\end{bmatrix}
$$

Where $\rho$ is the correlation coefficient:

$$
\rho = \frac{1}{N} \sum_{i=1}^{N} \frac{(x^{(i)} - \bar{x})(y^{(i)} - \bar{y})}{\sigma_x \sigma_y}
$$

Eigenvalues of $\mathbf{C}$ give squared semi-axes:

$$
\lambda_{1,2} = \frac{\sigma_x^2 + \sigma_y^2}{2} \pm \frac{1}{2}\sqrt{(\sigma_x^2 - \sigma_y^2)^2 + 4\rho^2\sigma_x^2\sigma_y^2}
$$

95% ellipse semi-axes (chi-squared with 2 DOF):

$$
a = \sqrt{\lambda_1 \cdot 5.991}, \quad b = \sqrt{\lambda_2 \cdot 5.991}
$$

### Extreme Spread

Maximum dispersion in dataset:

$$
ES = \max_{i,j} \sqrt{(x^{(i)} - x^{(j)})^2 + (y^{(i)} - y^{(j)})^2}
$$

---

## Energy and Momentum

### Kinetic Energy

$$
E = \frac{1}{2} m v^2
$$

In ft-lbs with mass in grains:

$$
E_{ft-lbs} = \frac{1}{2} \cdot \frac{m_{grains}}{7000} \cdot v_{fps}^2
$$

Where 7000 grains = 1 pound.

### Momentum

$$
p = m v
$$

Momentum is conserved in the absence of external forces (drag violates this in air).

---

## Unit Conversions

### Display Units

The application supports three display units for drop and drift values:

1. **Inches** (in) - Direct output
2. **Minutes of Angle** (MOA) - Angular measurement
3. **Milliradians** (MIL) - Metric angular measurement

### Inches to MOA

Minute of Angle (MOA) is 1/60th of a degree. To convert inches to MOA:

$$
\text{MOA} = \frac{y_{inches}}{R_{yards} \cdot 1.047}
$$

Derivation:

$$
\text{MOA} = \frac{y_{inches} / (R_{yards} \cdot 36)}{} \cdot \frac{180 \cdot 60}{\pi} \approx \frac{y_{inches}}{R_{yards} \cdot 1.047}
$$

Where:
- $y_{inches}$ = drop or drift in inches
- $R_{yards}$ = range in yards
- Factor of 36 converts yards to inches
- $1.047 \approx \frac{36 \pi}{180 \cdot 60}$ = simplified conversion constant

### Inches to MIL

Milliradian (MIL) is 1/1000th of a radian. To convert inches to MIL:

$$
\text{MIL} = \frac{y_{inches}}{R_{yards} \cdot 36} \cdot 1000
$$

Simplified:

$$
\text{MIL} = \frac{y_{inches} \cdot 27.78}{R_{yards}}
$$

Where $27.78 = \frac{1000}{36}$

### Conversion Examples

At 1000 yards with 10 inches of drop:

- **MOA**: $\frac{10}{1000 \cdot 1.047} = 0.0096$ MOA
- **MIL**: $\frac{10 \cdot 27.78}{1000} = 0.278$ MIL

At 500 yards with 5 inches of drift:

- **MOA**: $\frac{5}{500 \cdot 1.047} = 0.0096$ MOA
- **MIL**: $\frac{5 \cdot 27.78}{500} = 0.278$ MIL

---

## Wind Effects

### Wind Vector

Wind velocity components in shooter's reference frame:

$$
w_x = w \cos(\theta_w)
$$

$$
w_z = w \sin(\theta_w)
$$

Where:
- $w$ = wind speed in fps (convert from mph: multiply by 1.46667)
- $\theta_w$ = wind direction angle (radians)
- $w_x$ = headwind/tailwind component (positive = headwind from 12 o'clock)
- $w_z$ = crosswind component (positive = right-to-left from 3 o'clock)

**Wind Convention:**
- 0° = Headwind (wind from 12 o'clock)
- 90° = Right-to-left crosswind (wind from 3 o'clock)
- 180° = Tailwind (wind from 6 o'clock)
- 270° = Left-to-right crosswind (wind from 9 o'clock)

### Wind Drift

Simplified cross-range drift accumulation:

$$
x_{drift} \approx \int_0^t \frac{F_D}{m} \cdot \frac{w_x}{v} \, dt
$$

More accurate drift requires full 3D trajectory integration.

---

## Sensitivity Analysis

Sensitivity of output $y$ to input parameter $p$:

$$
S_p = \frac{\partial y}{\partial p} \approx \frac{\Delta y}{\Delta p}
$$

Using finite differences:

$$
S_p \approx \frac{y(p + \epsilon) - y(p - \epsilon)}{2\epsilon}
$$

### Normalized Sensitivity

$$
S_p^* = \frac{p}{y} \cdot \frac{\partial y}{\partial p}
$$

Unitless measure of relative impact.

---

## Limitations and Assumptions

### 3DoF Model Limitations

1. **No Spin Effects**: Ignores gyroscopic stability and spin drift
2. **No Magnus Effect**: Ignores lift from projectile spin in crosswind
3. **Point Mass**: Assumes all mass concentrated at center of gravity
4. **2D Trajectory**: Crosswind drift simplified, no full 3D modeling
5. **Standard Atmosphere**: Simplified atmospheric model

### Future 6DoF Extension

A 6-degree-of-freedom model would add:
- Angular velocities (roll, pitch, yaw rates)
- Moments of inertia
- Magnus force: $\mathbf{F}_M = C_M \cdot (\boldsymbol{\omega} \times \mathbf{v})$
- Spin drift proportional to time of flight

---

## Twist Rate Calculations

### Miller Twist Rule

The Miller Twist Rule provides empirical formulas for calculating the gyroscopic stability factor of a bullet or determining the required barrel twist rate for stability.

#### Stability Factor

The gyroscopic stability factor $s$:

$$
s = \frac{30m}{t^{2} \, d^{3} \, l \, (1 + l^{2})}
$$

#### Required Twist Rate

For a desired stability factor $s$:

$$
t = \sqrt{\frac{30m}{s \, d^{3} \, l \, (1 + l^{2})}}
$$

Where:

- $m$ = bullet mass (grains)

- $t$ = twist rate (calibers per turn)

- $d$ = bullet diameter (inches)

- $l$ = bullet length in calibers

The constant 30 accounts for standard conditions (2800 ft/s, 59°F, sea level).

#### Corrections for Non-Standard Conditions

##### Velocity Correction

$$
f_v = \left( \frac{v}{2800} \right)^{1/3}
$$

##### Altitude Correction

$$
f_a = e^{3.158 \times 10^{-5} \cdot h}
$$

Where $h$ is altitude (feet).

Corrected stability: $s_{corrected} = s \times f_v \times f_a$

Corrected twist rate: $t_{corrected} = t \times f_v^{1/2} \times f_a^{1/2}$

#### Modifications for Plastic-Tipped Bullets

Use the metal portion length $l_m$ in the $(1 + l^2)$ term.

#### Recommended Stability

Minimum $s \geq 1.4$ for reliable stability.

### Limitations

Assumes uniform density and modern bullet shapes.

---

## References

### Textbooks

1. McCoy, R. L. (1999). *Modern Exterior Ballistics*. Schiffer Publishing.
2. Carlucci, D. E., & Jacobson, S. S. (2018). *Ballistics: Theory and Design of Guns and Ammunition*. CRC Press.

### Standards

3. ICAO Standard Atmosphere (1993). *International Civil Aviation Organization*.
4. G1/G7 Drag Functions: *U.S. Army Ballistic Research Laboratory*.

### Applied Ballistics

5. Litz, B. (2011). *Applied Ballistics for Long-Range Shooting*. Applied Ballistics LLC.
6. Litz, B. (2015). *Modern Advancements in Long Range Shooting*. Applied Ballistics LLC.

### Numerical Methods

7. Press, W. H., et al. (2007). *Numerical Recipes: The Art of Scientific Computing* (3rd ed.). Cambridge University Press.
8. Burden, R. L., & Faires, J. D. (2010). *Numerical Analysis* (9th ed.). Brooks/Cole.

---

## Implementation Notes

### Code Locations

- **Differential Equations**: `packages/wasm-ballistics/src/solver.rs` - `derivatives()` function
- **RK4 Integration**: `packages/wasm-ballistics/src/solver.rs` - `rk4_step()` function
- **Drag Models**: `packages/wasm-ballistics/src/drag_models.rs` - G1/G7 tables
- **Atmosphere**: `packages/wasm-ballistics/src/atmosphere.rs` - Density calculations
- **Monte Carlo**: `packages/web-app/src/workers/monte-carlo.worker.ts` - Simulation loop

### Units Convention

**Internal Calculations:**
- Horizontal distance (x): yards
- Vertical distance (y): feet
- Lateral distance (z): feet
- Velocity: feet per second (fps)
- Mass: grains
- Pressure: inches of mercury (inHg)
- Temperature: Fahrenheit (°F)
- Energy: foot-pounds (ft-lbs)

**User Output:**
- Horizontal distance: yards
- Vertical drop: inches (converted from feet)
- Lateral drift: inches (converted from feet)
- Velocity: feet per second (fps)
- Energy: foot-pounds (ft-lbs)
- Drop/Drift display units: selectable (inches, MOA, or MIL)

---




**Document Version**: 1.2
**Last Updated**: January 2026
**Project**: OpenWEZ - Open-Source Weapon Employment Zone Modeling

**Changelog v1.2:**
- Added ballistic coefficient (BC) uncertainty to Monte Carlo simulation
- Added twist rate calculations section

**Changelog v1.1:**
- Updated coordinate system to 3D (added z-axis for lateral drift)
- Corrected drag acceleration formula with 1.66 scaling factor
- Replaced small angle approximation with iterative bisection method for zero angle
- Clarified internal use of feet for y/z coordinates with inch output
- Added unit conversion section (MOA and MIL)
- Updated wind vector formulas and convention
- Corrected differential equations for 3D trajectory
