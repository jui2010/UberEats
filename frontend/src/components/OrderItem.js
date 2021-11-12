import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import { cancelOrder } from '../redux/actions/userActions'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = (theme) => ({
    ...theme.spread,
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

    handleCancelOrder = (orderid) => {
        this.props.cancelOrder({orderid : orderid})
    }

    render() {
        const { classes, orderItem } = this.props
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
        console.log(this.state.orderStatus)

        return (
            <Grid container>
                    <Grid item xs={12} className={classes.heading}>
                        {orderItem.restaurantName} ({orderItem.location})
                    </Grid>
                    <Grid item xs={12} className={classes.det}>
                        {orderItem.dishes.length} 
                        {orderItem.dishes.length === 1 ? ' item' : ' items'} for ${Math.round(orderItem.orderPriceTotal * 100)/100} • {orderItem.orderStatus === "cancelled" && "Cancelled at "}{month[orderItem.updatedAt.split("T")[0].split("-")[1]]} {orderItem.updatedAt.split("T")[0].split("-")[2]} at {orderItem.updatedAt.split("T")[1].split(':')[0]}:{orderItem.updatedAt.split("T")[1].split(':')[1]} •  
                        <Button className={classes.rec} onClick={this.handleOpen}>View receipt</Button> 
                        {orderItem.orderStatus !== "cancelled" && " • "}
                        {orderItem.orderStatus !== "cancelled" && <Button className={classes.rec} onClick={() => this.handleCancelOrder(orderItem._id)}>Cancel order</Button>}
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
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
    restaurant : state.restaurant
})

export default connect(mapStateToProps, {cancelOrder} )(withStyles(styles)(orders))
