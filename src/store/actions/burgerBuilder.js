import * as actionTypes from './actionTypes';
import axios from '../../axios-orders/axios';

export const addIngredient = (name)=>{
  return{
    type:actionTypes.ADD_INGREDIENT,
    ingredientName:name
  }
}

export const removeIngredient = (name)=>{
  return{
    type:actionTypes.REMOVE_INGREDIENT,
    ingredientName:name
  }
}

export const setIngredient = (ingredients)=>{
  return{
    type:actionTypes.SET_INGREDIENT,
    payload:ingredients
  }
}

export const fetchIngredientFailed = ()=>{
  return{
    type:actionTypes.FETCH_INGREDIENT_FAILED
  }
}

export const initIngredient = ()=>{
  return dispatch =>{
    axios.get('/ingredients.json')
          .then(res=>{
            dispatch(setIngredient(res.data))
          })
          .catch(error=>{
            dispatch(fetchIngredientFailed())
          })
  }
}
