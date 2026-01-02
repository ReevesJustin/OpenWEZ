# OpenWEZ Web Application

Open-source Weapon Employment Zone (WEZ) modeling web application for precision ballistic calculations and Monte Carlo simulation.

## Features

- **3DoF Ballistic Trajectory Calculator**: Accurate point-mass trajectory solver using RK4 integration
- **Monte Carlo Simulation**: Statistical WEZ analysis with uncertainty quantification (including BC uncertainty)
- **Trajectory Comparison**: Side-by-side comparison of up to 4 different loads
- **CSV Export**: Export trajectory, comparison, and Monte Carlo data for external analysis
- **Real-time Weather Data**: Fetch current environmental conditions from any location (local development only)
- **Multiple Display Units**: View drop/drift in inches, MOA, or MIL
- **Mobile-Optimized Input**: Smart number inputs with select-all on focus and sensible defaults
- **Precise Threshold Detection**: Transonic/subsonic identification with ±1 yard accuracy
- **Educational Disclaimers**: Clear guidance on tool limitations and validation requirements

## Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
cd packages/web-app
npm install
```

### Weather Data Feature (Optional)

The application includes a "Load Weather Data" feature that automatically populates environmental conditions (temperature, pressure, humidity, wind speed, wind direction, altitude) from current weather at any zip code or city.

**To enable this feature:**

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key (free tier allows 1,000 calls/day)

2. Create a `.env` file in this directory:
   ```bash
   cp .env.example .env
   ```

3. Add your API key to `.env`:
   ```
   VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

**Note:** The weather feature is optional. If no API key is configured, you can still manually enter all environmental parameters.

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

```bash
# Deploy to GitHub Pages
npm run deploy
```

## Project Structure

```
src/
├── agents/                    # Agent-based architecture modules
│   ├── state-management/      # Zustand store with persistence
│   ├── visualization/         # Chart components (Chart.js)
│   ├── wasm-bridge/           # WebAssembly interface
│   └── monte-carlo/           # Monte Carlo simulation logic
├── components/                # React components
│   ├── InputForm.tsx          # Ballistic parameter inputs
│   ├── WeatherWidget.tsx      # Weather data integration
│   ├── TrajectoryTable.tsx    # Trajectory data display with export
│   ├── TrajectoryComparison.tsx
│   ├── MonteCarloControls.tsx
│   ├── SimulationResults.tsx
│   └── Information.tsx        # Documentation and disclaimers
├── hooks/                     # Custom React hooks
│   └── useNumberInput.ts      # Improved number input UX
├── types/                     # TypeScript type definitions
├── utils/                     # Utility functions
│   ├── weatherApi.ts          # Weather API integration
│   ├── unitConversion.ts      # Unit conversion utilities
│   └── exportData.ts          # CSV export functionality
└── workers/                   # Web Workers
    └── monte-carlo.worker.ts  # Background Monte Carlo simulation
```

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Zustand** - State management
- **Chart.js** - Data visualization
- **WebAssembly (Rust)** - High-performance ballistic solver
- **OpenWeatherMap API** - Real-time weather data

## Environment Variables

- `VITE_OPENWEATHER_API_KEY` - OpenWeatherMap API key (optional, for weather data feature)

## License

See root LICENSE file
