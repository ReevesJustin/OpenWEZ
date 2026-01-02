/**
 * Verify that Monte Carlo is correctly centered on base wind values
 * This checks if the truncated Gaussian is properly distributing around the base value
 */

// Box-Muller transform
function randomGaussian(mean, stdDev) {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * stdDev + mean;
}

// Truncated Gaussian
function randomTruncatedGaussian(mean, stdDev, min = -Infinity, max = Infinity) {
  let value;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    value = randomGaussian(mean, stdDev);
    attempts++;

    if (attempts > maxAttempts) {
      return Math.max(min, Math.min(max, value));
    }
  } while (value < min || value > max);

  return value;
}

// Test different base wind speeds
const testCases = [
  { baseWind: 5, windSD: 2.5, name: 'Medium (5mph base, 2.5 SD)' },
  { baseWind: 10, windSD: 2.5, name: 'Strong (10mph base, 2.5 SD)' },
  { baseWind: 2, windSD: 2.5, name: 'Light (2mph base, 2.5 SD)' },
  { baseWind: 0, windSD: 2.5, name: 'Calm (0mph base, 2.5 SD)' },
];

const iterations = 10000;

testCases.forEach(testCase => {
  const samples = [];
  let clampedCount = 0;

  for (let i = 0; i < iterations; i++) {
    const value = randomTruncatedGaussian(testCase.baseWind, testCase.windSD, 0);
    samples.push(value);
    if (value === 0) clampedCount++;
  }

  const mean = samples.reduce((sum, x) => sum + x, 0) / iterations;
  const variance = samples.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / iterations;
  const stdDev = Math.sqrt(variance);
  const skewness = samples.reduce((sum, x) => sum + Math.pow((x - mean) / stdDev, 3), 0) / iterations;

  const meanBias = mean - testCase.baseWind;
  const meanBiasPercent = (meanBias / testCase.baseWind * 100).toFixed(2);

  console.log(`\n${testCase.name}:`);
  console.log(`  Expected mean: ${testCase.baseWind.toFixed(2)} mph`);
  console.log(`  Actual mean:   ${mean.toFixed(3)} mph`);
  console.log(`  Bias:          ${meanBias >= 0 ? '+' : ''}${meanBias.toFixed(3)} mph (${meanBiasPercent}%)`);
  console.log(`  Expected SD:   ${testCase.windSD.toFixed(2)} mph`);
  console.log(`  Actual SD:     ${stdDev.toFixed(3)} mph`);
  console.log(`  Skewness:      ${skewness.toFixed(4)} ${Math.abs(skewness) > 0.1 ? '⚠️' : '✓'}`);
  console.log(`  Clamped at 0:  ${clampedCount} / ${iterations} (${(clampedCount/iterations*100).toFixed(2)}%)`);
});

console.log('\n=== INTERPRETATION ===');
console.log('Positive bias means the actual mean wind is HIGHER than base wind.');
console.log('This causes bullets to drift MORE in the wind direction.');
console.log('For right-to-left wind (90°), this creates MORE leftward drift.');
console.log('Visually, this appears as distribution shifted/skewed to the LEFT.');
