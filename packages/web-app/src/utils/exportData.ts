/**
 * Data Export Utilities
 * Functions to export trajectory and Monte Carlo results to CSV
 */

import type { Trajectory, SimulationResult } from '../types';

/**
 * Convert trajectory data to CSV format
 */
export function trajectoryToCSV(trajectory: Trajectory): string {
  if (!trajectory || trajectory.length === 0) {
    return '';
  }

  // CSV header
  const headers = [
    'Range (yards)',
    'Drop (inches)',
    'Drift (inches)',
    'Velocity (fps)',
    'Energy (ft-lbs)',
    'Time of Flight (seconds)',
  ];

  // CSV rows
  const rows = trajectory.map((point) => [
    point.range.toFixed(2),
    point.drop.toFixed(2),
    point.drift.toFixed(2),
    point.velocity.toFixed(1),
    point.energy.toFixed(1),
    point.timeOfFlight.toFixed(4),
  ]);

  // Combine header and rows
  const csvLines = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ];

  return csvLines.join('\n');
}

/**
 * Convert Monte Carlo results to CSV format
 */
export function monteCarloToCSV(result: SimulationResult, targetSize: { width: number; height: number }): string {
  if (!result) {
    return '';
  }

  const lines: string[] = [];

  // Header section
  lines.push('OpenWEZ Monte Carlo Simulation Results');
  lines.push('');

  // Target configuration
  lines.push('Target Configuration');
  lines.push(`Target Width (inches),${targetSize.width}`);
  lines.push(`Target Height (inches),${targetSize.height}`);
  lines.push('');

  // Statistics
  lines.push('Statistics at Max Range');
  lines.push('');
  lines.push('Total Dispersion (Ballistic + Rifle Precision)');
  lines.push(`Mean X (inches),${result.statistics.mean.x.toFixed(2)}`);
  lines.push(`Mean Y (inches),${result.statistics.mean.y.toFixed(2)}`);
  lines.push(`Std Dev X (inches),${result.statistics.standardDeviation.x.toFixed(2)}`);
  lines.push(`Std Dev Y (inches),${result.statistics.standardDeviation.y.toFixed(2)}`);
  lines.push('');

  lines.push('Ballistic Uncertainties Only');
  lines.push(`Mean X (inches),${result.statisticsBallisticOnly.mean.x.toFixed(2)}`);
  lines.push(`Mean Y (inches),${result.statisticsBallisticOnly.mean.y.toFixed(2)}`);
  lines.push(`Std Dev X (inches),${result.statisticsBallisticOnly.standardDeviation.x.toFixed(2)}`);
  lines.push(`Std Dev Y (inches),${result.statisticsBallisticOnly.standardDeviation.y.toFixed(2)}`);
  lines.push('');

  // Probability of hit data
  lines.push('Probability of Hit by Range');
  lines.push('Range (yards),P(hit)');

  const sortedRanges = Object.keys(result.pHitByRange)
    .map(Number)
    .sort((a, b) => a - b);

  sortedRanges.forEach((range) => {
    lines.push(`${range},${result.pHitByRange[range].toFixed(4)}`);
  });

  lines.push('');

  // Impact points at max range
  lines.push('Impact Points at Max Range (Total Dispersion)');
  lines.push('X (inches),Y (inches)');
  result.impactPoints.forEach((point) => {
    lines.push(`${point.x.toFixed(2)},${point.y.toFixed(2)}`);
  });

  lines.push('');

  // Ballistic-only impact points
  lines.push('Impact Points at Max Range (Ballistic Only)');
  lines.push('X (inches),Y (inches)');
  result.ballisticImpactPoints.forEach((point) => {
    lines.push(`${point.x.toFixed(2)},${point.y.toFixed(2)}`);
  });

  return lines.join('\n');
}

/**
 * Download data as CSV file
 */
export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    // Create download link
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    URL.revokeObjectURL(url);
  }
}

/**
 * Export trajectory data to CSV file
 */
export function exportTrajectory(trajectory: Trajectory, filename: string = 'trajectory.csv'): void {
  const csv = trajectoryToCSV(trajectory);
  if (csv) {
    downloadCSV(csv, filename);
  }
}

/**
 * Export Monte Carlo results to CSV file
 */
export function exportMonteCarloResults(
  result: SimulationResult,
  targetSize: { width: number; height: number },
  filename: string = 'monte-carlo-results.csv'
): void {
  const csv = monteCarloToCSV(result, targetSize);
  if (csv) {
    downloadCSV(csv, filename);
  }
}

/**
 * Convert trajectory comparison data to CSV format
 */
export function trajectoryComparisonToCSV(
  trajectories: { label: string; data: Trajectory }[]
): string {
  if (!trajectories || trajectories.length === 0) {
    return '';
  }

  const lines: string[] = [];

  // Header row with load names
  const headerRow = ['Range (yd)'];
  trajectories.forEach((traj) => {
    headerRow.push(traj.label, '', '', ''); // 4 columns per load
  });
  lines.push(headerRow.join(','));

  // Sub-header row with metric names
  const subHeaderRow = [''];
  trajectories.forEach(() => {
    subHeaderRow.push('Drop (in)', 'Drift (in)', 'Velocity (fps)', 'Energy (ft-lbs)');
  });
  lines.push(subHeaderRow.join(','));

  // Data rows
  const maxLength = Math.max(...trajectories.map((traj) => traj.data.length));
  for (let i = 0; i < maxLength; i++) {
    const row = [trajectories[0].data[i]?.range.toFixed(0) || ''];

    trajectories.forEach((traj) => {
      const point = traj.data[i];
      if (point) {
        row.push(
          point.drop.toFixed(2),
          point.drift.toFixed(2),
          point.velocity.toFixed(0),
          point.energy.toFixed(0)
        );
      } else {
        row.push('', '', '', '');
      }
    });

    lines.push(row.join(','));
  }

  return lines.join('\n');
}

/**
 * Export trajectory comparison data to CSV file
 */
export function exportTrajectoryComparison(
  trajectories: { label: string; data: Trajectory }[],
  filename: string = 'trajectory-comparison.csv'
): void {
  const csv = trajectoryComparisonToCSV(trajectories);
  if (csv) {
    downloadCSV(csv, filename);
  }
}
