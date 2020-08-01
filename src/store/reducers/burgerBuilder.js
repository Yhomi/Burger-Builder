import * as actionTypes from '../actions/actionTypes';
import {updatedObject} from '../utility';

const initialState = {
  ingredients:null,
  totalPrice:5,
  err:false,
  building:false
}

const INGREDIENT_PRICES={
  salad:0.5,
  cheese:0.4,
  meat:0.6,
  bacon:0.7
}


// refactoring code and make it leaner
// Logic for add ingredient
const addIngredient = (state,action)=>{
  const updateIngAdd ={[action.ingredientName]:state.ingredients[action.ingredientName] + 1}
  const ingredientAdd = updatedObject(state.ingredients,updateIngAdd)
  const updatedStateAdd ={
      ingredients:ingredientAdd,
      totalPrice:state.totalPrice +INGREDIENT_PRICES[action.ingredientName],
      building:true
    }
      // updatedObject is a utilty function to refactor the code
    return updatedObject(state, updatedStateAdd)
}

// logic for remove ingredient
const removeIngredient = (state,action)=>{
  const updateIngRem ={[action.ingredientName]:state.ingredients[action.ingredientName] - 1}
    const ingredientRem = updatedObject(state.ingredients,updateIngRem)
    const updatedStateRem ={
      ingredients:ingredientRem,
      totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      building:true
    }
    return updatedObject(state, updatedStateRem)
}

//logic to set ingredient[ingredients are fetched from firebase server]
const setIngredient = (state,action)=>{
  const ingSet = {
    salad:action.payload.salad,
    bacon:action.payload.bacon,
    cheese:action.payload.cheese,
    meat:action.payload.meat
  }
  const inge ={
    ingredients:ingSet,
    totalPrice:5,
    err:false,
    building:false
  }
  return updatedObject(state,inge)
}

//logic for fetch ingredient failed
const fetchIngredientFailed = (state,action)=>{
  return updatedObject(state, {  err:true})
}

const reducer = (state = initialState, action)=>{
    switch (action.type) {
      case actionTypes.ADD_INGREDIENT:return addIngredient(state,action)

        case actionTypes.REMOVE_INGREDIENT:return removeIngredient(state, action)
          // return{
          //     ...state,
          //     ingredients:{
          //       ...state.ingredients,
          //       [action.ingredientName]:state.ingredients[action.ingredientName] - 1
          //     },
          //     totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
          // }

        case actionTypes.SET_INGREDIENT:return setIngredient(state, action)

        case actionTypes.FETCH_INGREDIENT_FAILED:return fetchIngredientFailed(state, action)

        default:return state;
    }


}
export default reducer;
