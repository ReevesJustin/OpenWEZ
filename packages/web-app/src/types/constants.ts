/**
 * Type Definition Agent - Physical Constants
 * Physical constants and unit conversion factors
 */

import type { ConfidenceLevel } from './profiles';
import type { UncertaintyParameters } from './simulation';

export const PHYSICAL_CONSTANTS = {
  /** Standard gravity in ft/s² */
  GRAVITY: 32.174,
  /** Standard temperature in °F */
  STANDARD_TEMPERATURE: 59,
  /** Standard pressure in inHg */
  STANDARD_PRESSURE: 29.92,
  /** Standard air density in lb/ft³ */
  STANDARD_AIR_DENSITY: 0.0765,
  /** Speed of sound in fps at standard conditions */
  SPEED_OF_SOUND: 1116.4,
} as const;

export const UNIT_CONVERSIONS = {
  /** Feet to meters */
  FT_TO_M: 0.3048,
  /** Yards to meters */
  YD_TO_M: 0.9144,
  /** Inches to centimeters */
  IN_TO_CM: 2.54,
  /** Miles per hour to feet per second */
  MPH_TO_FPS: 1.46667,
  /** Grains to grams */
  GRAIN_TO_G: 0.06479891,
  /** Fahrenheit to Celsius offset */
  F_TO_C_OFFSET: 32,
  /** Fahrenheit to Celsius scale */
  F_TO_C_SCALE: 5 / 9,
} as const;

export const DEFAULT_UNCERTAINTIES: Record<ConfidenceLevel, UncertaintyParameters> = {
  high: {
    muzzleVelocitySD: 10,
    bcSD: 0.5,  // 0.5% BC uncertainty (high confidence)
    windSpeedSD: 1,
    windDirectionSD: 5,
    rangeErrorSD: 1,
    meanRadiusMOA: 0.15,  // MR equivalent to 0.5 MOA ES (MR ≈ ES × 0.3)
  },
  medium: {
    muzzleVelocitySD: 25,
    bcSD: 1.0,  // 1.0% BC uncertainty (standard)
    windSpeedSD: 2.5,
    windDirectionSD: 10,
    rangeErrorSD: 5,
    meanRadiusMOA: 0.3,  // MR equivalent to 1.0 MOA ES (MR ≈ ES × 0.3)
  },
  low: {
    muzzleVelocitySD: 50,
    bcSD: 2.0,  // 2.0% BC uncertainty (low confidence)
    windSpeedSD: 5,
    windDirectionSD: 20,
    rangeErrorSD: 10,
    meanRadiusMOA: 0.45,  // MR equivalent to 1.5 MOA ES (MR ≈ ES × 0.3)
  },
  custom: {
    // Custom preset - values are not overridden, user sets them manually
    muzzleVelocitySD: 25,
    bcSD: 1.0,  // 1.0% BC uncertainty (standard)
    windSpeedSD: 2.5,
    windDirectionSD: 10,
    rangeErrorSD: 5,
    meanRadiusMOA: 0.3,
  },
};