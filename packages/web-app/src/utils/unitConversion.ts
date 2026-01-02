/**
 * Unit conversion utilities for ballistic calculations
 */

import type { DisplayUnit } from '../agents/state-management/store';

/**
 * Convert inches to Minutes of Angle (MOA)
 * MOA = (inches / (range_yards * 36)) * (180 * 60 / PI)
 * Simplified: MOA ≈ inches / (range_yards * 1.047)
 */
export function inchesToMOA(inches: number, rangeYards: number): number {
  if (rangeYards === 0) return 0;
  // Exact formula: (inches / (rangeYards * 36)) * (180 * 60 / Math.PI)
  return inches / (rangeYards * 1.047);
}

/**
 * Convert inches to Milliradians (MIL)
 * MIL = (inches / (range_yards * 36)) * 1000
 * Simplified: MIL ≈ inches * 27.78 / range_yards
 */
export function inchesToMIL(inches: number, rangeYards: number): number {
  if (rangeYards === 0) return 0;
  // Exact formula: (inches / (rangeYards * 36)) * 1000
  return (inches / (rangeYards * 36)) * 1000;
}

/**
 * Convert value based on selected display unit
 */
export function convertToDisplayUnit(
  inches: number,
  rangeYards: number,
  unit: DisplayUnit
): number {
  switch (unit) {
    case 'inches':
      return inches;
    case 'MOA':
      return inchesToMOA(inches, rangeYards);
    case 'MIL':
      return inchesToMIL(inches, rangeYards);
  }
}

/**
 * Get the appropriate unit label suffix
 */
export function getUnitLabel(unit: DisplayUnit): string {
  switch (unit) {
    case 'inches':
      return 'in';
    case 'MOA':
      return 'MOA';
    case 'MIL':
      return 'MIL';
  }
}

/**
 * Format value with appropriate precision based on unit
 */
export function formatValue(value: number, unit: DisplayUnit): string {
  switch (unit) {
    case 'inches':
      return value.toFixed(2);
    case 'MOA':
      return value.toFixed(2);
    case 'MIL':
      return value.toFixed(2);
  }
}
