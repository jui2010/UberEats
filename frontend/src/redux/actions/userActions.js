import { SIGNUP_USER, GET_AUTHENTICATED_USER, EDIT_PROFILE, CREATE_ORDER , GET_SELECTED_USER, SET_LOGIN_ERROR, CLEAR_LOGIN_ERROR, SET_SIGNUP_ERROR, CLEAR_SIGNUP_ERROR, LOGOUT_USER} from '../types'
import axios from 'axios'

export const signupUser = (newUser, history) => (dispatch) => {
    axios.post('/user/signup', newUser)
        .then(res => {
            dispatch({
                type : SIGNUP_USER,
                payload : "User signup successful"
            })

            dispatch({
                type : CLEAR_SIGNUP_ERROR
            })

            history.push('/login')
            console.log("signup successful")
        })
        .catch(err => {
            console.log("signup error "+ JSON.stringify(err))
            dispatch({
                type: SET_SIGNUP_ERROR,
                payload: err.response.data.signupError,
            })
        })
}

export const loginUser = (newUser, history) => (dispatch) => {
    axios.post('/user/login', newUser)
        .then(res => {
            console.log("LOGIN_USER"+ JSON.stringify(res.data))

            if(res.data.loginError){
                dispatch({
                    type : SET_LOGIN_ERROR,
                    payload : res.data.loginError
                })
            }
            else {
                let token = res.data
                localStorage.setItem('userToken' , token )
                axios.defaults.headers.common['Authorization'] = token

                dispatch(getAuthenticatedUserData())
                
                dispatch({
                    type : CLEAR_LOGIN_ERROR
                })

                history.push('/')
                console.log("login successful")
            }
        })
        .catch(err => {
            console.log(err)
        })
}

export const getAuthenticatedUserData = () => (dispatch) => {
    axios.get('/authUser/getAuthenticatedUserData/')
    .then(res => {
        dispatch({
            type : GET_AUTHENTICATED_USER,
            payload : res.data
        })
    })
    .catch(err => console.log(err) )
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
    axios.post('/authUser/createOrder', createOrder)
        .then(res => {
            dispatch({
                type : CREATE_ORDER,
                payload : res.data
            })
            console.log("create order successful")
        })
        .catch(err => {
            console.log(err)
        })
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('userToken')
    delete axios.defaults.headers.common['Authorization']

    dispatch({
        type : LOGOUT_USER
    })
}