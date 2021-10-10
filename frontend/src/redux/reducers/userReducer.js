import { SIGNUP_USER, LOGIN_USER, EDIT_PROFILE, GET_AUTHENTICATED_USER, CHANGE_MODE, CREATE_ORDER, GET_ALL_ORDERS} from '../types'

const initialState = {
    authenticatedUser : {},
    authenticated : false,
    message : '',
    mode : 'delivery',
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
            let oldOrder = action.payload
            let newOrder = []
            oldOrder.forEach(oldEl => {
                newOrder.push({
                    orderid : oldEl.orderid, 
                    userid : oldEl.userid, 
                    restaurantid : oldEl.restaurantid, 
                    restaurantName : oldEl.restaurantName, 
                    location : oldEl.location, 
                    deliveryOrPickup: oldEl.deliveryOrPickup,
                    orderStatus: oldEl.orderStatus,
                    orderDate: oldEl.orderDate,
                    orderTime: oldEl.orderTime,
                    orderPriceTotal : 0,
                    dishes : [] })
            })

            newOrder = newOrder.filter((newOr, index, self) =>
                index === self.findIndex((t) => (
                    t.orderid === newOr.orderid && t.userid === newOr.userid && t.restaurantid === newOr.restaurantid
                ))
            )

            oldOrder.forEach(oldEl => {
                let dish = {
                    dishid : oldEl.dishid,
                    dishQuantity : oldEl.dishQuantity,
                    dishPrice : oldEl.dishPrice,
                    dishName : oldEl.dishName,
                }

                let index = newOrder.findIndex(
                    newOr => newOr.orderid === oldEl.orderid && newOr.userid === oldEl.userid && newOr.restaurantid === oldEl.restaurantid
                )

                newOrder[index].dishes.push(dish)
                newOrder[index].orderPriceTotal = newOrder[index].orderPriceTotal + dish.dishPrice
            })

            return {
                ...state,
                authenticatedUser : {
                    ...state.authenticatedUser,
                    orders : newOrder
                }
            }   

        default : 
            return {
                ...state
            }
    }
}