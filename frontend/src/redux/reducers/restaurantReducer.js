import {SIGNUP_RESTAURANT, LOGIN_RESTAURANT, GET_ALL_RESTAURANTS, GET_RESTAURANT_DATA, EDIT_RESTAURANT_PROFILE, ADD_DISH, ADD_TO_CART} from '../types'

const initialState = {
  restaurants : [],
  selectedRestaurant : {}, 
  authenticatedRestaurant : {},
  authenticated : false,
  cart : []
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

      case ADD_DISH : 
        return {
          ...state, 
          selectedRestaurant : {
            ...state.selectedRestaurant,
            dishes : [
              action.payload,
              ...state.selectedRestaurant.dishes
            ]
          }
        }
      
      case ADD_TO_CART :
        let index = state.cart.findIndex(
          cartItem => cartItem.dishName === action.payload.dishName
        )

        if(index === -1){
          state.cart[state.cart.length] = action.payload
        } else {
          state.cart[index] = {
            ...state.cart[index],
            dishQuantity : parseInt(state.cart[index].dishQuantity) + parseInt(action.payload.dishQuantity),
            dishPrice : state.cart[index].dishPrice + action.payload.dishPrice,
          }
        }
        
        return {
          ...state,
        }
        
      default : 
        return {
          ...state
        }
  }
}