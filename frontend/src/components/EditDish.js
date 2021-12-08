import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'

import store from '../redux/store'
import {EDIT_DISH} from '../redux/types'

import {flowRight as compose} from 'lodash'
import { graphql } from 'react-apollo'
import { editDish} from '../graphql/mutation'

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
        cursor : 'pointer',
        color : '#808080'
    }
})

class EditDish extends Component {
    state = {
        open : false,
        dishid : this.props.dish._id,
        dishName : this.props.dish.dishName,
        dishPicture : this.props.dish.dishPicture,
        dishDescription : this.props.dish.dishDescription,
        dishCategory : this.props.dish.dishCategory,
        cuisine : this.props.dish.cuisine,
        dishType : this.props.dish.dishType,
        dishPrice : this.props.dish.dishPrice,
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
        console.log("dishid "+JSON.stringify(this.props.dish._id))
        
        this.props.editDish({
            variables: {
                dishid : this.props.dish._id,
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
            let dishData = res.data.editDish
            // console.log(JSON.stringify(dishData))
            store.dispatch({
                type : EDIT_DISH,
                payload : dishData
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
            .then(data =>{
                const dishDetails = {
                    dishid : this.props.dish._id,
                    restaurantid : store.getState().restaurant.authenticatedRestaurant.restaurantid,
                    dishName : this.state.dishName,
                    dishPicture : data.location,
                    dishDescription : this.state.dishDescription,
                    dishCategory : this.state.dishCategory,
                    cuisine : this.state.cuisine,
                    dishType : this.state.dishType,
                    dishPrice : this.state.dishPrice
                }
                console.log("dishDetails "+JSON.stringify(dishDetails))

                this.props.editDish(dishDetails)
            }
            )
            .catch(err => console.error(err))
    }

    render() {
        const {classes} = this.props
        return (
            <Fragment>
                <div onClick={this.handleOpen} className={classes.button}>
                    <Tooltip title="Edit dish details">
                        <EditIcon/>
                    </Tooltip>
                </div>
                
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>
                        <div>Edit dish details</div>
                    </DialogTitle>
                    <form onSubmit={this.handleSubmit} style={{margin : 'auto 15px'}}>

                        <TextField name="dishName" id="dishName" label="Dish Name" type="text" onChange={this.handleChange}
                            style={{marginBottom: '10px'}} value={this.state.dishName} variant="outlined" fullWidth />

                        <TextField name="dishDescription" id="dishDescription" label="Description" type="text" onChange={this.handleChange} 
                            style={{marginBottom: '10px'}} value={this.state.dishDescription} variant="outlined" fullWidth />

                        <TextField name="dishCategory" id="dishCategory" label="Dish Category" type="text" onChange={this.handleChange} 
                            style={{marginBottom: '10px'}} value={this.state.dishCategory} variant="outlined" fullWidth />

                        <TextField name="cuisine" id="cuisine" label="Cuisine" type="text" onChange={this.handleChange} 
                            style={{marginBottom: '10px'}} value={this.state.cuisine} variant="outlined" fullWidth />

                        <TextField name="dishType" id="dishType" label="Dish Type" type="text" onChange={this.handleChange}
                            style={{marginBottom: '10px'}} value={this.state.dishType} variant="outlined" fullWidth />
                        
                        <TextField name="dishPrice" id="dishPrice" label="Dish Price" type="text" onChange={this.handleChange}
                            style={{marginBottom: '10px'}} value={this.state.dishPrice} variant="outlined" fullWidth />
                        
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

// export default connect(mapStateToProps, {editDish})(withStyles(styles)(EditDish))
export default compose(graphql(editDish, { name: "editDish" }))(withStyles(styles)(EditDish))
