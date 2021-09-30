import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import {  GET_ALL_RESTAURANTS } from '../redux/types'
import axios from 'axios'
import store from '../redux/store'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'

import RestaurantCard from '../components/RestaurantCard'

const styles = (theme) => ({
    ...theme.spread,
})

class home extends Component {
    componentDidMount(){
        console.log("component ;"+this.props.user.authenticated)
        // if(this.props.user.authenticated){
            console.log('load all restaurants')
            axios.get('/getAllRestaurants')
                .then(res => {
                    store.dispatch({
                        type : GET_ALL_RESTAURANTS,
                        payload : res.data
                    })
            })
        // }
    }

    displayRestaurants(){
        if(this.props.restaurant.restaurants.length > 0){
            console.log("display restaurants")
            const { restaurants } = this.props.restaurant
            return restaurants.map(restaurant => <RestaurantCard key={restaurant.restaurantid} restaurant = {restaurant} />)
        }
    }

    render() {
        return (
            <Grid direction="row" container>
                <Grid container item sm={4}>
                    Filters
                </Grid>

                <Grid container item sm={8}>
                    {this.displayRestaurants()}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
    restaurant : state.restaurant
})

export default connect(mapStateToProps, {} )(withStyles(styles)(home))
