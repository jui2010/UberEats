import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Grid from '@material-ui/core/Grid'
import InputBase from '@material-ui/core/InputBase'
import { Link } from 'react-router-dom'

import store from '../redux/store'
import {CREATE_ORDER, EMPTY_CART} from '../redux/types'

import {flowRight as compose} from 'lodash'
import { graphql } from 'react-apollo'
import { createOrder } from '../graphql/mutation'

const styles = (theme) => ({
    ...theme.spread,
    itemsList : {
        display: 'flex',
        justifyContent: 'space-around',
    },
    dishName : {
        fontSize : '23px',
        fontWeight : '600'
    }, 
    dishQuantity : {
        fontSize : '22px',
        fontWeight : '500',
        paddingLeft : '20px',
    }, 
    dishPrice : {
        fontSize : '18px',
        color : '#171717'
    },
    list : {
        paddingBottom : '10px',
        marginBottom : '10px',
        borderBottom : '1px solid #dedede'
    },
    items : {
        fontSize : '27px',
        fontWeight : '600',
        padding : '20px',
        width : '100%'
    },
    itemsName : {
        fontSize : '30px',
        fontWeight : '600',
        padding : '20px',
        width : '100%'
    },
    placeOrderMain : {
        marginLeft : '800px',
        backgroundColor : '#e3e3e3',
        position: 'fixed',
        background: 'lightgrey',
        height:'100%',
        zIndex: 1,
        overflowY: 'auto',
        willChange: 'transform',
        backfaceVisibility: 'hidden'
    },
    checkout : {
        backgroundColor : 'black',
        color : 'white',
        padding : '10px 150px',
        marginRight : '10px',
        display: 'flex',
        justifyContent: 'space-around',
        cursor : 'pointer',
        fontSize : '24px',
        margin : '0px 0 20px 10px',
    },
    align : {
        display: 'flex',
        justifyContent: 'space-around',
    },
    instructions : {
        fontSize : '20px',
        fontWeight : '600',
        padding : '20px',
        width : '100%'
    },
    instructionsBox : {
        border : '1px solid #dedede',
        marginLeft : '20px'
    }
})

class checkout extends Component {

    state = {
        maxOrderId : 0,
        total : 0,
        instructions : ''
    }

    componentDidMount(){
        const { cart } = store.getState().restaurant

        cart.forEach(cartElement => {
            console.log('state'+this.state.total)
            this.setState({
                total : this.state.total + cartElement.dishPrice
            })
        })
    }
    
    handleCheckout = () => {
        const { cart } = store.getState().restaurant
        
        let order = {
            restaurantid : store.getState().restaurant.selectedRestaurant._id,
            firstname : store.getState().restaurant.selectedRestaurant.firstname,
            lastname : store.getState().restaurant.selectedRestaurant.lastname,
            restaurantName : store.getState().restaurant.selectedRestaurant.restaurantName,
            location : store.getState().restaurant.selectedRestaurant.location,
            userid : store.getState().user.authenticatedUser._id,
            deliveryOrPickup : store.getState().user.mode,
            orderStatus : 'orderReceived',
            instructions : this.state.instructions
        }

        let dishes = []
        cart.forEach(cartElement => {
            let dish = {
                dishid : cartElement.dishid,
                dishName : cartElement.dishName,
                dishQuantity : cartElement.dishQuantity,
                dishPrice : cartElement.dishPrice
            }
            dishes.push(dish)
        })

        order = {
            ...order,
            dishes : dishes
        }

        console.log(JSON.stringify(order))
        this.props.createOrder({
            variables : {
                dishes
            }
        })
        .then((res) => {
            let orderData = res.data.createOrder
            // console.log(JSON.stringify(orderData))
            store.dispatch({
                type : CREATE_ORDER,
                payload : orderData
            })
        })

        store.dispatch({
            type : EMPTY_CART
        })
    }

    displayDishOrders(){
        const {classes} = this.props
        const { cart } = store.getState().restaurant
        if(store.getState().restaurant.cart.length > 0){
            console.log("display dish orders")
            return cart.map(cartItem => (
                    <Grid container item xs={12} key={cartItem.dishid} className={classes.list}>
                        <Grid item xs={1} className={classes.dishQuantity} >
                            {cartItem.dishQuantity}
                        </Grid>
                        <Grid item xs={9} className={classes.dishName}>
                            {cartItem.dishName}
                        </Grid>
                        <Grid item xs={1} className={classes.dishPrice}>
                            ${Math.round(cartItem.dishQuantity * cartItem.dishPrice * 100) /100 } 
                        </Grid>
                    </Grid>
                )
            )
        }
    }

    getSubTotal = () =>{
        const { cart } = store.getState().restaurant
        let tot = 0
        cart.map(cartItem => tot = tot + cartItem.dishQuantity * cartItem.dishPrice)
        console.log(tot)
        return tot
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render() {
        const {classes} = this.props
        const {restaurantName, location, deliveryFee} = store.getState().restaurant.selectedRestaurant

        let subtotal = this.getSubTotal()
        return (
            <Grid direction="row" container>
                
                <Grid container item sm={7} >
                    <div className={classes.itemsName}>
                        {restaurantName} ({location})
                    </div>
                    <div className={classes.items}>
                        Your Items
                    </div>
                    {/* <Grid item sm={12} className={classes.itemsList} > */}
                        {this.displayDishOrders()}
                    {/* </Grid> */}

                    <div className={classes.instructions}>
                        Special Instructions
                    </div>
                    <InputBase
                        id="instructions"
                        name="instructions"
                        className={classes.instructionsBox}
                        onChange={this.handleChange}
                        fullWidth
                        multiline
                    />
                </Grid>

                <Grid container item sm={5} className={classes.placeOrderMain}>
                    {/* <Grid item sm={1} className={classes.itemsList}>
                    </Grid> */}
                    {/* <Grid item  sm={12} className={classes.itemsList}> */}
                        
                        <div style={{margin: '40px', fontSize : '20px'}}>
                            <div className={classes.align}>
                                <div style={{width: '300px',}}>Subtotal</div> <div>${Math.round(subtotal*100)/100}</div>
                            </div>
                            <div className={classes.align}>
                            <div style={{width: '300px',}}>Delivery Fee</div>
                            <div>${deliveryFee}</div>
                            </div>
                            <div className={classes.align}>
                            <div style={{width: '300px',}}>Service Fee</div>
                            <div>$5.00</div>
                            </div>
                            <div className={classes.align}>
                            <div style={{width: '300px',}}>CA Driver Benefits</div>
                            <div>$2.00</div>
                            </div>
                            <div className={classes.align}>
                            <div style={{width: '300px',}}>Taxes</div>
                            <div>${Math.round(this.state.total * 0.15 *100)/100}</div>
                            </div>
                            <div className={classes.align} style={{marginTop : '20px'}}>
                            <div style={{width: '300px', fontWeight : '700'}}>Total</div>
                            <div style={{fontWeight : '700'}}>
                                ${Math.round((parseFloat(subtotal)+ parseFloat(deliveryFee) + 7 + this.state.total * 0.15) *100)/100 }
                            </div>
                            </div>
                            <div role="button" onClick={this.handleCheckout} style={{marginTop : '120px'}}>
                                <Link to="/orderSuccess" style={{textDecoration: 'none'}}>
                                    <div className={classes.checkout}>Place Order</div>
                                </Link>
                            </div>
                        </div>
                </Grid>
            </Grid>
        )
    }
}

// const mapStateToProps = (state) => ({
//     user : state.user,
//     restaurant : state.restaurant
// })

// export default connect(mapStateToProps, {createOrder} )(withStyles(styles)(checkout))
export default compose(graphql(createOrder, { name: "createOrder" }))(withStyles(styles)(checkout))