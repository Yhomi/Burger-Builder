import React,{useState} from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactDetails.module.css';
import axios from '../../axios-orders/axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import {connect} from 'react-redux';
// import {withRouter} from 'react-router-dom';
import withError from '../../hoc/withError/withError';
import * as actions from '../../store/actions/index';

const ContactDetails= props=> {
  const [orderForm,setOrderForm]  = useState({

      name:{
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Your Name'
        },
        value:'',
        validation:{
          required:true
        },
        valid:false,
        touched:false
      },

      email:{
        elementType:'input',
        elementConfig:{
          type:'email',
          placeholder:'Your E-mail'
        },
        value:'',
        validation:{
          required:true
        },
        valid:false,
        touched:false
      },

      street:{
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Your Street Address'
        },
        value:'',
        validation:{
          required:true
        },
        valid:false,
        touched:false
      },
      postalCode:{
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Your Postal Code'
        },
        value:'',
        validation:{
          required:true,
          minLength:5,
          maxLength:5
        },
        valid:false,
        touched:false
      },
      delivery:{
        elementType:'select',
        elementConfig:{
          options:[
            {value:"fastest",displayValue:"Fastest"},
            {value:"godspeed",displayValue:"GodSpeed"},
            {value:"cheapest",displayValue:"Slow Delivery"},
        ]
        },
        value:'fastest',
        valid:true,
        validation:{}
      },

    });

    // const [loading,setLoading] = useState(false);
    const [formIsValid,setFormisValid] = useState(false);


  const orderHandler = (e)=>{
      e.preventDefault();

      const formData = {}
      for(let formElementIdentifier in orderForm){
        formData[formElementIdentifier] = orderForm[formElementIdentifier].value
      }
      const order={
        ingredients:props.ings,
        price:props.price,
        oderData:formData,
        user_id:props.userId
      }
      props.onOrderBurger(order,props.token);
      // axios.post('/orders.json',order)
      //       .then(res=>{
      //
      //           this.setState({loading:false})
      //       })
      //       .catch(err=>{
      //
      //         this.setState({loading:false})
      //       })
            props.history.push('/')
  }

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

  const inputChangedHandler = (e,inputIdentifier)=>{
    //
    const updatedOrderForm ={
      ...orderForm
    };

    // clone the form element you want to change its value
    const updatedFormElement ={
      ...updatedOrderForm[inputIdentifier]
    }
    updatedFormElement.value = e.target.value
    updatedFormElement.valid = checkValidation(updatedFormElement.value,updatedFormElement.validation)
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement

    let formValid = true;
    for(let inputIdentifier in updatedOrderForm){
      formValid = updatedOrderForm[inputIdentifier].valid && formValid
    }

    setOrderForm(updatedOrderForm);
    setFormisValid(formValid)
    // this.setState({orderForm:updatedOrderForm,formIsValid:formValid})
  }



    let formElementsArray =[];
    for(let key in orderForm){
      formElementsArray.push({
        id:key,
        config:orderForm[key]
      })
    }

    let form = (
      <form onSubmit={orderHandler}>

          {formElementsArray.map(formElement=>{
             return <Input key={formElement.id} elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid = {!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(e)=>inputChangedHandler(e,formElement.id)}
           />
          })}
          <hr/>
          <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
      </form>
    );
    if(props.loading){
      form= <Spinner />
    }
    return(
        <div className={classes.ContactDetails}>
          <h4>Enter Your Contact Details</h4>
          {form}
        </div>
    )

}

const mapStateToProps = state =>{
  return{
    ings:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    loading:state.orders.loading,
    token:state.auth.token,
    userId:state.auth.userId
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withError(ContactDetails,axios));
