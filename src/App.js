import React,{Component} from 'react';
import Layout from './components/layouts/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/checkout/checkout';
import {Route,Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';



class App extends Component {
  // state ={
  //   show:true
  // }
  // componentDidMount(){
  //   setTimeout(()=>{
  //     this.setState({show:false})
  //   },5000)
  // }
  render(){
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
              <Route path="/auth" component={Auth} />
            <Route path="/" component={BurgerBuilder} />

          </Switch>
        </Layout>
      </div>
    );
  }

}

export default App;
