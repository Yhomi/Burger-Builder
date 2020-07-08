import React from 'react';
import Button from '../../components/UI/Button/Button';
import classes from './ContactDetails.module.css';
import axios from '../../axios-orders/axios';
import Spinner from '../../components/UI/Spinner/Spinner';
// import {withRouter} from 'react-router-dom';

class ContactDetails extends React.Component {
  state={
    name:'',
    email:'',
    address:{
      street:'',
      postalCode:''
    },
    loading:false
  }

  orderHandler = (e)=>{
      e.preventDefault();
      console.log(this.props.ingredients);

      this.setState({loading:true})
      const order={
        ingredients:this.props.ingredients,
        price:this.props.price,
        customer:{
          name:"John Doe",
          email:'jdoe@gmail.com',
          address:{
            street:'Bode Thomas street',
            zipcode:'Av1234',
            state:'Lagos',
            country:'Nigeria'
          },
          delivery:'GodSpeed'
        }
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


  render () {
    let form = (
      <form>
          <input type="text" name="name" placeholder="Your Name" />
          <input type="email" name="email" placeholder="Your Mail" />
          <input type="text" name="street" placeholder="Your Street" />
          <input type="text" name="postalCode" placeholder="Your Postal Code" />
          <hr/>
          <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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
