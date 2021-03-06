import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Grid from '@material-ui/core/Grid'
// import {getSelectedRestaurantData, addToFavorite, addToUnfavorite} from '../redux/actions/restaurantActions'
import Dishes from '../components/Dishes'
import EditRestaurantProfile from '../components/EditRestaurantProfile'
import AddDish from '../components/AddDish'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

import store from '../redux/store'
import {GET_RESTAURANT_DATA, GET_AUTHENTICATED_RESTAURANT} from '../redux/types'

import {flowRight as compose} from 'lodash'
import { graphql } from 'react-apollo'
import { getSelectedRestaurantData, getAuthenticatedRestaurantData} from '../graphql/mutation'
import jwtDecode from 'jwt-decode'

const styles = (theme) => ({
    ...theme.spread,
    nameLoc : {
        position: 'absolute',
        top: '240px',
        left: '30px',
        fontWeight: '800',
        fontSize : '40px',
        // color : 'white'
    }, 
    delTime : {
        position: 'absolute',
        top: '290px',
        left: '30px',
        fontWeight: '900',
        fontSize : '20px',
        // color : 'white'
    },
    tile : {
        width:'1349px',
        height:'250px',
        objectFit: 'cover',
        position: 'relative',
        backgroundPosition: 'center'
    },
    description : {
        padding : '20px 30px 10px 30px'
    },
    address : {
        padding : '0px 30px 20px 30px'
    },
    favBorder : {
        position: 'absolute',
        top: '270px',
        right: '30px',
        color : 'black',
        fontSize : '50px',
        cursor : 'pointer',
    },
    fav : {
        position: 'absolute',
        top: '270px',
        right: '30px',
        color : 'black',
        fontSize : '50px',
        cursor : 'pointer',
    },
})

class restaurant extends Component {

    componentDidMount(){
        const token = localStorage.restaurantToken
        if(token){
            const decodedToken = jwtDecode(token)
            this.props.getAuthenticatedRestaurantData({
                variables: {
                    restaurantid : decodedToken._id
                }
            })
            .then((res) => {
                let restaurantData = res.data.getAuthenticatedRestaurantData
                // console.log(JSON.stringify(userData))
                store.dispatch({
                    type : GET_AUTHENTICATED_RESTAURANT,
                    payload : restaurantData
                })
            })
        }

        //get data for specific restaurant
        this.props.getSelectedRestaurantData({
            variables: {
                restaurantName : this.props.match.params.restaurantName     
            }
        })
        .then((res) => {
            let restaurantData = res.data.getSelectedRestaurantData
            console.log(JSON.stringify(restaurantData))
            store.dispatch({
                type : GET_RESTAURANT_DATA,
                payload : restaurantData
            })
        })
    }

    render() {
        const { _id, restaurantName, location, tile, description, address , dishes, deliveryFee, timing, fav} = store.getState().restaurant.selectedRestaurant
        const { classes } = this.props

        let restaurantid = _id
        return (
            store.getState().restaurant.selectedRestaurant && 
            <Grid direction="row" container>
                <Grid item sm={12}>
                    <div>
                        <img src={tile} alt={restaurantName} className={classes.tile} />
                        {!fav && <FavoriteBorderIcon className={classes.favBorder} />}
                        {fav && <FavoriteIcon className={classes.fav}/>}
                        <div className={classes.nameLoc}>{restaurantName} ({location})</div>
                        <div className={classes.delTime}>??? ${deliveryFee === null ? '0' : deliveryFee } Delivery Fee ??? {timing === null ? '0' : timing} Min </div>
                    </div>
                </Grid> 
                
                <Grid direction="row" container item>
                    <Grid item sm={11}>
                    
                        <div className={classes.description}>
                            {description}
                        </div>
                        <div className={classes.address}>
                            {address}
                        </div>
                    </Grid>
                    <Grid item sm={1}>
                        <div className={classes.description}>
                            {store.getState().restaurant.authenticated && 
                            store.getState().restaurant.authenticatedRestaurant.email === store.getState().restaurant.selectedRestaurant.email &&
                            <EditRestaurantProfile/> }
                        </div>
                    </Grid>
                </Grid>
                
                <Grid container item sm={12}>

                    <Grid item sm={11}>
                        <Dishes dishes = {dishes} restaurantid={restaurantid} />
                    </Grid> 

                    <Grid item sm={1}>
                            {/* {console.log("TF "+ store.getState().restaurant.authenticatedRestaurant.email === store.getState().restaurant.selectedRestaurant.email )} */}
                            {store.getState().restaurant.authenticatedRestaurant && 
                            store.getState().restaurant.authenticatedRestaurant.email === store.getState().restaurant.selectedRestaurant.email &&
                            <AddDish/> }
                    </Grid> 
                </Grid> 
            </Grid>
        )
    }
}

// const mapStateToProps = (state) => ({
//     user : state.user,
//     restaurant : state.restaurant
// })

// export default connect(mapStateToProps, {getSelectedRestaurantData, addToFavorite, addToUnfavorite} )(withStyles(styles)(restaurant))
export default compose(graphql(getSelectedRestaurantData, { name: "getSelectedRestaurantData" }), graphql(getAuthenticatedRestaurantData, { name: "getAuthenticatedRestaurantData" }))(withStyles(styles)(restaurant))