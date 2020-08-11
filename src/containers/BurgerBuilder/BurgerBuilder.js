import React,{useState,useEffect} from 'react';
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



const BurgerBuilder = props =>{
  // state={
  //   purchasing:false,
  //
  // }
  const [purchasing,setPurchasing] = useState(false);

  useEffect(()=>{
    props.onInitIgredient()
  },[])

  // componentDidMount(){
  //
  //   this.props.onInitIgredient()
  // }

  const updatePurchasable = (ingredients)=>{
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
  //   //
  //   const updateCount= oldCount + 1;


  //   const updatedIngredient={
  //     ...this.state.ingredients
  //   }
  //   //
  //   updatedIngredient[type]=updateCount;
  //   //
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

  const purchasingHandle =()=>{
    if(props.token){
      setPurchasing(true)
    }else{
      props.onSetAuthRedirectPath('/checkout')
      props.history.push('/auth')
    }

  }

  const purchaseCancel = ()=>{
      setPurchasing(false)
  }

  const purchaseContinue = ()=>{
    props.onInitPurchase()
    props.history.push('/checkout')

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



    const disabledInfo={...props.ings}

    for(let key in disabledInfo){
      disabledInfo[key]=disabledInfo[key] <=0
    }
    let orderSummary=null
    let burger =props.err? <h1>Ingredients can't be loaded</h1>:<Spinner />
  if(props.ings){

      burger = <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls addIngredient={props.onIngredientAdded}
          removeIngredient={props.onIngredientRemoved}
          disabled={disabledInfo}
          price={props.price}
          purchasable={updatePurchasable(props.ings)}
          order={purchasingHandle}
          isAuth= {props.token}
         />
     </Aux>;
     orderSummary = <OrderSummary ingredients={props.ings}
        total={props.price}
       purchaseContinue={purchaseContinue}
      purchaseCancel={purchaseCancel} />;
    }

    // if(this.state.loading){
    //   orderSummary=<Spinner />
    // }

    return(
      <Aux>
        <Modal show={purchasing} modalClosed={purchaseCancel}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )

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
