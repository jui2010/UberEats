import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import {getSelectedRestaurantData, addToFavorite, addToUnfavorite} from '../redux/actions/restaurantActions'

import Dishes from '../components/Dishes'
import EditRestaurantProfile from '../components/EditRestaurantProfile'
import AddDish from '../components/AddDish'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

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
        setTimeout(() =>
        {const details = {
            restaurantName : this.props.match.params.restaurantName,
            userid : this.props.user.authenticatedUser._id
        }
        //get data for specific restaurant
        console.log("getSelectedRestaurantData"+JSON.stringify(details))
        this.props.getSelectedRestaurantData(details)}
        ,100)
    }

    handleAddToFavorite = () => {
        const { _id } = this.props.restaurant.selectedRestaurant
        let favRestaurant = {
            restaurantid : _id,
            userid : this.props.user.authenticatedUser._id
        }

        this.props.addToFavorite(favRestaurant)
    }

    handleAddToUnfavorite = () => {
        const { _id} = this.props.restaurant.selectedRestaurant
        let unfavRestaurant = {
            restaurantid : _id,
            userid : this.props.user.authenticatedUser._id
        }

        this.props.addToUnfavorite(unfavRestaurant)
    }

    render() {
        const { _id, restaurantName, location, tile, description, address , dishes, deliveryFee, timing, fav} = this.props.restaurant.selectedRestaurant
        const { classes } = this.props

        let restaurantid = _id
        return (
            <Grid direction="row" container>
                <Grid item sm={12}>
                    <div>
                        <img src={tile} alt={restaurantName} className={classes.tile} />
                        {!fav && <FavoriteBorderIcon className={classes.favBorder} onClick={this.handleAddToFavorite}/>}
                        {fav && <FavoriteIcon className={classes.fav}  onClick={this.handleAddToUnfavorite}/>}
                        <div className={classes.nameLoc}>{restaurantName} ({location})</div>
                        <div className={classes.delTime}>• ${deliveryFee === null ? '0' : deliveryFee } Delivery Fee • {timing === null ? '0' : timing} Min </div>
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
                            {this.props.restaurant.authenticated && 
                            this.props.restaurant.authenticatedRestaurant.email === this.props.restaurant.selectedRestaurant.email &&
                            <EditRestaurantProfile/> }
                        </div>
                    </Grid>
                </Grid>
                
                <Grid container item sm={12}>

                    <Grid item sm={11}>
                        <Dishes dishes = {dishes} restaurantid={restaurantid} />
                    </Grid> 

                    <Grid item sm={1}>
                            {this.props.restaurant.authenticated && 
                            this.props.restaurant.authenticatedRestaurant.email === this.props.restaurant.selectedRestaurant.email &&
                            <AddDish/> }
                    </Grid> 
                </Grid> 
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
    restaurant : state.restaurant
})

export default connect(mapStateToProps, {getSelectedRestaurantData, addToFavorite, addToUnfavorite} )(withStyles(styles)(restaurant))
