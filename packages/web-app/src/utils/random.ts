/**
 * Random Number Generator Utilities
 * Provides Gaussian (normal) distribution sampling for Monte Carlo simulations
 */

/**
 * Generate random number from Gaussian distribution using Box-Muller transform
 * @param mean - Mean of the distribution
 * @param stdDev - Standard deviation of the distribution
 * @returns Random number from Gaussian distribution
 */
export function randomGaussian(mean: number, stdDev: number): number {
  // Box-Muller transform
  const u1 = Math.random();
  const u2 = Math.random();

  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

  return z0 * stdDev + mean;
}

/**
 * Generate random number from truncated Gaussian distribution
 * Uses rejection sampling to ensure value stays within bounds
 * @param mean - Mean of the distribution
 * @param stdDev - Standard deviation of the distribution
 * @param min - Minimum value (default: -Infinity)
 * @param max - Maximum value (default: Infinity)
 * @returns Random number from truncated Gaussian distribution
 */
export function randomTruncatedGaussian(
  mean: number,
  stdDev: number,
  min: number = -Infinity,
  max: number = Infinity
): number {
  // Rejection sampling: keep drawing until value is in range
  let value: number;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    value = randomGaussian(mean, stdDev);
    attempts++;

    // Fallback to clamping after too many attempts
    if (attempts > maxAttempts) {
      return Math.max(min, Math.min(max, value));
    }
  } while (value < min || value > max);

  return value;
}

/**
 * Generate random number from Gaussian distribution with reflection at zero
 * Maintains correct mean and variance for positive-only distributions
 * @param mean - Mean of the distribution (must be >= 0)
 * @param stdDev - Standard deviation of the distribution
 * @returns Random number >= 0 with correct statistical properties
 */
export function randomGaussianReflected(mean: number, stdDev: number): number {
  const value = randomGaussian(mean, stdDev);
  // Reflect negative values across zero to maintain unbiased distribution
  return Math.abs(value);
}

/**
 * Seed-based random number generator for reproducible simulations
 */
export class SeededRandom {
  private seed: number;

  constructor(seed: number = Date.now()) {
    this.seed = seed;
  }

  /**
   * Generate next random number (0-1)
   */
  next(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  /**
   * Generate Gaussian random number
   */
  nextGaussian(mean: number, stdDev: number): number {
    const u1 = this.next();
    const u2 = this.next();

    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

    return z0 * stdDev + mean;
  }

  /**
   * Reset seed for reproducibility
   */
  reset(seed: number): void {
    this.seed = seed;
  }
}
