import React from 'react';
import {connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders/axios';
import withError from '../../hoc/withError/withError';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component {


  componentDidMount(){
    this.props.onFetchedOrders()
  }
  render () {
            let orders =<Spinner />
            if(!this.props.loading){
              orders =this.props.orders.map(order=>{
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
}

const mapStateToProps = state =>{
  return{
    orders:state.orders.orders,
    loading:state.orders.loading
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onFetchedOrders: ()=> dispatch(actions.fetchedOrders())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withError(Orders,axios));
