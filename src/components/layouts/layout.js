import React,{useState} from 'react';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './layout.module.css';
import SideDraw from '../Navigation/SideDrawer/SideDraw';
import {connect} from 'react-redux';

const Layout = props =>{
  // state={
  //   showSideDraw:false
  // }
  const [showSideDraw,setShowSideDraw] = useState(false);

  const sideDrawClosedHandler=()=>{

    // this.setState(prevState=>{
    //   return {showSideDraw:!prevState.showSideDraw}
    // })
    setShowSideDraw(false)
  }

  const toggleSideDrawHandler=()=>{
    // this.setState(prevState=>{
    //   return {showSideDraw:!prevState.showSideDraw}
    // })
    setShowSideDraw(!showSideDraw)
  }



    return(
      <Aux>
        <Toolbar click={toggleSideDrawHandler} isAuth={props.token} />
        <SideDraw open={showSideDraw} closed={sideDrawClosedHandler} isAuth={props.token}  />
        <main className={classes.content}>{props.children}</main>
      </Aux>
    )

}

const mapStateToProps = state =>{
  return{
    token:state.auth.token !==null
  }
}

export default connect(mapStateToProps)(Layout);
