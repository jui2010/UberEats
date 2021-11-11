import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { REMOVE_FROM_CART } from '../redux/types'

import { Link } from 'react-router-dom'
import CartDish from '../components/CartDish'

import store from '../redux/store'
import {connect} from 'react-redux'

const styles = (theme) => ({
    ...theme.spread,
    button : {
        // paddingLeft : '30px',
        cursor : 'pointer',
        color : 'white',
        fontSize : '20px'
        // paddingTop : '40px',
    },
    nameLoc : {
        fontWeight: '800',
        fontSize : '40px',
        color : 'black'
    },
    dialog : {
        // width : '500px'
        // height : '700px'
    },
    checkout : {
        backgroundColor : 'black',
        color : 'white',
        width : '96%',
        paddingTop : '10px',
        paddingBottom : '10px',
        marginRight : '10px',
        display: 'flex',
        justifyContent: 'space-around',
        cursor : 'pointer',
        fontSize : '24px',
        margin : '10px 0 20px 10px',
    },
    itemsList : {
        display: 'flex',
        justifyContent: 'space-around',
    },
    dishName : {
        fontSize : '20px',
        fontWeight : '600'
    }, 
    dishQuantity : {
        fontSize : '20px',
        fontWeight : '500',
        paddingLeft : '20px',
    }, 
    dishPrice : {
        fontSize : '18px',
        color : '#171717',
        paddingLeft : '30px'
    },
    list : {
        paddingBottom : '10px',
        marginBottom : '10px',
        borderBottom : '1px solid #dedede'
    },
    remove : {
        fontSize : '12px',
        color : '#171717',
        paddingLeft : '30px'
    }
})

class Cart extends Component {
    state = {
        open : false,
        totalOrderPrice : 0
    }

    handleOpen = () => {
        this.setState({
            open : true
        })
    }

    handleClose = () => {
        this.setState({
            open : false
        })
    }

    displayDishOrders(){
        const { cart } = this.props.restaurant
        if(this.props.restaurant.cart.length > 0){
            return cart.map((cartItem) => (
            // console.log("display dish orders" + JSON.stringify(cartItem))
                    <CartDish key={cartItem.dishid} cartItem={cartItem}/>
                )
            )
        }
    }

    render() {
        const {classes} = this.props
        const {selectedRestaurant} = this.props.restaurant

        const { cart, cartValue} = this.props.restaurant

        let total = 0
        cart.forEach(cartItem => {
            total = total + cartItem.dishPrice
        })

        return (
            <Fragment>
                <div onClick={this.handleOpen} >
                    <Tooltip title="Cart">
                        <ShoppingCartIcon className={classes.button}/>
                    </Tooltip>
                </div>
                
                <Dialog fullWidth open={this.state.open} onClose={this.handleClose} className={classes.dialog}>
                    {this.props.restaurant.cart.length > 0 ? (
                        <Fragment>
                            <DialogTitle>
                                <div className={classes.nameLoc}>{selectedRestaurant.restaurantName} ({selectedRestaurant.location})</div>
                            </DialogTitle>
                            <div className={classes.itemsList} >
                                <Grid container>
                                    {this.displayDishOrders()}
                                </Grid>
                            </div>
                            <div role="button" onClick={this.handleClose}>
                                <Link to="/checkout" style={{textDecoration: 'none'}}>
                                    <div className={classes.checkout} >Go to checkout • ${Math.round(cartValue *100)/100}</div>
                                </Link>
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <DialogTitle>
                                <ShoppingCartIcon style={{fontSize: '70px', padding : '80px 40px 10px 240px'}}/>
                            </DialogTitle>
                            <Grid item style={{height : '250px', padding : '10px 40px 10px 40px'}}  className={classes.dishName}>
                                Add items from a restaurant or store to start a new cart
                            </Grid>
                        </Fragment>
                    )}
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    restaurant : state.restaurant
})

export default connect(mapStateToProps, {})(withStyles(styles)(Cart))