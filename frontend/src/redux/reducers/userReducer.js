import { SIGNUP_USER, LOGIN_USER, EDIT_PROFILE, GET_AUTHENTICATED_USER} from '../types'

const initialState = {
    authenticatedUser : {},
    authenticated : false,
    message : ''
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState , action){
    switch(action.type){
        case SIGNUP_USER : 
            return {
                ...state,
                message : action.payload
            }

        case LOGIN_USER :
            return {
                ...state,
                authenticatedUser : action.payload,
                authenticated : true
            } 

        case GET_AUTHENTICATED_USER :
            return {
                ...state,
                authenticatedUser : action.payload,
                authenticated : true
            } 

        case EDIT_PROFILE :
            return {
                ...state, 
                authenticatedUser : {
                    ...action.payload
                }
            } 
 
        default : 
            return {
                ...state
            }
    }
}