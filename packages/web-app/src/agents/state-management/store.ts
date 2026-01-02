/**
 * State Management Agent
 * Zustand store for application state
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  BallisticInputs,
  Trajectory,
  EnvironmentalConditions,
  BallisticCoefficient,
  MonteCarloConfig,
  SimulationResult,
  SimulationProgress,
  TargetSpecification,
} from '../../types';
import { DEFAULT_UNCERTAINTIES } from '../../types/constants';

export type DisplayUnit = 'inches' | 'MOA' | 'MIL';

interface AppState {
  // Ballistic inputs
  ballisticInputs: BallisticInputs;

  // Range inputs
  maxRange: number;
  rangeStep: number;

  // Display preferences
  displayUnit: DisplayUnit;

  // Computation results
  trajectory: Trajectory | null;
  isComputing: boolean;
  error: string | null;

  // Monte Carlo state
  monteCarloConfig: MonteCarloConfig;
  simulationResult: SimulationResult | null;
  simulationProgress: SimulationProgress | null;
  isSimulating: boolean;

  // Actions
  setBallisticInputs: (inputs: Partial<BallisticInputs>) => void;
  setMaxRange: (maxRange: number) => void;
  setRangeStep: (rangeStep: number) => void;
  setDisplayUnit: (unit: DisplayUnit) => void;
  setTrajectory: (trajectory: Trajectory | null) => void;
  setComputing: (computing: boolean) => void;
  setError: (error: string | null) => void;
  resetToDefaults: () => void;

  // Monte Carlo actions
  setMonteCarloConfig: (config: Partial<MonteCarloConfig>) => void;
  setSimulationResult: (result: SimulationResult | null) => void;
  setSimulationProgress: (progress: SimulationProgress | null) => void;
  setSimulating: (simulating: boolean) => void;
}

// Default values
const DEFAULT_ENVIRONMENT: EnvironmentalConditions = {
  temperature: 59,
  pressure: 29.92,
  humidity: 50,
  altitude: 0,
  windSpeed: 0,
  windDirection: 90,
};

const DEFAULT_BC: BallisticCoefficient = {
  value: 0.5,
  dragModel: 'G1',
};

const DEFAULT_BALLISTIC_INPUTS: BallisticInputs = {
  muzzleVelocity: 2800,
  bulletWeight: 168,
  bulletDiameter: 0.308,
  bc: DEFAULT_BC,
  zeroRange: 100,
  sightHeight: 1.5,
  environment: DEFAULT_ENVIRONMENT,
};

const DEFAULT_TARGET: TargetSpecification = {
  width: 20,
  height: 20,
  inclination: 0,
};

const DEFAULT_MONTE_CARLO_CONFIG: MonteCarloConfig = {
  iterations: 1000,
  uncertainties: DEFAULT_UNCERTAINTIES.medium,
  target: DEFAULT_TARGET,
  maxRange: 1000,
  rangeStep: 50,
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      ballisticInputs: DEFAULT_BALLISTIC_INPUTS,
      maxRange: 1000,
      rangeStep: 50,
      displayUnit: 'inches',
      trajectory: null,
      isComputing: false,
      error: null,

      // Monte Carlo state
      monteCarloConfig: DEFAULT_MONTE_CARLO_CONFIG,
      simulationResult: null,
      simulationProgress: null,
      isSimulating: false,

      // Actions
      setBallisticInputs: (inputs) =>
        set((state) => ({
          ballisticInputs: { ...state.ballisticInputs, ...inputs },
        })),

      setMaxRange: (maxRange) => set({ maxRange }),

      setRangeStep: (rangeStep) => set({ rangeStep }),

      setDisplayUnit: (unit) => set({ displayUnit: unit }),

      setTrajectory: (trajectory) => set({ trajectory }),

      setComputing: (computing) => set({ isComputing: computing }),

      setError: (error) => set({ error }),

      resetToDefaults: () =>
        set({
          ballisticInputs: DEFAULT_BALLISTIC_INPUTS,
          maxRange: 1000,
          rangeStep: 50,
          trajectory: null,
          error: null,
        }),

      // Monte Carlo actions
      setMonteCarloConfig: (config) =>
        set((state) => ({
          monteCarloConfig: { ...state.monteCarloConfig, ...config },
        })),

      setSimulationResult: (result) => set({ simulationResult: result }),

      setSimulationProgress: (progress) => set({ simulationProgress: progress }),

      setSimulating: (simulating) => set({ isSimulating: simulating }),
    }),
    {
      name: 'openwez-storage',
      partialize: (state) => ({
        ballisticInputs: state.ballisticInputs,
        maxRange: state.maxRange,
        rangeStep: state.rangeStep,
        monteCarloConfig: state.monteCarloConfig,
      }),
    }
  )
);