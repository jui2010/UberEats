import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import withStyles from '@material-ui/core/styles/withStyles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import ExitToAppIcon  from '@material-ui/icons/ExitToApp'
import MenuIcon from '@material-ui/icons/Menu'

import { Link } from 'react-router-dom'

import {connect} from 'react-redux'

const styles = (theme) => ({
    ...theme.spread,
    root: {
        flexGrow: 1,
    },
    title : {
        marginLeft: '45px',
        fontSize : '32px',
        marginTop : '5px',
        flexGrow: 1,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontWeight : '600'
    },
    button: {
        fontSize : '17px',
        textTransform : 'capitalize',
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
    },
    appbar : {
        height : '100px',
        paddingTop : '10px'
    }, 
    menuicon: {
        fontSize : '25px',
        marginLeft: '15px',
        marginTop : '10px'
    }
})

class NavigationBar extends Component {
    render(){
        const { classes } = this.props
        const {authenticatedUser , authenticated} = this.props.user

        return (
            <div >
                <AppBar position="relative" color="transparent" className={classes.appbar} >
                    <Toolbar style={{ height: 50}}>
                        <MenuIcon className={classes.menuicon}/>
                        <div className={classes.title}>
                            <span style={{color : '#162328'}}>Uber</span> <span style={{color : '#3FC060'}}>Eats</span>
                        </div>
        
                        {/* login */}
                        {!authenticated && (
                            <Button className={classes.button} component = {Link} to="/login" >
                                Login
                            </Button>)}

                        {/* restaurant login */}
                        {!authenticated && (
                            <Button className={classes.button} component = {Link} to="/restaurantLogin" >
                                Restaurant Login
                            </Button>)}

                        {/* dashboard */}                        
                        {authenticated && ( 
                            <Tooltip title="Cart" >
                                <Button component = {Link} to="/cart" >
                                    <ShoppingCartIcon/> Cart
                                </Button>
                            </Tooltip>
                        )}

                        {/* profile */}                        
                        {authenticated && ( 
                            <Tooltip title="Profile" >
                                <Button component = {Link} to="/profile" >
                                    <Avatar>{authenticatedUser.firstname.substring(0,1)}{authenticatedUser.lastname.substring(0,1)}</Avatar>
                                </Button>
                            </Tooltip>
                        )}

                        {/* logout */}                        
                        {authenticated && ( 
                            <Tooltip title="Logout" >
                                <Button component = {Link} to="/logout" >
                                    <ExitToAppIcon/>
                                </Button>
                            </Tooltip>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user
})

export default connect(mapStateToProps, {} )(withStyles(styles)(NavigationBar))