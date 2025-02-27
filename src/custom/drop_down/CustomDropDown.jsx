import { FormControl, MenuItem, OutlinedInput, Select } from '@mui/material';
import React from 'react';
import './CustomDropDown.scss';

/**
 * CustomDropDown component renders a dropdown menu with customizable items.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.value - The current selected value of the dropdown.
 * @param {function} props.setValue - The function to update the selected value.
 * @param {string} props.placeholder - The placeholder text for the dropdown.
 * @param {Array<string>} props.items - The array of items to display in the dropdown.
 * @returns {JSX.Element} The rendered CustomDropDown component.
 */
function CustomDropDown(props) {
  return (
    <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)}
        input={<OutlinedInput />}
        displayEmpty
      >
        <MenuItem value="">
          {props.placeholder}
        </MenuItem>
        {
          props.items.map((item, index) => (
            <MenuItem key={index} value={item}>{item}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}

export default CustomDropDown;