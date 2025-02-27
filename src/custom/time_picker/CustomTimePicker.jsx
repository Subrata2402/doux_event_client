import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useEffect, useState } from 'react';
import './CustomTimePicker.scss';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';

/**
 * CustomTimePicker component renders a time picker using Material-UI's TimePicker component.
 * It uses the AdapterDayjs for date management and localization.
 *
 * @component
 * @example
 * const [value, setValue] = useState(null);
 * return (
 *   <CustomTimePicker value={value} setValue={setValue} />
 * );
 *
 * @param {Object} props - The properties object.
 * @param {any} props.value - The current value of the time picker.
 * @param {function} props.setValue - The function to update the value of the time picker.
 */
function CustomTimePicker(props) {
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
      <DemoContainer components={['TimePicker', 'TimePicker']}>
        <DesktopTimePicker
          value={props.value}
          onChange={(newValue) => props.setValue(newValue)}
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
      </DemoContainer>
    </LocalizationProvider>
  )
}

export default CustomTimePicker;