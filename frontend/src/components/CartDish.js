import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'

import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { REMOVE_FROM_CART, EDIT_FROM_CART } from '../redux/types'

import store from '../redux/store'
import {connect} from 'react-redux'

const styles = (theme) => ({
    ...theme.spread,
    dishName : {
        paddingLeft : '50px',
        fontSize : '20px',
        fontWeight : '600'
    }, 
    dishQuantity : {
        fontSize : '20px',
        fontWeight : '500',
        paddingLeft : '20px',
    }, 
    dishPrice : {
        fontSize : '18px',
        color : '#171717',
        paddingLeft : '30px'
    },
    list : {
        paddingBottom : '10px',
        marginBottom : '10px',
        borderBottom : '1px solid #dedede'
    },
    remove : {
        fontSize : '11px',
        color : '#171717',
        paddingLeft : '30px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    }
})

class Cart extends Component {

    state = {
        dishQuantity : this.props.cartItem.dishQuantity
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })

        this.handleEditFromCart()
    }

    handleEditFromCart = () => {
        let editDish = {
            dishQuantity : this.state.dishQuantity,
            dishName : this.props.cartItem.dishName
        }

        console.log("editDish"+JSON.stringify(editDish))
        store.dispatch({
            type : EDIT_FROM_CART,
            payload : editDish
        })
    }
    
    handleEditFromCart1 = (q) => {
        let editDish = {
            dishQuantity : q,
            dishName : this.props.cartItem.dishName
        }

        console.log("editDish"+JSON.stringify(editDish))
        store.dispatch({
            type : EDIT_FROM_CART,
            payload : editDish
        })
    }

    handleRemoveFromCart = () => {
        store.dispatch({
            type : REMOVE_FROM_CART,
            payload : this.props.cartItem.dishName
        })
    }

    render() {
        const {classes} = this.props
        const {cartItem} = this.props

        return (
            <Grid container item xs={12} className={classes.list}>
                <Grid item xs={1} className={classes.dishQuantity} >
                    {/* {cartItem.dishQuantity} */}
                    <FormControl >
                        <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={this.state.dishQuantity}
                        onChange={this.handleChange}
                        name="dishQuantity"
                        autoWidth
                        >
                        <MenuItem value={1} onClick={() => this.handleEditFromCart()}>1</MenuItem>
                        <MenuItem value={2} onClick={() => this.handleEditFromCart()}>2</MenuItem>
                        <MenuItem value={3} onClick={() => this.handleEditFromCart()}>3</MenuItem>
                        <MenuItem value={4} onClick={() => this.handleEditFromCart()}>4</MenuItem>
                        <MenuItem value={5} onClick={() => this.handleEditFromCart()}>5</MenuItem>
                        <MenuItem value={6} onClick={() => this.handleEditFromCart()}>6</MenuItem>
                        <MenuItem value={7} onClick={() => this.handleEditFromCart()}>7</MenuItem>
                        <MenuItem value={8} onClick={() => this.handleEditFromCart()}>8</MenuItem>
                        <MenuItem value={9} onClick={() => this.handleEditFromCart()}>9</MenuItem>
                        <MenuItem value={10} onClick={() => this.handleEditFromCart()}>10</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={7} className={classes.dishName}>
                    {cartItem.dishName}
                </Grid>
                <Grid item xs={2} className={classes.dishPrice}>
                    ${Math.round(cartItem.dishPrice * this.state.dishQuantity * 100) / 100 } 
                </Grid>
                <Grid item xs={1} >
                    <Button onClick={this.handleRemoveFromCart} className={classes.remove}><u> Remove </u></Button>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    restaurant : state.restaurant
})

export default connect(mapStateToProps, {})(withStyles(styles)(Cart))