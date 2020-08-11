import React,{useEffect} from 'react';
import {connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders/axios';
import withError from '../../hoc/withError/withError';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {

  useEffect(()=>{
    props.onFetchedOrders(props.token,props.userId)
  },[])
  // componentDidMount(){
  //   props.onFetchedOrders(this.props.token,this.props.userId)
  // }

            let orders =<Spinner />
            if(!props.loading){
              orders =props.orders.map(order=>{
                 return <Order key={order.id}
                           ingredients={order.ingredients}
                           price={+order.price}
                     />
             })
            }

      return(
        <div>
            {orders}
        </div>
      )
}

const mapStateToProps = state =>{
  return{
    orders:state.orders.orders,
    loading:state.orders.loading,
    token:state.auth.token,
    userId:state.auth.userId
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onFetchedOrders: (token,userId)=> dispatch(actions.fetchedOrders(token,userId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withError(Orders,axios));
