import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  Paper
} from '@mui/material';
import { calculateEnergy } from '../utils/slaterCalculations';

/**
 * Configuration component for electronic structure input and energy display
 * @param {number} rank - Configuration number (1 or 2)
 * @param {number} atomicNumber - Current atomic number
 * @param {string} defaultStructure - Default electronic structure
 * @param {function} onEnergyChange - Callback when energy changes
 * @param {function} onError - Callback when error occurs
 */
export default function Configuration({
  rank,
  atomicNumber,
  defaultStructure,
  onEnergyChange,
  onError
}) {
  const [structure, setStructure] = useState(defaultStructure || '');
  const [results, setResults] = useState({
    totalEnergy: 0,
    groups: [],
    zeff: [],
    en: [],
    error: null
  });

  // Update structure when defaultStructure changes
  useEffect(() => {
    if (defaultStructure) {
      setStructure(defaultStructure);
    }
  }, [defaultStructure]);

  // Recalculate when structure or atomic number changes
  useEffect(() => {
    if (structure.trim() === '' || atomicNumber === 0) {
      setResults({
        totalEnergy: 0,
        groups: [],
        zeff: [],
        en: [],
        error: null
      });
      onEnergyChange(0);
      return;
    }

    const calc = calculateEnergy(structure, atomicNumber);
    setResults(calc);

    // Notify parent of energy change
    onEnergyChange(calc.error ? -1 : calc.totalEnergy);

    // Notify parent of errors
    if (calc.error) {
      onError(calc.error);
    } else {
      onError(null);
    }
  }, [structure, atomicNumber]);

  const handleStructureChange = (e) => {
    setStructure(e.target.value);
  };

  // Format number for display
  const formatNumber = (num) => {
    return num.toFixed(2);
  };

  // Format arrays for display with proper spacing
  const formatArray = (arr, widths) => {
    return arr.map((val, i) => {
      const str = typeof val === 'number' ? formatNumber(val) : val;
      const width = widths[i] || 10;
      return str.padEnd(width, ' ');
    }).join('');
  };

  // Calculate column widths based on energy values
  const getColumnWidths = () => {
    if (results.en.length === 0) return [];
    return results.en.map(e => {
      const len = Math.floor(e).toString().length + 5;
      return Math.max(len, 10);
    });
  };

  const columnWidths = getColumnWidths();

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        Electronic structure {rank}
      </Typography>

      <TextField
        fullWidth
        size="small"
        value={structure}
        onChange={handleStructureChange}
        placeholder="e.g., 1s2 2s2 2p6 or [Ne] 3s2 3p1"
        sx={{
          mb: 2,
          '& input': {
            fontFamily: 'monospace',
            fontSize: '14px'
          }
        }}
      />

      <Paper variant="outlined" sx={{ p: 2, bgcolor: 'grey.50' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {/* Groups row */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                minWidth: '90px',
                fontFamily: 'monospace',
                fontSize: '12px'
              }}
            >
              {/* Empty label for groups */}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'monospace',
                fontSize: '12px',
                whiteSpace: 'pre'
              }}
            >
              {results.groups.length > 0 ? formatArray(results.groups, columnWidths) : ''}
            </Typography>
          </Box>

          {/* Zeff row */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                minWidth: '90px',
                fontFamily: 'monospace',
                fontSize: '12px'
              }}
            >
              Zeff (i)
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'monospace',
                fontSize: '12px',
                whiteSpace: 'pre'
              }}
            >
              {results.zeff.length > 0 ? formatArray(results.zeff, columnWidths) : ''}
            </Typography>
          </Box>

          {/* Energy per electron row */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="caption"
              sx={{
                minWidth: '90px',
                fontFamily: 'monospace',
                fontSize: '12px'
              }}
            >
              -E (i)
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'monospace',
                fontSize: '12px',
                whiteSpace: 'pre'
              }}
            >
              {results.en.length > 0 ? formatArray(results.en, columnWidths) : ''}
            </Typography>
            {results.en.length > 0 && (
              <Typography
                variant="caption"
                sx={{
                  ml: 1,
                  fontFamily: 'monospace',
                  fontSize: '12px'
                }}
              >
                eV
              </Typography>
            )}
          </Box>

          {/* Total energy row */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, pt: 1, borderTop: '1px solid #ddd' }}>
            <Typography
              variant="caption"
              sx={{
                minWidth: '90px',
                fontFamily: 'monospace',
                fontSize: '12px'
              }}
            >
              E{rank} total
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'monospace',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              {results.totalEnergy > 0
                ? `-${formatNumber(results.totalEnergy)}`
                : structure.trim() === ''
                ? '   enter structure'
                : ''}
            </Typography>
            {results.totalEnergy > 0 && (
              <Typography
                variant="caption"
                sx={{
                  ml: 1,
                  fontFamily: 'monospace',
                  fontSize: '12px'
                }}
              >
                eV
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>
    </Paper>
  );
}
