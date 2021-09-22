import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles' 
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'

//redux
import {connect} from 'react-redux'
import {signupUser} from '../redux/actions/userActions'

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
            <Grid container direction="row">
                <Grid item sm={4}>
                </Grid>

                <Grid item sm={4}>
                    <Grid item sm={12}  className={classes.text1}>
                        Sign up with your email address
                    </Grid>
                    
                    <form noValidate onSubmit ={this.handleSubmit }>
                        <TextField 
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

                        <TextField 
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
                    </form>
                </Grid>

                <Grid item sm={4}>
                </Grid>
                
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user
})

export default connect(mapStateToProps, {signupUser} )(withStyles(styles)(signup))
