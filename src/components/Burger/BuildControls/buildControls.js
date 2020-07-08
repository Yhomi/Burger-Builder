import React from 'react';
import classes from './buildControls.module.css';
import BuildControl from './BuildControl/buildControl';


const controls=[
  {label:"Salad",type:"salad"},
  {label:"Bacon",type:"bacon"},
  {label:"Cheese",type:"cheese"},
  {label:"Meat",type:"meat"}
]

const buildControls = props=>{
  return(
    <div className={classes.BuildControls}>
      <h3>Current Price:${props.price.toFixed(2)} </h3>
        {controls.map((control,index)=>{
          return <BuildControl key={index}
                    label={control.label}
                    addMore={()=>props.addIngredient(control.type)}
                    less={()=>props.removeIngredient(control.type)}
                    disabled={props.disabled[control.type]}
                  />
        })}
      <button className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.order}
      >ORDER NOW </button>
    </div>
  )
}

export default buildControls
