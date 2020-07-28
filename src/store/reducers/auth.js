import * as actionTypes from '../actions/actionTypes';
import {updatedObject} from '../utility';

const initialState = {
  error:null,
  loading:false,
  token:null,
  userId:null,
  authRedirect:'/'
}

const authStart = (state,action)=>{
  return updatedObject(state,{
    error:null,
    loading:true
  })
}


const authSuccess = (state,action)=>{
  return updatedObject(state,{
    error:null,
    loading:false,
    token:action.tokenId,
    userId:action.userId
  })
}

const authFail = (state,action)=>{
  return updatedObject(state, {
    error:action.errors,
    loading:false
  })
}

const authLogout = (state,action)=>{
  return updatedObject(state,{userId:null,token:null})
}

const setAuthRedirectPath = (state,action)=>{
  return updatedObject(state,{authRedirect:action.path})
}

const authReducer = (state=initialState,action)=>{
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state,action)
      break;
    case actionTypes.AUTH_SUCCESS: return authSuccess(state,action)
      break;
    case actionTypes.AUTH_FAIL:return authFail(state,action)
      break;
    case actionTypes.AUTH_LOGOUT:return authLogout(state, action)
      break;
    case actionTypes.SET_AUTH_REDIRECT_PATH:return setAuthRedirectPath(state,action)
      break;
    default:return state

  }
}
export default authReducer;