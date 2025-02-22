import { Box } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useEffect, useState } from 'react';
import './CustomDatePicker.scss';

/**
 * CustomDatePicker component renders a date picker with custom styles and properties.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Date} props.date - The currently selected date.
 * @param {function} props.setDate - The function to update the selected date.
 * @returns {JSX.Element} The rendered CustomDatePicker component.
 */
function CustomDatePicker(props) {
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => { };
  }, [cleared]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <DemoItem>
          <DesktopDatePicker
            value={props.date}
            onChange={(newValue) => props.setDate(newValue)}
            sx={{ width: 260 }}
            slotProps={{
              layout: {
                sx: {
                  color: 'var(--text-color)',
                  borderRadius: '2px',
                  borderWidth: '1px',
                  borderColor: 'var(--bg-color)',
                  border: '1px solid',
                  backgroundColor: 'var(--bg-color)',
                }
              },
              field: { clearable: true, onClear: () => setCleared(true) },
            }}
          />
        </DemoItem>
      </Box>
    </LocalizationProvider>
  )
}

export default CustomDatePicker;