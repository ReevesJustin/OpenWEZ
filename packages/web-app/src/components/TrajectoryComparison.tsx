import React, { useState } from 'react';
import { useStore } from '../agents/state-management/store';
import type { DragModel, Trajectory } from '../types';
import { computeTrajectory } from '../agents/wasm-bridge';
import { exportTrajectoryComparison } from '../utils/exportData';

// Calculate speed of sound from temperature (°F)
function calculateSpeedOfSound(temperatureFahrenheit: number): number {
  const tempKelvin = (temperatureFahrenheit - 32.0) * 5.0 / 9.0 + 273.15;
  const speedMetersPerSecond = Math.sqrt(1.4 * 287.058 * tempKelvin);
  return speedMetersPerSecond * 3.28084; // Convert to fps
}
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LoadConfig {
  label: string;
  bulletWeight: number;
  muzzleVelocity: number;
  bc: number;
  dragModel: DragModel;
  enabled: boolean;
}

const DEFAULT_LOADS: LoadConfig[] = [
  { label: 'Load 1', bulletWeight: 168, muzzleVelocity: 2800, bc: 0.243, dragModel: 'G7', enabled: true },
  { label: 'Load 2', bulletWeight: 175, muzzleVelocity: 2650, bc: 0.262, dragModel: 'G7', enabled: false },
  { label: 'Load 3', bulletWeight: 155, muzzleVelocity: 2950, bc: 0.230, dragModel: 'G7', enabled: false },
  { label: 'Load 4', bulletWeight: 150, muzzleVelocity: 3000, bc: 0.225, dragModel: 'G7', enabled: false },
];

const COLORS = [
  { border: 'rgb(255, 99, 132)', bg: 'rgba(255, 99, 132, 0.5)' },
  { border: 'rgb(53, 162, 235)', bg: 'rgba(53, 162, 235, 0.5)' },
  { border: 'rgb(75, 192, 75)', bg: 'rgba(75, 192, 75, 0.5)' },
  { border: 'rgb(255, 159, 64)', bg: 'rgba(255, 159, 64, 0.5)' },
];

export function TrajectoryComparison() {
  const { ballisticInputs, maxRange, rangeStep, setError } = useStore();
  const [loads, setLoads] = useState<LoadConfig[]>(DEFAULT_LOADS);
  const [trajectories, setTrajectories] = useState<{ label: string; data: Trajectory }[]>([]);
  const [isComputing, setIsComputing] = useState(false);
  const [activeMetric, setActiveMetric] = useState<'drop' | 'drift' | 'velocity' | 'energy'>('drop');

  const updateLoad = (index: number, updates: Partial<LoadConfig>) => {
    setLoads((prev) => {
      const newLoads = [...prev];
      newLoads[index] = { ...newLoads[index], ...updates };
      return newLoads;
    });
  };

  const handleCompare = async () => {
    setIsComputing(true);
    setError(null);

    // Allow React to re-render with "Computing..." button before starting computation
    await new Promise(resolve => setTimeout(resolve, 0));

    try {
      const enabledLoads = loads.filter((load) => load.enabled);
      if (enabledLoads.length === 0) {
        setError('Please enable at least one load to compare');
        setIsComputing(false);
        return;
      }

      const results = await Promise.all(
        enabledLoads.map(async (load) => {
          const inputs = {
            ...ballisticInputs,
            bulletWeight: load.bulletWeight,
            muzzleVelocity: load.muzzleVelocity,
            bc: {
              value: load.bc,
              dragModel: load.dragModel,
            },
          };
          const trajectory = await computeTrajectory(inputs, maxRange, rangeStep);
          return { label: load.label, data: trajectory };
        })
      );

      console.log('Computed trajectories:', results);
      console.log('Number of loads computed:', results.length);
      if (results.length > 0) {
        console.log('First trajectory data points:', results[0].data.length);
        console.log('Sample point:', results[0].data[0]);
      }
      setTrajectories(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Comparison failed');
    } finally {
      setIsComputing(false);
    }
  };

  const handleExport = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    exportTrajectoryComparison(trajectories, `trajectory-comparison-${timestamp}.csv`);
  };

  const chartData = {
    labels: trajectories[0]?.data.map((p) => p.range.toFixed(0)) || [],
    datasets: trajectories.map((traj, idx) => {
      let data: number[];
      switch (activeMetric) {
        case 'drop':
          data = traj.data.map((p) => p.drop);
          break;
        case 'drift':
          data = traj.data.map((p) => p.drift);
          break;
        case 'velocity':
          data = traj.data.map((p) => p.velocity);
          break;
        case 'energy':
          data = traj.data.map((p) => p.energy);
          break;
        default:
          data = traj.data.map((p) => p.drop);
      }

      return {
        label: traj.label,
        data,
        borderColor: COLORS[idx % COLORS.length].border,
        backgroundColor: COLORS[idx % COLORS.length].bg,
        borderWidth: 2,
        pointRadius: 0,
      };
    }),
  };

  const getYAxisLabel = () => {
    switch (activeMetric) {
      case 'drop':
        return 'Drop (inches)';
      case 'drift':
        return 'Drift (inches)';
      case 'velocity':
        return 'Velocity (fps)';
      case 'energy':
        return 'Energy (ft-lbs)';
    }
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Load Comparison - ${activeMetric.charAt(0).toUpperCase() + activeMetric.slice(1)}`,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: getYAxisLabel(),
        },
      },
      x: {
        title: {
          display: true,
          text: 'Range (yards)',
        },
      },
    },
  };

  return (
    <div className="trajectory-comparison">
      <div className="comparison-controls">
        <h2>Load Configurations</h2>
        <p className="info-text">
          Configure up to 4 different loads to compare. Environmental conditions and zero range are shared from the main inputs.
        </p>

        <div className="loads-grid">
          {loads.map((load, idx) => (
            <div key={idx} className={`load-config ${load.enabled ? 'enabled' : 'disabled'}`}>
              <div className="load-header">
                <input
                  type="checkbox"
                  checked={load.enabled}
                  onChange={(e) => updateLoad(idx, { enabled: e.target.checked })}
                  id={`load-${idx}-enabled`}
                />
                <input
                  type="text"
                  className="load-label"
                  value={load.label}
                  onChange={(e) => updateLoad(idx, { label: e.target.value })}
                  placeholder={`Load ${idx + 1}`}
                />
              </div>

              {load.enabled && (
                <div className="load-inputs">
                  <div className="form-group">
                    <label>Bullet Weight (grains)</label>
                    <input
                      type="number"
                      value={load.bulletWeight}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateLoad(idx, { bulletWeight: val === '' ? 0 : Number(val) });
                      }}
                      onFocus={(e) => e.target.select()}
                      onBlur={(e) => {
                        if (e.target.value === '' || isNaN(Number(e.target.value))) {
                          updateLoad(idx, { bulletWeight: 168 });
                        }
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Muzzle Velocity (fps)</label>
                    <input
                      type="number"
                      value={load.muzzleVelocity}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateLoad(idx, { muzzleVelocity: val === '' ? 0 : Number(val) });
                      }}
                      onFocus={(e) => e.target.select()}
                      onBlur={(e) => {
                        if (e.target.value === '' || isNaN(Number(e.target.value))) {
                          updateLoad(idx, { muzzleVelocity: 2800 });
                        }
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Drag Model</label>
                    <select
                      value={load.dragModel}
                      onChange={(e) => updateLoad(idx, { dragModel: e.target.value as DragModel })}
                    >
                      <option value="G1">G1 (Standard)</option>
                      <option value="G7">G7 (Boat Tail)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>BC ({load.dragModel})</label>
                    <input
                      type="number"
                      step="0.001"
                      value={load.bc}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateLoad(idx, { bc: val === '' ? 0 : Number(val) });
                      }}
                      onFocus={(e) => e.target.select()}
                      onBlur={(e) => {
                        if (e.target.value === '' || isNaN(Number(e.target.value))) {
                          updateLoad(idx, { bc: 0.243 });
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="shared-params">
          <h3>Shared Parameters</h3>
          <p>
            Zero Range: {ballisticInputs.zeroRange} yards | Sight Height: {ballisticInputs.sightHeight}" |
            Wind: {ballisticInputs.environment.windSpeed} mph @ {ballisticInputs.environment.windDirection}° |
            Max Range: {maxRange} yards | Step: {rangeStep} yards
          </p>
          <p className="note">Modify these in the Trajectory Calculator tab</p>
        </div>

        <button onClick={handleCompare} disabled={isComputing}>
          {isComputing ? 'Computing...' : 'Compare Trajectories'}
        </button>
      </div>

      {trajectories.length > 0 && (
        <div className="comparison-results">
          <div className="metric-selector">
            <button
              className={activeMetric === 'drop' ? 'active' : ''}
              onClick={() => setActiveMetric('drop')}
            >
              Drop
            </button>
            <button
              className={activeMetric === 'drift' ? 'active' : ''}
              onClick={() => setActiveMetric('drift')}
            >
              Drift
            </button>
            <button
              className={activeMetric === 'velocity' ? 'active' : ''}
              onClick={() => setActiveMetric('velocity')}
            >
              Velocity
            </button>
            <button
              className={activeMetric === 'energy' ? 'active' : ''}
              onClick={() => setActiveMetric('energy')}
            >
              Energy
            </button>
          </div>

          <div className="chart-container">
            <Line key={activeMetric} options={chartOptions} data={chartData} />
          </div>

          <div className="comparison-table">
            <h3>Detailed Comparison</h3>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Range (yd)</th>
                    {trajectories.map((traj, idx) => (
                      <th key={idx} colSpan={4} style={{ borderLeft: '2px solid #ccc' }}>
                        {traj.label}
                      </th>
                    ))}
                  </tr>
                  <tr>
                    <th></th>
                    {trajectories.map((traj, idx) => (
                      <React.Fragment key={`${traj.label}-header-${idx}`}>
                        <th>Drop</th>
                        <th>Drift</th>
                        <th>Vel</th>
                        <th style={{ borderRight: '2px solid #ccc' }}>Energy</th>
                      </React.Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    // Calculate velocity thresholds
                    const speedOfSound = calculateSpeedOfSound(ballisticInputs.environment.temperature);
                    const transonicVelocity = speedOfSound * 1.2;
                    const subsonicVelocity = speedOfSound * 1.0;

                    // Find threshold ranges for EACH load separately
                    const thresholdRanges = trajectories.map((traj) => {
                      let lastTransonic: number | null = null;
                      let lastSubsonic: number | null = null;

                      traj.data.forEach((point) => {
                        if (point.velocity >= transonicVelocity) {
                          if (lastTransonic === null || point.range > lastTransonic) {
                            lastTransonic = point.range;
                          }
                        }
                        if (point.velocity >= subsonicVelocity) {
                          if (lastSubsonic === null || point.range > lastSubsonic) {
                            lastSubsonic = point.range;
                          }
                        }
                      });

                      return { lastTransonic, lastSubsonic };
                    });

                    return trajectories[0]?.data.map((_, pointIdx) => {
                      const currentRange = trajectories[0].data[pointIdx].range;
                      const nextRange = trajectories[0].data[pointIdx + 1]?.range;

                      return (
                        <tr key={pointIdx}>
                          <td style={{ fontWeight: 600 }}>{currentRange.toFixed(0)}</td>
                          {trajectories.map((traj, trajIdx) => {
                            const point = traj.data?.[pointIdx];
                            if (!point) return null;

                            // Determine cell-specific highlighting for velocity
                            const thresholds = thresholdRanges[trajIdx];
                            let velocityStyle = {};

                            // Highlight the range where THIS load crosses thresholds
                            if (thresholds.lastTransonic !== null &&
                                currentRange <= thresholds.lastTransonic &&
                                (!nextRange || nextRange > thresholds.lastTransonic)) {
                              velocityStyle = { backgroundColor: '#ffcc80' }; // Orange for transonic
                            } else if (thresholds.lastSubsonic !== null &&
                                       currentRange <= thresholds.lastSubsonic &&
                                       (!nextRange || nextRange > thresholds.lastSubsonic)) {
                              velocityStyle = { backgroundColor: '#ef9a9a' }; // Red for subsonic
                            }

                            return (
                              <React.Fragment key={`${traj.label}-${pointIdx}-${trajIdx}`}>
                                <td>{point.drop.toFixed(1)}"</td>
                                <td>{point.drift.toFixed(1)}"</td>
                                <td style={velocityStyle}>{point.velocity.toFixed(0)}</td>
                                <td style={{ borderRight: '2px solid #ccc' }}>{point.energy.toFixed(0)}</td>
                              </React.Fragment>
                            );
                          })}
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            </div>
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
      )}
    </div>
  );
}
