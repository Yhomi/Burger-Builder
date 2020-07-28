import React from 'react';
import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';


const navItems = (props)=>(
  <ul className={classes.NavItems}>
      <NavItem link='/'>Burger Builder</NavItem>
      {props.isAuthenticated ?<NavItem link='/orders' >Orders</NavItem>:null}
      {!props.isAuthenticated ?<NavItem link='/auth'>Authenticate</NavItem>:<NavItem link='/logout'>Logout</NavItem>}

  </ul>
);

export default navItems;
