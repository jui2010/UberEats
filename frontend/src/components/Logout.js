import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from 'react-redux'
import ListItemText from '@mui/material/ListItemText'

import store from '../redux/store'
import {LOGOUT_USER} from '../redux/types'

const styles = (theme) => ({
    ...theme.spread,
    root: {
        flexGrow: 1,
    },  
})

class Logout extends Component {

    handleLogout = () => {
        store.dispatch({
            type : LOGOUT_USER
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