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

function Header(props) {
  const [cleared, setCleared] = React.useState(false);

  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
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
          placeholder="Search notes"
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
                  field: { clearable: true, onClear: () => setCleared(true) },
                }}
              />
            </DemoItem>
          </Box>
        </LocalizationProvider>
        <input type="text" className='category-picker' onClick={handleClick} readOnly value={props.category === 'None' ? 'Select Category' : props.category} />
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