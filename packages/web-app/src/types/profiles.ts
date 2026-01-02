/**
 * Type Definition Agent - Profile Types
 * User profile and preset types
 */

import type { BallisticCoefficient, EnvironmentalConditions, BallisticInputs } from './ballistics';
import type { UncertaintyParameters } from './simulation';

export interface AmmoProfile {
  id: string;
  name: string;
  bulletWeight: number;
  bulletDiameter: number;
  ballisticCoefficient: BallisticCoefficient;
  createdAt: Date;
  updatedAt: Date;
}

export interface EnvironmentProfile {
  id: string;
  name: string;
  conditions: EnvironmentalConditions;
  createdAt: Date;
  updatedAt: Date;
}

export type SolverType = '3DoF' | '6DoF';


export interface WeaponProfile {
  /** Unique profile identifier */
  id: string;
  /** User-defined profile name */
  name: string;
  /** Ballistic parameters */
  ballistics: BallisticInputs;
  /** Uncertainty parameters */
  uncertainties: UncertaintyParameters;
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
  /** Optional description */
  description?: string;
  /** Optional tags for categorization */
  tags?: string[];
}

export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'custom';

export interface PresetProfile {
  name: string;
  description: string;
  confidenceLevel: ConfidenceLevel;
  uncertainties: UncertaintyParameters;
}