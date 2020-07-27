import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './layout.module.css';
import SideDraw from '../Navigation/SideDrawer/SideDraw';
import {connect} from 'react-redux';

class Layout extends Component{
  state={
    showSideDraw:false
  }
  sideDrawClosedHandler=()=>{
    this.setState(prevState=>{
      return {showSideDraw:!prevState.showSideDraw}
    })
  }

  toggleSideDrawHandler=()=>{
    this.setState(prevState=>{
      return {showSideDraw:!prevState.showSideDraw} 
    })
  }


  render(){
    return(
      <Aux>
        <Toolbar click={this.toggleSideDrawHandler} isAuth={this.props.token} />
        <SideDraw open={this.state.showSideDraw} closed={this.sideDrawClosedHandler} isAuth={this.props.token}  />
        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    )
  }
}

const mapStateToProps = state =>{
  return{
    token:state.auth.token !==null
  }
}

export default connect(mapStateToProps)(Layout);
