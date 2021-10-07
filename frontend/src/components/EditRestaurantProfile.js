import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'

import {connect} from 'react-redux'
import {editRestaurantProfile} from '../redux/actions/restaurantActions'

const styles = (theme) => ({
    ...theme.spread,
    button : {
        cursor : 'pointer',
        color : '#808080'
    }
})

class EditRestaurantProfile extends Component {
    state = {
        open : false,
        restaurantName : this.props.restaurant.authenticatedRestaurant.restaurantName,
        phone : this.props.restaurant.authenticatedRestaurant.phone,
        location : this.props.restaurant.authenticatedRestaurant.location,
        address : this.props.restaurant.authenticatedRestaurant.address,
        description : this.props.restaurant.authenticatedRestaurant.description,
        deliveryFee : this.props.restaurant.authenticatedRestaurant.deliveryFee,
        timing : this.props.restaurant.authenticatedRestaurant.timing
    }

    handleOpen = () => {
        this.setState({
            open : true
        })
    }

    handleClose = () => {
        this.setState({
            open : false
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const restaurantDetails = {
            email : this.props.restaurant.authenticatedRestaurant.email,
            restaurantName : this.state.restaurantName,
            phone : this.state.phone,
            location : this.state.location,
            address : this.state.address,
            description : this.state.description,
            deliveryFee : this.state.deliveryFee,
            timing : this.state.timing
        }
        this.props.editRestaurantProfile(restaurantDetails)
        console.log("restaurantDetails "+JSON.stringify(restaurantDetails))
        this.handleClose()
    }
    
    render() {
        const {classes} = this.props
        return (
            <Fragment>
                <div onClick={this.handleOpen} className={classes.button}>
                    <Tooltip title="Edit restaurant profile">
                        <EditIcon/>
                    </Tooltip>
                </div>
                
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>
                        <div>Edit restaurant profile</div>
                    </DialogTitle>
                    <form onSubmit={this.handleSubmit} style={{margin : 'auto 15px'}}>

                        <TextField name="restaurantName" id="restaurantName" label="Restaurant Name" type="text" onChange={this.handleChange}
                            style={{marginBottom: '10px'}} value={this.state.restaurantName} variant="outlined" fullWidth />

                        <TextField name="phone" id="phone" label="Phone" type="text" onChange={this.handleChange}
                            style={{marginBottom: '10px'}} value={this.state.phone} variant="outlined" fullWidth />
                        
                        <TextField name="location" id="location" label="Location" type="text" onChange={this.handleChange} 
                            style={{marginBottom: '10px'}} value={this.state.location} variant="outlined" fullWidth />

                        <TextField name="address" id="address" label="Address" type="text" onChange={this.handleChange} 
                            style={{marginBottom: '10px'}} value={this.state.address} variant="outlined" fullWidth />

                        <TextField name="description" id="description" label="Description" type="text" onChange={this.handleChange} 
                            style={{marginBottom: '10px'}} value={this.state.description} variant="outlined" fullWidth />

                        <TextField name="deliveryFee" id="deliveryFee" label="Delivery Fee" type="text" onChange={this.handleChange}
                            style={{marginBottom: '10px'}} value={this.state.deliveryFee} variant="outlined" fullWidth />
                        
                        <TextField name="timing" id="timing" label="Timing" type="text" onChange={this.handleChange}
                            style={{marginBottom: '10px'}} value={this.state.timing} variant="outlined" fullWidth />
                        
                        <Button type="submit" variant="contained" color="primary"
                            style={{ margin : '10px 5px', fontSize : '16px'}}>
                            Submit
                        </Button>

                    </form>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    restaurant : state.restaurant
})

export default connect(mapStateToProps, {editRestaurantProfile})(withStyles(styles)(EditRestaurantProfile))