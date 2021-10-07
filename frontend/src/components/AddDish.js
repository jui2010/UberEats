import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddBoxIcon from '@material-ui/icons/AddBox'
import Tooltip from '@material-ui/core/Tooltip'

import {connect} from 'react-redux'
import {addDish} from '../redux/actions/restaurantActions'

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
        dishName : this.props.restaurant.authenticatedRestaurant.dishName,
        dishPrice : this.props.restaurant.authenticatedRestaurant.dishPrice,
        dishDescription : this.props.restaurant.authenticatedRestaurant.dishDescription,
        dishCategory : this.props.restaurant.authenticatedRestaurant.dishCategory,
        dishPicture : this.props.restaurant.authenticatedRestaurant.dishPicture,
        dishType : this.props.restaurant.authenticatedRestaurant.dishType,
        cuisine : this.props.restaurant.authenticatedRestaurant.cuisine
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
        const newDish = {
            restaurantid : this.props.restaurant.authenticatedRestaurant.restaurantid,
            dishName : this.state.dishName,
            dishPrice : this.state.dishPrice,
            dishDescription : this.state.dishDescription,
            dishCategory : this.state.dishCategory,
            dishPicture : this.state.dishPicture,
            dishType : this.state.dishType,
            cuisine : this.state.cuisine
        }
        this.props.addDish(newDish)
        console.log("newDish "+JSON.stringify(newDish))
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

                        <TextField name="dishPicture" id="dishPicture" label="Picture Link" type="text" onChange={this.handleChange}
                            style={{marginBottom: '10px'}} value={this.state.dishPicture} variant="outlined" fullWidth />
                        
                        <TextField name="dishType" id="dishType" label="Type" type="text" onChange={this.handleChange} 
                            style={{marginBottom: '10px'}} value={this.state.dishType} variant="outlined" fullWidth />

                        <TextField name="cuisine" id="cuisine" label="Cuisine" type="text" onChange={this.handleChange}
                            style={{marginBottom: '10px'}} value={this.state.cuisine} variant="outlined" fullWidth />

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

export default connect(mapStateToProps, {addDish})(withStyles(styles)(AddDish))