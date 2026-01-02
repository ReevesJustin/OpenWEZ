import { useStore } from '../agents/state-management/store';
import { DEFAULT_UNCERTAINTIES } from '../types/constants';
import type { ConfidenceLevel } from '../types';
import { useNumberInput } from '../hooks/useNumberInput';

export function MonteCarloControls() {
  const { monteCarloConfig, setMonteCarloConfig } = useStore();

  const handleConfidenceLevelChange = (level: ConfidenceLevel) => {
    // Only override uncertainties for non-custom presets
    if (level !== 'custom') {
      setMonteCarloConfig({
        uncertainties: DEFAULT_UNCERTAINTIES[level],
      });
    }
    // For 'custom', don't override - let user set values manually
  };

  // Number input handlers with Option 3 UX
  const iterationsInput = useNumberInput({
    value: monteCarloConfig.iterations,
    onChange: (val) => setMonteCarloConfig({ iterations: val }),
    defaultValue: 1000,
    min: 100,
    max: 5000,
  });

  const maxRangeInput = useNumberInput({
    value: monteCarloConfig.maxRange,
    onChange: (val) => setMonteCarloConfig({ maxRange: val }),
    defaultValue: 1000,
    min: 100,
    max: 2000,
  });

  const targetWidthInput = useNumberInput({
    value: monteCarloConfig.target.width,
    onChange: (val) => setMonteCarloConfig({ target: { ...monteCarloConfig.target, width: val } }),
    defaultValue: 18,
  });

  const targetHeightInput = useNumberInput({
    value: monteCarloConfig.target.height,
    onChange: (val) => setMonteCarloConfig({ target: { ...monteCarloConfig.target, height: val } }),
    defaultValue: 30,
  });

  const muzzleVelocitySDInput = useNumberInput({
    value: monteCarloConfig.uncertainties.muzzleVelocitySD,
    onChange: (val) => setMonteCarloConfig({ uncertainties: { ...monteCarloConfig.uncertainties, muzzleVelocitySD: val } }),
    defaultValue: 25,
  });

  const windSpeedSDInput = useNumberInput({
    value: monteCarloConfig.uncertainties.windSpeedSD,
    onChange: (val) => setMonteCarloConfig({ uncertainties: { ...monteCarloConfig.uncertainties, windSpeedSD: val } }),
    defaultValue: 2.5,
  });

  const windDirectionSDInput = useNumberInput({
    value: monteCarloConfig.uncertainties.windDirectionSD,
    onChange: (val) => setMonteCarloConfig({ uncertainties: { ...monteCarloConfig.uncertainties, windDirectionSD: val } }),
    defaultValue: 10,
  });

  const rangeErrorSDInput = useNumberInput({
    value: monteCarloConfig.uncertainties.rangeErrorSD,
    onChange: (val) => setMonteCarloConfig({ uncertainties: { ...monteCarloConfig.uncertainties, rangeErrorSD: val } }),
    defaultValue: 5,
  });

  const bcSDInput = useNumberInput({
    value: monteCarloConfig.uncertainties.bcSD,
    onChange: (val) => setMonteCarloConfig({ uncertainties: { ...monteCarloConfig.uncertainties, bcSD: val } }),
    defaultValue: 1.0,
  });

  const meanRadiusMOAInput = useNumberInput({
    value: monteCarloConfig.uncertainties.meanRadiusMOA,
    onChange: (val) => setMonteCarloConfig({ uncertainties: { ...monteCarloConfig.uncertainties, meanRadiusMOA: val } }),
    defaultValue: 0.3,
  });

  return (
    <div className="monte-carlo-controls">
      <h2>Monte Carlo Settings</h2>

      <div className="form-group">
        <label>Iterations</label>
        <input
          type="number"
          {...iterationsInput}
          min="100"
          max="5000"
          step="100"
        />
      </div>

      <div className="form-group">
        <label>Max Range (yards)</label>
        <input
          type="number"
          {...maxRangeInput}
          min="100"
          max="2000"
          step="50"
        />
      </div>

      <div className="form-group">
        <label>Confidence Level Preset</label>
        <select
          onChange={(e) => handleConfidenceLevelChange(e.target.value as ConfidenceLevel)}
          defaultValue="medium"
        >
          <option value="high">High (tight grouping)</option>
          <option value="medium">Medium (average shooter)</option>
          <option value="low">Low (beginner)</option>
          <option value="custom">Custom (manual values)</option>
        </select>
      </div>

      <div className="form-group">
        <label>Target Width (inches)</label>
        <input
          type="number"
          {...targetWidthInput}
        />
      </div>

      <div className="form-group">
        <label>Target Height (inches)</label>
        <input
          type="number"
          {...targetHeightInput}
        />
      </div>

      <h3>Uncertainties (Standard Deviation)</h3>

      <div className="form-group">
        <label>Muzzle Velocity SD (fps)</label>
        <input
          type="number"
          step="0.1"
          {...muzzleVelocitySDInput}
        />
      </div>

      <div className="form-group">
        <label>Wind Speed SD (mph)</label>
        <input
          type="number"
          step="0.1"
          {...windSpeedSDInput}
        />
      </div>

      <div className="form-group">
        <label>Wind Direction SD (degrees)</label>
        <input
          type="number"
          step="0.1"
          {...windDirectionSDInput}
        />
      </div>

      <div className="form-group">
        <label>Range Error SD (yards)</label>
        <input
          type="number"
          step="0.1"
          {...rangeErrorSDInput}
        />
      </div>

      <div className="form-group">
        <label>BC Uncertainty SD (%)</label>
        <input
          type="number"
          step="0.1"
          {...bcSDInput}
        />
      </div>

      <div className="form-group">
        <label>Rifle Precision - Mean Radius (MOA)</label>
        <input
          type="number"
          step="0.1"
          {...meanRadiusMOAInput}
        />
      </div>
    </div>
  );
}
