import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Paper,
  Typography
} from '@mui/material';
import { symbols } from '../data/constants';

/**
 * AtomSelector component for selecting atom by atomic number or symbol
 * @param {function} onAtomChange - Callback when atom selection changes
 */
export default function AtomSelector({ onAtomChange }) {
  const [atomicNumber, setAtomicNumber] = useState(1);
  const [symbol, setSymbol] = useState('H');

  // Initialize with Hydrogen
  useEffect(() => {
    onAtomChange(1, 'H');
  }, []);

  const handleAtomicNumberChange = (e) => {
    const value = parseInt(e.target.value, 10);

    if (isNaN(value) || value < 0 || value > 118) {
      setAtomicNumber(0);
      setSymbol('');
      onAtomChange(0, '');
      return;
    }

    setAtomicNumber(value);
    const newSymbol = symbols[value] || '';
    setSymbol(newSymbol);
    onAtomChange(value, newSymbol);
  };

  const handleSymbolChange = (e) => {
    const value = e.target.value.trim();
    setSymbol(value);

    const index = symbols.indexOf(value);
    if (index !== -1) {
      setAtomicNumber(index);
      onAtomChange(index, value);
    } else {
      setAtomicNumber(0);
      onAtomChange(0, '');
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
            Z
          </Typography>
          <TextField
            type="number"
            size="small"
            value={atomicNumber}
            onChange={handleAtomicNumberChange}
            inputProps={{
              min: 1,
              max: 118,
              style: {
                fontFamily: 'monospace',
                fontSize: '14px',
                width: '60px'
              }
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
            element
          </Typography>
          <TextField
            size="small"
            value={symbol}
            onChange={handleSymbolChange}
            placeholder="Symbol"
            inputProps={{
              style: {
                fontFamily: 'monospace',
                fontSize: '14px',
                width: '50px'
              }
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
}
