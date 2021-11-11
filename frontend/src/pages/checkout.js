import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
// import axios from 'axios'
import {createOrder} from '../redux/actions/userActions'
import store from '../redux/store'
import {EMPTY_CART} from '../redux/types'

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
    }
})

class checkout extends Component {

    state = {
        maxOrderId : 0,
        total : 0
    }

    componentDidMount(){
        const { cart } = this.props.restaurant

        cart.forEach(cartElement => {
            console.log('state'+this.state.total)
            this.setState({
                total : this.state.total + cartElement.dishPrice
            })
        })
    }
    
    handleCheckout = () => {
        const { cart } = this.props.restaurant
        
        let order = {
            restaurantid : this.props.restaurant.selectedRestaurant._id,
            restaurantName : this.props.restaurant.selectedRestaurant.restaurantName,
            location : this.props.restaurant.selectedRestaurant.location,
            userid : this.props.user.authenticatedUser._id,
            deliveryOrPickup : this.props.user.mode,
            orderStatus : 'orderReceived'
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
        this.props.createOrder(order)

        store.dispatch({
            type : EMPTY_CART
        })
    }

    displayDishOrders(){
        const {classes} = this.props
        const { cart } = this.props.restaurant
        if(this.props.restaurant.cart.length > 0){
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
                            ${cartItem.dishPrice} 
                        </Grid>
                    </Grid>
                )
            )
        }
    }

    getSubTotal = () =>{
        const { cart } = this.props.restaurant
        let tot = 0
        cart.map(cartItem => tot = tot + cartItem.dishPrice)
        console.log(tot)
        return tot
    }
    
    render() {
        const {classes} = this.props
        const {restaurantName, location, deliveryFee} = this.props.restaurant.selectedRestaurant

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
                            <div style={{fontWeight : '700'}}>${Math.round((subtotal+ parseInt(deliveryFee) + 7 + this.state.total * 0.15) *100)/100 }</div>
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

const mapStateToProps = (state) => ({
    user : state.user,
    restaurant : state.restaurant
})

export default connect(mapStateToProps, {createOrder} )(withStyles(styles)(checkout))
