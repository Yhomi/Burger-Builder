import React,{useEffect,useState} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary';

const withError =(WrappedComponent,axios)=>{
  return props =>{
    // state={
    //   errorVal:null
    // }
    const [error,setError] = useState(null)

      const reqInterceptors=axios.interceptors.request.use(req=>{
        setError(null)
        return req;
      })
      const resInterceptors=axios.interceptors.response.use(res=>{
        return res;

      },err=>{
        setError(err)
      })

    useEffect(()=>{
      return ()=>{
        axios.interceptors.request.eject(reqInterceptors)
        axios.interceptors.response.eject(resInterceptors)
      }
    },[reqInterceptors,resInterceptors]);
  // componentWillUnmount(){
  //
  //   axios.interceptors.request.eject(this.reqInterceptors)
  //   axios.interceptors.response.eject(this.resInterceptors)
  // }
    const errorClosedHandler =()=>{
      setError(null)
    }

      return(
        <Aux>
          <Modal show={error} modalClosed={errorClosedHandler}>
            {error ? error.message : null}
          </Modal>
          <WrappedComponent {...props} />
        </Aux>
      )
  }
}

export default withError
