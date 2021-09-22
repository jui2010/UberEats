import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'    
import Grid from '@material-ui/core/Grid'
import InputBase from '@material-ui/core/InputBase'
import { Button } from '@material-ui/core'

//redux
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userActions'

const styles = (theme) => ({
    ...theme.spread,
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
                        Login
                    </Button>
                </form>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user
})

export default connect(mapStateToProps, {loginUser} )(withStyles(styles)(login))
