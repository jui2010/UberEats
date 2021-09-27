import { LOGIN_USER, EDIT_PROFILE } from '../types'
import axios from 'axios'

export const signupUser = (newUser, history) => (dispatch) => {
    axios.post('/signup', newUser)
        .then(res => {
            history.push('/login')
            console.log("signup successful")
        })
        .catch(err => {
            console.log(err)
        })
}

export const loginUser = (newUser, history) => (dispatch) => {
    axios.post('/login', newUser)
        .then(res => {
            dispatch({
                type : LOGIN_USER,
                payload : res.data[0]
            })
            console.log("LOGIN_USER"+res.data[0])

            history.push('/')
            console.log("login successful")
        })
        .catch(err => {
            console.log(err)
        })
}

export const editProfile = (userDetails) => (dispatch) => {
    axios.post('/edit', userDetails)
        .then(res => {
            dispatch({
                type : EDIT_PROFILE,
                payload : userDetails
            })
            console.log("user profile edit successful")
        })
        .catch(err => {
            console.log(err)
        })
}
