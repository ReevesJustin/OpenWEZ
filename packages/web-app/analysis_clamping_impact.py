#!/usr/bin/env python3
"""
Analysis of wind speed clamping impact on Monte Carlo distribution
This demonstrates how clamping negative values creates the horizontal teardrop pattern
"""

import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

def analyze_clamping(base_wind, wind_sd, n_samples=100000):
    """
    Analyze the impact of clamping on wind speed distribution

    Args:
        base_wind: Base wind speed (mph)
        wind_sd: Wind speed standard deviation (mph)
        n_samples: Number of Monte Carlo samples

    Returns:
        dict with analysis results
    """
    # Generate Gaussian samples
    samples = np.random.normal(base_wind, wind_sd, n_samples)

    # Apply clamping
    clamped_samples = np.maximum(0, samples)

    # Calculate statistics
    negative_count = np.sum(samples < 0)
    negative_pct = (negative_count / n_samples) * 100

    # Calculate skewness
    original_skew = stats.skew(samples)
    clamped_skew = stats.skew(clamped_samples)

    # Calculate means
    original_mean = np.mean(samples)
    clamped_mean = np.mean(clamped_samples)

    # Calculate standard deviations
    original_std = np.std(samples)
    clamped_std = np.std(clamped_samples)

    return {
        'base_wind': base_wind,
        'wind_sd': wind_sd,
        'negative_count': negative_count,
        'negative_pct': negative_pct,
        'original_mean': original_mean,
        'clamped_mean': clamped_mean,
        'original_std': original_std,
        'clamped_std': clamped_std,
        'original_skew': original_skew,
        'clamped_skew': clamped_skew,
        'samples': samples,
        'clamped_samples': clamped_samples,
    }

def print_analysis(result):
    """Print analysis results"""
    print(f"\n{'='*70}")
    print(f"Wind Speed: {result['base_wind']:.1f} mph ± {result['wind_sd']:.1f} mph SD")
    print(f"{'='*70}")
    print(f"Negative samples: {result['negative_count']:,} ({result['negative_pct']:.2f}%)")
    print(f"\nOriginal Gaussian:")
    print(f"  Mean: {result['original_mean']:.3f} mph")
    print(f"  Std Dev: {result['original_std']:.3f} mph")
    print(f"  Skewness: {result['original_skew']:.4f}")
    print(f"\nAfter clamping to >= 0:")
    print(f"  Mean: {result['clamped_mean']:.3f} mph (bias: +{result['clamped_mean'] - result['original_mean']:.3f})")
    print(f"  Std Dev: {result['clamped_std']:.3f} mph (reduced by {result['original_std'] - result['clamped_std']:.3f})")
    print(f"  Skewness: {result['clamped_skew']:.4f} (RIGHT-SKEWED!)")

    # Calculate how many sigma below mean gets you to zero
    sigma_to_zero = result['base_wind'] / result['wind_sd']
    print(f"\nZero is {sigma_to_zero:.2f} standard deviations below the mean")
    print(f"This creates a pileup at zero and a long tail to the right")

def theoretical_negative_probability(base_wind, wind_sd):
    """Calculate theoretical probability of negative samples"""
    # For Gaussian N(μ, σ), P(X < 0) = Φ(-μ/σ) where Φ is standard normal CDF
    z_score = -base_wind / wind_sd
    prob = stats.norm.cdf(z_score)
    return prob * 100

# Analyze default uncertainty levels
print("TEARDROP PATTERN ROOT CAUSE ANALYSIS")
print("=" * 70)
print("\nAnalyzing default uncertainty configurations...")

configs = [
    ("High Confidence", 5, 1),      # Typical good conditions
    ("Medium Confidence", 5, 2.5),   # DEFAULT
    ("Low Confidence", 5, 5),        # High uncertainty
    ("Zero Wind Case", 0, 2.5),      # Worst case - zero base wind
    ("Low Wind Case", 2, 2.5),       # Low wind with medium SD
]

results = []
for name, base, sd in configs:
    result = analyze_clamping(base, sd)
    result['name'] = name
    results.append(result)
    print_analysis(result)

# Create visualization
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
fig.suptitle('Wind Speed Clamping Impact Analysis', fontsize=16, fontweight='bold')

for idx, result in enumerate(results[:6]):
    if idx >= 6:
        break

    row = idx // 3
    col = idx % 3
    ax = axes[row, col]

    # Create histogram comparison
    bins = np.linspace(-10, 20, 100)
    ax.hist(result['samples'], bins=bins, alpha=0.5, label='Original Gaussian',
            density=True, color='blue')
    ax.hist(result['clamped_samples'], bins=bins, alpha=0.5, label='After Clamping',
            density=True, color='red')

    ax.axvline(0, color='black', linestyle='--', linewidth=2, label='Zero (clamp point)')
    ax.axvline(result['base_wind'], color='green', linestyle='--', linewidth=1,
               label=f'Mean ({result["base_wind"]:.1f})')

    ax.set_xlabel('Wind Speed (mph)')
    ax.set_ylabel('Probability Density')
    ax.set_title(f'{result["name"]}\n{result["negative_pct"]:.1f}% clamped, skew={result["clamped_skew"]:.2f}')
    ax.legend(fontsize=8)
    ax.grid(True, alpha=0.3)

plt.tight_layout()
plt.savefig('/home/justin/projects/openwez/packages/web-app/clamping_analysis.png', dpi=150, bbox_inches='tight')
print(f"\n{'='*70}")
print("Visualization saved to: clamping_analysis.png")
print(f"{'='*70}")

# Summary and recommendations
print("\n" + "="*70)
print("SUMMARY AND IMPLICATIONS")
print("="*70)
print("\n1. THE TEARDROP PATTERN IS CAUSED BY:")
print("   - Negative wind samples being clamped to zero")
print("   - This creates a pile-up at zero drift")
print("   - Positive samples extend naturally, creating the 'tail'")
print("   - Result: RIGHT-SKEWED (positive skew) horizontal distribution")

print("\n2. SEVERITY BY CONFIDENCE LEVEL:")
for result in results:
    print(f"   {result['name']:20s}: {result['negative_pct']:5.2f}% clamped, skew={result['clamped_skew']:6.3f}")

print("\n3. WHY THIS IS PROBLEMATIC:")
print("   - Distribution is no longer Gaussian")
print("   - Mean shifts higher (overestimates drift)")
print("   - Standard deviation is artificially reduced")
print("   - Statistical analysis assumes Gaussian, but data is skewed")
print("   - Visual pattern (teardrop) confuses users")

print("\n4. WHEN IT'S WORST:")
print("   - Low base wind speed")
print("   - High wind speed uncertainty (SD)")
print("   - Ratio: base/SD < 2 causes significant clamping")

print("\n5. RECOMMENDED FIXES:")
print("   A. Truncated Normal Distribution:")
print("      - Use scipy.stats.truncnorm(0, inf, loc=base, scale=SD)")
print("      - Properly handles the boundary at zero")
print("      - Maintains statistical correctness")
print("")
print("   B. Lognormal Distribution:")
print("      - Naturally bounded at zero")
print("      - Physically realistic for wind speed")
print("      - Common in meteorological modeling")
print("")
print("   C. Reduce SD when base is low:")
print("      - SD = min(windSpeedSD, baseWind / 2)")
print("      - Prevents excessive negative values")
print("      - Simple but somewhat ad-hoc")
print("")
print("   D. Validate and warn user:")
print("      - If windSpeedSD > baseWind, show warning")
print("      - Suggest reducing SD or increasing base wind")
print("      - Let user make informed decision")

print("\n6. SAME ISSUE AFFECTS:")
print("   - Muzzle velocity (if SD is large relative to base)")
print("   - Any parameter where Math.max(0, ...) is used")
print("   - Check: zeroRange might also be clamped")

print("\n" + "="*70)
print("VERIFICATION")
print("="*70)
print("\nTo verify this is the teardrop cause:")
print("1. Run simulation with windSpeed=5, windSpeedSD=2.5")
print("2. Observe horizontal teardrop in scatter plot")
print("3. Change to windSpeed=10, windSpeedSD=2.5")
print("4. Teardrop should be much less pronounced (only 0.02% clamped)")
print("5. Change to windSpeed=0, windSpeedSD=2.5")
print("6. Should see extreme teardrop (50% of samples clamped!)")
