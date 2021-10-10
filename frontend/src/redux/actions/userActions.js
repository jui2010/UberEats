import { SIGNUP_USER, LOGIN_USER, EDIT_PROFILE, CREATE_ORDER , GET_SELECTED_USER} from '../types'
import axios from 'axios'

export const signupUser = (newUser, history) => (dispatch) => {
    axios.post('/signup', newUser)
        .then(res => {
            dispatch({
                type : SIGNUP_USER,
                payload : "User signup successful"
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

export const getSelectedUser = (userid) => (dispatch) => {
    axios.get(`/getSelectedUser/${userid}`)
        .then(res => {
            dispatch({
                type : GET_SELECTED_USER,
                payload : res.data[0]
            })
        })
        .catch(err => console.log(err) )
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

export const createOrder = (createOrder) => (dispatch) => {
    axios.post('/createOrder', createOrder)
        .then(res => {
            dispatch({
                type : CREATE_ORDER,
                payload : createOrder
            })
            console.log("create order successful")
        })
        .catch(err => {
            console.log(err)
        })
}

