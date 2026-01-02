/**
 * Test script to verify wind speed and direction distributions
 * Checks for skewness and asymmetry in the Monte Carlo uncertainty sampling
 */

// Box-Muller transform for Gaussian
function randomGaussian(mean, stdDev) {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * stdDev + mean;
}

// Truncated Gaussian with rejection sampling
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

// Test parameters matching medium confidence
const baseWindSpeed = 5; // mph
const windSpeedSD = 2.5; // mph
const baseWindDirection = 90; // degrees (right-to-left crosswind)
const windDirectionSD = 10; // degrees

const iterations = 10000;

// Collect samples
const windSpeedSamples = [];
const windDirectionSamples = [];
const windXSamples = []; // Headwind/tailwind component
const windZSamples = []; // Crosswind component

for (let i = 0; i < iterations; i++) {
  const windSpeed = randomTruncatedGaussian(baseWindSpeed, windSpeedSD, 0);
  const windDirection = randomGaussian(baseWindDirection, windDirectionSD);

  windSpeedSamples.push(windSpeed);
  windDirectionSamples.push(windDirection);

  // Convert to fps and calculate components
  const windFps = windSpeed * 1.46667;
  const windAngleRad = (windDirection * Math.PI) / 180;

  const windX = windFps * Math.cos(windAngleRad); // Headwind/tailwind
  const windZ = windFps * Math.sin(windAngleRad); // Crosswind

  windXSamples.push(windX);
  windZSamples.push(windZ);
}

// Calculate statistics
function calculateStats(samples) {
  const n = samples.length;
  const mean = samples.reduce((sum, x) => sum + x, 0) / n;
  const variance = samples.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0) / n;
  const stdDev = Math.sqrt(variance);

  // Calculate skewness
  const skewness = samples.reduce((sum, x) => sum + Math.pow((x - mean) / stdDev, 3), 0) / n;

  // Calculate min/max
  const min = Math.min(...samples);
  const max = Math.max(...samples);

  return { mean, stdDev, skewness, min, max };
}

const windSpeedStats = calculateStats(windSpeedSamples);
const windDirectionStats = calculateStats(windDirectionSamples);
const windXStats = calculateStats(windXSamples);
const windZStats = calculateStats(windZSamples);

console.log('=== Wind Distribution Analysis ===\n');

console.log('Wind Speed (mph):');
console.log(`  Expected: mean=${baseWindSpeed}, SD=${windSpeedSD}`);
console.log(`  Actual:   mean=${windSpeedStats.mean.toFixed(3)}, SD=${windSpeedStats.stdDev.toFixed(3)}`);
console.log(`  Range:    [${windSpeedStats.min.toFixed(2)}, ${windSpeedStats.max.toFixed(2)}]`);
console.log(`  Skewness: ${windSpeedStats.skewness.toFixed(4)} ${Math.abs(windSpeedStats.skewness) > 0.1 ? '⚠️ SKEWED' : '✓ OK'}`);
console.log();

console.log('Wind Direction (degrees):');
console.log(`  Expected: mean=${baseWindDirection}, SD=${windDirectionSD}`);
console.log(`  Actual:   mean=${windDirectionStats.mean.toFixed(3)}, SD=${windDirectionStats.stdDev.toFixed(3)}`);
console.log(`  Range:    [${windDirectionStats.min.toFixed(2)}, ${windDirectionStats.max.toFixed(2)}]`);
console.log(`  Skewness: ${windDirectionStats.skewness.toFixed(4)} ${Math.abs(windDirectionStats.skewness) > 0.1 ? '⚠️ SKEWED' : '✓ OK'}`);
console.log();

console.log('Wind X Component - Headwind/Tailwind (fps):');
console.log(`  Mean:     ${windXStats.mean.toFixed(3)} fps`);
console.log(`  SD:       ${windXStats.stdDev.toFixed(3)} fps`);
console.log(`  Range:    [${windXStats.min.toFixed(2)}, ${windXStats.max.toFixed(2)}]`);
console.log(`  Skewness: ${windXStats.skewness.toFixed(4)} ${Math.abs(windXStats.skewness) > 0.1 ? '⚠️ SKEWED' : '✓ OK'}`);
console.log();

console.log('Wind Z Component - Crosswind (fps):');
console.log(`  Mean:     ${windZStats.mean.toFixed(3)} fps`);
console.log(`  SD:       ${windZStats.stdDev.toFixed(3)} fps`);
console.log(`  Range:    [${windZStats.min.toFixed(2)}, ${windZStats.max.toFixed(2)}]`);
console.log(`  Skewness: ${windZStats.skewness.toFixed(4)} ${Math.abs(windZStats.skewness) > 0.1 ? '⚠️ SKEWED' : '✓ OK'}`);
console.log();

// Check for bias
const windSpeedBias = ((windSpeedStats.mean - baseWindSpeed) / baseWindSpeed * 100).toFixed(2);
const windDirectionBias = ((windDirectionStats.mean - baseWindDirection) / baseWindDirection * 100).toFixed(2);

console.log('=== Bias Check ===');
console.log(`Wind Speed bias:     ${windSpeedBias}%`);
console.log(`Wind Direction bias: ${windDirectionBias}%`);
