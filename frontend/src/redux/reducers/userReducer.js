import { LOGIN_USER, EDIT_PROFILE} from '../types'

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

        case EDIT_PROFILE :
            return {
                authenticatedUser : '',
            } 
 
        default : 
            return {
                ...state
            }
    }
}