import React from 'react';
import './burger.css';
import BugerIngredient from './BurgerIngredient/burgerIngredient';
import {withRouter} from 'react-router-dom';

const burger = (props)=>{
  let transformedIngredient=Object.keys(props.ingredients)

                              .map(igKey=>{

                                return [...Array(props.ingredients[igKey])].map((_,i)=>{

                                  return <BugerIngredient key={igKey+i} type={igKey} />
                                })
                              })
                              .reduce((arr,el)=>{
                                return arr.concat(el)
                              },[]);

  if (transformedIngredient.length ===0) {
    transformedIngredient=<p>Please start adding ingredients</p>
  }
  
  return(
    <div className="Burger">
        <BugerIngredient type="bread-top" />
        {transformedIngredient}
        <BugerIngredient type="bread-bottom" />
    </div>
  )
}
export default withRouter(burger);
