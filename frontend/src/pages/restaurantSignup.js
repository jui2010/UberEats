import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles' 
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {flowRight as compose} from 'lodash'
import { graphql } from 'react-apollo'
//redux
// import {connect} from 'react-redux'
import {signupRestaurant} from '../graphql/mutation'

const styles = (theme) => ({
    ...theme.spread,
    text1 : {
        fontSize : '30px',
        marginTop : '50px',
        fontWeight : '600'
    },
    textField : {
        marginTop : '10px',
    },
    submit : {
        marginTop : '10px',
        backgroundColor : '#3FC060',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    create : {
        color : '#3FC060',
        textDecoration : 'none', 
        marginLeft :'10px',
        fontSize : '15px',
    },
    new : {
        textDecoration : 'none', 
        fontSize : '15px',
    }, 
    text3 : {
        marginTop : '10px'
    },
    errors : {
        fontSize : '14px',
        color : "red"
    }
})

class restaurantSignup extends Component {
    
    state = {
        restaurantName : '',
        location : '',
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
        console.log(JSON.stringify(this.state))

        this.props.signupRestaurant({
            variables: {
                restaurantName : this.state.restaurantName,
                location : this.state.location,
                email : this.state.email,
                password : this.state.password,
            }
        })

        this.props.history.push('/restaurantLogin')
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container direction="row">
                <Grid item sm={4}>
                </Grid>

                <Grid item sm={4}>
                    <Grid item sm={12}  className={classes.text1}>
                        Sign up your restaurant
                    </Grid>
                    
                    <form noValidate onSubmit = {this.handleSubmit }>
                        <TextField 
                            id ="restaurantName" 
                            name="restaurantName" 
                            placeholder="Restaurant Name" 
                            type="text"
                            className={classes.textField}
                            variant="outlined"
                            value={this.state.restaurantName} 
                            onChange= {this.handleChange} fullWidth 
                            color ='secondary'
                        />

                        <TextField 
                            id ="location" 
                            name="location" 
                            placeholder="Location" 
                            type="text"
                            className={classes.textField}
                            variant="outlined"
                            value={this.state.location} 
                            onChange= {this.handleChange} fullWidth 
                            color ='secondary'
                        />

                        <TextField 
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

                        <TextField 
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

                        <Button type="submit" variant="contained" fullWidth className={classes.submit} >
                            Signup
                        </Button>

                        {/* <Typography className={classes.errors}>
                            {this.props.errors.signupRestError ? this.props.errors.signupRestError : ''}
                        </Typography> */}

                        <Typography type="submit" className={classes.text3}>
                            <span className={classes.new} >
                                Already a member? 
                            </span>
                            <Typography className={classes.create} component = {Link} to="/restaurantLogin" >
                                Login here
                            </Typography>
                        </Typography>
                    </form>
                </Grid>

                <Grid item sm={4}>
                </Grid>
                
            </Grid>
        )
    }
}

// const mapStateToProps = (state) => ({
//     errors : state.errors
// })

// export default connect(mapStateToProps, {signupRestaurant} )(withStyles(styles)(restaurantSignup))
export default compose(graphql(signupRestaurant, { name: "signupRestaurant" }))(withStyles(styles)(restaurantSignup)) 