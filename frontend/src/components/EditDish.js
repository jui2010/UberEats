import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditIcon from '@material-ui/icons/Edit'
import Tooltip from '@material-ui/core/Tooltip'

import {connect} from 'react-redux'
import {editDish} from '../redux/actions/restaurantActions'

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
        dishName : this.props.dish.dishName,
        dishPicture : this.props.dish.dishPicture,
        dishDescription : this.props.dish.dishDescription,
        dishCategory : this.props.dish.dishCategory,
        cuisine : this.props.dish.cuisine,
        dishType : this.props.dish.dishType,
        dishPrice : this.props.dish.dishPrice
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
        const dishDetails = {
            dishid : this.props.dish.dishid,
            restaurantid : this.props.restaurant.authenticatedRestaurant.restaurantid,
            dishName : this.state.dishName,
            dishPicture : this.state.dishPicture,
            dishDescription : this.state.dishDescription,
            dishCategory : this.state.dishCategory,
            cuisine : this.state.cuisine,
            dishType : this.state.dishType,
            dishPrice : this.state.dishPrice
        }
        
        this.props.editDish(dishDetails)
        console.log("dishDetails "+JSON.stringify(dishDetails))
        this.handleClose()
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

                        <TextField name="dishPicture" id="dishPicture" label="Dish Picture" type="text" onChange={this.handleChange}
                            style={{marginBottom: '10px'}} value={this.state.dishPicture} variant="outlined" fullWidth />
                        
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

export default connect(mapStateToProps, {editDish})(withStyles(styles)(EditDish))