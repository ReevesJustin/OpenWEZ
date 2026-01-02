/**
 * Monte Carlo Simulation Agent
 * Manages Web Worker for parallel Monte Carlo simulations
 */

import type {
  BallisticInputs,
  MonteCarloConfig,
  SimulationResult,
  SimulationProgress,
} from '../../types';

let worker: Worker | null = null;

export interface MonteCarloCallbacks {
  onProgress?: (progress: SimulationProgress) => void;
  onComplete?: (result: SimulationResult) => void;
  onError?: (error: string) => void;
}

/**
 * Initialize Monte Carlo worker
 */
export function initializeMonteCarloWorker(): void {
  if (worker) return;

  console.log('[Monte Carlo Agent] Initializing worker...');
  worker = new Worker(
    new URL('../../workers/monte-carlo.worker.ts', import.meta.url),
    { type: 'module' }
  );
  console.log('[Monte Carlo Agent] Worker initialized');
}

/**
 * Run Monte Carlo simulation
 */
export async function runMonteCarloSimulation(
  baseInputs: BallisticInputs,
  config: MonteCarloConfig,
  callbacks: MonteCarloCallbacks = {}
): Promise<SimulationResult> {
  if (!worker) {
    initializeMonteCarloWorker();
  }

  return new Promise((resolve, reject) => {
    if (!worker) {
      reject(new Error('Worker not initialized'));
      return;
    }

    console.log('[Monte Carlo Agent] Starting simulation with config:', config);

    worker.onmessage = (event: MessageEvent) => {
      const { type, payload } = event.data;

      switch (type) {
        case 'PROGRESS_UPDATE':
          console.log(`[Monte Carlo Agent] Progress: ${payload.percentage.toFixed(1)}%`);
          callbacks.onProgress?.(payload);
          break;

        case 'SIMULATION_COMPLETE':
          console.log('[Monte Carlo Agent] Simulation complete');
          callbacks.onComplete?.(payload);
          resolve(payload);
          break;

        case 'SIMULATION_ERROR':
          console.error('[Monte Carlo Agent] Simulation error:', payload);
          callbacks.onError?.(payload);
          reject(new Error(payload));
          break;
      }
    };

    worker.onerror = (error) => {
      const errorMsg = 'Worker error: ' + error.message;
      console.error('[Monte Carlo Agent]', errorMsg);
      callbacks.onError?.(errorMsg);
      reject(new Error(errorMsg));
    };

    // Send simulation request to worker (worker will initialize its own WASM)
    worker.postMessage({
      type: 'RUN_SIMULATION',
      payload: { baseInputs, config },
    });
  });
}

/**
 * Terminate worker
 */
export function terminateMonteCarloWorker(): void {
  if (worker) {
    console.log('[Monte Carlo Agent] Terminating worker');
    worker.terminate();
    worker = null;
  }
}
