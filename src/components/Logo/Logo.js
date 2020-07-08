import React from 'react';
import burgerImg from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = props =>{
  const imgH={
    height:props.height
  }
  return(
    <div className={classes.Logo} style={imgH}>
      <img src={burgerImg} alt="BurgerLogo" />
    </div>
  )
}
export default logo;
