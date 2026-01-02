/**
 * Investigation: Does wind DIRECTION variation create horizontal teardrop?
 *
 * The user mentions "teardrop in HORIZONTAL axis" and suggests "wind SD might make sense"
 *
 * Key insight: If wind DIRECTION varies (not just speed), this could create
 * a non-symmetric horizontal pattern!
 */

function randomGaussian(mean, stdDev) {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * stdDev + mean;
}

console.log('=== WIND DIRECTION VARIATION INVESTIGATION ===\n');

// From solver.rs:
// Wind direction: 0° = headwind, 90° = right-to-left crosswind,
//                 180° = tailwind, 270° = left-to-right crosswind

function calculateWindDrift(windSpeed, windDirection, range, velocity) {
  // Simplified drift calculation
  const timeOfFlight = (range * 3) / (velocity * 0.85); // Approximate ToF

  // Wind components (from solver.rs)
  const windFPS = windSpeed * 1.46667; // mph to fps
  const windAngleRad = windDirection * Math.PI / 180;

  // Cross-wind component (affects horizontal drift)
  const crossWind = windFPS * Math.sin(windAngleRad);

  // Head/tail wind component (affects vertical drop slightly)
  const headWind = windFPS * Math.cos(windAngleRad);

  // Drift is primarily from cross-wind component
  const drift = crossWind * timeOfFlight * 12; // inches

  return { drift, crossWind, headWind };
}

console.log('=== Scenario: Pure Crosswind (90 degrees) ===');
const baseWindSpeed = 10; // mph
const windSpeedSD = 2.5; // mph
const baseWindDirection = 90; // degrees (right-to-left crosswind)
const windDirectionSD = 0; // Start with no direction variation
const range = 1000;
const velocity = 2800;

console.log(`Wind: ${baseWindSpeed} mph at ${baseWindDirection}° (SD speed: ${windSpeedSD} mph, SD direction: ${windDirectionSD}°)`);
console.log();

// Generate samples with wind SPEED variation only
const n = 5000;
const samplesSpeedOnly = [];

for (let i = 0; i < n; i++) {
  const windSpeed = randomGaussian(baseWindSpeed, windSpeedSD);
  const windDirection = baseWindDirection; // Fixed direction
  const result = calculateWindDrift(windSpeed, windDirection, range, velocity);
  samplesSpeedOnly.push(result.drift);
}

const meanDriftSpeed = samplesSpeedOnly.reduce((sum, d) => sum + d, 0) / n;
const stdDriftSpeed = Math.sqrt(
  samplesSpeedOnly.reduce((sum, d) => sum + Math.pow(d - meanDriftSpeed, 2), 0) / n
);

// Check for skewness (third moment)
const skewnessSpeed = samplesSpeedOnly.reduce((sum, d) =>
  sum + Math.pow((d - meanDriftSpeed) / stdDriftSpeed, 3), 0
) / n;

console.log('Wind Speed Variation Only (Fixed Direction at 90°):');
console.log(`  Mean drift: ${meanDriftSpeed.toFixed(2)} inches`);
console.log(`  Std dev drift: ${stdDriftSpeed.toFixed(2)} inches`);
console.log(`  Skewness: ${skewnessSpeed.toFixed(4)} (0 = symmetric, >0 = right skew, <0 = left skew)`);
console.log();

if (Math.abs(skewnessSpeed) > 0.2) {
  console.log('  ⚠ SKEWED distribution detected!');
} else {
  console.log('  ✓ Symmetric distribution');
}

console.log('\n=== Scenario: Crosswind with DIRECTION Variation ===');
const windDirectionSD2 = 10; // degrees of uncertainty in wind direction

console.log(`Wind: ${baseWindSpeed} mph at ${baseWindDirection}° (SD speed: ${windSpeedSD} mph, SD direction: ${windDirectionSD2}°)`);
console.log();

// Generate samples with BOTH speed and direction variation
const samplesWithDirection = [];

for (let i = 0; i < n; i++) {
  const windSpeed = randomGaussian(baseWindSpeed, windSpeedSD);
  const windDirection = randomGaussian(baseWindDirection, windDirectionSD2);
  const result = calculateWindDrift(windSpeed, windDirection, range, velocity);
  samplesWithDirection.push(result.drift);
}

const meanDriftDir = samplesWithDirection.reduce((sum, d) => sum + d, 0) / n;
const stdDriftDir = Math.sqrt(
  samplesWithDirection.reduce((sum, d) => sum + Math.pow(d - meanDriftDir, 2), 0) / n
);

const skewnessDir = samplesWithDirection.reduce((sum, d) =>
  sum + Math.pow((d - meanDriftDir) / stdDriftDir, 3), 0
) / n;

console.log('Wind Speed + Direction Variation:');
console.log(`  Mean drift: ${meanDriftDir.toFixed(2)} inches`);
console.log(`  Std dev drift: ${stdDriftDir.toFixed(2)} inches`);
console.log(`  Skewness: ${skewnessDir.toFixed(4)}`);
console.log();

if (Math.abs(skewnessDir) > 0.2) {
  console.log('  ⚠ SKEWED distribution detected!');
} else {
  console.log('  ✓ Symmetric distribution');
}

console.log(`\nStd Dev change: ${stdDriftSpeed.toFixed(2)} → ${stdDriftDir.toFixed(2)} inches (${((stdDriftDir - stdDriftSpeed) / stdDriftSpeed * 100).toFixed(1)}% increase)`);

console.log('\n=== Critical Test: Wind Direction near 0° or 180° ===');
console.log('If wind direction is near 0° (headwind) or 180° (tailwind),');
console.log('small direction variations create NON-LINEAR drift changes!\n');

// Test near headwind (where crosswind component is small)
const nearHeadwind = 10; // degrees (nearly headwind, slight crosswind)
console.log(`Wind at ${nearHeadwind}° (nearly headwind):`);

const samplesNearHead = [];
for (let i = 0; i < n; i++) {
  const windSpeed = randomGaussian(baseWindSpeed, windSpeedSD);
  const windDirection = randomGaussian(nearHeadwind, windDirectionSD2);
  const result = calculateWindDrift(windSpeed, windDirection, range, velocity);
  samplesNearHead.push(result.drift);
}

const meanDriftHead = samplesNearHead.reduce((sum, d) => sum + d, 0) / n;
const stdDriftHead = Math.sqrt(
  samplesNearHead.reduce((sum, d) => sum + Math.pow(d - meanDriftHead, 2), 0) / n
);
const skewnessHead = samplesNearHead.reduce((sum, d) =>
  sum + Math.pow((d - meanDriftHead) / stdDriftHead, 3), 0
) / n;

console.log(`  Mean drift: ${meanDriftHead.toFixed(2)} inches`);
console.log(`  Std dev drift: ${stdDriftHead.toFixed(2)} inches`);
console.log(`  Skewness: ${skewnessHead.toFixed(4)}`);

if (Math.abs(skewnessHead) > 0.2) {
  console.log('  ⚠ SKEWED! Near-headwind creates asymmetric horizontal drift');
} else {
  console.log('  ✓ Still symmetric');
}

console.log('\n=== Analysis: sin(angle) Non-linearity ===');
console.log('Cross-wind component = wind_speed × sin(angle)');
console.log('sin(x) is LINEAR near x=90°, but NON-LINEAR near x=0° or x=180°\n');

const testAngles = [0, 10, 20, 30, 45, 60, 75, 85, 90];
console.log('Angle  sin(angle)  Change from previous');
testAngles.forEach((angle, i) => {
  const sinVal = Math.sin(angle * Math.PI / 180);
  const prevSin = i > 0 ? Math.sin(testAngles[i-1] * Math.PI / 180) : 0;
  const change = sinVal - prevSin;
  console.log(`${angle.toString().padStart(3)}°   ${sinVal.toFixed(4)}     ${i > 0 ? change.toFixed(4) : '   -   '}`);
});

console.log('\nNear 90°: sin changes SLOWLY (nearly flat, ~linear)');
console.log('Near 0°: sin changes RAPIDLY (steep curve, highly non-linear)');
console.log('\nConclusion: Wind direction uncertainty creates asymmetry ONLY if');
console.log('the base wind direction is near 0° or 180° (head/tail wind).');

console.log('\n' + '='.repeat(70));
console.log('FINAL CONCLUSION');
console.log('='.repeat(70));
console.log(`
Wind DIRECTION variation does NOT create horizontal teardrop if:
- Wind is primarily crosswind (near 90° or 270°)
- sin(angle) is nearly linear in this range
- Variation creates symmetric spread

Wind DIRECTION variation COULD create asymmetry if:
- Wind is primarily head/tail wind (near 0° or 180°)
- sin(angle) is highly non-linear in this range
- Small direction changes create large crosswind component changes
- But this is RARE in practice (usually use crosswind value)

Most likely explanation for "horizontal teardrop":
1. User is seeing an ELLIPSE (vertical elongation from velocity SD)
2. Wind SD creates horizontal spread, but less than vertical
3. Combined pattern looks "teardrop-like" to the eye
4. This is CORRECT physics, not a bug!

The user's suggestion that "wind SD might make sense" is correct:
- Wind SD creates the horizontal spread
- But the "teardrop" appearance is from the ELLIPTICAL combination
- Not from actual skewness or asymmetry in the distribution
`);
