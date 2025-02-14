import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FaCheck } from "react-icons/fa6";
import './StyledMenu.scss';

function StyledMenu(props) {
  return (
    <Menu
      id={props.id}
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.onClose}
      onClick={props.onClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: 'top', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    >
      {props.menuList?.map((item, menuItemIndex) => (
        <MenuItem
          key={menuItemIndex}
          onClick={() => props.onMenuItemClick(menuItemIndex)}
          className={`d-flex align-items-center justify-content-between ${item.isSelected ? 'selected-item' : ''}`}
          style={{ minWidth: props.width || '100px' }}
        >
          <div className="d-flex align-items-center gap-4">
            {item.icon || ''}
            {item.text}
          </div>
          {item.isSelected && <FaCheck />}
        </MenuItem>
      ))}
    </Menu>
  )
}

export default StyledMenu;