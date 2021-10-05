import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
// import {Link } from 'react-router-dom'

const styles = (theme) => ({
    ...theme.spread,
    root: {
        flexGrow: 1,
    },
    dish : {
        border: '1px solid #d1d1d1',
        width : '400px',
        height : '150px',
        marginTop : '10px',
        "&:hover": {
            border: '1px solid black',
            cursor : 'pointer',
        },
    },
    card : {
        paddingLeft : '10px',
        paddingRight : '10px',
    },
    dishName : {
        paddingTop : '10px',
        fontWeight : '500'
    },
    dishPicture : {
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        borderLeft: '1px solid #f0f0f0',
    },
    dishDesc : {
        maxHeight: '20px',
        maxWidth: '250px',
        overflow: 'hidden',
        fontSize : '13px',
        color : '#363535'
    },
    dishPrice : {
        fontWeight : '500',
        paddingTop: '30px'
    }
})

class DishCard extends Component {


    render(){
        const { classes } = this.props
        const { dishName, dishPicture, dishDescription, dishPrice } = this.props.dish

        console.log("dishcard "+dishName)
        return (         
            <Grid container item xs={12} className={classes.dish}>
                <Grid container item xs={8} className={classes.card}>
                    <Grid item xs={12} className={classes.dishName}>
                        {dishName}
                    </Grid>
                    <Grid item xs={12} className={classes.dishDesc}>
                        {dishDescription}
                    </Grid>
                    <Grid item xs={12} className={classes.dishPrice}>
                        ${dishPrice}
                    </Grid>
                </Grid>

                <Grid container item xs={4} className={classes.dishPicture} style={{backgroundImage : `url(${dishPicture})`,}}>
                    
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(DishCard)