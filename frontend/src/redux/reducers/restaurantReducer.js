import {SIGNUP_RESTAURANT, LOGIN_RESTAURANT, GET_ALL_RESTAURANTS, GET_RESTAURANT_DATA, EDIT_RESTAURANT_PROFILE} from '../types'

const initialState = {
  restaurants : [],
  selectedRestaurant : {}, 
  authenticatedRestaurant : {},
  authenticated : false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action){
  switch(action.type){
      case SIGNUP_RESTAURANT : 
        return {
          ...state,
          message : action.payload
        }

      case LOGIN_RESTAURANT :
        return {
          ...state,
          authenticatedRestaurant : action.payload,
          authenticated : true
        }
      
      case GET_ALL_RESTAURANTS:
        return {
          ...state,
          restaurants : action.payload
        }

      case GET_RESTAURANT_DATA:
        return {
          ...state,
          selectedRestaurant : action.payload
        }

      case EDIT_RESTAURANT_PROFILE :
        return {
          ...state, 
          authenticatedRestaurant : {
            ...state.authenticatedRestaurant,
            ...action.payload
          },
          selectedRestaurant : {
            ...state.selectedRestaurant,
            ...action.payload
          }
        } 

      default : 
        return {
          ...state
        }
  }
}