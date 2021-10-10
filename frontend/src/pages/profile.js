import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import {connect} from 'react-redux'
import {editProfile, getSelectedUser} from '../redux/actions/userActions'
import { GET_AUTHENTICATED_USER } from '../redux/types'

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
        phone  : this.props.user.selectedUser.phone,
        nickname : this.props.user.selectedUser.nickname,
        dob : this.props.user.selectedUser.dob,
        about : this.props.user.selectedUser.about,
        city : this.props.user.selectedUser.city,
        state : this.props.user.selectedUser.state,
        country : this.props.user.selectedUser.country
    }

    componentDidMount(){
        const userid = this.props.match.params.userid
        //get data for specific user
        this.props.getSelectedUser(userid)

        this.setState({
            phone  : this.props.user.selectedUser.phone,
            nickname : this.props.user.selectedUser.nickname,
            dob : this.props.user.selectedUser.dob,
            about : this.props.user.selectedUser.about,
            city : this.props.user.selectedUser.city,
            state : this.props.user.selectedUser.state,
            country : this.props.user.selectedUser.country
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
            userid : this.props.user.selectedUser.userid,
            firstname : this.props.user.selectedUser.firstname,
            lastname : this.props.user.selectedUser.lastname,
            email : this.props.user.selectedUser.email,
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
        const {selectedUser} = this.props.user

        return (
            <Grid container direcion="row" alignItems="center" justifyContent="center">
                <Grid container item sm={3} direcion="row" >
                    <Grid item xs={12}>
                        <Avatar className={classes.avatar}>
                            {selectedUser.firstname && selectedUser.firstname.substring(0,1)}{ selectedUser.lastname &&  selectedUser.lastname.substring(0,1)}
                        </Avatar>
                    </Grid> 
                    <Grid item xs={12}>
                        <div className={classes.field}>
                            {selectedUser.firstname } {selectedUser.lastname }
                        </div>
                    </Grid> 
                    <Grid item xs={12}>
                        <div className={classes.field} style={{width: '500px'}}>
                            {selectedUser.email }
                        </div>
                    </Grid> 
                    
                    {selectedUser.userid === GET_AUTHENTICATED_USER.userid && (
                    <div onClick={this.handleEdit} className={classes.edit}>
                        Edit Profile
                    </div>) }
                </Grid>
                <Grid item sm={8} >
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
                </Grid>
                <Grid item sm={4} >
                </Grid>

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
                {/* </Grid> */}

                
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user
})

export default connect(mapStateToProps, {editProfile, getSelectedUser} )(withStyles(styles)(profile))