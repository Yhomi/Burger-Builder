import React,{Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
  componentDidUpdate(){
    console.log('[Order Summary]: componentDidUpdate');
  }
  render(){
    const text={
      textTransform:'capitalize'
    }
    const ingredientSummary=Object.keys(this.props.ingredients).map(igKey=>{
        return (<li key={igKey}><span style={text}>{igKey}</span>: {this.props.ingredients[igKey]}</li>)
    })
        return(
          <Aux>
              <h3>Your Order</h3>
              <p>A Delicious Burger with the following ingredients</p>
              <ul>
                  {ingredientSummary}
              </ul>
              <h3>Total Price:${this.props.total.toFixed(2)}</h3>
              <p>Continue to checkout?</p>
              <Button clicked={this.props.purchaseCancel} btnType="Danger">CANCEL</Button>
              <Button clicked={this.props.purchaseContinue} btnType="Success">CONTINUE</Button>
          </Aux>
        )
  }
}
export default OrderSummary
