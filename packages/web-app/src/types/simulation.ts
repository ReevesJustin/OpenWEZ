/**
 * Type Definition Agent - Simulation Types
 * Monte Carlo simulation and uncertainty types
 */

import type { Trajectory } from './ballistics';

export interface UncertaintyParameters {
  /** Muzzle velocity standard deviation in fps */
  muzzleVelocitySD: number;
  /** Ballistic coefficient uncertainty as percentage (e.g., 1.0 = 1%) */
  bcSD: number;
  /** Wind speed standard deviation in mph */
  windSpeedSD: number;
  /** Wind direction standard deviation in degrees */
  windDirectionSD: number;
  /** Range measurement error standard deviation in yards */
  rangeErrorSD: number;
  /** Rifle/system precision - Mean Radius in MOA */
  meanRadiusMOA: number;
}

export interface TargetSpecification {
  /** Target width in inches */
  width: number;
  /** Target height in inches */
  height: number;
  /** Target inclination angle in degrees (0 = perpendicular to shooter) */
  inclination?: number;
}

export interface MonteCarloConfig {
  /** Number of simulation iterations */
  iterations: number;
  /** Uncertainty parameters for randomization */
  uncertainties: UncertaintyParameters;
  /** Target specifications */
  target: TargetSpecification;
  /** Maximum range for simulation in yards */
  maxRange: number;
  /** Range step size in yards */
  rangeStep: number;
}

export interface ImpactPoint {
  /** Horizontal displacement in inches */
  x: number;
  /** Vertical displacement in inches */
  y: number;
  /** Range in yards */
  range: number;
}

export interface StatisticalSummary {
  /** Mean impact point */
  mean: { x: number; y: number };
  /** Standard deviation */
  standardDeviation: { x: number; y: number };
  /** 95% confidence ellipse (semi-major/minor axes) */
  confidence95: { major: number; minor: number; angle: number };
}

export interface SimulationResult {
  /** Probability of hit by range (range -> P(hit)) */
  pHitByRange: Record<number, number>;
  /** All simulated trajectories */
  trajectories: Trajectory[];
  /** All impact points (with Mean Radius dispersion) */
  impactPoints: ImpactPoint[];
  /** Impact points from ballistic uncertainties only (no MR) */
  ballisticImpactPoints: ImpactPoint[];
  /** Statistical summary (with Mean Radius) */
  statistics: StatisticalSummary;
  /** Statistical summary for ballistic uncertainties only (no MR) */
  statisticsBallisticOnly: StatisticalSummary;
  /** Computation time in milliseconds */
  computationTime: number;
}

export interface SimulationProgress {
  /** Completed iterations */
  completed: number;
  /** Total iterations */
  total: number;
  /** Progress percentage (0-100) */
  percentage: number;
  /** Estimated time remaining in milliseconds */
  estimatedTimeRemaining?: number;
}