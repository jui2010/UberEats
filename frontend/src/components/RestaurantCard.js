import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import MuiLink from '@material-ui/core/Link'
import {Link } from 'react-router-dom'
import {connect} from 'react-redux'

const styles = (theme) => ({
    ...theme.spread,
    root: {
        flexGrow: 1,
    },
    card : {
        width : '250px',
        height : '250px'
    }
})

class RestaurantCard extends Component {
    render(){
        const { classes } = this.props
        const { restaurantName, tile } = this.props.restaurant

        return (
            <Card className={classes.card}>
                <MuiLink component = {Link} to ={ `/restaurant/${restaurantName}`}> 
                    
                    <CardMedia
                        component="img"
                        height="140"
                        image={tile}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {restaurantName}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </MuiLink>
            </Card>           
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.user
})

export default connect(mapStateToProps, {} )(withStyles(styles)(RestaurantCard))