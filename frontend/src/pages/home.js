import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import {  GET_ALL_RESTAURANTS } from '../redux/types'
import axios from 'axios'
import store from '../redux/store'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'

import RestaurantCard from '../components/RestaurantCard'
import Filter from '../components/Filter'

const styles = (theme) => ({
    ...theme.spread,
    main : {
        // padding : '30px'
    }
})

class home extends Component {
    componentDidMount(){
        // setTimeout(()=>{
            console.log("component "+this.props.user.authenticatedUser.userid)
            console.log('load all restaurants')
            axios.post('/getAllRestaurants', {userid : this.props.user.authenticatedUser.userid})
                .then(res => {
                    store.dispatch({
                        type : GET_ALL_RESTAURANTS,
                        payload : res.data
                    })
            })
        // },2000) 
    }

    displayRestaurants(){
        const {vegetarianFilter, veganFilter, nonVegetarianFilter} = this.props.user
        if(this.props.restaurant.restaurants.length > 0){
            console.log("display restaurants")
            const allRestaurants = this.props.restaurant.restaurants

            let restaurants = allRestaurants.filter(rest => {

                let foodType = vegetarianFilter && !veganFilter && !nonVegetarianFilter ? "vegetarian" : 
                !vegetarianFilter && veganFilter && !nonVegetarianFilter ? "vegan" : 
                !vegetarianFilter && !veganFilter && nonVegetarianFilter ? "nonVegetarian" : "both"

                return (!vegetarianFilter && !veganFilter && !nonVegetarianFilter) || (vegetarianFilter && veganFilter && nonVegetarianFilter) ? ((rest.typeOfRestaurant === this.props.user.mode || rest.typeOfRestaurant === "both") 
                && rest.location.includes(this.props.user.location)) : (rest.typeOfRestaurant === this.props.user.mode || rest.typeOfRestaurant === "both") 
                && rest.location.includes(this.props.user.location) && (foodType === rest.typeOfFood)
            })

            return restaurants.map(restaurant => <RestaurantCard key={restaurant.restaurantid} restaurant = {restaurant} />)
        }
    }

    render() {
        const { classes } = this.props

        return (
            <Grid direction="row" container className={classes.main}>
                <Grid container item sm={3}>
                    <Filter/>
                </Grid>

                <Grid container item sm={9} style={{paddingLeft : '20px'}}>
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
