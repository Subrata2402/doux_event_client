import React, { useState } from 'react';
import { BiSearchAlt } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import './Header.scss';
import { Button, IconButton } from '@mui/material';
import StyledMenu from '../menu/StyledMenu';
import { IoMdResize } from "react-icons/io";
import { FaRegStar, FaStar } from "react-icons/fa";
import { RiFilterOffLine, RiFilterOffFill } from "react-icons/ri";
import { MdAccessTime, MdAccessTimeFilled } from "react-icons/md";

function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [menuList, setMenuList] = useState([
    {
      filledIcon: <RiFilterOffFill color='var(--nav-item-color)' />,
      outlineIcon: <RiFilterOffLine color='var(--nav-item-color)' />,
      text: 'None',
      isSelected: true
    },
    {
      filledIcon: <MdAccessTimeFilled color='var(--nav-item-color)' />,
      outlineIcon: <MdAccessTime color='var(--nav-item-color)' />,
      text: 'Date',
      isSelected: false
    },
    {
      filledIcon: <IoMdResize color='var(--nav-item-color)' />,
      outlineIcon: <IoMdResize color='var(--nav-item-color)' />,
      text: 'Size',
      isSelected: false
    },
    {
      filledIcon: <FaStar color='var(--nav-item-color)' />,
      outlineIcon: <FaRegStar color='var(--nav-item-color)' />,
      text: 'Favourite',
      isSelected: false
    }
  ]);

  const onMenuItemClick = (index) => {
    const updatedMenuList = menuList.map((item, i) => {
      if (i === index) {
        item.isSelected = true;
        props.setFilteredType(item.text);
      } else {
        item.isSelected = false;
      }
      return item;
    });
    setMenuList(updatedMenuList);
    handleClose();
  }

  return (
    <div className="d-flex align-items-center gap-2 w-100">
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
      <Button className="sort-note" onClick={handleClick}>
        <img src="filter.svg" alt="filter" />
        <span>Sort</span>
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        id="sort-menu"
        menuList={menuList}
        onMenuItemClick={onMenuItemClick}
        width="200px"
      />
    </div>
  )
}

export default Header;