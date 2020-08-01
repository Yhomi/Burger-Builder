import React,{Component} from 'react';
import Layout from './components/layouts/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/checkout/checkout';
import {Route,Switch,Redirect} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';



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
        <Route path="/auth" component={Auth} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
    if(this.props.isAuthenticated){
      routes =(
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout}/>
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
