import { GET_AUTHENTICATED_RESTAURANT, SIGNUP_RESTAURANT, LOGIN_RESTAURANT, GET_RESTAURANT_DATA, EDIT_RESTAURANT_PROFILE, ADD_DISH, ADD_TO_CART, CHANGE_ORDER_STATUS, 
  MARK_FAVORITE, MARK_UNFAVORITE, EDIT_DISH, SET_LOGIN_REST_ERROR, CLEAR_LOGIN_REST_ERROR, 
  SET_SIGNUP_REST_ERROR, CLEAR_SIGNUP_REST_ERROR, LOGOUT_RESTAURANT} from '../types'
import axios from 'axios'

export const signupRestaurant = (newRestaurant, history) => (dispatch) => {
  axios.post('/restaurant/restaurantSignup', newRestaurant)
    .then(res => {
      dispatch({
        type : SIGNUP_RESTAURANT,
        payload : "Restaurant signup successful"
      })

      dispatch({
        type : CLEAR_SIGNUP_REST_ERROR
      })

      history.push('/restaurantLogin')
      console.log("signup successful")
    })
    .catch(err => {
      console.log("restaurant signup error "+ JSON.stringify(err))
      dispatch({
        type: SET_SIGNUP_REST_ERROR,
        payload: err.response.data.signupRestError,
      })
    })
}

export const loginRestaurant  = (newRestaurant, history) => (dispatch) => {
  axios.post('/restaurant/restaurantLogin', newRestaurant)
    .then(res => {
      if(res.data.loginRestError){
        dispatch({
          type : SET_LOGIN_REST_ERROR,
          payload : res.data.loginRestError
        })
      }
      else{
        let token = res.data
        console.log("restaurant signup error "+ JSON.stringify(token))
        localStorage.setItem('restaurantToken' , token )
        axios.defaults.headers.common['Authorization'] = token

        axios.get('/authRestaurant/getAuthenticatedRestaurantData')
          .then(res => {
            console.log("getAuthenticatedRestaurantData")
              dispatch({
                type : GET_RESTAURANT_DATA,
                payload : res.data
              })
              
              dispatch({
                type : LOGIN_RESTAURANT,
                payload : res.data
              })

              dispatch({
                type : CLEAR_LOGIN_REST_ERROR
              })
      
              history.push(`/restaurant/${res.data.restaurantName}`)
              console.log("restaurant login successful")
          })
          .catch(err => console.log(err) )
      }
    })
    .catch(err => {
      console.log("restaurant login error "+ JSON.stringify(err))
      dispatch({
        type: SET_LOGIN_REST_ERROR,
        payload: err.response.data.loginRestError,
      })
    })
}

export const getAuthenticatedRestaurantData = () => (dispatch) => {
  axios.get('/authRestaurant/getAuthenticatedRestaurantData')
    .then(res => {
      console.log("getAuthenticatedRestaurantData")
        dispatch({
          type : GET_AUTHENTICATED_RESTAURANT,
          payload : res.data
        })
    })
    .catch(err => console.log(err) )
}

export const getSelectedRestaurantData = (details) => (dispatch) => {
  axios.post('/restaurant/getSelectedRestaurantData', details)
    .then(res => {
      console.log("getSelectedRestaurantData" + JSON.stringify(res.data))
        dispatch({
          type : GET_RESTAURANT_DATA,
          payload : res.data
        })
    })
    .catch(err => console.log(err) )
}

export const editRestaurantProfile = (restaurantDetails) => (dispatch) => {
  axios.post(`/authRestaurant/editRestaurantProfile/`, restaurantDetails)
    .then(res => {
      dispatch({
        type : EDIT_RESTAURANT_PROFILE,
        payload : restaurantDetails
      })
    })
    .catch(err => console.log(err) )
}

export const addDish = (newDish) => (dispatch) => {
  axios.post(`/authRestaurant/addDish/`, newDish)
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
  axios.post(`/authRestaurant/changeOrderStatus/`, newOrderStatus)
    .then(res => {
      dispatch({
        type : CHANGE_ORDER_STATUS,
        payload : newOrderStatus
      })
    })
    .catch(err => console.log(err) )
}

export const addToFavorite = (favRestaurant) => (dispatch) => {
  axios.post('/authUser/addToFavorite', favRestaurant)
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
  axios.post('/authUser/addToUnfavorite', unfavRestaurant)
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
  axios.post(`/authRestaurant/editDish/`, dishDetails)
    .then(res => {
      console.log(JSON.stringify(dishDetails))
      dispatch({
        type : EDIT_DISH,
        payload : dishDetails
      })
    })
    .catch(err => console.log(err) )
}

export const logoutRestaurant = () => (dispatch) => {
  localStorage.removeItem('userToken')
  delete axios.defaults.headers.common['Authorization']

  dispatch({
      type : LOGOUT_RESTAURANT
  })
}
