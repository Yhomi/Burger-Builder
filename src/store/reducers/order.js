import * as actionTypes from '../actions/actionTypes';
import {updatedObject} from '../utility';

const initialState = {
  orders:[],
  loading:false,
  purchased:false
}

const purchaseInit = ( state, action ) => {
    return updatedObject( state, { purchased: false } );
};

const orderReducer = (state = initialState, action)=>{
  switch (action.type) {

    case actionTypes.PURCHASE_BURGER_SUCCESS:
        const newOrder = updatedObject(action.orderData,{id:action.orderId})
        return updatedObject(state,{loading:false,
        orders:state.orders.concat(newOrder)})
    
    case actionTypes.PURCHASE_BURGER_FAILURE:
        return updatedObject(state,{  loading:false})
    
    case actionTypes.PURCHASE_BURGER_START:
        return updatedObject(state,{  loading:true})
    
    case actionTypes.FETCH_ORDERS_START:
        return updatedObject(state,{  loading:true})
    
    case actionTypes.FETCH_ORDERS_SUCCESS:
        return updatedObject(state,{orders:action.order,
                loading:false})
    
    case actionTypes.FETCH_ORDERS_FAIL:
        return updatedObject(state,{  loading:false})
    
    case actionTypes.PURCHASE_INIT:return purchaseInit(state, action)
    
    default:
      return state
  }
}

export default orderReducer;
