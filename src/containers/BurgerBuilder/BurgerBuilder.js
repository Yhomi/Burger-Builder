import React,{Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/burger';
import BuildControls from '../../components/Burger/BuildControls/buildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/Order/OrderSummary';
import * as actionTypes from '../../store/action';

import Spinner from '../../components/UI/Spinner/Spinner';
import withError from '../../hoc/withError/withError';
import axios from '../../axios-orders/axios';
import {connect} from 'react-redux';



class BurgerBuilder extends Component{
  state={
    purchasing:false,
    loading:false,
    err:false
  }

  componentDidMount(){
    console.log(this.props)
    // axios.get('/ingredients.json')
    //       .then(res=>{
    //         this.setState({ingredients:res.data})
    //       })
    //       .catch(error=>{
    //         this.setState({err:true})
    //       })
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
  //   // console.log(oldCount);
  //   const updateCount= oldCount + 1;
  //   // console.log(updateCount);
  //   const updatedIngredient={
  //     ...this.state.ingredients
  //   }
  //   // console.log(updatedIngredient);
  //   updatedIngredient[type]=updateCount;
  //   // console.log(updatedIngredient);
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
    this.setState({purchasing:true})
  }

  purchaseCancel = ()=>{
    this.setState({purchasing:false})
  }

  purchaseContinue = ()=>{
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
    let burger =this.state.err? <h1>Ingredients can't be loaded</h1>:<Spinner />
  if(this.props.ings){

      burger = <Aux>
        <Burger ingredients={this.props.ings} />
        <BuildControls addIngredient={this.props.onIngredientAdded}
          removeIngredient={this.props.onIngredientRemoved}
          disabled={disabledInfo}
          price={this.props.price}
          purchasable={this.updatePurchasable(this.props.ings)}
          order={this.purchasingHandle}
         />
     </Aux>;
     orderSummary = <OrderSummary ingredients={this.props.ings}
        total={this.props.price}
       purchaseContinue={this.purchaseContinue}
      purchaseCancel={this.purchaseCancel} />;
    }

    if(this.state.loading){
      orderSummary=<Spinner />
    }

    return(
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancel}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = state =>{
  return{
    ings:state.ingredients,
    price:state.totalPrice
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onIngredientAdded: (ingName)=>dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
    onIngredientRemoved:(ingName)=>dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (withError(BurgerBuilder,axios)) ;
