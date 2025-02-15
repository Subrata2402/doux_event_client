import React, { useEffect, useState } from 'react';
import { BiSearchAlt } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import './Header.scss';
import { IconButton } from '@mui/material';
import StyledMenu from '../menu/StyledMenu';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Box from '@mui/material/Box';
import { BiCategory } from "react-icons/bi";

/**
 * Header component for displaying a search bar and filter options.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {string} props.searchText - The current search text.
 * @param {function} props.setSearchText - Function to update the search text.
 * @param {Date} props.date - The currently selected date.
 * @param {function} props.setDate - Function to update the selected date.
 * @param {string} props.category - The currently selected category.
 * @param {function} props.setCategory - Function to update the selected category.
 * @returns {JSX.Element} The rendered Header component.
 */
function Header(props) {
  const [cleared, setCleared] = React.useState(false);

  useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => { };
  }, [cleared]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [menuList, setMenuList] = useState([
    { text: 'None', isSelected: true },
    { text: 'Technology', isSelected: false },
    { text: 'Music', isSelected: false },
    { text: 'Travel', isSelected: false },
    { text: 'Food', isSelected: false },
    { text: 'Health', isSelected: false },
    { text: 'Sports', isSelected: false },
    { text: 'Fashion', isSelected: false },
    { text: 'Education', isSelected: false },
    { text: 'Business', isSelected: false },
    { text: 'Art', isSelected: false },
    { text: 'Science', isSelected: false },
    { text: 'Other', isSelected: false },
  ]);

  /**
   * Handles the click event on a menu item.
   * Updates the menu list to mark the clicked item as selected and sets the category.
   * Closes the menu after updating the state.
   *
   * @param {number} index - The index of the clicked menu item.
   */
  const onMenuItemClick = (index) => {
    const updatedMenuList = menuList.map((item, i) => {
      if (i === index) {
        item.isSelected = true;
        props.setCategory(item.text);
      } else {
        item.isSelected = false;
      }
      return item;
    });
    setMenuList(updatedMenuList);
    handleClose();
  }

  return (
    <div className="events-header">
      <div className="search-bar">
        <BiSearchAlt className='search-icon' />
        <input
          value={props.searchText}
          onChange={(e) => props.setSearchText(e.target.value)}
          type="text"
          placeholder="Search events"
        />
        {
          props.searchText.trim() &&
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => props.setSearchText('')}
          >
            <MdClear color='var(--text-color)' />
          </IconButton>
        }
      </div>
      <div className="filter-options">
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
        <input type="text" className='category-picker' onClick={handleClick} readOnly value={props.category === 'None' ? 'Select Category' : props.category} />
        <IconButton
          aria-label="delete"
          size="small"
          onClick={handleClick}
          className='category-icon-button'
        >
          <BiCategory className='category-icon' size={25} />
        </IconButton>
        <StyledMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          id="sort-menu"
          menuList={menuList}
          onMenuItemClick={onMenuItemClick}
          width="15rem"
        />
      </div>

    </div>
  )
}

export default Header;