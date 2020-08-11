import React,{useEffect,Suspense} from 'react';
import Layout from './components/layouts/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/checkout/checkout';
import {Route,Switch,Redirect} from 'react-router-dom';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

const Checkout = React.lazy(()=>{
  return import('./containers/checkout/checkout');
})

const Orders = React.lazy(()=>{
  return import('./containers/Orders/Orders');
})

const Auth = React.lazy(()=>{
  return import('./containers/Auth/Auth');
})

const App = props => {
  // state ={
  //   show:true
  // }
  // componentDidMount(){
  //   setTimeout(()=>{
  //     this.setState({show:false})
  //   },5000)
  // }
  useEffect(()=>{
    props.onAutoLogin()
  },[])
  // componentDidMount(){
  //   this.props.onAutoLogin()
  // }

    let routes = (
      <Switch>
        <Route path="/auth" render={(props)=><Auth {...props} />} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
    if(props.isAuthenticated){
      routes =(
        <Switch>
          <Route path="/checkout" render={(props)=><Checkout {...props}/>} />
          <Route path="/orders" render={(props)=><Orders {...props} />} />
          <Route path="/logout" component={Logout}/>
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          <Suspense fallback={<p>Loading....</p>}>
            {routes}
          </Suspense>

        </Layout>
      </div>
    );


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
