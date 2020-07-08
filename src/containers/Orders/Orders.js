import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders/axios';
import withError from '../../hoc/withError/withError';

class Orders extends React.Component {
  state={
    orders:[],
    loading:true
  }

  componentDidMount(){
    axios.get('/orders.json')
        .then(res=>{
          console.log(res.data);
          const fetchedOrders=[]
          for(let key in res.data){
            fetchedOrders.push({...res.data[key],id:key})
          }
            console.log('fetchedOrders: ',fetchedOrders);
          this.setState({loading:false,orders:fetchedOrders})
        })
        .catch(err=>{
          this.setState({loading:false})
        })
  }
  render () {
        let orders =this.state.orders.map(order=>{
            return <Order key={order.id}
                      ingredients={order.ingredients}
                      price={+order.price}
                />
        })
      return(
        <div>
            {orders}
        </div>
      )
  }
}

export default withError(Orders,axios);
