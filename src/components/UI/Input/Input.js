import React from 'react';
import classes from './Input.module.css'


const inputComp  = (props) => {
  let inputClasses = [classes.InputElem]
  if(props.invalid && props.shouldValidate && props.touched){
    inputClasses.push(classes.Invalid)
  }
  let inputElement = null
    switch (props.elementType) {
      case 'input':
        inputElement = <input className={inputClasses.join(' ')}
                          {...props.elementConfig}
                          value={props.value}
                          onChange={props.changed}
                        />
        break;
      case 'textarea':
        inputElement = <textarea className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
           />
        break;
      case 'select':
        inputElement = (<select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                        {props.elementConfig.options.map(option=>{
                          return <option key={option.value} value={option.value}>{option.displayValue}</option>
                        })}
                      </select>)
        break;
      default:
        inputElement = <input className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
          />
    }

    let validationMsg = null;
    if(props.invalid && props.touched){
      validationMsg = <p className={classes.ValidationError}>Please enter a valid value</p>
    }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationMsg}
    </div>
  )
}

export default inputComp
