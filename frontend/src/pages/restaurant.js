import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import {getRestaurantData} from '../redux/actions/restaurantActions'

const styles = (theme) => ({
    ...theme.spread,
})

class home extends Component {

    componentDidMount(){
        const restaurantName = this.props.match.params.restaurantName
        
        //get data for specific restaurant
        this.props.getRestaurantData(restaurantName)
    }

    render() {
        const {restaurantName, location } = this.props.restaurant.selectedRestaurant

        return (
            <Grid direction="row" container>
                <Grid container item sm={4} style={{border: '1px solid black'}}>
                    {restaurantName}
                    {location}
                </Grid>

                <Grid container item sm={8}>
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
