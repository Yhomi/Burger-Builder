import React from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route,Redirect} from 'react-router-dom';
import ContactDetails from '../ContactDetails/ContactDetails';
import {connect} from 'react-redux';


const Checkout= props => {

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
  const checkoutCancelHandler = ()=>{
    props.history.goBack();
  }
  const checkoutContinueHandler = ()=>{
    props.history.replace('/checkout/details')
  }

    let summary =(<Redirect to="/" />)
    if(props.ings){
      const purchasedRedirect = props.purchased ? <Redirect to="/" /> :null
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary ingredients={props.ings}
             checkoutCancel={checkoutCancelHandler}
             checkoutContinue={checkoutContinueHandler}
              />
            <Route path={props.match.path + '/details'} exact component={ContactDetails}/>
        </div>
      )
    }

    return summary

  
}
const mapStateToProps = state =>{
  return{
    ings:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    purchased:state.orders.purchased
  }
}


export default connect(mapStateToProps)(Checkout);
