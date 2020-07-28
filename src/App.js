import React,{Component} from 'react';
import Layout from './components/layouts/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route,Switch,Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncOrder = asyncComponent(()=>{
  return import('./containers/Orders/Orders')
})

const asyncCheckout =asyncComponent(()=>{
  return import('./containers/checkout/checkout')
})

const asyncAuth = asyncComponent(()=>{
  return import('./containers/Auth/Auth')
})





class App extends Component {
  // state ={
  //   show:true
  // }
  // componentDidMount(){
  //   setTimeout(()=>{
  //     this.setState({show:false})
  //   },5000)
  // }
  componentDidMount(){
    this.props.onAutoLogin()
  }
  render(){
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
    if(this.props.isAuthenticated){
      routes =(
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrder} />
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }

}

const mapStateToProps = state=>{
  return{
    isAuthenticated:state.auth.token !==null
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onAutoLogin:()=>dispatch(actions.checkAuthState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
