import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase'

import {connect} from 'react-redux'
import {editProfile, getSelectedUser} from '../redux/actions/userActions'

const styles = (theme) => ({
    ...theme.spread,
    mainGrid : {
        padding : '30px'
    },
    avatar : {
        height :'200px',
        width :'200px',
    },
    field : {
        paddingTop : '15px',
        fontSize : '22px',
        width : '300px',
        fontWeight : '700'
    },  
    email : {
        paddingTop : '10px',
        fontSize : '16px',
        width : '300px',
        fontWeight : '700'
    }, 
    textField : {
        width : '400px'
    },
    edit : {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        marginTop : '10px',
        cursor : 'pointer',
        backgroundColor : '#3FC060', 
        fontWeight : '700',         
        textTransform : 'capitalize'
    },
    div : {
        fontWeight : 700
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
// console.log(JSON.stringify(this.state))
        return (
            <Grid container direcion="row" alignItems="center" justifyContent="center" className={classes.mainGrid}>
                <Grid container item sm={3} direcion="row" >
                    <Grid item xs={12}>
                        <Avatar className={classes.avatar} src={authenticatedUser.profilePic}>
                            {authenticatedUser.firstname && authenticatedUser.firstname.substring(0,1)}{ authenticatedUser.lastname &&  authenticatedUser.lastname.substring(0,1)}
                        </Avatar>
                    </Grid> 
                    <Grid item xs={12}>
                        <div className={classes.field}>
                            {authenticatedUser.firstname } {authenticatedUser.lastname }
                        </div>
                    </Grid> 
                    <Grid item xs={12}>
                        <div className={classes.email} style={{width: '500px'}}>
                            {authenticatedUser.email }
                        </div>
                    </Grid> 
                    
                    {/* {authenticatedUser.userid === GET_AUTHENTICATED_USER.userid && ( */}
                    <Button onClick={this.handleEdit} className={classes.edit}>
                        Edit Profile
                    </Button>
                    {/* )} */}
                </Grid>
                <Grid item sm={1} >
                </Grid>
                <Grid item sm={4} >
                    {/* <form noValidate onSubmit ={this.handleSubmit }> */}
                        <div className={classes.div}>
                            Date of Birth : 
                        </div>
                        <InputBase
                            id="dob"
                            name="dob"
                            style={{border : this.state.edit ? '1px solid #7d7d7d' : '', borderRadius : 3, marginBottom : '5px'}}
                            placeholder="Date of Birth"
                            value={this.state.dob.split("T")[0]} 
                            onChange={this.handleChange}
                        />
                        
                        <div className={classes.div}>
                            Phone : 
                        </div>
                        <InputBase
                            id="phone"
                            name="phone"
                            className={classes.craving}
                            style={{border : this.state.edit ? '1px solid #7d7d7d' : '', borderRadius : 3, marginBottom : '5px'}}
                            placeholder="Phone Number"
                            value={this.state.phone} 
                            onChange={this.handleChange}
                        />
                        
                        <div className={classes.div}>
                            Nickname : 
                        </div>
                        <InputBase
                            id="nickname"
                            name="nickname"
                            style={{border : this.state.edit ? '1px solid #7d7d7d' : '', borderRadius : 3, marginBottom : '5px'}}
                            className={classes.nickname}
                            placeholder="Nickname"
                            value={this.state.nickname} 
                            onChange={this.handleChange}
                        />

                        <div className={classes.div}>
                            About : 
                        </div>
                        <InputBase
                            id="about"
                            name="about"
                            className={classes.about}
                            style={{border : this.state.edit ? '1px solid #7d7d7d' : '', borderRadius : 3, marginBottom : '5px'}}
                            placeholder="About"
                            value={this.state.about} 
                            onChange={this.handleChange}
                        />

                        <div className={classes.div}>
                            City : 
                        </div>
                        <InputBase
                            id="city"
                            name="city"
                            className={classes.city}
                            style={{border : this.state.edit ? '1px solid #7d7d7d' : '', borderRadius : 3, marginBottom : '5px'}}
                            placeholder="City"
                            value={this.state.city} 
                            onChange={this.handleChange}
                        />

                        <div className={classes.div}>
                            State : 
                        </div>
                        <InputBase
                            id="state"
                            name="state"
                            className={classes.state}
                            style={{border : this.state.edit ? '1px solid #7d7d7d' : '', borderRadius : 3, marginBottom : '5px'}}
                            placeholder="State"
                            value={this.state.state} 
                            onChange={this.handleChange}
                        />
                        <div className={classes.div}>
                            Country : 
                        </div>
                        <InputBase
                            id="country"
                            name="country"
                            className={classes.country}
                            style={{border : this.state.edit ? '1px solid #7d7d7d' : '', borderRadius : 3, marginBottom : '5px'}}
                            placeholder="Country"
                            value={this.state.country} 
                            onChange={this.handleChange}
                        />

                        { this.state.edit &&
                        (<Button type="submit" onClick={this.handleSubmit} variant="contained" fullWidth className={classes.edit} >
                            Submit
                        </Button>)}
                    {/* </form> */}
                </Grid>
                <Grid item sm={3} >
                </Grid>
                    
                {/* </Grid> */}
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user
})

export default connect(mapStateToProps, {editProfile, getSelectedUser} )(withStyles(styles)(profile))