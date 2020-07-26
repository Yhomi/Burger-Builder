import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';

class Auth extends Component{
  state = {
    controls:{
      email:{
        elementType:'input',
        elementConfig:{
          type:'email',
          placeholder:'Your E-mail'
        },
        value:'',
        validation:{
          required:true,
          isEmail:true
        },
        valid:false,
        touched:false
      },
    password:{
      elementType:'input',
      elementConfig:{
        type:'password',
        placeholder:'Password'
      },
      value:'',
      validation:{
        required:true,
        minLength:6
      },
      valid:false,
      touched:false
    },
  },
    loading:false,
    formIsValid:false
  }

  render(){
      let formElementsArray =[];
      for(let key in this.state.controls){
        formElementsArray.push({
          id:key,
          config:this.state.controls[key]
        })
      }
      let form = formElementsArray.map(formElement=>(
          <Input key={formElement.id}
            elementType={formElement.config.elementType}
             elementConfig={formElement.config.elementConfig}
             value={formElement.config.value}
             invalid = {!formElement.config.valid}
             shouldValidate={formElement.config.validation}
             touched={formElement.config.touched}
             changed={(e)=>this.inputChangedHandler(e,formElement.id)}
         />
      ))
    return(
      <div className={classes.Auth}>
          <form>
              {form}
              <Button btnType="Success">LOG IN</Button>
          </form>
      </div>
    )
  }
}

export default Auth;
