import React, {useState,useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

const Auth = props=>{

  const [controls,setControls] = useState({
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
  });
    const[isSignUp,setisSignUp] =useState(false);

    useEffect(()=>{
      if(!props.buildingBurger && props.authRedirectPath !=='/'){
        props.onSetAuthRedirectPath('/')
      }
    },[])

  // componentDidMount(){
  //   if(!props.buildingBurger && props.authRedirectPath !=='/'){
  //     this.props.onSetAuthRedirectPath('/')
  //   }
  // }

  // validation
  function checkValidation(value,rules){
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

  const inputChangedHandler = (e,controlName)=>{
    const updatedControls ={
      ...controls,
      [controlName]:{
        ...controls[controlName],
        value:e.target.value,
        valid:checkValidation(e.target.value,controls[controlName].validation),
        touched:true,
      }
    }
    setControls(updatedControls)
    // this.setState({controls:updatedControls})
  }

  const submitHandler = (e)=>{
    e.preventDefault();
    props.onAuthenticate(controls.email.value, controls.password.value,isSignUp)
  }

  const switchAuthHandler = ()=>{
    // this.setState(prevState=>{
    //   return{
    //     isSignUp:!prevState.isSignUp
    //   }
    // })
    setisSignUp(!isSignUp)
  }


      let formElementsArray =[];
      for(let key in controls){
        formElementsArray.push({
          id:key,
          config:controls[key]
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
             changed={(e)=>inputChangedHandler(e,formElement.id)}
         />
      ))
      if(props.loading){
        form = <Spinner />
      }
      const errorStyle ={
        color:'white',
        border:'1px solid #fff',
        backgroundColor:'red',

      }
      let erroMsg = null
      if(props.error){
        erroMsg =(
          <p style={errorStyle}>{props.error.message}</p>
        )
      }
      let isAuth = null;
      if(props.isAuthenticated){
        isAuth =<Redirect to={props.authRedirectPath} />
      }
    return(
      <div className={classes.Auth}>
          <form onSubmit={submitHandler}>
            {erroMsg}
            {isAuth}
              {form}
              <Button btnType="Success">{isSignUp ? "SIGN UP" : "SIGN IN"}</Button>
          </form>
          <Button btnType="Danger" clicked={switchAuthHandler}>SWITCH TO {!isSignUp ? "SIGN UP" : "SIGN IN"}</Button>
      </div>
    )

}

const mapStateToProps = state =>{
  return{
      loading: state.auth.loading,
      error:state.auth.error,
      isAuthenticated:state.auth.token !==null,
      buildingBurger:state.burgerBuilder.building,
      authRedirectPath:state.auth.authRedirect
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    onAuthenticate: (email,password,isSignUp)=>dispatch(actions.auth(email,password,isSignUp)),
    onSetAuthRedirectPath: (path)=>dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
