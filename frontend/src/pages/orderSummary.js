import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import { GET_ORDER_SUMMARY } from '../redux/types'
import axios from 'axios'
import store from '../redux/store'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Avatar from '@mui/material/Avatar'
import {Link } from 'react-router-dom'

import OrderStatus from '../components/OrderStatus'
import { Button } from '@material-ui/core'

const styles = (theme) => ({
    ...theme.spread,
    main : {
        padding : '20px',
    },
    past : {
        // paddingBottom : '20px',
        // fontWeight: '700',
        // fontSize : '26px',
    },
    button : {
        borderRadius : '5px',
        fontWeight: '600',
        // padding : '10px 30px',
        width : '80px',
        border : '1px solid #cfcfcf',
        cursor : 'pointer'
    },
    orders : {
        marginTop : '20px',
        paddingBottom : '10px',
        borderBottom : '1px solid #cfcfcf',
    },
    ava : {
        fontSize : '20px',
    },
    dish : {
        marginBottom : '5px'
    },
    dishQuantity : {
        marginLeft : '15px',
        paddingLeft : '7px',
        backgroundColor : '#cfcfcf',
        border : '1px solid #cfcfcf'
    }, 
    dishName : {
        marginLeft : '12px',
        fontWeight: '600',
        color: '#292929',
        fontSize : '15px',
    }, 
})

class orderSummary extends Component {

    state = {
        status : 'all',
        orderStatus : 'orderReceived'
    }

    componentDidMount(){
        console.log('get order summary')
        axios.get('/authRestaurant/getOrderSummary')
            .then(res => {
                store.dispatch({
                    type : GET_ORDER_SUMMARY,
                    payload : res.data
                })
        })
    }

    renderOrderItems = (dishes) => {
        const {classes} = this.props

        return dishes.map(dish => (
            <Grid container  className={classes.dish} >
                <Grid item xs={1}>
                    <div className={classes.dishQuantity} >
                        {dish.dishQuantity}
                    </div>
                </Grid>
                <Grid item xs={9} className={classes.dishName}>
                    <div>
                        {dish.dishName} 
                    </div>
                </Grid>
            </Grid>
        ))
    }

    handleStatusChange = (curr) => {
        this.setState({
            status : curr
        })
    }

    renderOrderSummary = () => {
        const {classes } = this.props
        const allOrders = this.props.restaurant.authenticatedRestaurant.orders

        let orders =  this.state.status === 'all' ? allOrders : allOrders.filter((order) => {
            return this.state.status === 'delivered' ? order.orderStatus === 'delivered' : this.state.status === 'cancelled' ? order.orderStatus === 'cancelled' : order.orderStatus === 'orderReceived' | order.orderStatus === 'prepared' | order.orderStatus === 'onTheWay'  
        })

        if(this.props.restaurant.authenticatedRestaurant.orders && this.props.restaurant.authenticatedRestaurant.orders.length > 0){
            return orders.map(orderItem => (
                <Grid container item  xs={12} className={classes.orders}>
                    <Grid item xs={1} className={classes.heading}>
                        <Button component = {Link} to={`/profile/${orderItem.userid}`}>
                            <Avatar className={classes.ava}  sx={{ width: 50, height: 50 }}>
                                {orderItem.firstname.substring(0,1)} {orderItem.lastname.substring(0,1)}
                            </Avatar>
                        </Button>
                    </Grid>
                    <Grid item xs={2} className={classes.heading}>
                        {orderItem.firstname} {orderItem.lastname}
                    </Grid>
                    <Grid item xs={5} className={classes.heading}>
                        {this.renderOrderItems(orderItem.dishes)}
                    </Grid>
                    <Grid item xs={1} className={classes.heading}>
                        ${Math.round(orderItem.orderPriceTotal * 100)/100}
                    </Grid>
                    <Grid item xs={3} className={classes.heading}>
                        <OrderStatus key={orderItem._id} orderItem={orderItem}/>
                    </Grid>
                </Grid>
            ))
        }
    }
    
    render() {
        const {classes } = this.props
        return (
            <Grid direction="row" container className={classes.main}>
                <Grid container item sm={12} className={classes.past} spacing={3} >
                    <Grid item sm={3} className={classes.button} onClick={() => this.handleStatusChange('all')} style={{backgroundColor: this.state.status === 'all' ? '#f0f0f0' : ''}}>
                        All Orders
                    </Grid>
                    <Grid item sm={3} className={classes.button} onClick={() => this.handleStatusChange('new')} style={{backgroundColor: this.state.status === 'new' ? '#f0f0f0' : ''}}>
                        New Orders
                    </Grid>
                    <Grid item sm={3} className={classes.button} onClick={() => this.handleStatusChange('delivered')} style={{backgroundColor: this.state.status === 'delivered' ? '#f0f0f0' : ''}}>
                        Delivered Orders
                    </Grid>
                    <Grid item sm={3} className={classes.button} onClick={() => this.handleStatusChange('cancelled')} style={{backgroundColor: this.state.status === 'cancelled' ? '#f0f0f0' : ''}}>
                        Cancelled Orders
                    </Grid>
                </Grid>
                <Grid container item sm={12} style={{marginTop: '50px'}}>
                    {this.renderOrderSummary()}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
    restaurant : state.restaurant
})

export default connect(mapStateToProps, {} )(withStyles(styles)(orderSummary))
