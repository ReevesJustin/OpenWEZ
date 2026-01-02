# OpenWEZ - Open-Source Weapon Employment Zone Modeling

Browser-based precision ballistics calculator with Monte Carlo simulation for Weapon Employment Zone (WEZ) analysis. Built with Rust/WebAssembly for high-performance trajectory calculations.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Computation**: Rust/WebAssembly
- **State**: Zustand
- **Solver**: Rust (compiled to WebAssembly)
- **Visualization**: Chart.js


### Ballistic Trajectory Calculator
- **3DoF Point-Mass Solver**: Trajectory modeling using 4th-order Runge-Kutta integration
- **Multiple Drag Models**: Support for G1 and G7 ballistic coefficient standards
- **Unit Flexibility**: Display drop/drift in inches, MOA (Minutes of Angle), or MIL (Milliradians)
- **Transonic Detection**: Precise identification of transonic (Mach 1.2) and subsonic (Mach 1.0) ranges (±1 yard accuracy)
- **CSV Export**: Export trajectory data for analysis in Excel, Google Sheets, R, or Python

### Monte Carlo Simulation
- **Statistical WEZ Analysis**: Probability of hit analysis at all ranges
- **Uncertainties**: Muzzle velocity, BC (ballistic coefficient), wind speed/direction, range error, rifle precision
- **Dual Dispersion View**: Separate ballistic and total (with rifle precision) impact distributions
- **Interactive Visualization**: Impact scatter plots and probability curves
- **CSV Export**: Export complete simulation results with statistics and impact points

### Trajectory Comparison
- **Multi-Load Analysis**: Compare up to 4 different loads side-by-side
- **Per-Load Thresholds**: Individual transonic/subsonic detection for each load
- **CSV Export**: Export comparison data for external analysis and record-keeping

## Live Demo

**Try it now:** [https://reevesjustin.github.io/OpenWEZ/](https://reevesjustin.github.io/OpenWEZ/)


## Project Structure

```
openwez/
├── packages/
│   ├── wasm-ballistics/          # Rust ballistic engine
│   │   ├── src/
│   │   │   ├── solver.rs         # 3DoF trajectory solver
│   │   │   ├── drag_models.rs    # G1/G7 drag tables
│   │   │   ├── atmosphere.rs     # Atmospheric model
│   │   │   └── lib.rs            # WASM bindings
│   │   └── Cargo.toml
│   │
│   └── web-app/                  # React web application
│       ├── src/
│       │   ├── components/       # UI components
│       │   ├── agents/           # Agent architecture modules
│       │   ├── types/            # TypeScript type definitions
│       │   ├── utils/            # Utility functions
│       │   └── workers/          # Web Workers (Monte Carlo)
│       └── package.json
│
└── docs/                         # Documentation
    ├── equations.md              # Mathematical foundations
    ├── bugfix.md                 # Bug fixes and features log

```

## Local Development

### Prerequisites

- **Node.js** 18+ and npm
- **Rust** 1.70+ and cargo
- **wasm-pack** (install: `cargo install wasm-pack`)

### Setup and Build

```bash
# Clone repository
git clone https://github.com/reevesjustin/OpenWEZ.git
cd OpenWEZ

# Build WASM ballistics module
cd packages/wasm-ballistics
wasm-pack build --target web

# Install web app dependencies
cd ../web-app
npm install

# (Optional) Configure weather API
cp .env.example .env
# Edit .env and add your OpenWeatherMap API key

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
cd packages/web-app
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

## Contributing

Contributions are welcome! Areas for improvement:

1. **6DoF Solver**: Upgrade from 3DoF to full 6-degree-of-freedom model (spin drift, Magnus effect)
2. **Additional Drag Models**: G5, G8, custom drag curves
3. **Coriolis Effect**: Long-range ballistic correction for Earth's rotation
4. **Ballistic Solver Optimization**: Further performance improvements
5. **UI/UX Enhancements**: Dark/light mode toggle (planned), enhanced mobile responsiveness
6. **Advanced Features**: Inclination/decline angle support, scope cant correction, altitude variation along trajectory

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Drag Models**: U.S. Army Ballistic Research Laboratory
- **Mathematical Reference**: McCoy, R. L. (1999). *Modern Exterior Ballistics*
- **Applied Ballistics**: Bryan Litz's work on G7 BC standards

---

**Version**: 1.0.2
**Last Updated**: January 2026
**Status**: Production Beta ✓
