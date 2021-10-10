import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import MuiLink from '@material-ui/core/Link'
import {Link } from 'react-router-dom'
import {connect} from 'react-redux'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'

import {addToFavorite, addToUnfavorite} from '../redux/actions/restaurantActions'

const styles = (theme) => ({
    ...theme.spread,
    root: {
        flexGrow: 1,
    },
    card : {
        width : '300px',
        height : '190px',
        position: 'relative',
        display : 'flex',
    },
    name : {
        fontSize : '15px',
        fontWeight : '600',
        color : 'black',
        overflow: 'hidden',
        maxHeight: '20px',
        maxWidth: '300px',
    },
    del : {
        color : '#919191',
        fontSize : '14px',
    },
    link : {
        "&:hover": {
            textDecoration : 'none',
        },
        marginRight : '26px',
        marginTop : '30px',
    },
    favBorder : {
        color : 'white',
        paddingLeft : '270px',
    },
    fav : {
        color : 'white',
        paddingLeft : '270px',
    },
    image : {
        width : '300px',
        height : '140px',
        backgroundSize: 'cover',
        objectFit : 'cover',
        resize: 'both',
        backgroundPosition: 'center',
        
    }
})

class RestaurantCard extends Component {

    handleAddToFavorite = () => {
        const { restaurantid} = this.props.restaurant
        let favRestaurant ={
            restaurantid : restaurantid,
            userid : this.props.user.authenticatedUser.userid
        }

        this.props.addToFavorite(favRestaurant)
    }

    handleAddToUnfavorite = () => {
        const { restaurantid} = this.props.restaurant
        let unfavRestaurant = {
            restaurantid : restaurantid,
            userid : this.props.user.authenticatedUser.userid
        }

        this.props.addToUnfavorite(unfavRestaurant)
    }

    render(){
        const { classes } = this.props
        const { restaurantName, tile, location, deliveryFee, timing, fav} = this.props.restaurant

        return (
            <MuiLink component = {Link} to ={ `/restaurant/${restaurantName}`} className={classes.link} > 
                <Grid container className={classes.card}>
                    <Grid container item xs={12}>
                        {/* <CardMedia component="img" height="140" image={tile}  /> */}
                        <div className={classes.image} style={{backgroundImage: `url(${tile})`}}>
                            {!fav && <FavoriteBorderIcon className={classes.favBorder} onClick={this.handleAddToFavorite}/>}
                            {fav && <FavoriteIcon className={classes.fav}  onClick={this.handleAddToUnfavorite}/>}
                        </div>
                    </Grid>
                    <Grid container item xs={12} className={classes.name}>
                        {restaurantName} ({location})
                    </Grid>
                    <Grid container item xs={12} className={classes.del}>
                        • ${deliveryFee} Delivery Fee • {timing} min
                    </Grid>
                </Grid>     
            </MuiLink>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user
})

export default connect(mapStateToProps, {addToFavorite, addToUnfavorite} )(withStyles(styles)(RestaurantCard))