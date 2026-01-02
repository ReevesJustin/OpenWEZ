//! Type definitions for ballistic calculations
//! Mirrors TypeScript types for consistency

use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
#[wasm_bindgen]
pub enum DragModel {
    G1,
    G7,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BallisticCoefficient {
    pub value: f64,
    pub drag_model: DragModel,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct EnvironmentalConditions {
    pub temperature: f64,      // °F
    pub pressure: f64,          // inHg
    pub humidity: f64,          // %
    pub altitude: f64,          // feet
    pub wind_speed: f64,        // mph
    pub wind_direction: f64,    // degrees
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BallisticInputs {
    pub muzzle_velocity: f64,   // fps
    pub bullet_weight: f64,     // grains
    pub bullet_diameter: f64,   // inches
    pub bc: BallisticCoefficient,
    pub zero_range: f64,        // yards
    pub sight_height: f64,      // inches
    pub environment: EnvironmentalConditions,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct TrajectoryPoint {
    pub range: f64,             // yards
    pub drop: f64,              // inches
    pub drift: f64,             // inches
    pub velocity: f64,          // fps
    pub energy: f64,            // ft-lbs
    pub time_of_flight: f64,    // seconds
}

pub type Trajectory = Vec<TrajectoryPoint>;

// Physical constants
pub const GRAVITY: f64 = 32.174;  // ft/s²
pub const STANDARD_TEMPERATURE: f64 = 59.0;  // °F
pub const STANDARD_PRESSURE: f64 = 29.92;  // inHg
pub const STANDARD_AIR_DENSITY: f64 = 0.0765;  // lb/ft³