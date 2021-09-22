import {SIGNUP_USER, LOGIN_USER} from '../types'

const initialState = {
    authenticatedUser : {},
    authenticated : false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState , action){
    switch(action.type){
        case SIGNUP_USER :
            return {
                authenticatedUser : action.payload,
                authenticated : true
            }

        case LOGIN_USER :
            return {
                authenticatedUser : action.payload,
                authenticated : true
            } 

        default : 
            return {
                ...state
            }
    }
}