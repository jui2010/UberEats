import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import {changeOrderStatus} from '../redux/actions/restaurantActions'

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
    }
})

class OrderStatus extends Component {

    state = {
        orderStatus : this.props.orderItem.orderStatus
    }

    handleStatusChange = (stat) => {
        this.setState({
            orderStatus : stat
        })

        let newOrderStatus = {
            orderid : this.props.orderItem.orderid,
            orderStatus : stat
        }
        this.props.changeOrderStatus(newOrderStatus)
    }

    render() {
        const {classes } = this.props
        const {orderItem} = this.props

        console.log('order status :' + this.state.orderStatus)
        return (   
            <>
                {orderItem.deliveryOrPickup === "delivery" ? (
                    <FormControl >
                        <InputLabel id="demo-simple-select-label">Order Status</InputLabel>
                            <Select
                            id="orderStatus"
                            value={this.state.orderStatus}
                            label="Order Status"
                            onChange={this.handleChange}
                            >
                            <MenuItem value={"orderReceived"} onClick={() => this.handleStatusChange('orderReceived')}>Order Received</MenuItem>
                            <MenuItem value={"preparing"} onClick={() => this.handleStatusChange('preparing')}>Preparing</MenuItem>
                            <MenuItem value={"onTheWay"} onClick={() => this.handleStatusChange('onTheWay')}>On the way</MenuItem>
                            <MenuItem value={"delivered"} onClick={() => this.handleStatusChange('delivered')}>Delivered</MenuItem>
                            <MenuItem value={"cancelled"} onClick={() => this.handleStatusChange('cancelled')}>Cancelled</MenuItem>
                        </Select>
                    </FormControl>
                ) : (
                    <FormControl >
                        <InputLabel id="demo-simple-select-label">Order Status</InputLabel>
                            <Select
                            id="orderStatus"
                            value={this.state.orderStatus}
                            label="Order Status"
                            onChange={this.handleChange}
                            >
                            <MenuItem value={"orderReceived"} onClick={() => this.handleStatusChange('orderReceived')}>Order Received</MenuItem>
                            <MenuItem value={"preparing"} onClick={() => this.handleStatusChange('preparing')}>Preparing</MenuItem>
                            <MenuItem value={"pickupReady"} onClick={() => this.handleStatusChange('pickupReady')}>Pickup Ready</MenuItem>
                            <MenuItem value={"pickedUp"} onClick={() => this.handleStatusChange('pickedUp')}>Pickuped Up</MenuItem>
                            <MenuItem value={"cancelled"} onClick={() => this.handleStatusChange('cancelled')}>Cancelled</MenuItem>
                        </Select>
                    </FormControl>
                )}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
    restaurant : state.restaurant
})

export default connect(mapStateToProps, {changeOrderStatus} )(withStyles(styles)(OrderStatus))
