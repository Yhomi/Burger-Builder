import React from 'react';
import classes from './Order.module.css';


const order = (props) => {
  const igStyle={
    textTransform:'capitalize',
    display:'inline-block',
    margin:'0 8px',
    border:'1px solid #ccc',
    padding:'5px'
  }
  const ingredients =[];
  for(let ingredientsName in props.ingredients){
    ingredients.push({
      name:ingredientsName,
      amount:props.ingredients[ingredientsName]
    })
  }
  const output = ingredients.map(ig=>{
      return <span style={igStyle} key={ig.name}>{ig.name} ({ig.amount})</span>
  })
  return (
    <div className={classes.Order}>
        <p>{output}</p>
        <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
    </div>
  )
}

export default order
