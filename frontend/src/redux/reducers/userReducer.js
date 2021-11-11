import {SET_AUTHENTICATED, SIGNUP_USER, LOGIN_USER, EDIT_PROFILE, GET_AUTHENTICATED_USER, CHANGE_MODE, 
    CREATE_ORDER, GET_ALL_ORDERS, GET_SELECTED_USER, LOCATION_FILTER, VEGETARIAN_FILTER, VEGAN_FILTER,
     NONVEGETARIAN_FILTER, LOGOUT_USER} from '../types'

const initialState = {
    authenticatedUser : {},
    selectedUser : {},
    authenticated : false,
    message : '',
    mode : 'delivery',
    location : '',
    vegetarianFilter : false,
    veganFilter : false,
    nonVegetarianFilter : false,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState , action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated : true
            } 

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

        case GET_SELECTED_USER:
            return {
                ...state,
                selectedUser : action.payload
            } 

        case EDIT_PROFILE :
            return {
                ...state, 
                authenticatedUser : {
                    ...action.payload
                }
            } 
 
        case CHANGE_MODE: 
            return {
                ...state,
                mode : action.payload
            }
          
        case CREATE_ORDER: 
            return {
                ...state,
            }

        case GET_ALL_ORDERS:
            let ordersAll = action.payload

            ordersAll.forEach(order => {
                order.orderPriceTotal = 0
                order.dishes.forEach(dish => {
                    order.orderPriceTotal = order.orderPriceTotal + parseFloat(dish.dishPrice) * dish.dishQuantity 
                })
            })

            return {
                ...state,
                authenticatedUser : {
                    ...state.authenticatedUser,
                    orders : ordersAll
                }
            }   

        case LOCATION_FILTER :
            return {
                ...state, 
                location : action.payload
            }

        case VEGETARIAN_FILTER :
            return {
                ...state, 
                vegetarianFilter : !state.vegetarianFilter
            }
        
        case VEGAN_FILTER :
            return {
                ...state, 
                veganFilter : !state.veganFilter
            }

        case NONVEGETARIAN_FILTER :
            return {
                ...state, 
                nonVegetarianFilter : !state.nonVegetarianFilter
            }

        case LOGOUT_USER :
            return {
                ...state, 
                authenticated : false,
                authenticatedUser : {}
            }   

        default : 
            return {
                ...state
            }
    }
}