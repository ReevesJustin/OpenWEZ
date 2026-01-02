//! Ballistic drag model implementations (G1 and G7)
//! Uses lookup tables with linear interpolation

use crate::types::DragModel;

/// G1 drag function lookup table (Mach number, Cd)
/// Simplified table - production should use full G1 standard
const G1_TABLE: &[(f64, f64)] = &[
    (0.0, 0.2629),
    (0.5, 0.2558),
    (0.8, 0.2487),
    (0.9, 0.2553),
    (1.0, 0.2993),
    (1.1, 0.3803),
    (1.2, 0.4015),
    (1.3, 0.3960),
    (1.4, 0.3885),
    (1.5, 0.3810),
    (2.0, 0.3440),
    (2.5, 0.3175),
    (3.0, 0.2986),
    (4.0, 0.2772),
    (5.0, 0.2658),
];

/// G7 drag function lookup table (Mach number, Cd)
/// Optimized for long, boat-tail bullets
const G7_TABLE: &[(f64, f64)] = &[
    (0.0, 0.1198),
    (0.5, 0.1197),
    (0.8, 0.1231),
    (0.9, 0.1267),
    (1.0, 0.1362),
    (1.1, 0.1671),
    (1.2, 0.1839),
    (1.3, 0.1919),
    (1.4, 0.1971),
    (1.5, 0.2008),
    (2.0, 0.2154),
    (2.5, 0.2206),
    (3.0, 0.2217),
    (4.0, 0.2214),
    (5.0, 0.2206),
];

/// Get drag coefficient for a given Mach number and drag model
pub fn get_drag_coefficient(mach: f64, model: DragModel) -> f64 {
    let table = match model {
        DragModel::G1 => G1_TABLE,
        DragModel::G7 => G7_TABLE,
    };

    // Linear interpolation between table values
    interpolate_drag_table(table, mach)
}

/// Linear interpolation helper
fn interpolate_drag_table(table: &[(f64, f64)], mach: f64) -> f64 {
    // Handle out-of-range values
    if mach <= table[0].0 {
        return table[0].1;
    }
    if mach >= table[table.len() - 1].0 {
        return table[table.len() - 1].1;
    }

    // Find surrounding points
    for i in 0..table.len() - 1 {
        let (m1, cd1) = table[i];
        let (m2, cd2) = table[i + 1];

        if mach >= m1 && mach <= m2 {
            // Linear interpolation
            let t = (mach - m1) / (m2 - m1);
            return cd1 + t * (cd2 - cd1);
        }
    }

    table[0].1 // Fallback
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_g1_subsonic() {
        let cd = get_drag_coefficient(0.8, DragModel::G1);
        assert!((cd - 0.2487).abs() < 0.001);
    }

    #[test]
    fn test_g7_supersonic() {
        let cd = get_drag_coefficient(2.5, DragModel::G7);
        assert!((cd - 0.2206).abs() < 0.001);
    }
}