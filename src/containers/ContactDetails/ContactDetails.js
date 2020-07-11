import React from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactDetails.module.css';
import axios from '../../axios-orders/axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
// import {withRouter} from 'react-router-dom';

class ContactDetails extends React.Component {
  state={
    orderForm:{
      name:{
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Your Name'
        },
        value:''
      },

      email:{
        elementType:'input',
        elementConfig:{
          type:'email',
          placeholder:'Your E-mail'
        },
        value:''
      },

      street:{
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Your Street Address'
        },
        value:''
      },
      postalCode:{
        elementType:'input',
        elementConfig:{
          type:'text',
          placeholder:'Your Postal Code'
        },
        value:''
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
        value:''
      },

    },

    loading:false
  }

  orderHandler = (e)=>{
      e.preventDefault();
      console.log(this.props.ingredients);

      this.setState({loading:true})
      const formData = {}
      for(let formElementIdentifier in this.state.orderForm){
        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
      }
      const order={
        ingredients:this.props.ingredients,
        price:this.props.price,
        oderData:formData
      }
      axios.post('/orders.json',order)
            .then(res=>{
                console.log(res)
                this.setState({loading:false})
            })
            .catch(err=>{
              console.log(err)
              this.setState({loading:false})
            })
            this.props.history.push('/')
  }

  inputChangedHandler = (e,inputIdentifier)=>{
    // console.log(e.target.value);
    const updatedOrderForm ={
      ...this.state.orderForm
    };

    // clone the form element you want to change its value
    const updatedFormElement ={
      ...updatedOrderForm[inputIdentifier]
    }
    updatedFormElement.value = e.target.value
    updatedOrderForm[inputIdentifier] = updatedFormElement
    this.setState({orderForm:updatedOrderForm})

  }


  render () {
    let formElementsArray =[];
    for(let key in this.state.orderForm){
      formElementsArray.push({
        id:key,
        config:this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>

          {formElementsArray.map(formElement=>{
             return <Input key={formElement.id} elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(e)=>this.inputChangedHandler(e,formElement.id)}
           />
          })}
          <hr/>
          <Button btnType="Success">ORDER</Button>
      </form>
    );
    if(this.state.loading){
      form= <Spinner />
    }
    return(
        <div className={classes.ContactDetails}>
          <h1>Enter Your Contact Details</h1>
          {form}
        </div>
    )
  }
}

export default ContactDetails;
