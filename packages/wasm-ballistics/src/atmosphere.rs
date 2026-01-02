//! Atmospheric calculations for ballistic modeling
//! Implements ICAO standard atmosphere with adjustments for temperature, pressure, humidity

use crate::types::EnvironmentalConditions;

/// Physical constants
const R_DRY_AIR: f64 = 287.058; // J/(kg·K) - specific gas constant for dry air
const ABSOLUTE_ZERO_F: f64 = -459.67;

/// Calculate air density from environmental conditions
/// Returns density in lb/ft³
pub fn calculate_air_density(env: &EnvironmentalConditions) -> f64 {
    // Convert temperature from Fahrenheit to Kelvin
    let temp_kelvin = (env.temperature - 32.0) * 5.0 / 9.0 + 273.15;

    // Convert pressure from inHg to Pa
    let pressure_pa = env.pressure * 3386.389;

    // Humidity correction factor (simplified)
    let humidity_factor = 1.0 - 0.01 * env.humidity * 0.00065;

    // Calculate density using ideal gas law
    let density_kg_m3 = (pressure_pa * humidity_factor) / (R_DRY_AIR * temp_kelvin);

    // Convert to lb/ft³
    density_kg_m3 * 0.062428
}

/// Calculate density ratio relative to standard conditions (59°F, 29.92 inHg)
pub fn calculate_density_ratio(env: &EnvironmentalConditions) -> f64 {
    const STANDARD_DENSITY: f64 = 0.0765; // lb/ft³
    calculate_air_density(env) / STANDARD_DENSITY
}

/// Calculate speed of sound at given temperature
/// Returns speed in fps
pub fn speed_of_sound(temperature: f64) -> f64 {
    // Convert to Kelvin
    let temp_kelvin = (temperature - 32.0) * 5.0 / 9.0 + 273.15;

    // Speed of sound in air: v = sqrt(gamma * R * T)
    // gamma = 1.4 for air, R = 287.058 J/(kg·K)
    let speed_m_s = (1.4 * 287.058 * temp_kelvin).sqrt();

    // Convert m/s to fps
    speed_m_s * 3.28084
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::types::EnvironmentalConditions;

    #[test]
    fn test_standard_conditions() {
        let env = EnvironmentalConditions {
            temperature: 59.0,
            pressure: 29.92,
            humidity: 0.0,
            altitude: 0.0,
            wind_speed: 0.0,
            wind_direction: 0.0,
        };

        let density = calculate_air_density(&env);
        assert!((density - 0.0765).abs() < 0.001);

        let ratio = calculate_density_ratio(&env);
        assert!((ratio - 1.0).abs() < 0.01);
    }
}