import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = props =>{


    const text={
      textTransform:'capitalize'
    }
    const ingredientSummary=Object.keys(props.ingredients).map(igKey=>{
        return (<li key={igKey}><span style={text}>{igKey}</span>: {props.ingredients[igKey]}</li>)
    })
        return(
          <Aux>
              <h3>Your Order</h3>
              <p>A Delicious Burger with the following ingredients</p>
              <ul>
                  {ingredientSummary}
              </ul>
              <h3>Total Price:${props.total.toFixed(2)}</h3>
              <p>Continue to checkout?</p>
              <Button clicked={props.purchaseCancel} btnType="Danger">CANCEL</Button>
              <Button clicked={props.purchaseContinue} btnType="Success">CONTINUE</Button>
          </Aux>
        )
  
}
export default OrderSummary
