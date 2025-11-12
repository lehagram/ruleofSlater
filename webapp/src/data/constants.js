// ##########################################################################
// ###                                                                   ####
// ###       Application for the calculation of Slater energies          ####
// ###                   *for educational purposes*                      ####
// ###  **Energies calculated with Slater's Rules are not accurate**     ####
// ###                                                                   ####
// ##########################################################################

// Element symbols from H (Z=1) to Og (Z=118)
export const symbols = [
  " ", "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne",
  "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar",
  "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn",
  "Ga", "Ge", "As", "Se", "Br", "Kr",
  "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd",
  "In", "Sn", "Sb", "Te", "I", "Xe",
  "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho",
  "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg",
  "Tl", "Pb", "Bi", "Po", "At", "Rn",
  "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es",
  "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn",
  "Nh", "Fl", "Mc", "Lv", "Ts", "Og"
];

// Valid orbital letters
export const orbitals = ['s', 'p', 'd', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'q', 'r', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// Ground state electronic structures for all elements
export const structures = [
  '', '1s1', '1s2', '[He] 2s1', '[He] 2s2', '[He] 2s2 2p1',
  '[He] 2s2 2p2', '[He] 2s2 2p3', '[He] 2s2 2p4', '[He] 2s2 2p5',
  '[He] 2s2 2p6',
  '[Ne] 3s1', '[Ne] 3s2', '[Ne] 3s2 3p1', '[Ne] 3s2 3p2', '[Ne] 3s2 3p3',
  '[Ne] 3s2 3p4', '[Ne] 3s2 3p5', '[Ne] 3s2 3p6',
  '[Ar] 4s1', '[Ar] 4s2', '[Ar] 3d1 4s2', '[Ar] 3d2 4s2', '[Ar] 3d3 4s2',
  '[Ar] 3d5 4s1', '[Ar] 3d5 4s2', '[Ar] 3d6 4s2', '[Ar] 3d7 4s2',
  '[Ar] 3d8 4s2', '[Ar] 3d10 4s1', '[Ar] 3d10 4s2', '[Ar] 3d10 4s2 4p1',
  '[Ar] 3d10 4s2 4p2', '[Ar] 3d10 4s2 4p3', '[Ar] 3d10 4s2 4p4',
  '[Ar] 3d10 4s2 4p5', '[Ar] 3d10 4s2 4p6',
  '[Kr] 5s1', '[Kr] 5s2', '[Kr] 4d1 5s2', '[Kr] 4d2 5s2', '[Kr] 4d4 5s1',
  '[Kr] 4d5 5s1', '[Kr] 4d5 5s2', '[Kr] 4d7 5s1', '[Kr] 4d8 5s1',
  '[Kr] 4d10', '[Kr] 4d10 5s1', '[Kr] 4d10 5s2', '[Kr] 4d10 5s2 5p1',
  '[Kr] 4d10 5s2 5p2', '[Kr] 4d10 5s2 5p3', '[Kr] 4d10 5s2 5p4',
  '[Kr] 4d10 5s2 5p5', '[Kr] 4d10 5s2 5p6',
  '[Xe] 6s1', '[Xe] 6s2', '[Xe] 5d1 6s2', '[Xe] 4f1 5d1 6s2',
  '[Xe] 4f3 6s2', '[Xe] 4f4 6s2', '[Xe] 4f5 6s2', '[Xe] 4f6 6s2',
  '[Xe] 4f7 6s2', '[Xe] 4f7 5d1 6s2', '[Xe] 4f9 6s2', '[Xe] 4f10 6s2',
  '[Xe] 4f11 6s2', '[Xe] 4f12 6s2', '[Xe] 4f13 6s2', '[Xe] 4f14 6s2',
  '[Xe] 4f14 5d1 6s2', '[Xe] 4f14 5d2 6s2', '[Xe] 4f14 5d3 6s2',
  '[Xe] 4f14 5d4 6s2', '[Xe] 4f14 5d5 6s2', '[Xe] 4f14 5d6 6s2',
  '[Xe] 4f14 5d7 6s2', '[Xe] 4f14 5d9 6s1', '[Xe] 4f14 5d10 6s1',
  '[Xe] 4f14 5d10 6s2', '[Xe] 4f14 5d10 6s2 6p1', '[Xe] 4f14 5d10 6s2 6p2',
  '[Xe] 4f14 5d10 6s2 6p3', '[Xe] 4f14 5d10 6s2 6p4',
  '[Xe] 4f14 5d10 6s2 6p5', '[Xe] 4f14 5d10 6s2 6p6',
  '[Rn] 7s1', '[Rn] 7s2', '[Rn] 6d1 7s2', '[Rn] 6d2 7s2', '[Rn] 5f2 6d1 7s2',
  '[Rn] 5f3 6d1 7s2', '[Rn] 5f4 6d1 7s2', '[Rn] 5f6 7s2', '[Rn] 5f7 7s2',
  '[Rn] 5f7 6d1 7s2', '[Rn] 5f9 7s2', '[Rn] 5f10 7s2', '[Rn] 5f11 7s2',
  '[Rn] 5f12 7s2', '[Rn] 5f13 7s2', '[Rn] 5f14 7s2', '[Rn] 5f14 7s2 7p1',
  '[Rn] 5f14 6d2 7s2', '[Rn] 5f14 6d3 7s2', '[Rn] 5f14 6d4 7s2',
  '[Rn] 5f14 6d5 7s2', '[Rn] 5f14 6d6 7s2', '[Rn] 5f14 6d7 7s2',
  '[Rn] 5f14 6d8 7s2', '[Rn] 5f14 6d9 7s2', '[Rn] 5f14 6d10 7s2',
  '[Rn] 5f14 6d10 7s2 7p1', '[Rn] 5f14 6d10 7s2 7p2',
  '[Rn] 5f14 6d10 7s2 7p3', '[Rn] 5f14 6d10 7s2 7p4',
  '[Rn] 5f14 6d10 7s2 7p5', '[Rn] 5f14 6d10 7s2 7p6'
];

// Orbital groups for Slater's shielding rules
// Format: [shell1, shell2, shell3, ...]
// Each shell has subgroups for different orbitals
export const groups = [
  ['1s'],
  ['2s2p', '2s2p'],
  ['3s3p', '3s3p', '3d'],
  ['4s4p', '4s4p', '4d', '4f'],
  ['5s5p', '5s5p', '5d', '5f'],
  ['6s6p', '6s6p', '6d', '6f', '6g'],
  ['7s7p', '7s7p', '7d', '7f', '7g', '7h']
];

// Rydberg energy constant (eV)
export const E0 = 13.6;

// Effective principal quantum numbers for n = 1-6
export const neff = [1, 2, 3, 3.7, 4.0, 4.2];
