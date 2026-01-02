//! OpenWEZ Ballistic Engine (Rust/WASM)
//! 3DoF point-mass ballistic trajectory solver

mod types;
mod solver;
mod drag_models;
mod atmosphere;

use wasm_bindgen::prelude::*;
use serde_wasm_bindgen::{from_value, to_value};
pub use types::*;

#[wasm_bindgen]
pub fn initialize() {
    // Set panic hook for better error messages in browser console
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

/// Calculate ballistic trajectory (WASM-exported)
#[wasm_bindgen]
pub fn compute_trajectory(
    inputs_js: JsValue,
    max_range: f64,
    step: f64,
) -> Result<JsValue, JsValue> {
    // Deserialize inputs from JavaScript
    let inputs: BallisticInputs = from_value(inputs_js)
        .map_err(|e| JsValue::from_str(&format!("Invalid input: {}", e)))?;

    // Calculate trajectory
    let trajectory = solver::calculate_trajectory(&inputs, max_range, step);

    // Serialize result back to JavaScript
    to_value(&trajectory)
        .map_err(|e| JsValue::from_str(&format!("Serialization error: {}", e)))
}

/// Calculate single trajectory point at specific range
#[wasm_bindgen]
pub fn compute_single_point(
    inputs_js: JsValue,
    range: f64,
) -> Result<JsValue, JsValue> {
    let inputs: BallisticInputs = from_value(inputs_js)
        .map_err(|e| JsValue::from_str(&format!("Invalid input: {}", e)))?;

    let trajectory = solver::calculate_trajectory(&inputs, range, range);

    if let Some(point) = trajectory.last() {
        to_value(point)
            .map_err(|e| JsValue::from_str(&format!("Serialization error: {}", e)))
    } else {
        Err(JsValue::from_str("Failed to compute trajectory point"))
    }
}