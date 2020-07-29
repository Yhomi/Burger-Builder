import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/burger';
import BuildControls from '../../components/Burger/BuildControls/buildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/Order/OrderSummary';
import * as actionCreators from '../../store/actions/index';

import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../hoc/withError/withError';
import axios from '../../axios-orders/axios';
import {connect} from 'react-redux';



export class BurgerBuilder extends Component{
  state={
    purchasing:false,

  }

  componentDidMount(){
    this.props.onInitIgredient()
  }

  updatePurchasable(ingredients){
    // turn object into an Array
    const sum = Object.keys(ingredients).map(igKey=>{
        return ingredients[igKey];
    }).reduce((sum,el)=>{
          return sum + el
    },0);
    return sum>0
  }

  // addIngredientHandler= (type)=>{
  //   const oldCount= this.state.ingredients[type];
  //
  //   const updateCount= oldCount + 1;

  //   const updatedIngredient={
  //     ...this.state.ingredients
  //   }

  //   updatedIngredient[type]=updateCount;

  //   const priceAddition=INGREDIENT_PRICES[type];
  //   const oldPrice=this.state.totalPrice;
  //   const updatedPrice= oldPrice + priceAddition;
  //   this.setState({
  //     ingredients:updatedIngredient,
  //     totalPrice:updatedPrice
  //   });
  //   this.updatePurchasable(updatedIngredient);
  // }

  // removeIngredientHandler=(type)=>{
  //   const oldCount = this.state.ingredients[type];
  //   if(oldCount <= 0){
  //     return;
  //   }
  //   const updateCount = oldCount -1;
  //   const updatedIngredient ={
  //     ...this.state.ingredients
  //   }
  //   updatedIngredient[type]=updateCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const updatedPrice = oldPrice-priceDeduction;
  //   this.setState({
  //     ingredients:updatedIngredient,
  //     totalPrice:updatedPrice
  //   });
  //   this.updatePurchasable(updatedIngredient);
  // }

  purchasingHandle =()=>{
    if(this.props.token){
      this.setState({purchasing:true})
    }else{
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }

  }

  purchaseCancel = ()=>{
    this.setState({purchasing:false})
  }

  purchaseContinue = ()=>{
    this.props.onInitPurchase()
    this.props.history.push('/checkout')

    // const queryParams = [];
    // for(let i in this.state.ingredients){
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    // }
    // queryParams.push('price=' + this.state.totalPrice)
    // const queryString =queryParams.join('&')
    // this.props.history.push({
    //     pathname:'/checkout',
    //     search:'?'+queryString
    // })
  }


  render(){
    const disabledInfo={...this.props.ings}

    for(let key in disabledInfo){
      disabledInfo[key]=disabledInfo[key] <=0
    }
    let orderSummary=null
    let burger =this.props.err? <h1>Ingredients can't be loaded</h1>:<Spinner />
  if(this.props.ings){

      burger = <Aux>
        <Burger ingredients={this.props.ings} />
        <BuildControls addIngredient={this.props.onIngredientAdded}
          removeIngredient={this.props.onIngredientRemoved}
          disabled={disabledInfo}
          price={this.props.price}
          purchasable={this.updatePurchasable(this.props.ings)}
          order={this.purchasingHandle}
          isAuth= {this.props.token}
         />
     </Aux>;
     orderSummary = <OrderSummary ingredients={this.props.ings}
        total={this.props.price}
       purchaseContinue={this.purchaseContinue}
      purchaseCancel={this.purchaseCancel} />;
    }

    // if(this.state.loading){
    //   orderSummary=<Spinner />
    // }

    return(
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancel}>
          {orderSummary}
        </Modal>
        {burger}
        {this.props.ings}
      </Aux>
    )
  }
}

const mapStateToProps = state =>{
  return{
    ings:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    err:state.burgerBuilder.err,
    token:state.auth.token !==null
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onIngredientAdded: (ingName)=>dispatch(actionCreators.addIngredient(ingName)),
    onIngredientRemoved:(ingName)=>dispatch(actionCreators.removeIngredient(ingName)),
    onInitIgredient: ()=>dispatch(actionCreators.initIngredient()),
     onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
    onSetAuthRedirectPath: (path)=>dispatch(actionCreators.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (withError(BurgerBuilder,axios)) ;
