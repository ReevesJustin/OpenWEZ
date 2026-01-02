# Changelog

All notable changes to OpenWEZ will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2026-01-02

### Added

- **Disclaimer and Educational Notice**
  - Comprehensive disclaimer added to Information page
  - Clarifies educational/informational purpose of the tool
  - No warranty statement for calculations and results
  - Encourages validation against commercial software (Applied Ballistics, Strelok Pro, JBM Ballistics)
  - User responsibility statement for safety and verification
  - Visually distinct warning-styled section with orange border and background

- **Humidity Documentation**
  - Added explanation that relative humidity is fixed at 50% for all calculations
  - Documents that humidity has negligible effect on trajectory (<7% air density impact)
  - Explains design decision to simplify UI by removing unnecessary input parameter

### Improved

- **Number Input UX Enhancement**
  - All number inputs now select-all text on focus for easy value replacement
  - Empty values allowed while editing (no auto-population mid-type)
  - Sensible defaults applied when leaving field empty
  - Significantly improves mobile and touch input experience
  - Applied to all inputs: trajectory calculator, Monte Carlo settings, and trajectory comparison

### Files Added
- `packages/web-app/src/hooks/useNumberInput.ts` - Custom hook for improved number input behavior

### Files Modified
- `packages/web-app/src/components/InputForm.tsx` - Applied improved input UX
- `packages/web-app/src/components/MonteCarloControls.tsx` - Applied improved input UX
- `packages/web-app/src/components/TrajectoryComparison.tsx` - Applied improved input UX
- `packages/web-app/src/components/Information.tsx` - Added disclaimer section
- `packages/web-app/src/App.css` - Added disclaimer styling

## [1.0.1] - 2026-01-02

### Added

- **CSV Export Functionality**
  - Export trajectory data to CSV with columns: Range, Drop, Drift, Velocity, Energy, Time of Flight
  - Export Monte Carlo results to CSV with target config, statistics, P(hit) by range, and impact points
  - Export trajectory comparison data to CSV with all loads side-by-side
  - Export buttons in trajectory table, simulation results, and trajectory comparison
  - Timestamp-based filenames (e.g., `trajectory-2026-01-02.csv`, `trajectory-comparison-2026-01-02.csv`)
  - Data portability for Excel, Google Sheets, R, Python analysis

- **Early Termination on Zero Velocity**
  - Added velocity check in ballistic solver to prevent NaN/overflow
  - Terminates calculation when velocity drops below 0.1 fps
  - Applied to main trajectory loop, exact max_range calculation, and zero angle solver
  - Improves robustness for extreme scenarios

### Files Added
- `packages/web-app/src/utils/exportData.ts` - Export utility functions

### Files Modified
- `packages/wasm-ballistics/src/solver.rs` - Early termination checks
- `packages/web-app/src/components/TrajectoryTable.tsx` - Export button
- `packages/web-app/src/components/SimulationResults.tsx` - Export button
- `packages/web-app/src/components/TrajectoryComparison.tsx` - Export button
- `packages/web-app/src/utils/exportData.ts` - Trajectory comparison export functions

## [1.0.0] - 2026-01-02

### Added

#### Features
- **Weather Data Integration** (Code Complete, UI Disabled)
  - OpenWeatherMap API integration for automatic environmental data loading
  - Support for zip code (US) and city name (worldwide) lookups
  - Auto-population of temperature, pressure, humidity, wind speed, wind direction, and altitude
  - Graceful degradation when API key not configured
  - Weather widget component (disabled in live deployment)
  - Unit conversion from API format to ballistic parameters

- **BC Uncertainty in Monte Carlo Simulation**
  - Added ballistic coefficient uncertainty as 6th uncertainty parameter
  - Specified as percentage (e.g., 1.0 = 1% BC uncertainty)
  - Default presets: High (0.5%), Medium (1.0%), Low (2.0%)
  - UI control in Monte Carlo Settings panel
  - Affects vertical dispersion at long range

- **Transonic/Subsonic Precision Improvement**
  - Linear interpolation for precise threshold detection
  - Accuracy improved from ±25-50 yards to ±1 yard
  - Applied to both trajectory calculator and comparison views

#### Documentation
- Comprehensive README.md with feature overview and quick start
- User Guide (docs/USER_GUIDE.md) with complete usage instructions
- Updated deployment documentation (docs/deploy.md) with weather API setup
- Web app README with detailed setup instructions
- Mathematical equations documentation (docs/equations.md v1.2)
- Bug fixes and features log (docs/bugfix.md)
- .env.example template for environment variables

### Fixed

- **Drop Calculation Error** (Critical)
  - Fixed unit conversion issues (feet vs inches)
  - Added 1.66 scaling factor to drag formula for dimensional consistency
  - Implemented iterative bisection solver for zero angle calculation
  - Improved accuracy from 6.44x error to 1.8% at 1000 yards

- **Maximum Range Output Mismatch**
  - Trajectories now stop at exact user-requested max_range
  - Fixed loop condition from `max_range * 3.0` to `max_range`
  - Ensures exact max_range point is calculated when needed

- **Monte Carlo Iteration Limit**
  - Changed maximum iterations from 10,000 to 5,000

- **Trajectory Comparison Threshold Highlighting**
  - Changed from row-level to per-load cell-level highlighting
  - Each load now shows its own transonic/subsonic thresholds independently
  - Fixed issue where all loads were highlighted at same range

- **Wind Drift Display**
  - Added drift column to trajectory table
  - Added drift dataset to trajectory chart (teal line)
  - Drift now visible alongside drop data

- **Unit Selection for Drop/Drift**
  - Added display unit selector (inches, MOA, MIL)
  - Implemented accurate unit conversion formulas
  - Applied to both trajectory table and comparison view

### Changed

- Updated equations documentation to v1.2 with BC uncertainty formulas
- Improved trajectory table with drift column and unit selector
- Enhanced Monte Carlo controls with BC uncertainty input
- Updated all documentation to reflect v1.0 feature set

### Technical Improvements

- WebAssembly ballistic solver with RK4 integration
- 3DoF point-mass trajectory model
- G1 and G7 drag model support
- Zustand state management with persistence
- React 18 + TypeScript architecture
- Chart.js visualization
- Web Workers for Monte Carlo background processing

### Deployment

- Deployed to GitHub Pages: https://reevesjustin.github.io/OpenWEZ/
- Configured for static hosting with gh-pages
- Weather API feature disabled in live deployment (code intact for local use)

## [0.9.0] - 2026-01-01

### Initial Development Release

- Basic trajectory calculator
- Monte Carlo simulation
- Trajectory comparison
- Chart visualization
- WASM ballistic solver

---

## Future Roadmap

### Planned Features

- **6DoF Ballistic Solver**
  - Full 6 degrees of freedom
  - Spin drift modeling
  - Magnus effect
  - Aerodynamic jump

- **Additional Drag Models**
  - G5, G8 models
  - Custom drag curves
  - Drag curve interpolation

- **Coriolis Effect**
  - Earth rotation correction
  - Latitude-dependent calculations
  - Azimuth angle effects

- **UI/UX Enhancements**
  - Mobile responsiveness
  - Dark mode
  - Saved load profiles
  - Printable reports

### Known Limitations

- 3DoF model (no spin drift)
- Static environmental conditions (no altitude/temperature variation along trajectory)
- No scope cant correction
- No inclination/decline angle support

---

## Version History

- **1.0.2** (2026-01-02) - Number input UX improvements for mobile and desktop
- **1.0.1** (2026-01-02) - CSV export and velocity termination improvements
- **1.0.0** (2026-01-02) - Production release with BC uncertainty, weather integration (code), and precision improvements
- **0.9.0** (2026-01-01) - Initial development release

---

**Notes:**
- Weather API integration is complete and functional but disabled in the live deployment
- To enable weather features locally, configure `VITE_OPENWEATHER_API_KEY` in `.env` file
- All ballistic calculations validated against JBM Ballistics (1.8% accuracy at 1000 yards)

For detailed bug fixes and technical changes, see [docs/bugfix.md](docs/bugfix.md)
