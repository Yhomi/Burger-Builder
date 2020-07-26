import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';


const navItems = ()=>(
  <ul className={classes.NavItems}>
      <NavItem link='/'>Burger Builder</NavItem>
      <NavItem link='/orders' >Orders</NavItem>
      <NavItem link='/auth'>Log in</NavItem>
  </ul>
);

export default navItems;
