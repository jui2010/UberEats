import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import { GET_ALL_ORDERS } from '../redux/types'
import axios from 'axios'
import store from '../redux/store'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

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
    }, 
    rec : {
        fontSize : '12px',
        color: '#292929',
        textTransform : 'capitalize',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    receipt : {
        width : '500px'
    },
    total : {
        paddingLeft : '20px',
        marginBottom : '20px',
        fontWeight: '700',
        fontSize : '26px',
    },
    totalPrice : {
        paddingLeft : '20px',
        marginBottom : '20px',
        fontWeight: '700',
        fontSize : '26px',
    },
    dish : {
        marginBottom : '20px'
    },
    dishQuantity : {
        marginLeft : '15px',
        paddingLeft : '7px',
        border : '1px solid #cfcfcf'
    }, 
    dishName : {
        marginLeft : '12px',
        fontWeight: '600',
        color: '#292929',
        fontSize : '18px',
    }, 
    dishPrice : {
        color: '#292929',
        fontWeight: '600',
        fontSize : '15px',
    },
    ins : {
        paddingLeft : '20px',
        paddingBottom : '40px'
    }
})

class orders extends Component {
    state = {
        open : false,
        orderStatus : 'all'
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

    componentDidMount(){
        // setTimeout(()=>{
            axios.get('/authUser/getOrders')
                .then(res => {
                    console.log("userid :"+JSON.stringify(res.data))
                    store.dispatch({
                        type : GET_ALL_ORDERS,
                        payload : res.data
                    })
            })
        // },1000)
    }

    renderOrders = () => {
        const {classes} = this.props
        const {orders} = this.props.user.authenticatedUser

        let month = {
            1 : 'Jan',
            2 : 'Feb',
            3 : 'Mar',
            4 : 'Apr',
            5 : 'May',
            6 : 'Jun',
            7 : 'Jul',
            8 : 'Aug',
            9 : 'Sep',
            10 : 'Oct',
            11 : 'Nov',
            12 : 'Dec'
        }

        // console.log("orderJSON "+JSON.stringify(this.props.user.authenticatedUser))

        if(this.props.user.authenticatedUser.orders && this.props.user.authenticatedUser.orders.length > 0){

            let filteredOrders = this.state.orderStatus === "all" ? orders : 
                orders.filter((ord) => {return ord.orderStatus === this.state.orderStatus})

            return filteredOrders.map(orderItem => (
                <Grid container>
                    <Grid item xs={12} className={classes.heading}>
                        {orderItem.restaurantName} ({orderItem.location})
                    </Grid>
                    <Grid item xs={12} className={classes.det}>
                        {orderItem.dishes.length} 
                        {orderItem.dishes.length === 1 ? ' item' : ' items'} for ${Math.round(orderItem.orderPriceTotal * 100)/100} • {month[orderItem.updatedAt.split("T")[0].split("-")[1]]} {orderItem.updatedAt.split("T")[0].split("-")[2]} at {orderItem.updatedAt.split("T")[1].split(':')[0]}:{orderItem.updatedAt.split("T")[1].split(':')[1]} • <Button className={classes.rec} onClick={this.handleOpen}>View receipt</Button>
                    </Grid>
                    <Dialog open={this.state.open} onClose={this.handleClose}>
                        <DialogTitle style={{borderBottom : '1px solid #cfcfcf'}}>
                            <div>Receipt</div>
                        </DialogTitle>
                        <Grid container className={classes.receipt}>
                            <Grid item xs={9} className={classes.total}>
                                Total
                            </Grid>
                            <Grid item xs={3} className={classes.totalPrice}>
                                ${Math.round(orderItem.orderPriceTotal * 100)/100} 
                            </Grid>
                        </Grid>

                        {
                        orderItem.dishes.map(dish => (
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
                                <Grid item xs={1}>
                                    <div className={classes.dishPrice}>
                                        ${Math.round(dish.dishPrice * dish.dishQuantity * 100 ) /100}
                                    </div>
                                </Grid>
                            </Grid>
                        ))}

                        {orderItem.instructions &&
                        <Grid container  className={classes.ins} >
                            <Grid item xs={12}>
                                <span style={{fontWeight: '700'}}>Special Instructions : </span>{orderItem.instructions}
                            </Grid>
                        </Grid>
                        }
                    </Dialog>
                </Grid>
            ))
        }
    }

    handleStatusChange = (stat) => {
        this.setState({
            orderStatus : stat
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render() {
        const {classes } = this.props

        console.log(this.state.orderStatus)

        return (
            <Grid direction="row" container className={classes.main}>
                <Grid container item sm={12} className={classes.past} >
                    Past Orders
                </Grid>
                <Grid container item sm={12}>
                    <div style={{fontSize : '20px', margin : '10px'}}>Select filter: </div>
                <FormControl >
                        <Select
                            name="orderStatus"
                            id="orderStatus"
                            value={this.state.orderStatus}
                            onChange={this.handleChange}
                            >
                            <MenuItem value={"all"}>All Orders</MenuItem>
                            <MenuItem value={"orderReceived"} >Order Received</MenuItem>
                            <MenuItem value={"preparing"} >Preparing</MenuItem>
                            <MenuItem value={"onTheWay"} >On the way</MenuItem>
                            <MenuItem value={"delivered"} >Delivered</MenuItem>
                            <MenuItem value={"cancelled"} >Cancelled</MenuItem>
                        </Select>
                    </FormControl>
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
