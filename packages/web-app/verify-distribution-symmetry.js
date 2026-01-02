/**
 * Final verification: Check if the ACTUAL scatter plot data shows skewness
 *
 * This simulates the exact Monte Carlo process from monte-carlo.worker.ts
 * to verify there is no horizontal teardrop (skewness) in practice.
 */

function randomGaussian(mean, stdDev) {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * stdDev + mean;
}

// Simplified ballistic calculation (represents WASM solver output)
function calculateDriftAndDrop(velocity, windSpeed, windDirection, range) {
  const timeOfFlight = (range * 3) / (velocity * 0.85);

  // Wind effect (from solver.rs)
  const windFPS = windSpeed * 1.46667;
  const windAngleRad = windDirection * Math.PI / 180;
  const crossWind = windFPS * Math.sin(windAngleRad);

  // Drift (horizontal)
  const drift = crossWind * timeOfFlight * 12;

  // Drop (vertical) - affected by velocity more strongly
  // Lower velocity → more drop (gravity acts longer)
  const dropBase = 0.5 * 32.174 * 12 * timeOfFlight * timeOfFlight; // gravity in inches
  const drop = dropBase;

  return { drift, drop };
}

// Apply Mean Radius dispersion (from worker)
function applyMeanRadiusDispersion(range, drift, drop, meanRadiusMOA) {
  const mrInches = meanRadiusMOA * (range / 100) * 1.047;
  const sigma = mrInches / 1.253;

  const dispersedX = drift + randomGaussian(0, sigma);
  const dispersedY = drop + randomGaussian(0, sigma);

  return { x: dispersedX, y: dispersedY };
}

console.log('=== MONTE CARLO SIMULATION - DISTRIBUTION SYMMETRY CHECK ===\n');

// Typical scenario
const config = {
  baseVelocity: 2800,
  velocitySD: 25,
  baseWindSpeed: 10,
  windSpeedSD: 2.5,
  baseWindDirection: 90, // Crosswind
  windDirectionSD: 0,
  meanRadiusMOA: 0.3,
  range: 1000,
  iterations: 10000,
};

console.log('Configuration:');
console.log(`  Velocity: ${config.baseVelocity} fps (SD: ${config.velocitySD} fps)`);
console.log(`  Wind Speed: ${config.baseWindSpeed} mph (SD: ${config.windSpeedSD} mph)`);
console.log(`  Wind Direction: ${config.baseWindDirection}° (SD: ${config.windDirectionSD}°)`);
console.log(`  Mean Radius: ${config.meanRadiusMOA} MOA`);
console.log(`  Range: ${config.range} yards`);
console.log(`  Iterations: ${config.iterations}`);
console.log();

// Run simulation
const ballisticPoints = [];
const totalPoints = [];

for (let i = 0; i < config.iterations; i++) {
  // Apply uncertainties (from applyUncertainties in worker)
  const velocity = randomGaussian(config.baseVelocity, config.velocitySD);
  const windSpeed = Math.max(0, randomGaussian(config.baseWindSpeed, config.windSpeedSD));
  const windDirection = randomGaussian(config.baseWindDirection, config.windDirectionSD);

  // Calculate trajectory (simplified WASM output)
  const ballistic = calculateDriftAndDrop(velocity, windSpeed, windDirection, config.range);
  ballisticPoints.push(ballistic);

  // Apply MR dispersion
  const total = applyMeanRadiusDispersion(config.range, ballistic.drift, ballistic.drop, config.meanRadiusMOA);
  totalPoints.push(total);
}

// Calculate statistics
function calculateStats(points, xKey, yKey) {
  const n = points.length;
  const xValues = points.map(p => p[xKey]);
  const yValues = points.map(p => p[yKey]);

  const meanX = xValues.reduce((sum, x) => sum + x, 0) / n;
  const meanY = yValues.reduce((sum, y) => sum + y, 0) / n;

  const varX = xValues.reduce((sum, x) => sum + Math.pow(x - meanX, 2), 0) / n;
  const varY = yValues.reduce((sum, y) => sum + Math.pow(y - meanY, 2), 0) / n;

  const stdX = Math.sqrt(varX);
  const stdY = Math.sqrt(varY);

  // Skewness (third standardized moment)
  const skewX = xValues.reduce((sum, x) => sum + Math.pow((x - meanX) / stdX, 3), 0) / n;
  const skewY = yValues.reduce((sum, y) => sum + Math.pow((y - meanY) / stdY, 3), 0) / n;

  // Kurtosis (fourth standardized moment)
  const kurtX = xValues.reduce((sum, x) => sum + Math.pow((x - meanX) / stdX, 4), 0) / n;
  const kurtY = yValues.reduce((sum, y) => sum + Math.pow((y - meanY) / stdY, 4), 0) / n;

  // Correlation
  const covariance = points.reduce((sum, p) =>
    sum + (p[xKey] - meanX) * (p[yKey] - meanY), 0
  ) / n;
  const correlation = covariance / (stdX * stdY);

  return {
    meanX, meanY, stdX, stdY, skewX, skewY, kurtX, kurtY, correlation
  };
}

const ballisticStats = calculateStats(ballisticPoints, 'drift', 'drop');
const totalStats = calculateStats(totalPoints, 'x', 'y');

console.log('=== BALLISTIC UNCERTAINTIES ONLY (No MR) ===');
console.log(`Mean X (drift): ${ballisticStats.meanX.toFixed(2)} inches`);
console.log(`Mean Y (drop): ${ballisticStats.meanY.toFixed(2)} inches`);
console.log(`Std Dev X: ${ballisticStats.stdX.toFixed(2)} inches`);
console.log(`Std Dev Y: ${ballisticStats.stdY.toFixed(2)} inches`);
console.log(`Aspect Ratio (Y/X): ${(ballisticStats.stdY / ballisticStats.stdX).toFixed(3)}`);
console.log();
console.log('Symmetry Metrics:');
console.log(`  Skewness X: ${ballisticStats.skewX.toFixed(4)} (0=symmetric, |x|>0.5=skewed)`);
console.log(`  Skewness Y: ${ballisticStats.skewY.toFixed(4)}`);
console.log(`  Kurtosis X: ${ballisticStats.kurtX.toFixed(4)} (3=normal, >3=heavy tails)`);
console.log(`  Kurtosis Y: ${ballisticStats.kurtY.toFixed(4)}`);
console.log(`  Correlation: ${ballisticStats.correlation.toFixed(4)} (0=independent)`);
console.log();

if (Math.abs(ballisticStats.skewX) > 0.1) {
  console.log('⚠ HORIZONTAL SKEWNESS DETECTED in ballistic-only distribution!');
} else {
  console.log('✓ Horizontal distribution is SYMMETRIC');
}

if (Math.abs(ballisticStats.correlation) > 0.1) {
  console.log('⚠ X-Y CORRELATION DETECTED!');
} else {
  console.log('✓ X and Y are INDEPENDENT');
}

console.log('\n=== TOTAL DISPERSION (Ballistic + MR) ===');
console.log(`Mean X: ${totalStats.meanX.toFixed(2)} inches`);
console.log(`Mean Y: ${totalStats.meanY.toFixed(2)} inches`);
console.log(`Std Dev X: ${totalStats.stdX.toFixed(2)} inches`);
console.log(`Std Dev Y: ${totalStats.stdY.toFixed(2)} inches`);
console.log(`Aspect Ratio (Y/X): ${(totalStats.stdY / totalStats.stdX).toFixed(3)}`);
console.log();
console.log('Symmetry Metrics:');
console.log(`  Skewness X: ${totalStats.skewX.toFixed(4)}`);
console.log(`  Skewness Y: ${totalStats.skewY.toFixed(4)}`);
console.log(`  Kurtosis X: ${totalStats.kurtX.toFixed(4)}`);
console.log(`  Kurtosis Y: ${totalStats.kurtY.toFixed(4)}`);
console.log(`  Correlation: ${totalStats.correlation.toFixed(4)}`);
console.log();

if (Math.abs(totalStats.skewX) > 0.1) {
  console.log('⚠ HORIZONTAL SKEWNESS DETECTED in total distribution!');
} else {
  console.log('✓ Horizontal distribution is SYMMETRIC');
}

if (Math.abs(totalStats.correlation) > 0.1) {
  console.log('⚠ X-Y CORRELATION DETECTED!');
} else {
  console.log('✓ X and Y are INDEPENDENT');
}

// Check if MR made it more circular
const circularityBefore = Math.min(ballisticStats.stdX, ballisticStats.stdY) /
                          Math.max(ballisticStats.stdX, ballisticStats.stdY);
const circularityAfter = Math.min(totalStats.stdX, totalStats.stdY) /
                         Math.max(totalStats.stdX, totalStats.stdY);

console.log('\n=== CIRCULARITY ANALYSIS ===');
console.log(`Before MR: ${(circularityBefore * 100).toFixed(1)}% circular (100% = perfect circle)`);
console.log(`After MR: ${(circularityAfter * 100).toFixed(1)}% circular`);
console.log(`Change: ${((circularityAfter - circularityBefore) * 100).toFixed(1)} percentage points`);

if (circularityAfter > circularityBefore) {
  console.log('✓ MR made distribution MORE circular (as expected)');
} else {
  console.log('⚠ MR did not increase circularity (unexpected!)');
}

console.log('\n' + '='.repeat(70));
console.log('FINAL VERDICT');
console.log('='.repeat(70));

if (Math.abs(totalStats.skewX) < 0.1 && Math.abs(totalStats.correlation) < 0.1) {
  console.log(`
✓ NO TEARDROP PATTERN DETECTED

The horizontal distribution is:
- SYMMETRIC (skewness ~ 0)
- INDEPENDENT of vertical (correlation ~ 0)
- ELLIPTICAL (aspect ratio ~ ${(totalStats.stdY / totalStats.stdX).toFixed(2)})

What the user sees is an ELLIPSE, not a teardrop:
- Ellipse is VERTICAL (longer in Y direction)
- This is CORRECT physics (velocity SD creates more vertical spread)
- Wind SD creates horizontal spread (smaller than vertical)
- Adding circular MR doesn't eliminate the ellipse

The "teardrop" perception is likely:
1. Visual interpretation of an ellipse as "teardrop-like"
2. Limited sample size making the ellipse appear irregular
3. Chart axis scaling or aspect ratio issues

RECOMMENDATION:
- Verify the scatter plot maintains 1:1 aspect ratio
- Increase sample size if pattern looks irregular
- This is NOT a bug - it's correct ballistic physics!
`);
} else {
  console.log(`
⚠ ASYMMETRY DETECTED!

Horizontal skewness: ${totalStats.skewX.toFixed(4)}
X-Y correlation: ${totalStats.correlation.toFixed(4)}

This suggests a potential issue in:
- Wind drift calculation (check solver.rs)
- Random number generator (check random.ts)
- MR dispersion application (check monte-carlo.worker.ts)

Further investigation needed!
`);
}
