import { LOGIN_RESTAURANT, GET_RESTAURANT_DATA } from '../types'
import axios from 'axios'

export const signupRestaurant = (newRestaurant, history) => (dispatch) => {
  axios.post('/restaurantSignup', newRestaurant)
    .then(res => {
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
      dispatch({
        type : LOGIN_RESTAURANT,
        payload : res.data[0]
      })
      console.log("LOGIN_RESTAURANT"+res.data[0])

      history.push('/')
      console.log("restaurant login successful")
    })
    .catch(err => {
      console.log(err)
    })
}

export const getRestaurantData = (restaurantName) => (dispatch) => {
  axios.get(`/restaurant/${restaurantName}`)
    .then(res => {
        dispatch({
            type : GET_RESTAURANT_DATA,
            payload : res.data[0]
        })
    })
    .catch(err => console.log(err) )
}

