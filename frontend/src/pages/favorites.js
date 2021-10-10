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
    main : {
        padding : '30px'
    }
})

class favorites extends Component {
    componentDidMount(){
        setTimeout(()=>{

            console.log("component "+this.props.user.authenticated)
            console.log('load all restaurants')
            axios.post('/getAllRestaurants', {userid : this.props.user.authenticatedUser.userid})
                .then(res => {
                    store.dispatch({
                        type : GET_ALL_RESTAURANTS,
                        payload : res.data
                    })
            })
        },2000) 
        
    }

    displayRestaurants(){
        if(this.props.restaurant.restaurants.length > 0){
            console.log("display restaurants")
            const { restaurants } = this.props.restaurant
            return restaurants.map(restaurant => restaurant.fav && <RestaurantCard key={restaurant.restaurantid} restaurant = {restaurant} />)
        }
    }

    render() {
        const { classes } = this.props

        return (
            <Grid direction="row" container className={classes.main}>
                <Grid container item sm={9}>
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

export default connect(mapStateToProps, {} )(withStyles(styles)(favorites))
