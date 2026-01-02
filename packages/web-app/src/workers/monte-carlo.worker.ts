/**
 * Monte Carlo Simulation Web Worker
 * Runs ballistic simulations in background thread to avoid UI blocking
 */

import init, { compute_trajectory } from '@wasm/wasm_ballistics.js';
import type {
  BallisticInputs,
  MonteCarloConfig,
  Trajectory,
  ImpactPoint,
} from '../types';
import { randomGaussian } from '../utils/random';

let wasmReady = false;

interface SimulationResult {
  impactPoints: ImpactPoint[];
  ballisticImpactPoints: ImpactPoint[];  // Ballistic uncertainties only (no MR)
  pHitByRange: Record<number, number>;
  statistics: {
    mean: { x: number; y: number };
    standardDeviation: { x: number; y: number };
  };
  statisticsBallisticOnly: {  // Stats for ballistic uncertainties only
    mean: { x: number; y: number };
    standardDeviation: { x: number; y: number };
  };
  computationTime: number;
}

// Worker message handling
self.onmessage = async (event: MessageEvent) => {
  const { type, payload } = event.data;

  if (type === 'RUN_SIMULATION') {
    try {
      // Initialize WASM on first run
      if (!wasmReady) {
        console.log('[Worker] Initializing WASM...');
        await init();
        wasmReady = true;
        console.log('[Worker] WASM initialized successfully');
      }

      const { baseInputs, config } = payload;
      const result = await runMonteCarloSimulation(baseInputs, config);

      self.postMessage({ type: 'SIMULATION_COMPLETE', payload: result });
    } catch (error) {
      console.error('[Worker] Simulation error:', error);
      self.postMessage({
        type: 'SIMULATION_ERROR',
        payload: error instanceof Error ? error.message : 'Simulation failed'
      });
    }
  }
};

async function runMonteCarloSimulation(
  baseInputs: BallisticInputs,
  config: MonteCarloConfig
): Promise<SimulationResult> {
  const startTime = performance.now();
  const impactPoints: ImpactPoint[] = [];
  const ballisticPoints: ImpactPoint[] = [];  // Ballistic-only (no MR)
  const { iterations, uncertainties, target, maxRange, rangeStep } = config;

  console.log(`[Worker] Running ${iterations} iterations at ${maxRange} yards...`);

  // Run iterations
  for (let i = 0; i < iterations; i++) {
    // Apply ballistic uncertainties to create perturbed inputs
    const perturbedInputs = applyUncertainties(baseInputs, uncertainties);

    // Calculate full trajectory using WASM
    const trajectory: Trajectory = compute_trajectory(
      perturbedInputs,
      maxRange,
      rangeStep
    );

    // For each point in trajectory, store both ballistic-only and total dispersion
    if (trajectory && trajectory.length > 0) {
      trajectory.forEach(point => {
        // Store ballistic-only point (no MR)
        ballisticPoints.push({
          x: point.drift,
          y: point.drop,
          range: point.range,
        });

        // Apply rifle precision (Mean Radius) as circular dispersion for total
        const dispersedPoint = applyMeanRadiusDispersion(
          point.range,
          point.drift,
          point.drop,
          uncertainties.meanRadiusMOA
        );

        impactPoints.push(dispersedPoint);
      });
    }

    // Send progress update every 100 iterations
    if ((i + 1) % 100 === 0 || i === iterations - 1) {
      self.postMessage({
        type: 'PROGRESS_UPDATE',
        payload: {
          completed: i + 1,
          total: iterations,
          percentage: ((i + 1) / iterations) * 100,
        },
      });
    }
  }

  console.log(`[Worker] Completed ${iterations} iterations`);

  // Calculate statistics at max range only
  const maxRangePoints = impactPoints.filter(p => Math.abs(p.range - maxRange) < rangeStep / 2);
  const maxRangeBallisticPoints = ballisticPoints.filter(p => Math.abs(p.range - maxRange) < rangeStep / 2);

  const statistics = calculateStatistics(maxRangePoints);
  const statisticsBallisticOnly = calculateStatistics(maxRangeBallisticPoints);

  // Calculate P(hit) by range
  const pHitByRange = calculateProbabilityOfHit(impactPoints, target, rangeStep);

  const computationTime = performance.now() - startTime;
  console.log(`[Worker] Computation time: ${computationTime.toFixed(2)}ms`);
  console.log(`[Worker] P(hit) data points: ${Object.keys(pHitByRange).length}`);
  console.log(`[Worker] Total dispersion std dev: X=${statistics.standardDeviation.x.toFixed(2)}", Y=${statistics.standardDeviation.y.toFixed(2)}"`);
  console.log(`[Worker] Ballistic-only std dev: X=${statisticsBallisticOnly.standardDeviation.x.toFixed(2)}", Y=${statisticsBallisticOnly.standardDeviation.y.toFixed(2)}"`);

  return {
    impactPoints: maxRangePoints, // Only return points at max range for scatter plot
    ballisticImpactPoints: maxRangeBallisticPoints,  // Ballistic-only points
    pHitByRange,
    statistics,
    statisticsBallisticOnly,
    computationTime,
  };
}

function applyUncertainties(
  baseInputs: BallisticInputs,
  uncertainties: typeof baseInputs extends { uncertainties: infer U } ? U : any
): BallisticInputs {
  // Calculate absolute BC standard deviation from percentage
  // bcSD is in percentage (e.g., 1.0 = 1%)
  const bcSDAbsolute = baseInputs.bc.value * (uncertainties.bcSD / 100.0);

  return {
    ...baseInputs,
    muzzleVelocity: randomGaussian(
      baseInputs.muzzleVelocity,
      uncertainties.muzzleVelocitySD
    ),
    bc: {
      ...baseInputs.bc,
      // Apply BC uncertainty and ensure it stays positive
      value: Math.max(
        0.001,  // Minimum BC to prevent numerical issues
        randomGaussian(baseInputs.bc.value, bcSDAbsolute)
      ),
    },
    environment: {
      ...baseInputs.environment,
      // Sample uncertainty around base value, then clamp to ensure physical validity
      windSpeed: Math.max(
        0,
        baseInputs.environment.windSpeed + randomGaussian(0, uncertainties.windSpeedSD)
      ),
      windDirection: baseInputs.environment.windDirection + randomGaussian(0, uncertainties.windDirectionSD),
    },
    zeroRange: randomGaussian(baseInputs.zeroRange, uncertainties.rangeErrorSD),
  };
}

/**
 * Apply rifle precision (Mean Radius) dispersion to impact point
 * MR is converted from MOA to inches at the given range, then applied as circular normal dispersion
 *
 * Statistical relationship: For 2D circular normal distribution with σ_x = σ_y = σ,
 * the radial distance R follows Rayleigh(σ) with E[R] = σ√(π/2) ≈ 1.253σ
 * Therefore: σ = MR / 1.253
 */
function applyMeanRadiusDispersion(
  range: number,
  drift: number,
  drop: number,
  meanRadiusMOA: number
): ImpactPoint {
  // Convert MOA to inches at this range
  // 1 MOA ≈ 1.047 inches at 100 yards
  const mrInches = meanRadiusMOA * (range / 100) * 1.047;

  // For circular normal distribution, Mean Radius = σ × √(π/2)
  // Therefore: σ = MR / √(π/2) = MR / 1.253
  const sigma = mrInches / 1.253;

  // Apply Gaussian noise in both X and Y directions
  const dispersedX = drift + randomGaussian(0, sigma);
  const dispersedY = drop + randomGaussian(0, sigma);

  return {
    x: dispersedX,
    y: dispersedY,
    range: range,
  };
}

function calculateStatistics(impactPoints: ImpactPoint[]) {
  const n = impactPoints.length;

  if (n === 0) {
    return {
      mean: { x: 0, y: 0 },
      standardDeviation: { x: 0, y: 0 },
    };
  }

  const meanX = impactPoints.reduce((sum, p) => sum + p.x, 0) / n;
  const meanY = impactPoints.reduce((sum, p) => sum + p.y, 0) / n;

  const varianceX = impactPoints.reduce((sum, p) => sum + Math.pow(p.x - meanX, 2), 0) / n;
  const varianceY = impactPoints.reduce((sum, p) => sum + Math.pow(p.y - meanY, 2), 0) / n;

  return {
    mean: { x: meanX, y: meanY },
    standardDeviation: {
      x: Math.sqrt(varianceX),
      y: Math.sqrt(varianceY),
    },
  };
}

function calculateProbabilityOfHit(
  impactPoints: ImpactPoint[],
  target: { width: number; height: number },
  rangeStep: number
): Record<number, number> {
  const pHit: Record<number, number> = {};
  const halfWidth = target.width / 2;
  const halfHeight = target.height / 2;

  // Group by range bins
  const byRange = new Map<number, ImpactPoint[]>();

  impactPoints.forEach((point) => {
    // Round to nearest rangeStep interval
    const rangeKey = Math.round(point.range / rangeStep) * rangeStep;
    if (!byRange.has(rangeKey)) {
      byRange.set(rangeKey, []);
    }
    byRange.get(rangeKey)!.push(point);
  });

  // Calculate hit probability for each range
  byRange.forEach((points, range) => {
    // Calculate mean point of impact at this range
    const meanX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
    const meanY = points.reduce((sum, p) => sum + p.y, 0) / points.length;

    // Check hits relative to mean point of impact (center impacts on target)
    const hits = points.filter((p) => {
      const centeredX = p.x - meanX;  // Center on MPI
      const centeredY = p.y - meanY;  // Center on MPI
      return Math.abs(centeredX) <= halfWidth && Math.abs(centeredY) <= halfHeight;
    }).length;

    pHit[range] = hits / points.length;
  });

  return pHit;
}

export {};
