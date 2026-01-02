/**
 * Type Definition Agent - Zod Validation Schemas
 * Runtime validation for external data
 */

import { z } from 'zod';

export const BallisticCoefficientSchema = z.object({
  value: z.number().positive(),
  dragModel: z.enum(['G1', 'G7']),
});

export const EnvironmentalConditionsSchema = z.object({
  temperature: z.number().min(-50).max(150),
  pressure: z.number().min(20).max(35),
  humidity: z.number().min(0).max(100),
  altitude: z.number().min(-1000).max(15000),
  windSpeed: z.number().min(0).max(100),
  windDirection: z.number().min(0).max(360),
});

export const BallisticInputsSchema = z.object({
  muzzleVelocity: z.number().min(500).max(5000),
  bulletWeight: z.number().min(10).max(1000),
  bulletDiameter: z.number().min(0.1).max(2),
  bc: BallisticCoefficientSchema,
  zeroRange: z.number().min(10).max(1000),
  sightHeight: z.number().min(0.5).max(5),
  environment: EnvironmentalConditionsSchema,
});

export const UncertaintyParametersSchema = z.object({
  muzzleVelocitySD: z.number().min(0).max(100),
  windSpeedSD: z.number().min(0).max(20),
  windDirectionSD: z.number().min(0).max(45),
  rangeErrorSD: z.number().min(0).max(50),
  meanRadiusMOA: z.number().min(0).max(10),
});

export const WeaponProfileSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(100),
  ballistics: BallisticInputsSchema,
  uncertainties: UncertaintyParametersSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});