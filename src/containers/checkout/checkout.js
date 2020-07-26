import React from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactDetails from '../ContactDetails/ContactDetails';
import {connect} from 'react-redux';


class Checkout extends React.Component {
  componentDidMount(){

  }
  // state={
  //   ingredients:null,
  //   totalPrice:0
  // }
  // UNSAFE_componentWillMount(){
  //   const query = new URLSearchParams(this.props.location.search)
  //   const ingredients={}
  //   let price =0;
  //   for (let param of query.entries()){
  //     if(param[0] === 'price'){
  //       price=param[1];
  //     }else{
  //       ingredients[param[0]] = +param[1]
  //     }
  //
  //   }
  //   this.setState({ingredients:ingredients,totalPrice:price})
  // }
  checkoutCancelHandler = ()=>{
    this.props.history.goBack();
  }
  checkoutContinueHandler = ()=>{
    this.props.history.replace('/checkout/details')
  }
  render () {
    let summary =(<Redirect to="/" />)
    if(this.props.ings){
      summary = (
        <div>
          <CheckoutSummary ingredients={this.props.ings}
             checkoutCancel={this.checkoutCancelHandler}
             checkoutContinue={this.checkoutContinueHandler}
              />
            <Route path={this.props.match.url + '/details'} exact component={ContactDetails}/>
        </div>
      )
    }

    return summary

  }
}
const mapStateToProps = state =>{
  return{
    ings:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice
  }
}


export default connect(mapStateToProps)(Checkout);
