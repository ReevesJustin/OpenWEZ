/**
 * Type Definition Agent - Main Exports
 * Central export point for all type definitions
 */

// Ballistics types
export type {
  DragModel,
  BallisticCoefficient,
  EnvironmentalConditions,
  BallisticInputs,
  TrajectoryPoint,
  Trajectory,
} from './ballistics';

// Simulation types
export type {
  UncertaintyParameters,
  TargetSpecification,
  MonteCarloConfig,
  ImpactPoint,
  StatisticalSummary,
  SimulationResult,
  SimulationProgress,
} from './simulation';

// Profile types
export type {
  WeaponProfile,
  ConfidenceLevel,
  PresetProfile,
  AmmoProfile,
  EnvironmentProfile,
  SolverType,
} from './profiles';

// Constants
export { PHYSICAL_CONSTANTS, UNIT_CONVERSIONS, DEFAULT_UNCERTAINTIES } from './constants';

// Validation schemas
export {
  BallisticCoefficientSchema,
  EnvironmentalConditionsSchema,
  BallisticInputsSchema,
  UncertaintyParametersSchema,
  WeaponProfileSchema,
} from './validation';

// Ensure this module has a value export for isolatedModules
export const __esModule = true;