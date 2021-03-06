import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

// import {  GET_ALL_RESTAURANTS } from '../redux/types'
import store from '../redux/store'
// import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import {flowRight as compose} from 'lodash'
import { graphql } from 'react-apollo'
import jwtDecode from 'jwt-decode'

import {GET_AUTHENTICATED_USER, GET_ALL_RESTAURANTS} from '../redux/types'
import { getAuthenticatedUserData } from '../graphql/mutation'
import { getAllRestaurants } from '../graphql/query'

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
        const token = localStorage.userToken
        if(token){
            const decodedToken = jwtDecode(token)
            this.props.getAuthenticatedUserData({
                variables: {
                    _id : decodedToken._id
                }
            })
            .then((res) => {
                let userData = res.data.getAuthenticatedUserData
                // console.log(JSON.stringify(userData))
                store.dispatch({
                    type : GET_AUTHENTICATED_USER,
                    payload : userData
                })
            })
        }
    }

    displayRestaurants(){
        let data = this.props.getAllRestaurants
        // console.log("getAllRestaurants"+ JSON.stringify(data))

        if(data.loading){
        }
        else{
            console.log("getAllRestaurants"+ JSON.stringify(data.getAllRestaurants))
            store.dispatch({
                type : GET_ALL_RESTAURANTS,
                payload : data.getAllRestaurants
            })
        }

        const {vegetarianFilter, veganFilter, nonVegetarianFilter} = store.getState().user
        if(store.getState().restaurant.restaurants && store.getState().restaurant.restaurants.length > 0){
            console.log("display restaurants")
            const allRestaurants = store.getState().restaurant.restaurants
            let restaurants = allRestaurants.filter(rest => {

                let foodType = vegetarianFilter && !veganFilter && !nonVegetarianFilter ? "vegetarian" : 
                !vegetarianFilter && veganFilter && !nonVegetarianFilter ? "vegan" : 
                !vegetarianFilter && !veganFilter && nonVegetarianFilter ? "nonVegetarian" : "both"

                return (!vegetarianFilter && !veganFilter && !nonVegetarianFilter) || (vegetarianFilter && veganFilter && nonVegetarianFilter) ? ((rest.typeOfRestaurant === store.getState().user.mode || rest.typeOfRestaurant === "both") 
                && rest.location.includes(store.getState().user.location)) : (rest.typeOfRestaurant === store.getState().user.mode || rest.typeOfRestaurant === "both") 
                && rest.location.includes(store.getState().user.location) && (foodType === rest.typeOfFood)
            })

            return restaurants.map(restaurant => <RestaurantCard key={restaurant._id} restaurant = {restaurant} />)
        }
    }

    render() {
        const { classes } = this.props
        // console.log("STORREE"+JSON.stringify(store.getState().user))
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

export default compose(graphql(getAuthenticatedUserData, { name: "getAuthenticatedUserData" }),graphql(getAllRestaurants, { name: "getAllRestaurants" }))(withStyles(styles)(home))
