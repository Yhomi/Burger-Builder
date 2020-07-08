import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './layout.module.css';
import SideDraw from '../Navigation/SideDrawer/SideDraw';

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
        <Toolbar click={this.toggleSideDrawHandler} />
        <SideDraw open={this.state.showSideDraw} closed={this.sideDrawClosedHandler}  />
        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    )
  }
}
export default Layout;
