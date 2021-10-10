import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'

import store from '../redux/store'
import {VEGETARIAN_FILTER, VEGAN_FILTER, NONVEGETARIAN_FILTER} from '../redux/types'

const styles = (theme) => ({
    ...theme.spread,
    root: {
        flexGrow: 1,
    },
    mainGrid : {
        borderRight : '1px solid #ededed',
        padding: '20px'
    },
    diet : {
        fontWeight : '600',
        fontSize : '23px',
        paddingBottom : '20px'
    },
    veg : {
        backgroundColor : '#ededed',
        borderRadius : '20px',
        fontWeight : '600',
        color : '#171717',
        padding : '10px 30px',
        maxWidth : '140px',
        marginRight : '5px',
        marginBottom : '15px',
        cursor : 'pointer',
    },
    nonVeg : {
        backgroundColor : '#ededed',
        borderRadius : '20px',
        fontWeight : '600',
        color : '#171717',
        padding : '10px 30px',
        maxWidth : '200px',
        marginRight : '20px',
        marginBottom : '15px',
        cursor : 'pointer',
    }
})

class Filter extends Component {

    state = {
        vegetarian : false,
        vegan : false,
        nonVegetarian : false,
    }

    handleVegetarian = () => {
        this.setState({
            vegetarian : !this.state.vegetarian
        })
        store.dispatch({
            type : VEGETARIAN_FILTER
        })
    }

    handleVegan = () => {
        this.setState({
            vegan : !this.state.vegan
        })
        store.dispatch({
            type : VEGAN_FILTER
        })
    }

    handleNonVegetarian = () => {
        this.setState({
            nonVegetarian : !this.state.nonVegetarian
        })
        store.dispatch({
            type : NONVEGETARIAN_FILTER
        })
    }

    render(){
        const { classes} = this.props

        return (
            <Grid container item className={classes.mainGrid} >
                <Grid item xs={12}>
                    <Grid item  className={classes.diet}>
                        Dietary Filters
                    </Grid>
                    <Grid item xs={12} className={classes.veg} style={{backgroundColor : this.state.vegetarian && 'black', color : this.state.vegetarian && 'white'}}>
                        <div onClick={() => this.handleVegetarian()}>
                            Vegetarian
                        </div>
                    </Grid>
                    <Grid item xs={12} className={classes.veg} style={{backgroundColor : this.state.vegan && 'black', color : this.state.vegan && 'white'}}>
                        <div onClick={() => this.handleVegan()}>
                            Vegan
                        </div>
                    </Grid>
                    <Grid item xs={12} className={classes.nonVeg} style={{backgroundColor : this.state.nonVegetarian && 'black', color : this.state.nonVegetarian && 'white'}}>
                        <div onClick={() => this.handleNonVegetarian()}>
                            Non-Vegetarian
                        </div>
                    </Grid>
                </Grid>
            </Grid>  
        )
    }
}

const mapStateToProps = (state) => ({
    restaurant : state.restaurant
})

export default connect(mapStateToProps, {} )(withStyles(styles)(Filter))