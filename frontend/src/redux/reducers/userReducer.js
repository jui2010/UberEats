import { LOGIN_USER, EDIT_PROFILE, GET_AUTHENTICATED_USER} from '../types'

const initialState = {
    authenticatedUser : {
        // firstname : "j", lastname : "j" , email: "j", 
        // phone  : '',
        // nickname : '',
        // dob : '',
        // about : '',
        // city : '',
        // state : '',
        // country : ''
    },
    authenticated : false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState , action){
    switch(action.type){
        case LOGIN_USER :
            return {
                authenticatedUser : action.payload,
                authenticated : true
            } 

        case GET_AUTHENTICATED_USER :
            return {
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