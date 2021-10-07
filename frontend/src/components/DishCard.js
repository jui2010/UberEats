import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import AddCircle from '@material-ui/icons/AddCircle'
import RemoveCircle from '@material-ui/icons/RemoveCircle'

import {connect} from 'react-redux'
import {addToCart} from '../redux/actions/restaurantActions'

const styles = (theme) => ({
    ...theme.spread,
    root: {
        flexGrow: 1,
    },
    dish : {
        border: '1px solid #d1d1d1',
        width : '400px',
        height : '150px',
        marginTop : '10px',
        "&:hover": {
            border: '1px solid black',
            cursor : 'pointer',
        },
    },
    card : {
        paddingLeft : '10px',
        paddingRight : '10px',
    },
    dishName : {
        paddingTop : '10px',
        fontWeight : '500'
    },
    dishPicture : {
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        borderLeft: '1px solid #f0f0f0',
    },
    dishDesc : {
        maxHeight: '20px',
        maxWidth: '250px',
        overflow: 'hidden',
        fontSize : '13px',
        color : '#363535'
    },
    dishDescDialog : {
        fontSize : '15px',
        color : '#363535',
        paddingBottom : '25px'
    },
    dishPrice : {
        fontWeight : '500',
        paddingTop: '30px'
    },
    icons : {
        fontSize : '40px',
        color : '#b5b5b5'
    }, 
    button : {
        alignText : 'center',
        backgroundColor : 'black',
        color : 'white',
        width : '100%',
        paddingTop : '10px',
        paddingBottom : '10px',
        marginRight : '10px',
        display: 'flex',
        justifyContent: 'space-around',
        cursor : 'pointer',
    }
})

class DishCard extends Component {

    state = {
        open : false,
        dishQuantity : 1
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

    handleDecrease = () => {
        this.setState({
            dishQuantity : this.state.dishQuantity === 1 ? 1 : this.state.dishQuantity - 1
        })
    }

    handleIncrease = () => {
        this.setState({
            dishQuantity : this.state.dishQuantity + 1
        })
    }

    handleAddToCart = () => {
        let orderedDish = {
            restaurantid : this.props.restaurant.selectedRestaurant.restaurantid,
            userid : this.props.user.authenticated.userid,
            dishid : this.props.dish.dishid,
            dishName : this.props.dish.dishName,
            dishQuantity : this.state.dishQuantity,
            dishPrice : Math.round(this.props.dish.dishPrice * this.state.dishQuantity * 100)/100,
            deliveryOrPickup : '',
            orderStatus : 'New Order'
        } 

        this.props.addToCart(orderedDish)
        this.handleClose()
    }

    render(){
        const { classes } = this.props
        const { dishName, dishPicture, dishDescription, dishPrice } = this.props.dish

        return (         
            <Grid container item xs={12} className={classes.dish} onClick={this.handleOpen}>
                <Grid container item xs={8} className={classes.card} >
                    <Grid item xs={12} className={classes.dishName}>
                        {dishName}
                    </Grid>
                    <Grid item xs={12} className={classes.dishDesc}>
                        {dishDescription}
                    </Grid>
                    <Grid item xs={12} className={classes.dishPrice}>
                        ${dishPrice}
                    </Grid>
                </Grid>

                <Grid container item xs={4} className={classes.dishPicture} style={{backgroundImage : `url(${dishPicture})`,}}>
                    
                </Grid>

                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle style={{backgroundImage : `url(${dishPicture})`, height: '270px', width: '500px'}} className={classes.dishPicture} >
                    </DialogTitle>
                    <DialogTitle>
                        <div>{dishName}</div>
                    </DialogTitle>
                    <DialogContent className={classes.dishDescDialog}>
                        {dishDescription}
                    </DialogContent>

                    <Grid container direction='row'>
                        <Grid item xs={1}><RemoveCircle onClick={this.handleDecrease} className={classes.icons} style={{marginLeft: '18px'}}/>
                        </Grid>
                        <Grid item xs={1} style={{paddingLeft: '24px', fontSize : '25px', fontWeight : '600' }}>{this.state.dishQuantity}
                        </Grid>
                        <Grid item xs={1}><AddCircle onClick={this.handleIncrease} className={classes.icons}/>
                        </Grid>
                        <Grid item xs={8}>
                            {/* <Button type="submit" variant="contained" className={classes.button}>
                                Add {this.state.dishQuantity} to order  <div style={{display: 'flex', justifyContent: 'flex-end'}}>${dishPrice * this.state.dishQuantity}</div>
                            </Button> */}
                            <div role="button" type="submit" className={classes.button} onClick={this.handleAddToCart}>
                                <div></div>
                                <div> Add {this.state.dishQuantity} to order </div>
                                <div>${Math.round(dishPrice * this.state.dishQuantity * 100)/100}</div>
                            </div>
                        </Grid>
                    </Grid>
                </Dialog>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user,
    restaurant : state.restaurant
})

export default connect(mapStateToProps, {addToCart})(withStyles(styles)(DishCard))