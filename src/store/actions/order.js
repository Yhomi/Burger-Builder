import * as actionTypes from './actionTypes';
import axios from '../../axios-orders/axios';

export const purchaseBurgerSuccess = (id,orderData) =>{
  return{
    type:actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId:id,
    orderData:orderData
  }
}

export const purchaseBurgerFailure = (err) =>{
  return{
    type:actionTypes.PURCHASE_BURGER_FAILURE,
    error:err
  }
}

export const purchaseBurgerStart = ()=>{
  return{
    type:actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData)=>{
  return dispatch =>{
    dispatch(purchaseBurgerStart())
    axios.post('/orders.json',orderData)
          .then(res=>{
              console.log(res.data)
              dispatch(purchaseBurgerSuccess(res.data.name, orderData))
          })
          .catch(err=>{
            console.log(err)
            dispatch(purchaseBurgerFailure(err))
          })
  }
}

export const fetchOrderStart = ()=>{
  return{
    type:actionTypes.FETCH_ORDERS_START
  }
}

export const fetchOrderSuccess = (orders)=>{
  return{
    type:actionTypes.FETCH_ORDERS_SUCCESS,
    order:orders
  }
}

export const fetchOrderFail = (error)=>{
  return{
    type:actionTypes.FETCH_ORDERS_FAIL,
    error:error
  }
}

export const fetchedOrders = ()=>{
  return dispatch => {
    dispatch(fetchOrderStart())
    axios.get('/orders.json')
        .then(res=>{
          console.log(res.data);
          const fetchedOrders=[]
          for(let key in res.data){
            fetchedOrders.push({...res.data[key],id:key})
          }
            console.log('fetchedOrders: ',fetchedOrders);
          dispatch(fetchOrderSuccess(fetchedOrders))
        })
        .catch(err=>{
          dispatch(fetchOrderFail(err))
        })
  }
}

// export const purchaseInit = ()=>{
//   return{
//     type:actionTypes.PURCHASE_INIT
//   }
// }
