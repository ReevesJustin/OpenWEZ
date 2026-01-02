export function Information() {
  return (
    <div className="information-content">
      <h2>OpenWEZ - Ballistic Modeling Tool</h2>

      <section className="info-section">
        <h3>Tool Overview</h3>
        <p>
          OpenWEZ is a ballistic modeling tool that calculates projectile trajectories and
          estimates weapon employment zones through Monte Carlo simulation. The tool accounts
          for environmental conditions, projectile characteristics, and various sources of uncertainty.
        </p>
      </section>

      <section className="info-section disclaimer">
        <h3>⚠️ Disclaimer</h3>
        <p>
          <strong>This tool is provided for educational and informational purposes only.</strong> OpenWEZ
          is experimental software developed for learning ballistics modeling techniques and should not be
          used as the sole basis for critical shooting applications.
        </p>
        <p>
          <strong>No Warranty:</strong> The developers make no guarantees regarding the accuracy, reliability,
          or correctness of the ballistic calculations or simulation results. Output values may contain errors
          or deviate from real-world performance due to model simplifications, numerical approximations, or
          implementation limitations.
        </p>
        <p>
          <strong>Validation Required:</strong> Users are strongly encouraged to validate all outputs against
          established commercial ballistic software (such as Applied Ballistics, Strelok Pro, or JBM Ballistics)
          and real-world field testing. Do not rely on OpenWEZ predictions for hunting, competition, or
          tactical applications without independent verification.
        </p>
        <p>
          <strong>User Responsibility:</strong> Safe firearm handling, proper ballistic data collection, and
          verification of trajectory predictions are the sole responsibility of the user. Always follow
          established safety protocols and use multiple sources of data for important applications.
        </p>
      </section>

      <section className="info-section">
        <h3>Using the Tool</h3>
        <p><strong>Trajectory Calculator:</strong> Computes a single trajectory based on your inputs.
        Enter projectile characteristics (weight, ballistic coefficient, muzzle velocity),
        environmental conditions (temperature, pressure, wind), and rifle settings (zero range, sight height).
        Click "Calculate Trajectory" to see the ballistic path.</p>

        <p><strong>Trajectory Comparison:</strong> Compare up to 4 different loads side-by-side using
        the same environmental conditions and rifle settings. This tool helps you visualize how different
        bullet weights, velocities, and ballistic coefficients affect trajectory, drift, velocity retention,
        and energy delivery at various ranges.</p>

        <p><strong>Monte Carlo Simulation:</strong> Runs multiple trajectory simulations with random
        variations in wind, velocity, and range to estimate hit probability on a target. Configure
        the number of iterations, uncertainties, target size, and rifle precision (Mean Radius),
        then click "Run Monte Carlo" to see probabilistic results.</p>
      </section>

      <section className="info-section">
        <h3>Wind Convention</h3>
        <p>Wind direction is specified using the following convention:</p>
        <ul>
          <li><strong>0 degrees</strong> = Headwind (wind from shooter to target)</li>
          <li><strong>90 degrees</strong> = Right-to-left crosswind</li>
          <li><strong>180 degrees</strong> = Tailwind (wind from target to shooter)</li>
          <li><strong>270 degrees</strong> = Left-to-right crosswind</li>
        </ul>
      </section>

      <section className="info-section">
        <h3>Default Parameters</h3>
        <ul>
          <li><strong>Sight Height (Height Over Bore):</strong> Default is 1.5 inches. This represents
          the vertical distance from the center of the bore to the center of the scope or sights.
          Adjust this value if your rifle has a different configuration (higher scope mounts,
          offset iron sights, or chassis systems with raised optics).</li>

          <li><strong>Relative Humidity:</strong> Fixed at 50% for all calculations. Humidity has
          a negligible effect on trajectory compared to other atmospheric variables like temperature
          and pressure. Even across the full range from 0% to 100% humidity, the impact on air density
          is less than 7%, which translates to minimal changes in bullet drop and drift. To simplify
          the interface and reduce unnecessary input complexity, humidity is held constant at a typical
          mid-range value. This assumption does not meaningfully affect ballistic accuracy for practical
          shooting applications.</li>
        </ul>
      </section>

      <section className="info-section">
        <h3>Rifle Precision: Mean Radius (MR)</h3>
        <p>
          Mean Radius (MR) is a measure of rifle/ammunition precision that represents the average
          distance of shot impacts from the group center. Unlike other metrics (like group size or MOA),
          MR provides a more robust statistical measure of dispersion that is less sensitive to
          outliers and works well for modeling random shot placement in Monte Carlo simulations.
        </p>
        <p>
          <strong>Obtaining MR:</strong> Ideally, Mean Radius should be determined from actual
          shooting tests with your specific rifle and ammunition. Calculate it by measuring the
          distance of each shot from the group center and taking the average of those distances.
        </p>
        <p>
          <strong>Approximate Conversion:</strong> If you only have Extreme Spread (ES) data,
          you can use this rough approximation:
        </p>
        <div className="conversion-formula">
          <strong>MR ≈ ES × 0.3</strong>
        </div>
        <p className="note">
          Note: This conversion factor is approximate and assumes a normal distribution.
          Actual testing is recommended for accurate results.
        </p>
      </section>
    </div>
  );
}
