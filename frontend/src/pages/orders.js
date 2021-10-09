import React, { Component } from 'react'
import moment from 'moment'
import withStyles from '@material-ui/core/styles/withStyles'

import { GET_ALL_ORDERS } from '../redux/types'
import axios from 'axios'
import store from '../redux/store'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'

const styles = (theme) => ({
    ...theme.spread,
    main : {
        padding : '20px',
    },
    past : {
        paddingBottom : '20px',
        fontWeight: '700',
        fontSize : '26px',
    },
    heading : {
        fontWeight: '700',
        fontSize : '17px',
        marginLeft : '20px',
        marginTop : '10px'
    },
    det : {
        marginTop : '10px',
        fontSize : '13px',
        marginLeft : '20px',
        paddingBottom : '40px',
        color: '#808080',
        borderBottom : '1px solid #cfcfcf'
    }
})

class orders extends Component {
    componentDidMount(){
        setTimeout(()=>{
            console.log('get orders')
            axios.post('/getOrders', {userid : this.props.user.authenticatedUser.userid})
                .then(res => {
                    store.dispatch({
                        type : GET_ALL_ORDERS,
                        payload : res.data
                    })
            })
        },2000)
        
    }

    renderOrders = () => {
        const {classes} = this.props
        const {orders} = this.props.user.authenticatedUser

        let month = {
            1 : 'Jan',
            10 : 'Oct'
        }
        console.log("orderJSON "+JSON.stringify(this.props.user.authenticatedUser))

        if(this.props.user.authenticatedUser.orders && this.props.user.authenticatedUser.orders.length > 0){
            return orders.map(orderItem => (
                <Grid container>
                    <Grid item xs={12} className={classes.heading}>
                        {orderItem.restaurantName} ({orderItem.location})
                    </Grid>
                    <Grid item xs={12} className={classes.det}>
                        {orderItem.dishes.length} {orderItem.dishes.length === 1 ? 'item' : 'items'} for ${orderItem.orderPriceTotal} • {month[orderItem.orderDate.split("-")[1]]} {orderItem.orderDate.split("-")[2].split("T")[0]} at {orderItem.orderTime.split(':')[0]}:{orderItem.orderTime.split(':')[1]} • View receipt
                    </Grid>
                </Grid>
            ))
        }
    }

    render() {
        const {classes } = this.props
        return (
            <Grid direction="row" container className={classes.main}>
                <Grid container item sm={12} className={classes.past} >
                    Past Orders
                </Grid>
                <Grid container item sm={12}>
                    {this.renderOrders()}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
    restaurant : state.restaurant
})

export default connect(mapStateToProps, {} )(withStyles(styles)(orders))
