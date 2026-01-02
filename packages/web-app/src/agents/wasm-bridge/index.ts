/**
 * WASM Bridge Agent
 * Interface between TypeScript and Rust/WASM ballistic engine
 */

import type { BallisticInputs, Trajectory, TrajectoryPoint } from '../../types';

// Dynamic import for WASM module
let wasmModule: any = null;

/**
 * Initialize WASM module
 */
export async function initializeWasm(): Promise<void> {
  if (wasmModule) return; // Already initialized

  try {
    console.log('Starting WASM initialization...');

    // Dynamic import of WASM module
    console.log('Importing WASM module...');
    const wasm = await import('@wasm/wasm_ballistics.js');
    console.log('WASM module imported:', wasm);

    // Call the default init function to load WASM binary
    console.log('Calling wasm.default() to load binary...');
    await wasm.default();
    console.log('WASM binary loaded successfully');

    // Now call initialize() to set up panic hooks
    console.log('Calling wasm.initialize()...');
    wasm.initialize();
    console.log('WASM initialize() called');

    // Store the initialized module
    wasmModule = wasm;

    console.log('WASM ballistic engine initialized successfully!');
  } catch (error) {
    console.error('WASM initialization error details:', error);
    console.error('Error type:', typeof error);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack');
    throw error; // Throw the original error instead of wrapping it
  }
}

/**
 * Compute full trajectory using WASM engine
 */
export async function computeTrajectory(
  inputs: BallisticInputs,
  maxRange: number = 1000,
  step: number = 50,
): Promise<Trajectory> {
  if (!wasmModule) {
    await initializeWasm();
  }

  try {
    const result = wasmModule.compute_trajectory(inputs, maxRange, step);
    return result as Trajectory;
  } catch (error) {
    console.error('WASM trajectory computation failed:', error);
    throw new Error(`Ballistic calculation failed: ${error}`);
  }
}

/**
 * Compute single trajectory point at specific range
 */
export async function computeSinglePoint(
  inputs: BallisticInputs,
  range: number,
): Promise<TrajectoryPoint> {
  if (!wasmModule) {
    await initializeWasm();
  }

  try {
    const result = wasmModule.compute_single_point(inputs, range);
    return result as TrajectoryPoint;
  } catch (error) {
    console.error('WASM point computation failed:', error);
    throw new Error(`Ballistic calculation failed: ${error}`);
  }
}

/**
 * Check if WASM module is initialized
 */
export function isWasmReady(): boolean {
  return wasmModule !== null;
}