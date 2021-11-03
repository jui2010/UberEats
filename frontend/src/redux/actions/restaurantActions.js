import { SIGNUP_RESTAURANT, LOGIN_RESTAURANT, GET_RESTAURANT_DATA, EDIT_RESTAURANT_PROFILE, 
  ADD_DISH, ADD_TO_CART, CHANGE_ORDER_STATUS, MARK_FAVORITE, MARK_UNFAVORITE, EDIT_DISH, SET_LOGIN_REST_ERROR, CLEAR_LOGIN_REST_ERROR} from '../types'
import axios from 'axios'

export const signupRestaurant = (newRestaurant, history) => (dispatch) => {
  axios.post('/restaurantSignup', newRestaurant)
    .then(res => {
      dispatch({
        type : SIGNUP_RESTAURANT,
        payload : "Restaurant signup successful"
      })
      history.push('/restaurantLogin')
      console.log("signup successful")
    })
    .catch(err => {
      console.log(err)
    })
}

export const loginRestaurant  = (newRestaurant, history) => (dispatch) => {
  axios.post('/restaurantLogin', newRestaurant)
    .then(res => {
      if(res.data.loginRestError){
        dispatch({
          type : SET_LOGIN_REST_ERROR,
          payload : res.data.loginRestError
        })
      }
      else{
        dispatch({
          type : LOGIN_RESTAURANT,
          payload : res.data[0]
        })
        console.log("LOGIN_RESTAURANT"+res.data[0])
        dispatch({
          type : CLEAR_LOGIN_REST_ERROR
        })

        history.push(`/restaurant/${res.data[0].restaurantName}`)
        console.log("restaurant login successful")
      }
    })
    .catch(err => {
      console.log(err)
    })
}

export const getRestaurantData = (restaurantName, userid) => (dispatch) => {
  axios.post(`/restaurant/${restaurantName}`, {userid : userid})
    .then(res => {
        dispatch({
            type : GET_RESTAURANT_DATA,
            payload : res.data
        })
    })
    .catch(err => console.log(err) )
}

export const editRestaurantProfile = (restaurantDetails) => (dispatch) => {
  axios.post(`/editRestaurantProfile/`, restaurantDetails)
    .then(res => {
      dispatch({
        type : EDIT_RESTAURANT_PROFILE,
        payload : restaurantDetails
      })
    })
    .catch(err => console.log(err) )
}

export const addDish = (newDish) => (dispatch) => {
  axios.post(`/addDish/`, newDish)
    .then(res => {
      dispatch({
        type : ADD_DISH,
        payload : newDish
      })
    })
    .catch(err => console.log(err) )
}

//add dish to the cart
export const addToCart = (orderedDish) => (dispatch) => {
  dispatch({
    type : ADD_TO_CART,
    payload : orderedDish
  })
}

// change order status
export const changeOrderStatus = (newOrderStatus) => (dispatch) => {
  axios.post(`/changeOrderStatus/`, newOrderStatus)
    .then(res => {
      dispatch({
        type : CHANGE_ORDER_STATUS,
        payload : newOrderStatus
      })
    })
    .catch(err => console.log(err) )
}

export const addToFavorite = (favRestaurant) => (dispatch) => {
  axios.post('/addToFavorite', favRestaurant)
      .then(res => {
          dispatch({
              type : MARK_FAVORITE,
              payload : favRestaurant
          })
          console.log("favorite add successful")
      })
      .catch(err => {
          console.log(err)
      })
}

export const addToUnfavorite = (unfavRestaurant) => (dispatch) => {
  axios.post('/addToUnfavorite', unfavRestaurant)
      .then(res => {
          dispatch({
              type : MARK_UNFAVORITE,
              payload : unfavRestaurant
          })
          console.log("unfavorite successful")
      })
      .catch(err => {
          console.log(err)
      })
}

export const editDish = (dishDetails) => (dispatch) => {
  axios.post(`/editDish/`, dishDetails)
    .then(res => {
      dispatch({
        type : EDIT_DISH,
        payload : dishDetails
      })
    })
    .catch(err => console.log(err) )
}
