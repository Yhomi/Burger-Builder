import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary';

const withError =(WrappedComponent,axios)=>{
  return class extends Component{
    state={
      errorVal:null
    }
    UNSAFE_componentWillMount(){
      this.reqInterceptors=axios.interceptors.request.use(req=>{
        this.setState({errorVal:null})
        return req;
      })
      this.resInterceptors=axios.interceptors.response.use(res=>{
        return res;

      },error=>{
        this.setState({errorVal:error})
      })
    }
  componentWillUnmount(){
    console.log('Will Unmount',this.reqInterceptors,this.resInterceptors);
    axios.interceptors.request.eject(this.reqInterceptors)
    axios.interceptors.response.eject(this.resInterceptors)
  }
    errorClosedHandler =()=>{
      this.setState({errorVal:null})
    }
    render(){
      return(
        <Aux>
          <Modal show={this.state.errorVal} modalClosed={this.errorClosedHandler}>
            {this.state.errorVal ? this.state.errorVal.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withError
