import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import {connect} from 'react-redux'
import {editProfile} from '../redux/actions/userActions'

// import {  EDIT_PROFILE, TRYME } from '../redux/types'
// import axios from 'axios'
// import store from '../redux/store'

const styles = (theme) => ({
    ...theme.spread,
    avatar : {
        height :'100px',
        width :'100px',
    },
    field : {
        width : '300px'
    },  
    textField : {
        width : '400px'
    },
    edit : {
        cursor : 'pointer'
    }
})

class profile extends Component {
    
    state = {
        edit : false,
        phone  : this.props.user.authenticatedUser.phone,
        nickname : this.props.user.authenticatedUser.nickname,
        dob : this.props.user.authenticatedUser.dob,
        about : this.props.user.authenticatedUser.about,
        city : this.props.user.authenticatedUser.city,
        state : this.props.user.authenticatedUser.state,
        country : this.props.user.authenticatedUser.country
    }

    componentDidMount(){
        this.setState({
            phone  : this.props.user.authenticatedUser.phone,
            nickname : this.props.user.authenticatedUser.nickname,
            dob : this.props.user.authenticatedUser.dob,
            about : this.props.user.authenticatedUser.about,
            city : this.props.user.authenticatedUser.city,
            state : this.props.user.authenticatedUser.state,
            country : this.props.user.authenticatedUser.country
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleEdit = () => {
        this.setState({
            edit : true
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        
        var userDetails = {
            userid : this.props.user.authenticatedUser.userid,
            firstname : this.props.user.authenticatedUser.firstname,
            lastname : this.props.user.authenticatedUser.lastname,
            email : this.props.user.authenticatedUser.email,
            phone  : this.state.phone,
            nickname : this.state.nickname,
            dob : this.state.dob,
            about : this.state.about,
            city : this.state.city,
            state : this.state.state,
            country : this.state.country
        }

        console.log("user deeets"+ JSON.stringify(userDetails) )
        this.props.editProfile(userDetails)

        this.setState({
            edit : false
        })
    } 

    render() {
        const {classes} = this.props
        const {authenticatedUser} = this.props.user

        return (
            <Grid container direcion="row">
                <Grid container item sm={4} direcion="row">

                    <Avatar className={classes.avatar}>
                        {authenticatedUser.firstname && authenticatedUser.firstname.substring(0,1)}{ authenticatedUser.lastname &&  authenticatedUser.lastname.substring(0,1)}
                    </Avatar>

                    <div onClick={this.handleEdit} className={classes.edit}>
                        Edit Profile
                    </div>

                    <div className={classes.field}>
                        {authenticatedUser.firstname } {authenticatedUser.lastname }
                    </div>
                    <div className={classes.field} style={{width: '500px'}}>
                        {authenticatedUser.email }
                    </div>
                    
                    <form noValidate onSubmit ={this.handleSubmit }>
                        <div>
                            Phone : 
                        </div>
{console.log("state "+JSON.stringify(this.state && this.state.firstname))}
                        <TextField 
                            id ="phone" 
                            name="phone" 
                            placeholder="Phone Number" 
                            type="number"
                            className={classes.textField}
                            variant="outlined"
                            value={this.state.phone} 
                            onChange= {this.handleChange}  
                        />
                        
                        <div>
                            Nickname : 
                        </div>

                        <TextField 
                            id ="nickname" 
                            name="nickname" 
                            placeholder="Nickname" 
                            type="text"
                            className={classes.textField}
                            variant="outlined"
                            value={this.state.nickname} 
                            onChange= {this.handleChange}  
                        />

                        <div>
                            Date of Birth : 
                        </div>

                        <TextField 
                            id ="dob" 
                            name="dob" 
                            placeholder="Date of Birth " 
                            type="date"
                            className={classes.textField}
                            variant="outlined"
                            value={this.state.dob} 
                            onChange= {this.handleChange}  
                        />

                        <div>
                            About : 
                        </div>

                        <TextField 
                            id ="about" 
                            name="about" 
                            placeholder="About" 
                            type="text"
                            className={classes.textField}
                            variant="outlined"
                            value={this.state.about} 
                            onChange= {this.handleChange}  
                        />

                        <div>
                            City : 
                        </div>

                        <TextField 
                            id ="city" 
                            name="city" 
                            placeholder="City" 
                            type="text"
                            className={classes.textField}
                            variant="outlined"
                            value={this.state.city} 
                            onChange= {this.handleChange}  
                        />

                        <div>
                            State : 
                        </div>

                        <TextField 
                            id ="state" 
                            name="state" 
                            placeholder="State" 
                            type="text"
                            className={classes.textField}
                            variant="outlined"
                            value={this.state.state} 
                            onChange= {this.handleChange}  
                        />

                        <div>
                            Country : 
                        </div>

                        <TextField 
                            id ="country" 
                            name="country" 
                            placeholder="Country" 
                            type="text"
                            className={classes.textField}
                            variant="outlined"
                            value={this.state.country} 
                            onChange= {this.handleChange}  
                        />

                        { this.state.edit &&
                        (<Button type="submit" variant="contained" fullWidth className={classes.submit} >
                            Edit Profile
                        </Button>)}
                    </form>
                </Grid>

                <Grid item sm={8} >
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user
})

export default connect(mapStateToProps, {editProfile} )(withStyles(styles)(profile))