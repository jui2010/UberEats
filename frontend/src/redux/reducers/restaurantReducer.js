import {SET_AUTHENTICATED_REST, SIGNUP_RESTAURANT, LOGIN_RESTAURANT, GET_AUTHENTICATED_RESTAURANT, GET_ALL_RESTAURANTS, GET_RESTAURANT_DATA, EDIT_RESTAURANT_PROFILE, 
  ADD_DISH, ADD_TO_CART, REMOVE_FROM_CART, EDIT_FROM_CART, EMPTY_CART, GET_ORDER_SUMMARY, CHANGE_ORDER_STATUS, MARK_FAVORITE, MARK_UNFAVORITE, EDIT_DISH, LOGOUT_RESTAURANT} from '../types'

const initialState = {
  restaurants : [],
  selectedRestaurant : {}, 
  authenticatedRestaurant : {},
  authenticated : false,
  cart : [],
  cartValue : 0
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action){
  switch(action.type){
      case SET_AUTHENTICATED_REST:
        return {
          ...state,
          authenticated : true
        }
        
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
      
      case GET_AUTHENTICATED_RESTAURANT:
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
        } 
        else {
          state.cart[index] = {
            ...state.cart[index],
            dishQuantity : parseInt(state.cart[index].dishQuantity) + parseInt(action.payload.dishQuantity),
            dishPrice : action.payload.dishPrice,
          }
        }
        
        let total = 0
        state.cart.forEach(cartItem => {
          total = total + parseFloat(cartItem.dishPrice)* parseInt(cartItem.dishQuantity)
        })
        total = Math.round(total * 100)/100

        return {
          ...state,
          cartValue : total
        }
      
      case REMOVE_FROM_CART :
        let tot = 0
        state.cart.forEach(cartItem => {
          tot = tot + parseFloat(cartItem.dishPrice)* parseInt(cartItem.dishQuantity)
        })

        tot = Math.round(tot * 100)/100

        return {
          ...state,
          cart : state.cart.filter((cartItem) => cartItem.dishName !== action.payload),
          cartValue : tot
        }

      case EDIT_FROM_CART : 
        let idx = state.cart.findIndex(
          cartItem => cartItem.dishName === action.payload.dishName
        )

        console.log("idx"+idx)
        if(idx === -1){
          state.cart[state.cart.length] = action.payload
        } 
        else {
        console.log(" action.payload.dishQuantity"+ action.payload.dishQuantity)

          state.cart[idx] = {
            ...state.cart[idx],
            dishQuantity : action.payload.dishQuantity,
          }
        }

        let etot = 0
        state.cart.forEach(cartItem => {
          etot = etot + parseFloat(cartItem.dishPrice)* parseInt(cartItem.dishQuantity)
        })
        etot = Math.round(etot * 100)/100

        return {
          ...state,
          cartValue : etot
        }

      case EMPTY_CART: 
        return {
          ...state,
          cart : []
        }
  
      case GET_ORDER_SUMMARY: 
        let ordersAll = action.payload

        ordersAll.forEach(order => {
            order.orderPriceTotal = 0
            order.dishes.forEach(dish => {
                order.orderPriceTotal = order.orderPriceTotal + dish.dishPrice
            })
        })

        return {
            ...state,
            authenticatedRestaurant : {
                ...state.authenticatedRestaurant,
                orders : ordersAll
            }
        }   

      case CHANGE_ORDER_STATUS : 
        let ind = state.authenticatedRestaurant.orders.findIndex(
          order => order._id === action.payload.orderid
        )

        state.authenticatedRestaurant.orders[ind] = {
          ...state.authenticatedRestaurant.orders[ind],
          orderStatus : action.payload.orderStatus
        }

        return {
          ...state,
        }

      case MARK_FAVORITE: 
        let ind2 = state.restaurants.findIndex(
            restaurant => restaurant.restaurantid === action.payload.restaurantid
        )
        state.restaurants[ind2] = {
            ...state.restaurants[ind2],
            fav : 1
        }
        return {
            ...state,
            selectedRestaurant : {
              ...state.selectedRestaurant,
              fav : 1
            }
        }
      
      case MARK_UNFAVORITE: 
        let ind3 = state.restaurants.findIndex(
            restaurant => restaurant.restaurantid === action.payload.restaurantid
        )
        state.restaurants[ind3] = {
            ...state.restaurants[ind3],
            fav : null
        }

        return {
            ...state,
            selectedRestaurant : {
              ...state.selectedRestaurant,
              fav : null
            }
        }
  
      case EDIT_DISH :
        let ind4 = state.selectedRestaurant.dishes.findIndex(
            dish => dish._id === action.payload.dishid
        )

        state.selectedRestaurant.dishes[ind4] = action.payload

        return {
          ...state, 
        }

      case LOGOUT_RESTAURANT :
        return {
            ...state, 
            authenticated : false,
            authenticatedRestaurant : {}
        } 
      
      default : 
        return {
          ...state
        }
  }
}