import * as actionTypes from '../actions/actionTypes';
import {updatedObject} from '../utility';

const initialState = {
  orders:[],
  loading:false
}

const orderReducer = (state = initialState, action)=>{
  switch (action.type) {

    case actionTypes.PURCHASE_BURGER_SUCCESS:

        const newOrder = updatedObject(action.orderData,{id:action.orderId})
        return updatedObject(state,{loading:false,
        orders:state.orders.concat(newOrder)})
      break;
    case actionTypes.PURCHASE_BURGER_FAILURE:
        return updatedObject(state,{  loading:false})
      break;
    case actionTypes.PURCHASE_BURGER_START:
        return updatedObject(state,{  loading:true})
      break;
    case actionTypes.FETCH_ORDERS_START:
        return updatedObject(state,{  loading:true})
      break;
    case actionTypes.FETCH_ORDERS_SUCCESS:
        return updatedObject(state,{orders:action.order,
                loading:false})
      break;
    case actionTypes.FETCH_ORDERS_FAIL:
        return updatedObject(state,{  loading:false})
      break;
    default:
      return state
  }
}

export default orderReducer;
