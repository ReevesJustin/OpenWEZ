import { useStore } from '../agents/state-management/store';
import { ProbabilityChart } from '../agents/visualization/ProbabilityChart';
import { ImpactScatterPlot } from '../agents/visualization/ImpactScatterPlot';
import { exportMonteCarloResults } from '../utils/exportData';

export function SimulationResults() {
  const { simulationResult, simulationProgress, isSimulating, monteCarloConfig } = useStore();

  const handleExport = () => {
    if (!simulationResult) return;
    const timestamp = new Date().toISOString().split('T')[0];
    exportMonteCarloResults(
      simulationResult,
      { width: monteCarloConfig.target.width, height: monteCarloConfig.target.height },
      `monte-carlo-${timestamp}.csv`
    );
  };

  if (isSimulating && simulationProgress) {
    return (
      <div className="simulation-results">
        <h2>Running Simulation...</h2>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${simulationProgress.percentage}%` }}
          />
        </div>
        <p>
          {simulationProgress.completed} / {simulationProgress.total} iterations
          ({simulationProgress.percentage.toFixed(1)}%)
        </p>
      </div>
    );
  }

  if (!simulationResult) {
    return (
      <div className="simulation-results">
        <p>No simulation data. Run Monte Carlo simulation to see results.</p>
      </div>
    );
  }

  // Get p(hit) at max range
  const maxRange = monteCarloConfig.maxRange;
  const pHitAtMaxRange = simulationResult.pHitByRange[maxRange];

  // Calculate P(hit) for ballistic-only points at max range
  const calculateBallisticPHit = () => {
    const targetHalfWidth = monteCarloConfig.target.width / 2;
    const targetHalfHeight = monteCarloConfig.target.height / 2;

    const ballisticPointsAtMaxRange = simulationResult.ballisticImpactPoints.filter(
      p => Math.abs(p.range - maxRange) < monteCarloConfig.rangeStep / 2
    );

    if (ballisticPointsAtMaxRange.length === 0) return 0;

    const meanX = simulationResult.statisticsBallisticOnly.mean.x;
    const meanY = simulationResult.statisticsBallisticOnly.mean.y;

    const hits = ballisticPointsAtMaxRange.filter(p => {
      const centeredX = p.x - meanX;
      const centeredY = p.y - meanY;
      return Math.abs(centeredX) <= targetHalfWidth && Math.abs(centeredY) <= targetHalfHeight;
    }).length;

    return hits / ballisticPointsAtMaxRange.length;
  };

  const pHitBallisticOnly = calculateBallisticPHit();

  return (
    <div className="simulation-results">
      <h2>Simulation Results</h2>

      <div className="charts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        <div className="chart-container">
          <h3>External Ballistic Uncertainties</h3>
          <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '10px' }}>
            Wind, velocity, range, BC, (minus rifle precision)
          </p>
          <ImpactScatterPlot
            impactPoints={simulationResult.ballisticImpactPoints}
            targetWidth={monteCarloConfig.target.width}
            targetHeight={monteCarloConfig.target.height}
            meanX={simulationResult.statisticsBallisticOnly.mean.x}
            meanY={simulationResult.statisticsBallisticOnly.mean.y}
            maxRange={maxRange}
            pHitAtMaxRange={pHitBallisticOnly}
          />
        </div>

        <div className="chart-container">
          <h3>Total Dispersion</h3>
          <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '10px' }}>
            Ballistic uncertainties + rifle precision (Mean Radius)
          </p>
          <ImpactScatterPlot
            impactPoints={simulationResult.impactPoints}
            targetWidth={monteCarloConfig.target.width}
            targetHeight={monteCarloConfig.target.height}
            meanX={simulationResult.statistics.mean.x}
            meanY={simulationResult.statistics.mean.y}
            maxRange={maxRange}
            pHitAtMaxRange={pHitAtMaxRange}
          />
        </div>

        <div className="chart-container">
          <h3>Hit Probability vs Range</h3>
          <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '10px' }}>
            Probability of hitting target at different ranges
          </p>
          <ProbabilityChart pHitByRange={simulationResult.pHitByRange} />
        </div>
      </div>

      <div className="phit-table">
        <h3>Probability of Hit by Range</h3>
        <table>
          <thead>
            <tr>
              <th>Range (yards)</th>
              <th>P(hit) %</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(simulationResult.pHitByRange)
              .sort((a, b) => Number(a) - Number(b))
              .map((range) => (
                <tr key={range}>
                  <td>{range}</td>
                  <td>{(simulationResult.pHitByRange[Number(range)] * 100).toFixed(1)}%</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="stats-text">
        <h3>Statistical Summary</h3>
        <p><strong>Computation Time:</strong> {(simulationResult.computationTime / 1000).toFixed(2)}s</p>

        <h4>External Ballistic Uncertainties:</h4>
        <p><strong>Mean Impact X:</strong> {simulationResult.statisticsBallisticOnly.mean.x.toFixed(2)} in</p>
        <p><strong>Mean Impact Y:</strong> {simulationResult.statisticsBallisticOnly.mean.y.toFixed(2)} in</p>
        <p><strong>Std Dev X (horizontal):</strong> {simulationResult.statisticsBallisticOnly.standardDeviation.x.toFixed(2)} in</p>
        <p><strong>Std Dev Y (vertical):</strong> {simulationResult.statisticsBallisticOnly.standardDeviation.y.toFixed(2)} in</p>

        <h4>Total Dispersion (Ballistic + Rifle Precision):</h4>
        <p><strong>Mean Impact X:</strong> {simulationResult.statistics.mean.x.toFixed(2)} in</p>
        <p><strong>Mean Impact Y:</strong> {simulationResult.statistics.mean.y.toFixed(2)} in</p>
        <p><strong>Std Dev X (horizontal):</strong> {simulationResult.statistics.standardDeviation.x.toFixed(2)} in</p>
        <p><strong>Std Dev Y (vertical):</strong> {simulationResult.statistics.standardDeviation.y.toFixed(2)} in</p>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button
          onClick={handleExport}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Export CSV
        </button>
      </div>
    </div>
  );
}
