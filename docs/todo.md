~~add an early termination for solvers when velocity = 0 to prevent overflow or NaN situations.~~ ✓ COMPLETED (2026-01-02)
~~export results to report, tables~~ ✓ COMPLETED (2026-01-02) - CSV export for trajectory and Monte Carlo

## Dark/Light Mode Toggle

Implement theme switching with CSS Variables + Zustand Store (Option 1)

**Implementation Steps:**

1. **Add theme to Zustand store** (`packages/web-app/src/agents/state-management/store.ts`)
   - Add `theme: 'light' | 'dark'` to state interface
   - Add `setTheme` action
   - Default to `'dark'` mode
   - Automatic persistence via existing localStorage setup

2. **Define CSS variables** (`packages/web-app/src/App.css`)
   - Create `:root` with light mode color variables
   - Create `[data-theme="dark"]` with dark mode color variables
   - Variables to include:
     - Background colors (primary, secondary, tertiary)
     - Text colors (primary, secondary, muted)
     - Border colors
     - Accent/link colors
     - Input/form colors
     - Table colors (rows, headers)
     - Chart colors (conditional logic needed)
     - Warning/error colors
     - Disclaimer section colors (light/dark variants)

3. **Update App.tsx to apply theme**
   - Use `useEffect` to set `data-theme` attribute on `document.documentElement`
   - Listen to theme changes from store

4. **Create theme toggle component**
   - Moon/sun icon toggle button OR text button
   - Place in app header/navigation area
   - onClick toggles between 'light' and 'dark'
   - Visual indicator of current theme

5. **Refactor all hardcoded colors to CSS variables**
   - App.css - all component styles
   - Inline styles in components
   - Chart.js configurations (theme-aware)

6. **Special cases to handle:**
   - Chart.js colors (grid lines, axes, tooltips, datasets)
   - Disclaimer warning section (needs dark variant)
   - Input focus states
   - Disabled states
   - Table row alternating colors
   - Button hover/active states

7. **Testing:**
   - Test all tabs in both modes
   - Verify charts render correctly
   - Check form inputs and interactions
   - Ensure contrast/readability
   - Test localStorage persistence

