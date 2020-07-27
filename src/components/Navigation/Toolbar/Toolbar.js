import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props)=>{
  return(
      <header className={classes.Toolbar}>
          <DrawerToggle clicked={props.click} />
          <div className={classes.Logo}>
              <Logo />
          </div>
          <nav className={classes.DesktopOnly}>
            <NavItems isAuthenticated={props.isAuth} />
          </nav>

      </header>
  )
}
export default toolbar
