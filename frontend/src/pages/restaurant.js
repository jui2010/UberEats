import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import {getRestaurantData} from '../redux/actions/restaurantActions'

const styles = (theme) => ({
    ...theme.spread,
    bottomLeft : {
        position: 'absolute',
        bottom: '250px',
        left: '16px',
    }
})

class home extends Component {

    componentDidMount(){
        const restaurantName = this.props.match.params.restaurantName
        
        //get data for specific restaurant
        this.props.getRestaurantData(restaurantName)
    }

    render() {
        const {restaurantName, location, tile } = this.props.restaurant.selectedRestaurant
        const { classes } = this.props

        return (
            <Grid direction="row" container>
                {/* <Grid container item sm={4} style={{border: '1px solid black'}}>
                    {restaurantName}
                    {location}
                </Grid>

                <Grid container item sm={8}>
                </Grid> */}

                <div class="container">
                    <img src={tile} alt="Snow" style={{width : "1000px", height : '300px'}}/>
                    <div className={classes.bottomLeft}>{restaurantName}</div>
                </div>

                {location}

            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
    restaurant : state.restaurant
})

export default connect(mapStateToProps, {getRestaurantData} )(withStyles(styles)(home))
