import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'    
import axios from 'axios'    
import Grid from '@material-ui/core/Grid'
import InputBase from '@material-ui/core/InputBase'
import { Button } from '@material-ui/core'

const styles = (theme) => ({
    ...theme.spread,
    pageTitle : {
        margin : '20px 0px 20px auto' ,
        fontFamily: 'Bebas Neue',
        fontSize : '27px',
        color : 'white'
    },
})

class restaurantLogin extends Component {
    
    state = {
        email : '',
        password : ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        var newRestaurant = {
            email : this.state.email,
            password : this.state.password
        }
        axios.post('/login', newRestaurant)
            .then(res => {
                console.log("login successful")
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container>
                <Grid item sm={12}>
                    Uber Eats
                </Grid>
                <Grid item sm={12}>
                    Welcome back
                </Grid>

                <Grid item sm={12}>
                    Log in with your email address.
                </Grid>
                
                <form noValidate onSubmit ={this.handleSubmit }>
                    <InputBase 
                        id ="email" 
                        name="email" 
                        placeholder="Email" 
                        type="email"
                        className={classes.textField}
                        variant="outlined"
                        value={this.state.email} 
                        onChange= {this.handleChange} fullWidth 
                        color ='secondary'
                    />

                    <InputBase 
                        id ="password" 
                        name="password" 
                        placeholder="Password" 
                        type="password"
                        className={classes.textField}
                        variant="outlined"
                        value={this.state.password} 
                        onChange= {this.handleChange} fullWidth 
                        color ='secondary'
                    />

                    <Button type="submit">
                        Login as a restaurant
                    </Button>
                </form>
            </Grid>
        )
    }
}

export default (withStyles(styles)(restaurantLogin))
