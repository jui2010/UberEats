import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import MenuIcon from '@material-ui/icons/Menu'
import AddLocationIcon from '@material-ui/icons/AddLocation'
import InputBase from '@material-ui/core/InputBase'
import Cart from './Cart'

import { Link } from 'react-router-dom'

import {connect} from 'react-redux'
import store from '../redux/store'
import {CHANGE_MODE, LOCATION_FILTER} from '../redux/types'

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
        height : '90px',
        paddingTop : '10px'
    }, 
    menuicon: {
        fontSize : '25px',
        marginLeft: '15px',
        marginTop : '10px'
    },
    pd : {
        fontSize : '16px',
        display: 'flex',
        justifyContent: 'space-around',
        flexGrow: 1,
        maxWidth : '150px',
        borderRadius : '25px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontWeight : '600',
        backgroundColor : '#e8e8e8',
        padding : '5px 15px',
        cursor : 'pointer',
        marginRight : '20px'
    },
    del : {
        borderRadius : '25px',
        padding : '10px 15px',
        width : '60px'
    },
    pick : {
        borderRadius : '25px',
        padding : '10px 15px',
        width : '60px'
    },
    location : {
        fontSize : '16px',
        display: 'flex',
        justifyContent: 'space-around',
        flexGrow: 1,
        width : '100px',
        borderRadius : '25px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontWeight : '600',
        backgroundColor : '#e8e8e8',
        padding : '10px 15px',
        cursor : 'pointer',
        marginRight : '60px'
    },
    craving : {
        fontSize : '16px',
        display: 'flex',
        justifyContent: 'space-around',
        flexGrow: 1,
        width : '450px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontWeight : '600',
        backgroundColor : '#e8e8e8',
        padding : '15px 15px',
        cursor : 'pointer',
        marginRight : '20px'
    },
    cart : {
        // fontSize : '16px',
        display: 'flex',
        justifyContent: 'space-around',
        flexGrow: 1,
        width : '60px',
        borderRadius : '25px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontWeight : '600',
        backgroundColor : 'black',
        padding : '7px 15px',
        cursor : 'pointer',
        marginRight : '20px',
        color : 'white'
    },
})

class NavigationBar extends Component {
    state = {
        delBg : 'white',
        pickBg : '#e8e8e8',
        location : ''
    }

    handleDelBg = () => {
        this.setState({
            delBg : 'white',
            pickBg : '#e8e8e8'
        })
        store.dispatch({
            type : CHANGE_MODE,
            payload : 'delivery'
        })
    }

    handlePickBg = () => {
        this.setState({
            delBg : '#e8e8e8',
            pickBg : 'white'
        })
        store.dispatch({
            type : CHANGE_MODE,
            payload : 'pickup'
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value 
        })

        store.dispatch({
            type : LOCATION_FILTER,
            payload : this.state.location
        })
    }

    render(){
        const { classes } = this.props
        const {authenticated} = this.props.user

        return (
            <div >
                <AppBar position="relative" color="transparent" className={classes.appbar} >
                    <Toolbar style={{ height: 50}}>
                        <MenuIcon className={classes.menuicon}/>
                        <div className={classes.title} component = {Link} to="/" >
                            <span style={{color : '#162328'}}>Uber</span> <span style={{color : '#3FC060'}}>Eats</span>
                        </div>
        
                        <div className={classes.pd}  >
                            <div className={classes.del} onClick={this.handleDelBg} style={{backgroundColor : this.state.delBg}} >Delivery</div>
                            <div className={classes.pick} onClick={this.handlePickBg} style={{backgroundColor : this.state.pickBg}} >Pickup</div>
                        </div>

                        <InputBase
                            id="location"
                            name="location"
                            className={classes.location}
                            placeholder="Location"
                            inputProps={{ 'aria-label': 'Enter location' }}
                            onChange={this.handleChange}
                            startAdornment={<AddLocationIcon style={{color : '#2b2b2b'}} />}
                        />

                        <div className={classes.craving}  >
                            What are you craving?
                        </div>
                        {/* login */}
                        {!authenticated && (
                            <Button className={classes.button} component = {Link} to="/login" >
                                Login
                            </Button>)}

                        {/* restaurant login */}
                        {/* {!authenticated && (
                            <Button className={classes.button} component = {Link} to="/restaurantLogin" >
                                Restaurant Login
                            </Button>)} */}

                        {/* dashboard */}                        
                        {authenticated && ( 
                            // <Button className={classes.cart}>
                            //     <Badge badgeContent={this.props.restaurant.cart.length} color="error">
                            //         <Cart/>
                            //     </Badge>
                            // </Button>

                            <div className={classes.cart}  >
                                <Cart/>Cart • {this.props.restaurant.cart.length}
                            </div>
                        )}

                        {/* profile */}                        
                        {/* {authenticated && ( 
                            <Tooltip title="Profile" >
                                <Button component = {Link} to="/profile" >
                                    <Avatar>{authenticatedUser.firstname.substring(0,1)}{authenticatedUser.lastname.substring(0,1)}</Avatar>
                                </Button>
                            </Tooltip>
                        )} */}

                        {/* logout */}                        
                        {/* {authenticated && ( 
                            <Tooltip title="Logout" >
                                <Button component = {Link} to="/logout" >
                                    <ExitToAppIcon/>
                                </Button>
                            </Tooltip>
                        )} */}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
    restaurant : state.restaurant,
})

export default connect(mapStateToProps, {} )(withStyles(styles)(NavigationBar))