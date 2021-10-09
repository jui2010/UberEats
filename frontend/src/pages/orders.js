import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import { GET_ALL_ORDERS } from '../redux/types'
import axios from 'axios'
import store from '../redux/store'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'

import RestaurantCard from '../components/RestaurantCard'

const styles = (theme) => ({
    ...theme.spread,
})

class orders extends Component {
    componentDidMount(){
        console.log("component ;"+this.props.user.authenticated)
        // if(this.props.user.authenticated){
            console.log('get orders')
            axios.get('/getOrders')
                .then(res => {
                    store.dispatch({
                        type : GET_ALL_ORDERS,
                        payload : res.data
                    })
            })
        // }
    }

    render() {
        return (
            <Grid direction="row" container>
                <Grid container item sm={12}>
                    Filters
                </Grid>

                <Grid container item sm={12}>
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
