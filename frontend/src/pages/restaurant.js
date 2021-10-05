import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import {getRestaurantData} from '../redux/actions/restaurantActions'

import Dishes from '../components/Dishes'

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
        width:'1400px',
        height:'250px',
        objectFit: 'cover',
        position: 'relative'
    },
    description : {
        padding : '20px 30px 10px 30px'
    },
    address : {
        padding : '0px 30px 20px 30px'
    }
})

class home extends Component {

    componentDidMount(){
        const restaurantName = this.props.match.params.restaurantName
        
        //get data for specific restaurant
        this.props.getRestaurantData(restaurantName)
    }

    render() {
        const {restaurantName, location, tile, description, address , dishes } = this.props.restaurant.selectedRestaurant
        const { classes } = this.props

        return (
            <Grid direction="row" container>
                <Grid item sm={12}>
                    <div>
                        <img src={tile} alt={restaurantName} className={classes.tile} />
                        <div className={classes.nameLoc}>{restaurantName} ({location})</div>
                        <div className={classes.delTime}>• $0.99 Delivery Fee • 15-25 Min </div>
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
                            Edit Profile
                        </div>
                    </Grid>
                </Grid>
                
                <Grid item sm={12}>
                    <Dishes dishes = {dishes}/>
                </Grid> 
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
    restaurant : state.restaurant
})

export default connect(mapStateToProps, {getRestaurantData} )(withStyles(styles)(home))
