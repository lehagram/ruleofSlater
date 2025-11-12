// ##########################################################################
// ###       Slater's Rules Calculation Logic                           ####
// ###                   *for educational purposes*                      ####
// ###  **Energies calculated with Slater's Rules are not accurate**     ####
// ##########################################################################

import { orbitals, structures, symbols, groups, E0, neff } from '../data/constants';

/**
 * Test if an orbital string is valid
 * @param {string} orb - Orbital string (e.g., "2p6")
 * @returns {Array|null} - [n, l, N] array or null if invalid
 */
export function testOrbital(orb) {
  for (let i = 0; i < orbitals.length; i++) {
    const x = orbitals[i];
    const parts = orb.split(x);

    if (parts.length === 2) {
      const nN = parts.map(part => {
        if (/^\d+$/.test(part)) {
          return parseInt(part, 10);
        }
        return null;
      });

      if (nN[0] !== null && nN[1] !== null) {
        const l = i;
        return [nN[0], l, nN[1]];
      }
      return null;
    }
  }
  return null;
}

/**
 * Develop noble gas core notation into full notation
 * @param {string} struc - Electronic structure (possibly with noble gas core)
 * @returns {string} - Fully expanded structure
 */
export function developStructure(struc) {
  const parts = struc.split(/\s+/);
  const first = parts[0];

  // Check if first part is a noble gas core like [Ne]
  if (first.startsWith('[') && first.endsWith(']')) {
    const ng = first.slice(1, -1);
    if (symbols.includes(ng)) {
      const index = symbols.indexOf(ng);
      parts[0] = structures[index];
      return developStructure(parts.join(' '));
    }
  }

  return struc;
}

/**
 * Analyze electronic structure string
 * @param {string} strc - Electronic structure string
 * @returns {Object} - {nlN: Array, sij: Array, error: string|null}
 */
export function analyzeStructure(strc) {
  const orbList = strc.split(/\s+/).filter(s => s.length > 0);

  // Parse all orbitals
  const nlNlist = [];
  for (let i = 0; i < orbList.length; i++) {
    const orbTest = testOrbital(orbList[i]);
    if (orbTest) {
      nlNlist.push([...orbTest, i]);
    }
  }

  if (nlNlist.length === 0) {
    return { error: '' };
  }

  // Sort by n, then l, then N
  nlNlist.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    if (a[1] !== b[1]) return a[1] - b[1];
    return a[2] - b[2];
  });

  // Remove duplicates and keep only [n, l, N]
  const uniqueMap = new Map();
  nlNlist.forEach(([n, l, N]) => {
    const key = `${n},${l}`;
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, [n, l, N]);
    }
  });

  let nlNarr = Array.from(uniqueMap.values());

  // Check if first orbital is valid
  if (nlNarr[0][1] > (nlNarr[0][0] - 1)) {
    return { error: '  there is no such orbital' };
  }

  // Merge orbitals in same group and check validity
  const nlN = [nlNarr[0]];

  for (let i = 1; i < nlNarr.length; i++) {
    // Check for invalid orbitals
    if (nlNarr[i][1] > (nlNarr[i][0] - 1)) {
      return { error: '  there is no such orbital' };
    }

    // Merge with previous if same n and l
    const lastIdx = nlN.length - 1;
    if (nlNarr[i][0] === nlN[lastIdx][0] && nlNarr[i][1] === nlN[lastIdx][1]) {
      nlN[lastIdx][2] += nlNarr[i][2];
    } else {
      nlN.push(nlNarr[i]);
    }
  }

  nlNarr = nlN;

  // Check for overloaded orbitals
  if (nlNarr[0][2] > (4 * nlNarr[0][1] + 2)) {
    return { error: '   this orbital has too many electrons' };
  }

  const finalNlN = [nlNarr[0]];

  for (let i = 1; i < nlNarr.length; i++) {
    // Check for overloaded orbitals
    if (nlNarr[i][2] > (4 * nlNarr[i][1] + 2)) {
      return { error: 'orbital has too many electrons' };
    }

    // Merge s and p orbitals in same shell
    const lastIdx = finalNlN.length - 1;
    const merge = (nlNarr[i][0] === finalNlN[lastIdx][0]) &&
                  (nlNarr[i][1] + finalNlN[lastIdx][1] === 1);

    if (merge) {
      finalNlN[lastIdx][2] += nlNarr[i][2];
    } else {
      finalNlN.push(nlNarr[i]);
    }
  }

  // Build shielding (sigma) matrix
  const n = finalNlN.length;
  const sij = Array(n).fill(0).map(() => Array(n).fill(0));

  // Create lower triangular matrix with 0.35 on and below diagonal
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      sij[i][j] = 1.0;
    }
  }

  // Diagonal elements are 0.35
  for (let i = 0; i < n; i++) {
    sij[i][i] = 0.35;
  }

  // Special case for 1s orbital
  if (finalNlN[0][0] + finalNlN[0][1] === 1) {
    sij[0][0] = 0.3;
  }

  // Apply 0.85 for (n-1) electrons for s and p orbitals
  for (let j = 1; j <= 3; j++) {
    for (let i = j; i < n; i++) {
      if ((finalNlN[i][1] < 2) && (finalNlN[i - j][0] === finalNlN[i][0] - 1)) {
        sij[i][i - j] = 0.85;
      }
    }
  }

  return { nlN: finalNlN, sij: sij, error: null };
}

/**
 * Calculate orbital groups
 * @param {Array} nlN - Array of [n, l, N] arrays
 * @returns {Array} - Array of group names
 */
export function calculateGroups(nlN) {
  const gr = [];
  for (let i = 0; i < nlN.length; i++) {
    const n = nlN[i][0];
    const l = nlN[i][1];
    gr.push(groups[n - 1][l]);
  }
  return gr;
}

/**
 * Calculate effective nuclear charge (Zeff) for each orbital
 * @param {number} Z - Atomic number
 * @param {Array} nlN - Array of [n, l, N] arrays
 * @param {Array} sij - Shielding matrix
 * @returns {Array} - Array of Zeff values
 */
export function calculateZeff(Z, nlN, sij) {
  const n = nlN.length;
  const sig = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        sig[i] += nlN[j][2] * sij[i][j];
      }
    }
  }

  return sig.map(s => Z - s);
}

/**
 * Calculate orbital energies
 * @param {Array} nlN - Array of [n, l, N] arrays
 * @param {Array} Zeff - Array of effective nuclear charges
 * @returns {Array|null} - Array of energies or null if n > 6
 */
export function calculateEn(nlN, Zeff) {
  const L = nlN.length;
  const En = Array(L).fill(0);

  for (let i = 0; i < L; i++) {
    const n = nlN[i][0];
    const N = nlN[i][2];

    if (n > 6) {
      return null;
    }

    const nstar = neff[n - 1];
    En[i] = E0 * N * Math.pow(Zeff[i] / nstar, 2);
  }

  return En;
}

/**
 * Calculate total energy and all intermediate results
 * @param {string} structure - Electronic structure string
 * @param {number} Z - Atomic number
 * @returns {Object} - Complete calculation results
 */
export function calculateEnergy(structure, Z) {
  const developed = developStructure(structure);
  const analysis = analyzeStructure(developed);

  if (analysis.error !== null && analysis.error !== undefined) {
    return {
      error: analysis.error,
      totalEnergy: -1,
      groups: [],
      zeff: [],
      en: []
    };
  }

  const { nlN, sij } = analysis;
  const groupNames = calculateGroups(nlN);
  const zeff = calculateZeff(Z, nlN, sij);

  // Check for unstable anions (negative Zeff)
  if (zeff.some(z => z < 0)) {
    return {
      error: '   unstable anion',
      totalEnergy: -1,
      groups: [],
      zeff: [],
      en: []
    };
  }

  const en = calculateEn(nlN, zeff);

  if (en === null) {
    return {
      error: '   n must be < 7',
      totalEnergy: -1,
      groups: [],
      zeff: [],
      en: []
    };
  }

  const totalEnergy = en.reduce((sum, e) => sum + e, 0);

  // Calculate energy per electron for each orbital
  const enPerElectron = en.map((e, i) => e / nlN[i][2]);

  return {
    error: null,
    totalEnergy: totalEnergy,
    groups: groupNames,
    zeff: zeff,
    en: enPerElectron,
    nlN: nlN
  };
}
