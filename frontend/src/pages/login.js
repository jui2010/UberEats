import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'    
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'

import { Link } from 'react-router-dom'

//redux
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userActions'

const styles = (theme) => ({
    ...theme.spread,
    text1 : {
        fontSize : '30px',
        marginTop : '100px',
        fontWeight : '600'
    },
    text2 : {
        fontSize : '20px',
        marginTop : '12px'
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
    textField : {
        marginTop : '10px',
    },
    submit : {
        marginTop : '10px',
        backgroundColor : '#3FC060',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
    text3 : {
        marginTop : '10px'
    },
    errors : {
        fontSize : '14px',
        color : "red"
    }
})

class login extends Component {
    
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
        var newUser = {
            email : this.state.email,
            password : this.state.password
        }
        this.props.loginUser(newUser, this.props.history)
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container direction="row">
                <Grid item sm={4}>
                </Grid>

                <Grid item sm={4}>
                    <Grid item sm={12} className={classes.text1}>
                        Welcome back
                    </Grid>

                    <Grid item sm={12} className={classes.text2}>
                        Log in with your email address.
                    </Grid>
                    
                    <form noValidate onSubmit ={this.handleSubmit }>
                        <TextField 
                            id ="email" 
                            name="email" 
                            placeholder="Email" 
                            type="email"
                            className={classes.textField}
                            variant="outlined"
                            value={this.state.email} 
                            onChange= {this.handleChange} fullWidth 
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
                        />

                        <Button type="submit" variant="contained" fullWidth className={classes.submit} >
                            Login
                        </Button>
                        <br/>
                        
                        <Typography className={classes.errors}>
                            {this.props.errors.loginError ? this.props.errors.loginError : ''}
                        </Typography>

                        <Typography type="submit" className={classes.text3}>
                            <span className={classes.new} >
                                New to Uber Eats? 
                            </span>
                            <Typography className={classes.create} component = {Link} to="/signup" >
                                Create an account
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

const mapStateToProps = (state) => ({
    user : state.user,
    errors : state.errors
})

export default connect(mapStateToProps, {loginUser} )(withStyles(styles)(login))
