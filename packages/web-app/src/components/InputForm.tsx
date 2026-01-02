import { useStore } from '../agents/state-management/store';
import { useNumberInput } from '../hooks/useNumberInput';
// import { WeatherWidget } from './WeatherWidget'; // Disabled for deployment

export function InputForm() {
  const { ballisticInputs, setBallisticInputs, maxRange, rangeStep, setMaxRange, setRangeStep } = useStore();

  // Number input handlers with Option 3 UX
  const muzzleVelocityInput = useNumberInput({
    value: ballisticInputs.muzzleVelocity,
    onChange: (val) => setBallisticInputs({ muzzleVelocity: val }),
    defaultValue: 2600,
  });

  const bulletWeightInput = useNumberInput({
    value: ballisticInputs.bulletWeight,
    onChange: (val) => setBallisticInputs({ bulletWeight: val }),
    defaultValue: 175,
  });

  const bcInput = useNumberInput({
    value: ballisticInputs.bc.value,
    onChange: (val) => setBallisticInputs({ bc: { ...ballisticInputs.bc, value: val } }),
    defaultValue: 0.243,
  });

  const zeroRangeInput = useNumberInput({
    value: ballisticInputs.zeroRange,
    onChange: (val) => setBallisticInputs({ zeroRange: val }),
    defaultValue: 100,
  });

  const sightHeightInput = useNumberInput({
    value: ballisticInputs.sightHeight,
    onChange: (val) => setBallisticInputs({ sightHeight: val }),
    defaultValue: 1.5,
  });

  const windSpeedInput = useNumberInput({
    value: ballisticInputs.environment.windSpeed,
    onChange: (val) => setBallisticInputs({ environment: { ...ballisticInputs.environment, windSpeed: val } }),
    defaultValue: 0,
  });

  const windDirectionInput = useNumberInput({
    value: ballisticInputs.environment.windDirection,
    onChange: (val) => setBallisticInputs({ environment: { ...ballisticInputs.environment, windDirection: val } }),
    defaultValue: 90,
  });

  const temperatureInput = useNumberInput({
    value: ballisticInputs.environment.temperature,
    onChange: (val) => setBallisticInputs({ environment: { ...ballisticInputs.environment, temperature: val } }),
    defaultValue: 59,
  });

  const pressureInput = useNumberInput({
    value: ballisticInputs.environment.pressure,
    onChange: (val) => setBallisticInputs({ environment: { ...ballisticInputs.environment, pressure: val } }),
    defaultValue: 29.92,
  });

  const altitudeInput = useNumberInput({
    value: ballisticInputs.environment.altitude,
    onChange: (val) => setBallisticInputs({ environment: { ...ballisticInputs.environment, altitude: val } }),
    defaultValue: 0,
  });

  const maxRangeInput = useNumberInput({
    value: maxRange,
    onChange: setMaxRange,
    defaultValue: 1000,
  });

  const rangeStepInput = useNumberInput({
    value: rangeStep,
    onChange: setRangeStep,
    defaultValue: 25,
  });

  return (
    <div className="input-form">
      <h2>Ballistic Parameters</h2>

      <div className="form-group">
        <label>Muzzle Velocity (fps)</label>
        <input
          type="number"
          {...muzzleVelocityInput}
        />
      </div>

      <div className="form-group">
        <label>Bullet Weight (grains)</label>
        <input
          type="number"
          {...bulletWeightInput}
        />
      </div>

      <div className="form-group">
        <label>Drag Model</label>
        <select
          value={ballisticInputs.bc.dragModel}
          onChange={(e) => setBallisticInputs({
            bc: { ...ballisticInputs.bc, dragModel: e.target.value as 'G1' | 'G7' }
          })}
        >
          <option value="G1">G1 (Standard)</option>
          <option value="G7">G7 (Boat Tail)</option>
        </select>
      </div>

      <div className="form-group">
        <label>Ballistic Coefficient ({ballisticInputs.bc.dragModel})</label>
        <input
          type="number"
          step="0.001"
          {...bcInput}
        />
      </div>

      <div className="form-group">
        <label>Zero Range (yards)</label>
        <input
          type="number"
          {...zeroRangeInput}
        />
      </div>

      <div className="form-group">
        <label>Sight Height / Height Over Bore (inches)</label>
        <input
          type="number"
          step="0.1"
          {...sightHeightInput}
        />
      </div>

      <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Environmental Conditions</h3>

      {/* Weather Widget - Disabled for deployment */}
      {/* <WeatherWidget /> */}

      <div className="form-group">
        <label>Wind Speed (mph)</label>
        <input
          type="number"
          {...windSpeedInput}
        />
      </div>

      <div className="form-group">
        <label>Wind Direction (degrees)</label>
        <input
          type="number"
          {...windDirectionInput}
        />
      </div>

      <div className="form-group">
        <label>Temperature (°F)</label>
        <input
          type="number"
          {...temperatureInput}
        />
      </div>

      <div className="form-group">
        <label>Pressure (inHg)</label>
        <input
          type="number"
          step="0.01"
          {...pressureInput}
        />
      </div>

      <div className="form-group">
        <label>Altitude (feet)</label>
        <input
          type="number"
          {...altitudeInput}
        />
      </div>

      <div className="form-group">
        <label>Maximum Range (yards)</label>
        <input
          type="number"
          {...maxRangeInput}
        />
      </div>

      <div className="form-group">
        <label>Range Step / Increment (yards)</label>
        <input
          type="number"
          {...rangeStepInput}
        />
      </div>
    </div>
  );
}