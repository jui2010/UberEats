import {SET_LOGIN_ERROR, CLEAR_LOGIN_ERROR, SET_LOGIN_REST_ERROR, CLEAR_LOGIN_REST_ERROR, SET_SIGNUP_ERROR, 
  CLEAR_SIGNUP_ERROR, SET_SIGNUP_REST_ERROR, CLEAR_SIGNUP_REST_ERROR} from '../types'

const initialState = {
  errors : {}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action){
  switch(action.type){
      case SET_LOGIN_ERROR : 
        return {
          ...state,
          loginError : action.payload
        }

      case CLEAR_LOGIN_ERROR : 
        delete state.loginError
        return {
          ...state
        }

      case SET_SIGNUP_ERROR : 
        return {
          ...state,
          signupError : action.payload
        }

      case CLEAR_SIGNUP_ERROR : 
        delete state.signupError
        return {
          ...state
        }

      case SET_LOGIN_REST_ERROR : 
        return {
          ...state,
          loginRestError : action.payload
        }

      case CLEAR_LOGIN_REST_ERROR : 
        delete state.loginRestError
        return {
          ...state
        }
      
      case SET_SIGNUP_REST_ERROR : 
        return {
          ...state,
          signupRestError : action.payload
        }

      case CLEAR_SIGNUP_REST_ERROR : 
        delete state.signupRestError
        return {
          ...state
        }

      default : 
        return {
          ...state
        }
  }
}