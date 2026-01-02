/**
 * Test script to verify the randomGaussian function produces correct distributions
 * and investigate the teardrop pattern issue
 */

// Box-Muller implementation from random.ts
function randomGaussian(mean, stdDev) {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * stdDev + mean;
}

// Test 1: Generate 2D circular normal distribution
console.log('=== Test 1: 2D Circular Normal Distribution ===');
const n = 10000;
const sigma = 1.0;
const points = [];

for (let i = 0; i < n; i++) {
  const x = randomGaussian(0, sigma);
  const y = randomGaussian(0, sigma);
  points.push({ x, y });
}

// Calculate statistics
const meanX = points.reduce((sum, p) => sum + p.x, 0) / n;
const meanY = points.reduce((sum, p) => sum + p.y, 0) / n;
const varX = points.reduce((sum, p) => sum + (p.x - meanX) ** 2, 0) / n;
const varY = points.reduce((sum, p) => sum + (p.y - meanY) ** 2, 0) / n;
const stdX = Math.sqrt(varX);
const stdY = Math.sqrt(varY);

console.log(`Mean X: ${meanX.toFixed(4)} (expected: 0.0000)`);
console.log(`Mean Y: ${meanY.toFixed(4)} (expected: 0.0000)`);
console.log(`Std Dev X: ${stdX.toFixed(4)} (expected: ${sigma.toFixed(4)})`);
console.log(`Std Dev Y: ${stdY.toFixed(4)} (expected: ${sigma.toFixed(4)})`);

// Calculate radial distance statistics
const radii = points.map(p => Math.sqrt(p.x ** 2 + p.y ** 2));
const meanRadius = radii.reduce((sum, r) => sum + r, 0) / n;
const expectedMeanRadius = sigma * Math.sqrt(Math.PI / 2);

console.log(`Mean Radius: ${meanRadius.toFixed(4)} (expected: ${expectedMeanRadius.toFixed(4)})`);
console.log(`Ratio MR/σ: ${(meanRadius / sigma).toFixed(4)} (expected: 1.2533)`);

// Test 2: Check for correlation between X and Y
console.log('\n=== Test 2: Correlation Test ===');
const covariance = points.reduce((sum, p) => sum + (p.x - meanX) * (p.y - meanY), 0) / n;
const correlation = covariance / (stdX * stdY);
console.log(`Covariance: ${covariance.toFixed(6)} (expected: ~0)`);
console.log(`Correlation: ${correlation.toFixed(6)} (expected: ~0)`);

// Test 3: Verify Box-Muller produces independent samples
console.log('\n=== Test 3: Independence Test (Box-Muller generates 2 values) ===');
console.log('Note: Our implementation only uses z0, not z1');
console.log('This is CORRECT - we call randomGaussian twice for X and Y');
console.log('Each call generates fresh u1, u2, so X and Y are independent');

// Test 4: Simulate the actual Monte Carlo scenario
console.log('\n=== Test 4: Monte Carlo Scenario Simulation ===');

// Simulate ballistic uncertainties creating an ellipse
const windSD = 2.5; // inches horizontal spread
const velocitySD = 4.0; // inches vertical spread (velocity affects drop)
const mrMOA = 0.3;
const range = 1000;
const mrInches = mrMOA * (range / 100) * 1.047;
const mrSigma = mrInches / 1.253;

console.log(`Mean Radius: ${mrMOA} MOA at ${range} yards = ${mrInches.toFixed(2)} inches`);
console.log(`Converted to σ: ${mrSigma.toFixed(2)} inches`);

const totalPoints = [];
const ballisticOnlyPoints = [];

for (let i = 0; i < 5000; i++) {
  // Ballistic uncertainties (elliptical)
  const ballisticX = randomGaussian(0, windSD);
  const ballisticY = randomGaussian(0, velocitySD);

  ballisticOnlyPoints.push({ x: ballisticX, y: ballisticY });

  // Add Mean Radius dispersion (circular)
  const dispersedX = ballisticX + randomGaussian(0, mrSigma);
  const dispersedY = ballisticY + randomGaussian(0, mrSigma);

  totalPoints.push({ x: dispersedX, y: dispersedY });
}

// Calculate stats for ballistic only
const bMeanX = ballisticOnlyPoints.reduce((sum, p) => sum + p.x, 0) / ballisticOnlyPoints.length;
const bMeanY = ballisticOnlyPoints.reduce((sum, p) => sum + p.y, 0) / ballisticOnlyPoints.length;
const bVarX = ballisticOnlyPoints.reduce((sum, p) => sum + (p.x - bMeanX) ** 2, 0) / ballisticOnlyPoints.length;
const bVarY = ballisticOnlyPoints.reduce((sum, p) => sum + (p.y - bMeanY) ** 2, 0) / ballisticOnlyPoints.length;

console.log('\nBallistic Only (Elliptical):');
console.log(`  Std Dev X: ${Math.sqrt(bVarX).toFixed(2)} inches (expected: ${windSD.toFixed(2)})`);
console.log(`  Std Dev Y: ${Math.sqrt(bVarY).toFixed(2)} inches (expected: ${velocitySD.toFixed(2)})`);

// Calculate stats for total
const tMeanX = totalPoints.reduce((sum, p) => sum + p.x, 0) / totalPoints.length;
const tMeanY = totalPoints.reduce((sum, p) => sum + p.y, 0) / totalPoints.length;
const tVarX = totalPoints.reduce((sum, p) => sum + (p.x - tMeanX) ** 2, 0) / totalPoints.length;
const tVarY = totalPoints.reduce((sum, p) => sum + (p.y - tMeanY) ** 2, 0) / totalPoints.length;

// Expected total variance = ballistic variance + MR variance
const expectedTotalVarX = windSD ** 2 + mrSigma ** 2;
const expectedTotalVarY = velocitySD ** 2 + mrSigma ** 2;

console.log('\nTotal (Ballistic + MR):');
console.log(`  Std Dev X: ${Math.sqrt(tVarX).toFixed(2)} inches (expected: ${Math.sqrt(expectedTotalVarX).toFixed(2)})`);
console.log(`  Std Dev Y: ${Math.sqrt(tVarY).toFixed(2)} inches (expected: ${Math.sqrt(expectedTotalVarY).toFixed(2)})`);

// Check aspect ratio
const aspectRatioBallistic = Math.sqrt(bVarY) / Math.sqrt(bVarX);
const aspectRatioTotal = Math.sqrt(tVarY) / Math.sqrt(tVarX);

console.log('\nAspect Ratios (Y/X):');
console.log(`  Ballistic Only: ${aspectRatioBallistic.toFixed(3)} (elliptical)`);
console.log(`  Total: ${aspectRatioTotal.toFixed(3)} (should be more circular)`);

// Test 5: Check if Box-Muller can produce zero or near-zero values
console.log('\n=== Test 5: Edge Case Testing ===');
const samples = [];
for (let i = 0; i < 1000; i++) {
  samples.push(randomGaussian(0, 1));
}
const minVal = Math.min(...samples);
const maxVal = Math.max(...samples);
console.log(`Min value: ${minVal.toFixed(4)}`);
console.log(`Max value: ${maxVal.toFixed(4)}`);
console.log(`Range: ${(maxVal - minVal).toFixed(4)}`);

// Check for potential Math.random() == 0 or == 1 issues
console.log('\n=== Test 6: Math.random() Edge Cases ===');
console.log('Testing for Math.random() = 0 (would cause log(0) = -Infinity)...');
let zeroCount = 0;
let oneCount = 0;
for (let i = 0; i < 1000000; i++) {
  const r = Math.random();
  if (r === 0) zeroCount++;
  if (r === 1) oneCount++;
}
console.log(`Zeros found: ${zeroCount} (Math.random() should never return 0)`);
console.log(`Ones found: ${oneCount} (Math.random() should never return 1)`);
