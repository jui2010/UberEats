import {SIGNUP_USER, LOGIN_USER} from '../types'
import axios from 'axios'

export const signupUser = (newUser, history) => (dispatch) => {
    axios.post('/signup', newUser)
        .then(res => {
            dispatch({
                type : SIGNUP_USER
            })
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
                type : LOGIN_USER
            })
            history.push('/')
            console.log("login successful")
        })
        .catch(err => {
            console.log(err)
        })
}
