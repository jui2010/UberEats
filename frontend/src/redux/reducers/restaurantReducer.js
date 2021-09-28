import {LOGIN_RESTAURANT} from '../types'

const initialState = {
  restaurants : [],
  selectedRestaurant : {}, 
  authenticatedRestaurant : {},
  authenticated : false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action){
  switch(action.type){
      case LOGIN_RESTAURANT :
        return {
          ...state,
          authenticatedRestaurant : action.payload,
          authenticated : true
        }
       
      default : 
        return {
          ...state
        }
  }
}