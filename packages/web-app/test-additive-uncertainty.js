/**
 * Test additive uncertainty approach
 * Samples uncertainty from N(0, SD) and adds to base value
 */

// Box-Muller transform
function randomGaussian(mean, stdDev) {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * stdDev + mean;
}

// Additive uncertainty (new approach)
function sampleWindSpeed(baseWind, windSD) {
  return Math.max(0, baseWind + randomGaussian(0, windSD));
}

// Test different base wind speeds
const testCases = [
  { baseWind: 5, windSD: 2.5, name: 'Medium (5mph base, 2.5 SD)' },
  { baseWind: 10, windSD: 2.5, name: 'Strong (10mph base, 2.5 SD)' },
  { baseWind: 2, windSD: 2.5, name: 'Light (2mph base, 2.5 SD)' },
  { baseWind: 0, windSD: 2.5, name: 'Calm (0mph base, 2.5 SD)' },
];

const iterations = 10000;

console.log('=== Additive Uncertainty: base + N(0, SD) ===\n');

testCases.forEach(testCase => {
  const samples = [];
  let clampedCount = 0;

  for (let i = 0; i < iterations; i++) {
    const uncertainty = randomGaussian(0, testCase.windSD);
    const windSpeed = Math.max(0, testCase.baseWind + uncertainty);
    samples.push(windSpeed);
    if (windSpeed === 0) clampedCount++;
  }

  const mean = samples.reduce((sum, x) => sum + x, 0) / iterations;
  const variance = samples.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / iterations;
  const stdDev = Math.sqrt(variance);
  const skewness = samples.reduce((sum, x) => sum + Math.pow((x - mean) / stdDev, 3), 0) / iterations;

  const meanBias = mean - testCase.baseWind;
  const meanBiasPercent = testCase.baseWind > 0 ? (meanBias / testCase.baseWind * 100).toFixed(2) : 'N/A';

  const min = Math.min(...samples);
  const max = Math.max(...samples);

  console.log(`${testCase.name}:`);
  console.log(`  Expected mean: ${testCase.baseWind.toFixed(2)} mph`);
  console.log(`  Actual mean:   ${mean.toFixed(3)} mph`);
  console.log(`  Bias:          ${meanBias >= 0 ? '+' : ''}${meanBias.toFixed(3)} mph (${meanBiasPercent}%)`);
  console.log(`  Expected SD:   ${testCase.windSD.toFixed(2)} mph`);
  console.log(`  Actual SD:     ${stdDev.toFixed(3)} mph`);
  console.log(`  Range:         [${min.toFixed(2)}, ${max.toFixed(2)}]`);
  console.log(`  Skewness:      ${skewness.toFixed(4)} ${Math.abs(skewness) > 0.1 ? '⚠️ SKEWED' : '✓ OK'}`);
  console.log(`  Clamped at 0:  ${clampedCount} / ${iterations} (${(clampedCount/iterations*100).toFixed(2)}%)`);
  console.log();
});

console.log('=== COMPARISON WITH OLD APPROACH ===');
console.log('OLD: randomGaussian(base, SD) - samples wind directly');
console.log('NEW: base + randomGaussian(0, SD) - samples uncertainty, adds to base');
console.log('');
console.log('Both are mathematically equivalent BEFORE clamping.');
console.log('After clamping at 0, both create positive bias.');
console.log('The NEW approach makes it clearer that base value is the center.');
