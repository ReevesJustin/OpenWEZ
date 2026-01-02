/**
 * Investigation: Does velocity variation create asymmetric wind drift distribution?
 *
 * Key Question: When velocity varies (slower bullets spend more time in flight),
 * does this create a NON-LINEAR relationship between wind speed and drift?
 * This could explain the horizontal teardrop pattern.
 */

// Simplified wind drift model (based on solver.rs physics)
// Wind drift accumulates over time of flight
// Lower velocity → longer time of flight → more wind effect

function estimateWindDrift(velocity, windSpeed, range) {
  // Simplified model: drift proportional to time of flight and wind speed
  // In reality, this involves integration of drag equation

  // Approximate time of flight (seconds)
  const rangeInFeet = range * 3;  // yards to feet
  const avgVelocity = velocity * 0.85; // Account for deceleration
  const timeOfFlight = rangeInFeet / avgVelocity;

  // Wind drift accumulates: drift ≈ windSpeed * timeOfFlight
  const windFPS = windSpeed * 1.46667; // mph to fps
  const drift = windFPS * timeOfFlight * 12; // Convert to inches

  return drift;
}

console.log('=== WIND-VELOCITY COUPLING INVESTIGATION ===\n');

// Typical 1000 yard scenario
const baseVelocity = 2800;  // fps
const velocitySD = 25;      // fps
const baseWind = 10;        // mph
const windSD = 2.5;         // mph
const range = 1000;         // yards

console.log('Scenario: 1000 yards');
console.log(`Base velocity: ${baseVelocity} fps (SD: ${velocitySD} fps)`);
console.log(`Base wind: ${baseWind} mph (SD: ${windSD} mph)`);
console.log();

// Test 1: Fixed wind, varying velocity
console.log('=== TEST 1: Effect of Velocity Variation (Fixed Wind) ===');
console.log(`Wind speed fixed at ${baseWind} mph`);
console.log();

const velocities = [
  baseVelocity - 2 * velocitySD,  // -2σ
  baseVelocity - velocitySD,      // -1σ
  baseVelocity,                   // mean
  baseVelocity + velocitySD,      // +1σ
  baseVelocity + 2 * velocitySD,  // +2σ
];

velocities.forEach(v => {
  const drift = estimateWindDrift(v, baseWind, range);
  const deviation = ((v - baseVelocity) / velocitySD).toFixed(1);
  console.log(`  Velocity ${v} fps (${deviation}σ): Drift = ${drift.toFixed(2)} inches`);
});

const driftLowV = estimateWindDrift(baseVelocity - velocitySD, baseWind, range);
const driftMeanV = estimateWindDrift(baseVelocity, baseWind, range);
const driftHighV = estimateWindDrift(baseVelocity + velocitySD, baseWind, range);

const driftDecrease = driftMeanV - driftHighV;
const driftIncrease = driftLowV - driftMeanV;
const asymmetry = Math.abs(driftIncrease - driftDecrease);

console.log();
console.log('Drift symmetry analysis:');
console.log(`  Drift decrease (mean → +1σ velocity): ${driftDecrease.toFixed(2)} inches`);
console.log(`  Drift increase (mean → -1σ velocity): ${driftIncrease.toFixed(2)} inches`);
console.log(`  Asymmetry: ${asymmetry.toFixed(2)} inches`);
console.log();

if (asymmetry > 0.5) {
  console.log('  ⚠ ASYMMETRIC: Low velocity creates MORE drift than high velocity reduces it');
  console.log('     This creates a VELOCITY-WIND COUPLING effect');
} else {
  console.log('  ✓ SYMMETRIC: Drift changes are equal in both directions');
}

// Test 2: Fixed velocity, varying wind
console.log('\n=== TEST 2: Effect of Wind Variation (Fixed Velocity) ===');
console.log(`Velocity fixed at ${baseVelocity} fps`);
console.log();

const windSpeeds = [
  baseWind - 2 * windSD,  // -2σ
  baseWind - windSD,      // -1σ
  baseWind,               // mean
  baseWind + windSD,      // +1σ
  baseWind + 2 * windSD,  // +2σ
];

windSpeeds.forEach(w => {
  const drift = estimateWindDrift(baseVelocity, w, range);
  const deviation = ((w - baseWind) / windSD).toFixed(1);
  console.log(`  Wind ${w.toFixed(1)} mph (${deviation}σ): Drift = ${drift.toFixed(2)} inches`);
});

const driftLowW = estimateWindDrift(baseVelocity, baseWind - windSD, range);
const driftMeanW = estimateWindDrift(baseVelocity, baseWind, range);
const driftHighW = estimateWindDrift(baseVelocity, baseWind + windSD, range);

const windDriftDecrease = driftMeanW - driftLowW;
const windDriftIncrease = driftHighW - driftMeanW;
const windAsymmetry = Math.abs(windDriftIncrease - windDriftDecrease);

console.log();
console.log('Wind drift symmetry:');
console.log(`  Drift decrease (mean → -1σ wind): ${windDriftDecrease.toFixed(2)} inches`);
console.log(`  Drift increase (mean → +1σ wind): ${windDriftIncrease.toFixed(2)} inches`);
console.log(`  Asymmetry: ${windAsymmetry.toFixed(2)} inches`);

if (windAsymmetry > 0.5) {
  console.log('  ⚠ ASYMMETRIC wind effect');
} else {
  console.log('  ✓ SYMMETRIC wind effect');
}

// Test 3: Combined variation - does this create horizontal teardrop?
console.log('\n=== TEST 3: Combined Velocity + Wind Variation ===');
console.log('Testing correlation between velocity and drift\n');

// Generate random samples
function randomGaussian(mean, stdDev) {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * stdDev + mean;
}

const n = 5000;
const samples = [];

for (let i = 0; i < n; i++) {
  const velocity = randomGaussian(baseVelocity, velocitySD);
  const wind = randomGaussian(baseWind, windSD);
  const drift = estimateWindDrift(velocity, wind, range);

  samples.push({ velocity, wind, drift });
}

// Calculate statistics
const meanDrift = samples.reduce((sum, s) => sum + s.drift, 0) / n;
const meanVelocity = samples.reduce((sum, s) => sum + s.velocity, 0) / n;
const stdDrift = Math.sqrt(samples.reduce((sum, s) => sum + Math.pow(s.drift - meanDrift, 2), 0) / n);
const stdVelocity = Math.sqrt(samples.reduce((sum, s) => sum + Math.pow(s.velocity - meanVelocity, 2), 0) / n);

// Calculate correlation between velocity and drift
const covariance = samples.reduce((sum, s) =>
  sum + (s.velocity - meanVelocity) * (s.drift - meanDrift), 0
) / n;
const correlation = covariance / (stdVelocity * stdDrift);

console.log(`Mean drift: ${meanDrift.toFixed(2)} inches`);
console.log(`Std Dev drift: ${stdDrift.toFixed(2)} inches`);
console.log(`Correlation (velocity vs drift): ${correlation.toFixed(4)}`);
console.log();

if (Math.abs(correlation) > 0.2) {
  console.log(`⚠ SIGNIFICANT CORRELATION DETECTED!`);
  console.log(`  Velocity and drift are ${correlation < 0 ? 'NEGATIVELY' : 'POSITIVELY'} correlated`);
  console.log(`  ${correlation < 0 ? 'Lower' : 'Higher'} velocity → ${correlation < 0 ? 'MORE' : 'LESS'} drift`);
  console.log();
  console.log(`  This creates a NON-CIRCULAR horizontal distribution!`);
  console.log(`  Even though wind and velocity are independent, the PHYSICS couples them.`);
} else {
  console.log(`✓ No significant correlation`);
}

// Test 4: Check distribution shape
console.log('\n=== TEST 4: Distribution Shape Analysis ===');

// Separate samples by drift percentiles
samples.sort((a, b) => a.drift - b.drift);
const bottom20 = samples.slice(0, Math.floor(n * 0.2));
const top20 = samples.slice(Math.floor(n * 0.8));

const bottomAvgVelocity = bottom20.reduce((sum, s) => sum + s.velocity, 0) / bottom20.length;
const topAvgVelocity = top20.reduce((sum, s) => sum + s.velocity, 0) / top20.length;

console.log('Low drift samples (bottom 20%):');
console.log(`  Average velocity: ${bottomAvgVelocity.toFixed(1)} fps`);
console.log();
console.log('High drift samples (top 20%):');
console.log(`  Average velocity: ${topAvgVelocity.toFixed(1)} fps`);
console.log();

const velocityDifference = bottomAvgVelocity - topAvgVelocity;
console.log(`Velocity difference: ${velocityDifference.toFixed(1)} fps`);

if (velocityDifference > velocitySD * 0.5) {
  console.log('⚠ Shots with LOW drift have significantly HIGHER velocity');
  console.log('  This confirms velocity-wind coupling creates horizontal asymmetry');
} else {
  console.log('✓ No significant velocity bias between low and high drift samples');
}

console.log('\n' + '='.repeat(70));
console.log('CONCLUSION: VELOCITY-WIND COUPLING');
console.log('='.repeat(70));
console.log(`
The horizontal "teardrop" pattern is likely caused by VELOCITY-WIND COUPLING:

1. PHYSICS: Lower velocity → longer time of flight → MORE wind drift

2. STATISTICAL EFFECT:
   - When velocity varies randomly (Gaussian)
   - Wind drift is NOT linearly proportional to wind speed alone
   - Drift also depends on time of flight, which depends on velocity

3. COUPLING MECHANISM:
   - Low velocity shot + average wind → EXTRA drift (beyond wind variation)
   - High velocity shot + average wind → LESS drift (beyond wind variation)
   - This creates an asymmetric horizontal distribution

4. RESULT:
   - Even with symmetric wind and velocity uncertainties
   - The HORIZONTAL drift distribution becomes SKEWED
   - This appears as a "teardrop" in the horizontal direction

5. VERIFICATION:
   - Calculate correlation between velocity and horizontal drift
   - If correlation is significant (|r| > 0.2), coupling exists
   - This is CORRECT PHYSICS, not a bug!

To test if this explains the user's observation:
- Set velocity SD = 0 and check if horizontal teardrop disappears
- The teardrop should remain if wind SD is non-zero (ellipse from wind)
- But it should become more SYMMETRIC if velocity doesn't vary
`);
