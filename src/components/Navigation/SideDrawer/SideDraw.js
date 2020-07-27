import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import classes from './SideDraw.module.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';


const sideDraw = props=>{
  let attachClass=[classes.SideDraw, classes.Close]
  if(props.open){
    attachClass=[classes.SideDraw, classes.Open]
  }
  return(
    <Aux>
      <Backdrop clicked={props.closed} show ={props.open}/>
        <div className={attachClass.join(' ')}>
          <div className={classes.Logo}>
            <Logo />
          </div>
          <nav>
            <NavItems isAuthenticated={props.isAuth} />
          </nav>
        </div>
    </Aux>

  )
}
export default sideDraw
