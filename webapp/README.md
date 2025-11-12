# Rule of Slater - Web Application

A web-based educational tool for calculating atomic energies using Slater's Rules.

> **For educational purposes only** - Energies calculated with Slater's Rules are not accurate compared to sophisticated quantum mechanical calculations.

## About

This is a modern web application port of the original PyQt5 desktop application. It allows users to:

- Select chemical elements by atomic number (Z) or symbol
- Input electronic configurations (supports noble gas core notation)
- Calculate effective nuclear charges (Zeff) for each orbital group
- Compute individual orbital energies and total electronic energy
- Compare two different electronic configurations (e.g., ground state vs excited state)

## Features

- **Pure Frontend Application**: All calculations run in the browser - no server required
- **React + Material-UI**: Modern component-based UI with Material Design
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Calculations**: Instant energy calculations as you type
- **Error Handling**: Clear validation messages for invalid configurations
- **Noble Gas Notation**: Supports shorthand notation like `[Ne] 3s2 3p1`

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and development server
- **Material-UI (MUI)** - Component library
- **JavaScript (ES6+)** - Programming language

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation

1. Navigate to the webapp directory:
   ```bash
   cd webapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode

Start the development server with hot module reloading:

```bash
npm run dev
```

The application will be available at **http://localhost:5173/**

### Production Build

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Usage

### Selecting an Element

1. Enter the atomic number (Z) in the "Z" field, or
2. Enter the element symbol in the "element" field

The application supports all elements from H (Z=1) to Og (Z=118).

### Entering Electronic Configurations

You can enter electronic configurations in two formats:

**Standard notation:**
```
1s2 2s2 2p6 3s2 3p1
```

**Noble gas core notation:**
```
[Ne] 3s2 3p1
```

Both configurations above represent Aluminum (Al, Z=13).

### Reading the Results

For each configuration, the application displays:

- **Orbital groups**: Grouped according to Slater's rules
- **Zeff (i)**: Effective nuclear charge for each group
- **-E (i)**: Energy per electron for each orbital (in eV)
- **E total**: Total electronic energy (in eV)

At the bottom, you'll see the **energy difference** (E2 - E1) between the two configurations.

### Example Calculations

**Hydrogen (Z=1) ground state:**
- Configuration: `1s1`
- Total energy: -13.60 eV

**Carbon (Z=6) ground state:**
- Configuration: `1s2 2s2 2p2` or `[He] 2s2 2p2`

**Iron (Z=26) ground state:**
- Configuration: `[Ar] 3d6 4s2`

## Project Structure

```
webapp/
├── public/               # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── AtomSelector.jsx
│   │   ├── Calculator.jsx
│   │   └── Configuration.jsx
│   ├── data/           # Constants and element data
│   │   └── constants.js
│   ├── utils/          # Calculation logic
│   │   └── slaterCalculations.js
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── index.html          # HTML template
├── package.json        # Dependencies
└── vite.config.js      # Vite configuration
```

## Slater's Rules Implementation

The application implements Slater's empirical rules for calculating shielding constants:

1. **Orbital Grouping**: Electrons are grouped as follows:
   - 1s alone
   - 2s and 2p together
   - 3s and 3p together; 3d separate
   - 4s and 4p together; 4d separate; 4f separate
   - etc.

2. **Shielding Values**:
   - Electrons in the same group: σ = 0.35 (except 1s where σ = 0.30)
   - Electrons in n-1 shell for s/p electrons: σ = 0.85
   - Electrons in lower shells: σ = 1.00

3. **Effective Nuclear Charge**:
   ```
   Zeff = Z - σ
   ```

4. **Orbital Energy**:
   ```
   E = -13.6 eV × N × (Zeff/n*)²
   ```
   where n* is the effective principal quantum number

## Deployment

This application can be deployed to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder after `npm run build`
- **Vercel**: Connect your repository and deploy automatically
- **GitHub Pages**: Use `gh-pages` package to deploy
- **AWS S3**: Upload the `dist` folder to an S3 bucket

## Limitations

- Slater's Rules are approximate and give less accurate results than:
  - Hartree-Fock calculations
  - Density Functional Theory (DFT)
  - Configuration Interaction methods
- Best used for qualitative understanding, not quantitative predictions
- Most accurate for elements in the first three periods

## Credits

Original PyQt5 desktop application by Ricardo Garcia Serres (2022)

Web application conversion (2025)

## License

Educational use only
