import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = ()=>{
  return{
    type:actionTypes.AUTH_START
  }
}

export const authFail = (error)=>{
  return{
    type:actionTypes.AUTH_FAIL,
    errors:error
  }
}

export const logout = ()=>{
  return{
      type:actionTypes.AUTH_LOGOUT
  }
}

export const authSuccess = (token,user_id)=>{
  return{
    type:actionTypes.AUTH_SUCCESS,
    tokenId:token,
    userId:user_id
  }
}



export const checkAuthTimeOut = (expireTime)=>{
  return dispatch =>{
    setTimeout(()=>{
      dispatch(logout())
    },expireTime*1000)
  }
}

export const auth = (email,password,isSignUp)=>{
  return dispatch =>{
    dispatch(authStart())
    const authData = {
      email:email,
      password:password,
      returnSecureToken:true
    }
    let url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBE0c1Aj_e8hUHDY7iJjJAD0KfVh4UR2is';
    if(isSignUp){
      url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBE0c1Aj_e8hUHDY7iJjJAD0KfVh4UR2is';
    }
    axios.post(url,authData)
        .then(response=>{
          console.log(response.data);
          dispatch(authSuccess(response.data.idToken,response.data.localId))
          dispatch(checkAuthTimeOut(response.data.expiresIn))
        })
       .catch(err=>{
        console.log(err.response.data);
        dispatch(authFail(err.response.data.error))
      })
  }
}
