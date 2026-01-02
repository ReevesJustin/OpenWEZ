/**
 * Type Definition Agent - Ballistics Types
 * Core ballistic parameter interfaces
 */

export type DragModel = 'G1' | 'G7';

export interface BallisticCoefficient {
  value: number;
  dragModel: DragModel;
}

export interface EnvironmentalConditions {
  /** Temperature in °F */
  temperature: number;
  /** Atmospheric pressure in inHg */
  pressure: number;
  /** Relative humidity (0-100%) */
  humidity: number;
  /** Altitude in feet */
  altitude: number;
  /** Wind speed in mph */
  windSpeed: number;
  /** Wind direction in degrees (0-360, 0=headwind, 90=right-to-left) */
  windDirection: number;
}

export interface BallisticInputs {
  /** Muzzle velocity in fps */
  muzzleVelocity: number;
  /** Bullet weight in grains */
  bulletWeight: number;
  /** Bullet diameter in inches */
  bulletDiameter: number;
  /** Ballistic coefficient */
  bc: BallisticCoefficient;
  /** Zero range in yards */
  zeroRange: number;
  /** Sight height above bore in inches */
  sightHeight: number;
  /** Environmental conditions */
  environment: EnvironmentalConditions;
}

export interface TrajectoryPoint {
  /** Range in yards */
  range: number;
  /** Bullet drop in inches (negative = below line of sight) */
  drop: number;
  /** Wind drift in inches (positive = right) */
  drift: number;
  /** Velocity in fps */
  velocity: number;
  /** Kinetic energy in ft-lbs */
  energy: number;
  /** Time of flight in seconds */
  timeOfFlight: number;
}

export type Trajectory = TrajectoryPoint[];