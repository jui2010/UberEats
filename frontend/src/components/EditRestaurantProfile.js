import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { uploadFile } from 'react-s3'

import {flowRight as compose} from 'lodash'
import { graphql } from 'react-apollo'

import store from '../redux/store'
import {EDIT_RESTAURANT_PROFILE} from '../redux/types'
import { editRestaurantProfile } from '../graphql/mutation'

import config from '../config'

const conf = {
    bucketName: config.S3_BUCKET,
    region: config.REGION,
    accessKeyId: config.ACCESS_KEY,
    secretAccessKey: config.SECRET_ACCESS_KEY,
}

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
        restaurantName : store.getState().restaurant.authenticatedRestaurant.restaurantName,
        phone : store.getState().restaurant.authenticatedRestaurant.phone,
        location : store.getState().restaurant.authenticatedRestaurant.location,
        address : store.getState().restaurant.authenticatedRestaurant.address,
        description : store.getState().restaurant.authenticatedRestaurant.description,
        deliveryFee : store.getState().restaurant.authenticatedRestaurant.deliveryFee,
        timing : store.getState().restaurant.authenticatedRestaurant.timing,
        tile : store.getState().restaurant.authenticatedRestaurant.tile,
        typeOfRestaurant : store.getState().restaurant.authenticatedRestaurant.typeOfRestaurant,
        typeOfFood : store.getState().restaurant.authenticatedRestaurant.typeOfFood,
        selectedFile : null
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

        this.props.editRestaurantProfile({
            variables: {
                email : store.getState().restaurant.authenticatedRestaurant.email,
                restaurantName : this.state.restaurantName,
                phone : this.state.phone,
                location : this.state.location,
                address : this.state.address,
                description : this.state.description,
                deliveryFee : this.state.deliveryFee,
                timing : this.state.timing,
                tile : this.state.tile,
                typeOfRestaurant : this.state.typeOfRestaurant,
                typeOfFood : this.state.typeOfFood
            }
        })
        .then((res) => {
            let restaurantData = res.data.editRestaurantProfile
            // console.log(JSON.stringify(restaurantData))
            store.dispatch({
                type : EDIT_RESTAURANT_PROFILE,
                payload : restaurantData
            })
        })

        this.handleClose()
    }
    
    handleFileInput = (e) => {
        this.setState({
            selectedFile : e.target.files[0]
        })
    }

    handleUpload = async (file) => {
        uploadFile(file, conf)
            .then(data => this.setState({
                    tile : data.location
                })
            )
            .catch(err => console.error(err))
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

                        <FormControl >
                        <InputLabel id="type of rest">Type Of Restaurant</InputLabel>
                            <Select
                                name="typeOfRestaurant"
                                id="typeOfRestaurant"
                                value={this.state.typeOfRestaurant}
                                onChange={this.handleChange}
                                fullWidth
                                style={{width: '550px'}}
                                >
                                <MenuItem value={"pickup"}>Pickup</MenuItem>
                                <MenuItem value={"delivery"} >Delivery</MenuItem>
                                <MenuItem value={"both"} >Both</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl >
                        <InputLabel id="demo-simple-select-label">Type Of Food</InputLabel>
                            <Select
                                name="typeOfFood"
                                id="typeOfFood"
                                value={this.state.typeOfFood}
                                onChange={this.handleChange}
                                fullWidth
                                style={{width: '550px', marginTop : '10px'}}
                                >
                                <MenuItem value={"vegetarian"}>Vegetarian</MenuItem>
                                <MenuItem value={"vegan"} >Vegan</MenuItem>
                                <MenuItem value={"both"} >All</MenuItem>
                            </Select>
                        </FormControl>

                        <div style={{fontSize : '13px', padding:'10px'}}>Upload restaurant background image :</div>
                        <input type="file" onChange={this.handleFileInput}/>
                        <button onClick={() => this.handleUpload(this.state.selectedFile)}> Upload</button>
                        
                        <br/>
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

// const mapStateToProps = (state) => ({
//     restaurant : state.restaurant
// })

// export default connect(mapStateToProps, {editRestaurantProfile})(withStyles(styles)(EditRestaurantProfile))
export default compose(graphql(editRestaurantProfile, { name: "editRestaurantProfile" }))(withStyles(styles)(EditRestaurantProfile))