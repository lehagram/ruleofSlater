import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Alert,
  Snackbar
} from '@mui/material';
import AtomSelector from './AtomSelector';
import Configuration from './Configuration';
import { structures } from '../data/constants';
import { developStructure } from '../utils/slaterCalculations';

/**
 * Main Calculator component for Slater's Rules
 */
export default function Calculator() {
  const [atomicNumber, setAtomicNumber] = useState(1);
  const [symbol, setSymbol] = useState('H');
  const [structure1, setStructure1] = useState('');
  const [structure2, setStructure2] = useState('');
  const [energy1, setEnergy1] = useState(0);
  const [energy2, setEnergy2] = useState(0);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Get default structure for a given atomic number
  const getDefaultStructureForZ = (z) => {
    if (z > 0 && z < structures.length) {
      return developStructure(structures[z]);
    }
    return '';
  };

  // Initialize structures on mount
  useEffect(() => {
    const initialStructure = getDefaultStructureForZ(1);
    setStructure1(initialStructure);
    setStructure2(initialStructure);
  }, []);

  const handleAtomChange = (z, sym) => {
    setAtomicNumber(z);
    setSymbol(sym);
    // Reset both structures when atom changes (no mirroring during reset)
    const defaultStruct = getDefaultStructureForZ(z);
    setStructure1(defaultStruct);
    setStructure2(defaultStruct);
  };

  // Handler for config 1 structure changes - mirrors to config 2
  const handleStructure1Change = (newStructure) => {
    setStructure1(newStructure);
    setStructure2(newStructure); // Mirror to config 2
  };

  // Handler for config 2 structure changes - no mirroring
  const handleStructure2Change = (newStructure) => {
    setStructure2(newStructure);
  };

  const handleError = (errorMsg) => {
    if (errorMsg && errorMsg !== error) {
      setError(errorMsg);
      setOpenSnackbar(true);
    } else if (!errorMsg) {
      setError(null);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Calculate energy difference (E2 - E1 with proper sign convention)
  const calculateDifference = () => {
    if (energy1 > 0 && energy2 > 0) {
      // Match Python: E1 = -energy1, E2 = -energy2, diff = E2 - E1 = -energy2 - (-energy1) = energy1 - energy2
      return energy1 - energy2;
    }
    return null;
  };

  const difference = calculateDifference();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontFamily: 'monospace' }}>
          Rule of Slater
        </Typography>
        <Typography variant="subtitle2" sx={{ fontFamily: 'monospace', opacity: 0.9 }}>
          tiny Slater calculator
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.8 }}>
          *for educational purposes* - Energies calculated with Slater's Rules are not accurate
        </Typography>
      </Paper>

      <Paper elevation={2} sx={{ p: 2, mb: 3, bgcolor: '#f0f0f0', border: '1px solid #ccc' }}>
        <Typography variant="body2" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-line' }}>
          {`1. Select element by typing symbol or atomic number
2. The ground state electronic structure is displayed
3. Modify structure 1 :  Changes are mirrored under structure 2
4. Modify structure 2 : The energy difference between structures 1 and 2 is displayed`}
        </Typography>
      </Paper>

      <Box sx={{ mb: 3 }}>
        <AtomSelector onAtomChange={handleAtomChange} />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Configuration
          rank={1}
          atomicNumber={atomicNumber}
          structure={structure1}
          onStructureChange={handleStructure1Change}
          onEnergyChange={setEnergy1}
          onError={handleError}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Configuration
          rank={2}
          atomicNumber={atomicNumber}
          structure={structure2}
          onStructureChange={handleStructure2Change}
          onEnergyChange={setEnergy2}
          onError={handleError}
        />
      </Box>

      {difference !== null && (
        <Paper elevation={2} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="body2"
              sx={{ fontFamily: 'monospace', fontSize: '12px' }}
            >
              difference (E2 - E1)
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'monospace',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              {difference.toFixed(2)}
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontFamily: 'monospace', fontSize: '12px' }}
            >
              eV
            </Typography>
          </Box>
        </Paper>
      )}

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: '100%', fontFamily: 'monospace' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}
