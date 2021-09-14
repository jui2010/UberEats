import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'    
import Grid from '@material-ui/core/Grid'
import InputBase from '@material-ui/core/InputBase'

const styles = (theme) => ({
    ...theme.spread,
    pageTitle : {
        margin : '20px 0px 20px auto' ,
        fontFamily: 'Bebas Neue',
        fontSize : '27px',
        color : 'white'
    },
})

class login extends Component {
    
    state = {
        email_no : ''  
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
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
                    Sign in with your email address or mobile number.
                </Grid>
                
                <InputBase 
                    id ="email_no" 
                    name="email_no" 
                    placeholder="Email or mobile number" 
                    className={classes.textField}
                    variant="outlined"
                    value={this.state.email_no} 
                    onChange= {this.handleChange} fullWidth 
                    color ='secondary'
                />

                <Grid item sm={12}>
                    New to Uber? Create an account
                </Grid>
            </Grid>
        )
    }
}

export default (withStyles(styles)(login))
