import { useEffect, useState } from 'react';
import { InputForm } from './components/InputForm';
import { TrajectoryTable } from './components/TrajectoryTable';
import { MonteCarloControls } from './components/MonteCarloControls';
import { SimulationResults } from './components/SimulationResults';
import { Information } from './components/Information';
import { TrajectoryComparison } from './components/TrajectoryComparison';
import { useStore } from './agents/state-management/store';
import { initializeWasm, computeTrajectory } from './agents/wasm-bridge';
import { runMonteCarloSimulation, initializeMonteCarloWorker } from './agents/monte-carlo';
import { TrajectoryChart } from './agents/visualization/TrajectoryChart';
import './App.css';

function App() {
  const [wasmReady, setWasmReady] = useState(false);
  const [activeTab, setActiveTab] = useState<'trajectory' | 'comparison' | 'monte-carlo' | 'information'>('trajectory');

  const {
    ballisticInputs,
    trajectory,
    setTrajectory,
    setComputing,
    setError,
    isComputing,
    maxRange,
    rangeStep,
    monteCarloConfig,
    setSimulationResult,
    setSimulationProgress,
    setSimulating,
    isSimulating,
  } = useStore();

  useEffect(() => {
    initializeWasm()
      .then(() => setWasmReady(true))
      .catch((err) => console.error('WASM init failed:', err));

    initializeMonteCarloWorker();
  }, []);

  const handleCalculate = async () => {
    if (!wasmReady) {
      setError('WASM engine not ready');
      return;
    }

    setComputing(true);
    setError(null);

    try {
      const trajectory = await computeTrajectory(ballisticInputs, maxRange, rangeStep);
      setTrajectory(trajectory);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation failed');
    } finally {
      setComputing(false);
    }
  };

  const handleRunMonteCarlo = async () => {
    if (!wasmReady) {
      setError('WASM engine not ready');
      return;
    }

    setSimulating(true);
    setError(null);
    setSimulationProgress(null);

    try {
      const result = await runMonteCarloSimulation(ballisticInputs, monteCarloConfig, {
        onProgress: (progress) => setSimulationProgress(progress),
      });
      setSimulationResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Simulation failed');
    } finally {
      setSimulating(false);
      setSimulationProgress(null);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>OpenWEZ</h1>
        <p>Weapon Employment Zone Ballistic Modeling</p>
        {!wasmReady && <p className="warning">Loading ballistic engine...</p>}
      </header>

      <div className="tabs">
        <button
          className={activeTab === 'trajectory' ? 'active' : ''}
          onClick={() => setActiveTab('trajectory')}
        >
          Trajectory Calculator
        </button>
        <button
          className={activeTab === 'comparison' ? 'active' : ''}
          onClick={() => setActiveTab('comparison')}
        >
          Trajectory Comparison
        </button>
        <button
          className={activeTab === 'monte-carlo' ? 'active' : ''}
          onClick={() => setActiveTab('monte-carlo')}
        >
          Monte Carlo Simulation
        </button>
        <button
          className={activeTab === 'information' ? 'active' : ''}
          onClick={() => setActiveTab('information')}
        >
          Information
        </button>
      </div>

      <main>
        {activeTab === 'trajectory' ? (
          <>
            <div className="controls">
              <InputForm />
              <button onClick={handleCalculate} disabled={isComputing || !wasmReady}>
                {isComputing ? 'Computing...' : 'Calculate Trajectory'}
              </button>
            </div>

            <div className="results">
              {trajectory && trajectory.length > 0 && (
                <>
                  <TrajectoryChart trajectory={trajectory} />
                  <TrajectoryTable />
                </>
              )}
              {!trajectory && <p>No trajectory data. Click "Calculate" to compute.</p>}
            </div>
          </>
        ) : activeTab === 'comparison' ? (
          <div className="comparison-tab">
            <TrajectoryComparison />
          </div>
        ) : activeTab === 'monte-carlo' ? (
          <>
            <div className="controls">
              <InputForm />
              <MonteCarloControls />
              <button onClick={handleRunMonteCarlo} disabled={isSimulating || !wasmReady}>
                {isSimulating ? 'Simulating...' : 'Run Monte Carlo'}
              </button>
            </div>

            <div className="results">
              <SimulationResults />
            </div>
          </>
        ) : (
          <div className="information-tab">
            <Information />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
