import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import axios from 'axios'
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
        margin : '90px 0 20px 10px',
    },
})

class checkout extends Component {

    state = {
        maxOrderId : 0,
        total : 0
    }

    componentDidMount(){
        const { cart } = this.props.restaurant

        axios.get('/getMaxOrderId')
            .then(res => {
                console.log('res'+JSON.stringify(res.data))
                this.setState({
                    maxOrderId : res.data[0].maxOrderId
                })
            })

        cart.forEach(cartElement => {
            console.log('state'+this.state.total)
            this.setState({
                total : this.state.total + cartElement.dishPrice
            })
        })
    }
    
    handleCheckout = () => {
        const { cart } = this.props.restaurant

        const orderid = parseInt(this.state.maxOrderId) 
        console.log("orderid"+JSON.stringify(this.state.maxOrderId))

        cart.forEach(cartElement => {
            let order = {
                orderid : orderid + 1,
                restaurantid : this.props.restaurant.selectedRestaurant.restaurantid,
                userid : this.props.user.authenticatedUser.userid,
                dishid : cartElement.dishid,
                dishQuantity : cartElement.dishQuantity,
                dishPrice : cartElement.dishPrice,
                deliveryOrPickup : this.props.user.mode,
                orderStatus : 'orderReceived'
            }
            console.log(JSON.stringify(order))
            this.props.createOrder(order)
        })
        
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

    render() {
        const {classes} = this.props
        const {restaurantName, location} = this.props.restaurant.selectedRestaurant

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
                    <Grid item sm={1} className={classes.itemsList}>
                    </Grid>
                    <Grid item  sm={10} className={classes.itemsList}>
                        <div role="button" onClick={this.handleCheckout}>
                            <Link to="/orderSuccess" style={{textDecoration: 'none'}}>
                                <div className={classes.checkout}>Place Order</div>
                            </Link>
                        </div>
{/*                         
                        <div >
                            <div> Subtotal</div>
                            <div>${this.state.total}</div>
                        </div> */}
                    </Grid>
                    <Grid item sm={1} className={classes.itemsList}>
                    </Grid>
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
