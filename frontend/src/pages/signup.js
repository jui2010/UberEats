import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles' 
import Grid from '@material-ui/core/Grid'
import InputBase from '@material-ui/core/InputBase'
import { Button } from '@material-ui/core'

//redux
import {connect} from 'react-redux'
import {signupUser} from '../redux/actions/userActions'

const styles = (theme) => ({
    ...theme.spread,
})

class signup extends Component {
    
    state = {
        firstname : '',
        lastname : '',
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
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            email : this.state.email,
            password : this.state.password,
        }
        this.props.signupUser(newUser, this.props.history)
    }

    render() {
        const { classes } = this.props
        return (
            <Grid container>
                <Grid item sm={12}>
                    Uber Eats
                </Grid>

                <Grid item sm={12}>
                    Sign up with your email address
                </Grid>
                
                <form noValidate onSubmit ={this.handleSubmit }>
                    <InputBase 
                        id ="firstname" 
                        name="firstname" 
                        placeholder="Firstname" 
                        type="text"
                        className={classes.textField}
                        variant="outlined"
                        value={this.state.firstname} 
                        onChange= {this.handleChange} fullWidth 
                        color ='secondary'
                    />

                    <InputBase 
                        id ="lastname" 
                        name="lastname" 
                        placeholder="Lastname" 
                        type="text"
                        className={classes.textField}
                        variant="outlined"
                        value={this.state.lastname} 
                        onChange= {this.handleChange} fullWidth 
                        color ='secondary'
                    />

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
                        Signup
                    </Button>
                </form>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user
})

export default connect(mapStateToProps, {signupUser} )(withStyles(styles)(signup))
