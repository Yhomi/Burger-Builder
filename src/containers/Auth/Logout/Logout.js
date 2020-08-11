import React, {useEffect} from 'react';
import * as actions from '../../../store/actions/index';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const Logout = props => {
  useEffect(()=>{
    props.onAuthLogout();
  },[])
  // componentDidMount(){
  //   this.props.onAuthLogout()
  // }

    return <Redirect to="/" />

}

const mapDispatchToProps = dispatch =>{
  return{
    onAuthLogout : ()=> dispatch(actions.logout())
  }
}

export default connect(null,mapDispatchToProps)(Logout);
