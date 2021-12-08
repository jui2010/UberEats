import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddBoxIcon from '@material-ui/icons/AddBox'
import Tooltip from '@material-ui/core/Tooltip'

import {flowRight as compose} from 'lodash'
import { graphql } from 'react-apollo'
import store from '../redux/store'

import {ADD_DISH} from '../redux/types'
import { addDish } from '../graphql/mutation'

import { uploadFile } from 'react-s3'
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
        paddingLeft : '30px',
        cursor : 'pointer',
        color : '#808080',
        paddingTop : '40px',
    }
})

class AddDish extends Component {
    state = {
        open : false,
        dishName : store.getState().restaurant.authenticatedRestaurant.dishName,
        dishPrice : store.getState().restaurant.authenticatedRestaurant.dishPrice,
        dishDescription : store.getState().restaurant.authenticatedRestaurant.dishDescription,
        dishCategory : store.getState().restaurant.authenticatedRestaurant.dishCategory,
        dishPicture : store.getState().restaurant.authenticatedRestaurant.dishPicture,
        dishType : store.getState().restaurant.authenticatedRestaurant.dishType,
        cuisine : store.getState().restaurant.authenticatedRestaurant.cuisine,
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
        store.getState().restaurant.authenticatedRestaurant &&
        this.props.addDish({
            variables: {
                restaurantid : store.getState().restaurant.authenticatedRestaurant.restaurantid,
                dishName : this.state.dishName,
                dishPrice : this.state.dishPrice,
                dishDescription : this.state.dishDescription,
                dishCategory : this.state.dishCategory,
                dishPicture : this.state.dishPicture,
                dishType : this.state.dishType,
                cuisine : this.state.cuisine
            }
        })
        .then((res) => {
            let dishData = res.data.addDish
            // console.log(JSON.stringify(dishData))
            store.dispatch({
                type : ADD_DISH,
                payload : dishData
            })
        })

        this.setState({
            dishName : '',
            dishPrice : '',
            dishDescription : '',
            dishCategory : '',
            dishPicture : '',
            dishType : '',
            cuisine : '',
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
                    dishPicture : data.location
                })
            )
            .catch(err => console.error(err))
    }

    render() {
        const {classes} = this.props
        return (
            <Fragment>
                <div onClick={this.handleOpen} className={classes.button}>
                    
                    <Tooltip title="Add a new dish">
                        <AddBoxIcon/>
                    </Tooltip>
                </div>
                
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>
                        <div>Add a new dish</div>
                    </DialogTitle>
                    <form onSubmit={this.handleSubmit} style={{margin : 'auto 15px'}}>

                        <TextField name="dishName" id="dishName" label="Dish Name" type="text" onChange={this.handleChange}
                            style={{marginBottom: '10px'}} value={this.state.dishName} variant="outlined" fullWidth />

                        <TextField name="dishPrice" id="dishPrice" label="Price" type="text" onChange={this.handleChange}
                            style={{marginBottom: '10px'}} value={this.state.dishPrice} variant="outlined" fullWidth />
                        
                        <TextField name="dishDescription" id="dishDescription" label="Description" type="text" onChange={this.handleChange} 
                            style={{marginBottom: '10px'}} value={this.state.dishDescription} variant="outlined" fullWidth />

                        <TextField name="dishCategory" id="dishCategory" label="Category" type="text" onChange={this.handleChange} 
                            style={{marginBottom: '10px'}} value={this.state.dishCategory} variant="outlined" fullWidth />

                        <TextField name="dishType" id="dishType" label="Type" type="text" onChange={this.handleChange} 
                            style={{marginBottom: '10px'}} value={this.state.dishType} variant="outlined" fullWidth />

                        <TextField name="cuisine" id="cuisine" label="Cuisine" type="text" onChange={this.handleChange}
                            style={{marginBottom: '10px'}} value={this.state.cuisine} variant="outlined" fullWidth />

                        <div style={{fontSize : '13px', padding:'10px'}}>Upload dish image :</div>
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

// export default connect(mapStateToProps, {addDish})(withStyles(styles)(AddDish))
export default compose(graphql(addDish, { name: "addDish" }))(withStyles(styles)(AddDish))