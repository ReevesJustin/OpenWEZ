/**
 * TypeScript declaration for WASM ballistics module
 */

declare module '@wasm/wasm_ballistics.js' {
  import type { BallisticInputs, Trajectory, TrajectoryPoint } from './index';

  /**
   * Initialize the WASM module
   */
  export default function init(): Promise<void>;

  /**
   * Initialize panic hooks and other setup
   */
  export function initialize(): void;

  /**
   * Compute a full trajectory
   */
  export function compute_trajectory(
    inputs: BallisticInputs,
    maxRange: number,
    step: number
  ): Trajectory;

  /**
   * Compute a single trajectory point at a specific range
   */
  export function compute_single_point(
    inputs: BallisticInputs,
    range: number
  ): TrajectoryPoint;
}
