import { useStore } from '../agents/state-management/store';
import type { TrajectoryPoint } from '../types';
import type { DisplayUnit } from '../agents/state-management/store';
import { convertToDisplayUnit, getUnitLabel, formatValue } from '../utils/unitConversion';
import { exportTrajectory } from '../utils/exportData';

// Calculate speed of sound from temperature (°F)
function calculateSpeedOfSound(temperatureFahrenheit: number): number {
  const tempKelvin = (temperatureFahrenheit - 32.0) * 5.0 / 9.0 + 273.15;
  const speedMetersPerSecond = Math.sqrt(1.4 * 287.058 * tempKelvin);
  return speedMetersPerSecond * 3.28084; // Convert to fps
}

// Interpolate to find precise range where velocity crosses threshold
function findPreciseThresholdRange(trajectory: TrajectoryPoint[], thresholdVelocity: number): number | null {
  // Find the transition point where velocity drops below threshold
  for (let i = 0; i < trajectory.length - 1; i++) {
    const curr = trajectory[i];
    const next = trajectory[i + 1];

    // If current point is at or above threshold and next is below
    if (curr.velocity >= thresholdVelocity && next.velocity < thresholdVelocity) {
      // Linear interpolation between the two points
      const velocityDiff = curr.velocity - next.velocity;
      const rangeDiff = next.range - curr.range;
      const thresholdDiff = curr.velocity - thresholdVelocity;

      if (velocityDiff > 0) {
        const interpolatedRange = curr.range + (thresholdDiff / velocityDiff) * rangeDiff;
        return interpolatedRange;
      }
      return curr.range;
    }
  }

  // If never crosses threshold, return null
  return null;
}

export function TrajectoryTable() {
  const { trajectory, ballisticInputs, displayUnit, setDisplayUnit } = useStore();

  if (!trajectory || trajectory.length === 0) {
    return <div className="trajectory-table">No trajectory data. Click "Calculate" to compute.</div>;
  }

  // Calculate speed of sound and Mach thresholds
  const speedOfSound = calculateSpeedOfSound(ballisticInputs.environment.temperature);
  const transonicVelocity = speedOfSound * 1.2;
  const subsonicVelocity = speedOfSound * 1.0;

  // Find precise range where velocity crosses each threshold
  const transonicRange = findPreciseThresholdRange(trajectory, transonicVelocity);
  const subsonicRange = findPreciseThresholdRange(trajectory, subsonicVelocity);

  // Build table rows with markers
  const rows: JSX.Element[] = [];
  let transonicMarkerAdded = false;
  let subsonicMarkerAdded = false;

  const unitLabel = getUnitLabel(displayUnit);

  trajectory.forEach((point: TrajectoryPoint, idx: number) => {
    // Add transonic marker after crossing threshold
    if (!transonicMarkerAdded && transonicRange !== null && point.range > transonicRange) {
      rows.push(
        <tr key={`transonic-${idx}`} className="velocity-marker transonic">
          <td colSpan={6} style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: '#fff3cd' }}>
            Transonic (Mach 1.2 = {transonicVelocity.toFixed(0)} fps) at {transonicRange.toFixed(0)} yards
          </td>
        </tr>
      );
      transonicMarkerAdded = true;
    }

    // Add subsonic marker after crossing threshold
    if (!subsonicMarkerAdded && subsonicRange !== null && point.range > subsonicRange) {
      rows.push(
        <tr key={`subsonic-${idx}`} className="velocity-marker subsonic">
          <td colSpan={6} style={{ textAlign: 'center', fontWeight: 'bold', backgroundColor: '#d1ecf1' }}>
            Subsonic (Mach 1.0 = {subsonicVelocity.toFixed(0)} fps) at {subsonicRange.toFixed(0)} yards
          </td>
        </tr>
      );
      subsonicMarkerAdded = true;
    }

    // Convert drop and drift to selected unit
    const drop = convertToDisplayUnit(point.drop, point.range, displayUnit);
    const drift = convertToDisplayUnit(point.drift, point.range, displayUnit);

    // Regular data row
    rows.push(
      <tr key={idx}>
        <td>{point.range.toFixed(0)}</td>
        <td>{formatValue(drop, displayUnit)}</td>
        <td>{formatValue(drift, displayUnit)}</td>
        <td>{point.velocity.toFixed(0)}</td>
        <td>{point.energy.toFixed(0)}</td>
        <td>{point.timeOfFlight.toFixed(3)}</td>
      </tr>
    );
  });

  const handleExport = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    exportTrajectory(trajectory, `trajectory-${timestamp}.csv`);
  };

  return (
    <div className="trajectory-table">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0 }}>Trajectory Data</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label htmlFor="unit-selector" style={{ fontWeight: 600 }}>Units:</label>
          <select
            id="unit-selector"
            value={displayUnit}
            onChange={(e) => setDisplayUnit(e.target.value as DisplayUnit)}
            style={{ padding: '0.25rem 0.5rem', fontSize: '0.9rem' }}
          >
            <option value="inches">Inches</option>
            <option value="MOA">MOA</option>
            <option value="MIL">MIL</option>
          </select>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Range (yd)</th>
            <th>Drop ({unitLabel})</th>
            <th>Drift ({unitLabel})</th>
            <th>Velocity (fps)</th>
            <th>Energy (ft-lbs)</th>
            <th>Time (s)</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <button
          onClick={handleExport}
          style={{
            padding: '0.5rem 1.5rem',
            fontSize: '0.9rem',
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