/**
 * Benchmark Report Generator Agent
 * Compiles benchmark data into formatted reports
 */

import type { BenchmarkReport } from '../benchmarking';

export interface ReportOptions {
  format: 'markdown' | 'json';
  includeSummary: boolean;
  includeDetails: boolean;
}

/**
 * Generate markdown report from benchmark results
 */
export function generateMarkdownReport(report: BenchmarkReport, options: ReportOptions = { format: 'markdown', includeSummary: true, includeDetails: true }): string {
  let content = `# OpenWEZ Benchmark Report\n\n`;
  content += `**Generated:** ${new Date(report.timestamp).toLocaleString()}\n\n`;

  if (options.includeSummary) {
    content += `## Executive Summary\n\n`;
    content += `${report.summary}\n\n`;
  }

  if (options.includeDetails) {
    content += `## Detailed Results\n\n`;

    // Trajectory Benchmarks
    content += `### Trajectory Accuracy Benchmarks\n\n`;
    content += `| Category | OpenWEZ Result | Reference Result | Error (%) | Notes |\n`;
    content += `|----------|----------------|------------------|-----------|-------|\n`;
    report.trajectoryBenchmarks.forEach(bench => {
      content += `| ${bench.category} | ${JSON.stringify(bench.openwezResult)} | ${JSON.stringify(bench.referenceResult)} | ${bench.error.toFixed(2)} | ${bench.notes} |\n`;
    });
    content += `\n`;

    // Probabilistic Benchmarks
    content += `### Probabilistic WEZ Benchmarks\n\n`;
    content += `| Category | OpenWEZ Result | Reference Result | Error (%) | Notes |\n`;
    content += `|----------|----------------|------------------|-----------|-------|\n`;
    report.probabilisticBenchmarks.forEach(bench => {
      content += `| ${bench.category} | ${JSON.stringify(bench.openwezResult)} | ${JSON.stringify(bench.referenceResult)} | ${bench.error.toFixed(2)} | ${bench.notes} |\n`;
    });
    content += `\n`;

    // Environmental Benchmarks
    content += `### Environmental/Drag Benchmarks\n\n`;
    content += `| Category | OpenWEZ Result | Reference Result | Error (%) | Notes |\n`;
    content += `|----------|----------------|------------------|-----------|-------|\n`;
    report.environmentalBenchmarks.forEach(bench => {
      content += `| ${bench.category} | ${JSON.stringify(bench.openwezResult)} | ${JSON.stringify(bench.referenceResult)} | ${bench.error.toFixed(2)} | ${bench.notes} |\n`;
    });
    content += `\n`;

    // Performance Benchmarks
    content += `### Performance Benchmarks\n\n`;
    content += `| Category | OpenWEZ Result | Reference Result | Error (%) | Notes |\n`;
    content += `|----------|----------------|------------------|-----------|-------|\n`;
    report.performanceBenchmarks.forEach(bench => {
      content += `| ${bench.category} | ${JSON.stringify(bench.openwezResult)} | ${JSON.stringify(bench.referenceResult)} | ${bench.error.toFixed(2)} | ${bench.notes} |\n`;
    });
    content += `\n`;
  }

  content += `## Methodology\n\n`;
  content += `This report compares OpenWEZ calculations against established ballistics standards including:\n`;
  content += `- JBM Ballistics solver\n`;
  content += `- Applied Ballistics references\n`;
  content += `- ICAO atmospheric standards\n`;
  content += `- Published drag coefficient tables\n\n`;

  content += `Comparisons include deterministic trajectory accuracy, probabilistic hit probability analysis, environmental modeling accuracy, and computational performance.\n\n`;

  return content;
}

/**
 * Generate JSON report
 */
export function generateJsonReport(report: BenchmarkReport): string {
  return JSON.stringify(report, null, 2);
}

/**
 * Save report to file (in browser environment, would trigger download)
 */
export function saveReport(content: string, filename: string): void {
  // In a real implementation, this would create a blob and download
  console.log(`Saving report to ${filename}`);
  console.log(content);
}

/**
 * Generate and save comprehensive benchmark report
 */
export async function generateAndSaveReport(
  report: BenchmarkReport,
  options: ReportOptions = { format: 'markdown', includeSummary: true, includeDetails: true }
): Promise<void> {
  const content = options.format === 'markdown'
    ? generateMarkdownReport(report, options)
    : generateJsonReport(report);

  const extension = options.format === 'markdown' ? 'md' : 'json';
  const filename = `openwez-benchmark-report-${new Date().toISOString().split('T')[0]}.${extension}`;

  saveReport(content, filename);
}