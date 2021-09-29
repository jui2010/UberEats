import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import {  GET_ALL_RESTAURANTS } from '../redux/types'
import axios from 'axios'
import store from '../redux/store'
import {connect} from 'react-redux'


const styles = (theme) => ({
    ...theme.spread,
})

class home extends Component {
    componentDidMount(){
        console.log("component ;"+this.props.user.authenticated)
        if(this.props.user.authenticated){
            console.log('load all restaurants')
            axios.get('/getAllRestaurants')
                .then(res => {
                    store.dispatch({
                        type : GET_ALL_RESTAURANTS,
                        payload : res.data
                    })
            })
        }
    }

    render() {
        return (
            <div>
                Home Page
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user
})

export default connect(mapStateToProps, {} )(withStyles(styles)(home))
