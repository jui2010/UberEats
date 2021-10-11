import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from 'react-redux'
import ListItemText from '@mui/material/ListItemText'

import store from '../redux/store'
import {LOGOUT_USER, LOGOUT_RESTAURANT} from '../redux/types'

const styles = (theme) => ({
    ...theme.spread,
    root: {
        flexGrow: 1,
    },  
})

class Logout extends Component {

    handleLogout = () => {
        localStorage.removeItem('cookie')
        localStorage.removeItem('cookieRestaurant')
        store.dispatch({
            type : LOGOUT_USER
        })
        store.dispatch({
            type : LOGOUT_RESTAURANT
        })
    }

    render(){

        return (
            <ListItemText onClick={this.handleLogout}>Logout</ListItemText>
        )
    }
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {} )(withStyles(styles)(Logout))