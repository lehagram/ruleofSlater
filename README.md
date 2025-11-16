# Rule of Slater

An educational tool for calculating atomic energies using Slater's empirical rules. Available as both a desktop application and a web application.

> **For educational purposes only** - Energies calculated with Slater's Rules are approximate and not accurate compared to sophisticated quantum mechanical calculations.

## About

This project provides an interactive calculator for computing effective nuclear charges (Zeff) and orbital energies based on Slater's Rules. It allows users to input electronic configurations and instantly see the calculated energies for different atomic states.

## Versions

### Desktop Application (PyQt5)

The original desktop application built with PyQt5, providing a native GUI experience.

**Location:** `src/main/python/`

**Requirements:**
- Python 3
- PyQt5
- NumPy
- fbs (fman build system)

**Installation:**
```bash
pip install -r requirements/base.txt
```

**Running:**
```bash
python src/main/python/main.py
```

**Windows Installer:**
A pre-built Windows installer is available in `target/ruleofSlaterSetup.exe`

### Web Application (React)

A modern web-based version with responsive design that runs entirely in the browser.

**Location:** `webapp/`

**Features:**
- Pure frontend application - no server required
- React 18 + Material-UI components
- Responsive design for desktop, tablet, and mobile
- Real-time calculations
- Noble gas notation support

**Quick Start:**
```bash
cd webapp
npm install
npm run dev
```

The web app will be available at http://localhost:5173/

For detailed instructions, see [webapp/README.md](webapp/README.md)

Also available online (gitHub Pages) at https://lehagram.github.io/ruleofSlater/

## Features

- **Element Selection:** Choose elements by atomic number (Z=1 to Z=118) or symbol
- **Electronic Configurations:** Support for both standard notation and noble gas core notation
  - Standard: `1s2 2s2 2p6 3s2 3p1` (Aluminum)
  - Noble gas: `[Ne] 3s2 3p1` (Aluminum)
- **Energy Calculations:**
  - Effective nuclear charge (Zeff) for each orbital group
  - Individual orbital energies
  - Total electronic energy in eV
- **Configuration Comparison:** Compare energies between two different electronic states (e.g., ground state vs excited state)

## Slater's Rules

The calculator implements Slater's empirical rules for calculating shielding constants:

### Orbital Grouping
Electrons are grouped as follows:
- 1s (alone)
- 2s and 2p (together)
- 3s and 3p (together); 3d (separate)
- 4s and 4p (together); 4d (separate); 4f (separate)
- And so on for higher shells

### Shielding Values (σ)
- Electrons in the same group: σ = 0.35 (except 1s where σ = 0.30)
- Electrons in n-1 shell for s/p electrons: σ = 0.85
- Electrons in lower shells: σ = 1.00

### Effective Nuclear Charge
```
Zeff = Z - σ
```

### Orbital Energy
```
E = -13.6 eV × N × (Zeff/n*)²
```
where:
- N = number of electrons in the orbital
- n* = effective principal quantum number
- Zeff = effective nuclear charge

## Example Usage

**Hydrogen (Z=1) ground state:**
- Configuration: `1s1`
- Total energy: -13.60 eV

**Carbon (Z=6) ground state:**
- Configuration: `1s2 2s2 2p2` or `[He] 2s2 2p2`

**Iron (Z=26) ground state:**
- Configuration: `[Ar] 3d6 4s2`

## Project Structure

```
ruleofSlater/
├── src/
│   └── main/
│       └── python/
│           └── main.py          # PyQt6 desktop application
├── webapp/                       # React web application
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── data/                # Element data and constants
│   │   └── utils/               # Calculation logic
│   └── README.md                # Web app documentation
├── target/
│   └── ruleofSlaterSetup.exe   # Windows installer
└── requirements/
    └── base.txt                 # Python dependencies
```

## Limitations

Slater's Rules provide approximate values and are less accurate than:
- Hartree-Fock calculations
- Density Functional Theory (DFT)
- Configuration Interaction methods
- Other sophisticated quantum mechanical approaches

The method is best used for:
- Qualitative understanding of atomic structure
- Educational purposes
- Quick estimates
- First three periods of the periodic table (most accurate)

## Credits

**Original Desktop Application:** Ricardo Garcia Serres (2022)

**Web Application:** Converted from PyQt5 to React (2025)

## License

Educational use only
