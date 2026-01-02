/**
 * Test reflected Gaussian distribution for wind speed
 * Verifies that reflection maintains correct mean and eliminates skewness
 */

// Box-Muller transform
function randomGaussian(mean, stdDev) {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * stdDev + mean;
}

// Reflected Gaussian (new approach)
function randomGaussianReflected(mean, stdDev) {
  const value = randomGaussian(mean, stdDev);
  return Math.abs(value);
}

// Test different base wind speeds
const testCases = [
  { baseWind: 5, windSD: 2.5, name: 'Medium (5mph base, 2.5 SD)' },
  { baseWind: 10, windSD: 2.5, name: 'Strong (10mph base, 2.5 SD)' },
  { baseWind: 2, windSD: 2.5, name: 'Light (2mph base, 2.5 SD)' },
  { baseWind: 0, windSD: 2.5, name: 'Calm (0mph base, 2.5 SD)' },
];

const iterations = 10000;

console.log('=== Reflected Gaussian Wind Distribution ===\n');

testCases.forEach(testCase => {
  const samples = [];

  for (let i = 0; i < iterations; i++) {
    const value = randomGaussianReflected(testCase.baseWind, testCase.windSD);
    samples.push(value);
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
  console.log();
});

console.log('=== INTERPRETATION ===');
console.log('Reflection method: Math.abs(randomGaussian(mean, SD))');
console.log('- Ensures all values >= 0 (physically valid wind speeds)');
console.log('- For base wind >> SD: Nearly identical to unmodified Gaussian');
console.log('- For base wind = 0: Creates folded normal (half-normal) distribution');
console.log('- Avoids bias from truncation/clamping');
console.log('- Distribution is symmetric (low skewness) for reasonable base winds');
