import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import { GET_ALL_ORDERS } from '../redux/types'
import { cancelOrder } from '../redux/actions/userActions'
import axios from 'axios'
import store from '../redux/store'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@material-ui/core/Box'
import Pagination from '@mui/material/Pagination'

import OrderItem from '../components/OrderItem'

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
    ordpage : {
        padding : '20px',
    },
    select : {
        margin : '5px 5px 20px 20px',
    }
})

class orders extends Component {
    state = {
        open : false,
        orderStatus : 'all',
        page : 1,
        numberOfPages : 0,
        itemsPerPage : 5
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

    handlePageSet = (event, value) => {
        this.setState({
            page : value
        })
        console.log(this.state.page)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    renderOrders = () => {
        let rows = []
        const {classes } = this.props
        const {orders} = this.props.user.authenticatedUser
        if(this.props.user.authenticatedUser.orders && this.props.user.authenticatedUser.orders.length > 0){

            let filteredOrders = this.state.orderStatus === "all" ? orders : 
                orders.filter((ord) => {return ord.orderStatus === this.state.orderStatus})
                
            let numberOfPages =filteredOrders.length / this.state.itemsPerPage 
            // let numberOfPages = filteredOrders.length % this.state.itemsPerPage === 0 ? filteredOrders.length / this.state.itemsPerPage : filteredOrders.length / this.state.itemsPerPage + 1

            filteredOrders.slice((Number(this.state.page) - 1) * this.state.itemsPerPage, Number(this.state.page) *  this.state.itemsPerPage).map(orderItem => (
                rows.push(
                    <OrderItem key={orderItem._id} orderItem={orderItem}/>
                )
            ))

            rows.push(
                <>
                <div className={classes.ordpage} >Select number of orders per page</div>
                <FormControl >
                    <Select
                        name="itemsPerPage"
                        id="itemsPerPage"
                        value={this.state.itemsPerPage}
                        onChange={this.handleChange}
                        className={classes.select}
                        >
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={5} defaultValue>5</MenuItem>
                        <MenuItem value={10} >10</MenuItem>
                    </Select>
                </FormControl>
                </>
            )
            rows.push(
                <Box component="span" style={{padding: '5px'}}>
                    <Pagination
                    name="page"
                    count={Math.ceil(numberOfPages)}
                    page={Number(this.state.page)}
                    onChange={this.handlePageSet}
                    defaultPage={1}
                    showFirstButton
                    showLastButton
                    />
                </Box>
            )

            return (
                <div>{rows}</div>
            )
        }
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

export default connect(mapStateToProps, {cancelOrder} )(withStyles(styles)(orders))
