import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

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
    isSignUp:false
  }

  // validation
  checkValidation(value,rules){
    if(!rules){
      return true
    }
    let isValid = true
    if(rules.required){
      isValid = value.trim() !== "" && isValid
    }
    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid
    }
    if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid
    }
    return isValid
  }

  inputChangedHandler = (e,controlName)=>{
    const updatedControls ={
      ...this.state.controls,
      [controlName]:{
        ...this.state.controls[controlName],
        value:e.target.value,
        valid:this.checkValidation(e.target.value,this.state.controls[controlName].validation),
        touched:true,
      }
    }
    this.setState({controls:updatedControls})
  }

  submitHandler = (e)=>{
    e.preventDefault();
    this.props.onAuthenticate(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignUp)
  }
  switchAuthHandler = ()=>{
    this.setState(prevState=>{
      return{
        isSignUp:!prevState.isSignUp
      }
    })
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
      if(this.props.loading){
        form = <Spinner />
      }
      const errorStyle ={
        color:'white',
        border:'1px solid #fff',
        backgroundColor:'red',
        
      }
      let erroMsg = null
      if(this.props.error){
        erroMsg =(
          <p style={errorStyle}>{this.props.error.message}</p>
        )
      }
    return(
      <div className={classes.Auth}>
          <form onSubmit={this.submitHandler}>
            {erroMsg}
              {form}
              <Button btnType="Success">{this.state.isSignUp ? "SIGN UP" : "SIGN IN"}</Button>
          </form>
          <Button btnType="Danger" clicked={this.switchAuthHandler}>SWITCH TO {!this.state.isSignUp ? "SIGN UP" : "SIGN IN"}</Button>
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return{
      loading: state.auth.loading,
      error:state.auth.error
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    onAuthenticate: (email,password,isSignUp)=>dispatch(actions.auth(email,password,isSignUp))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
