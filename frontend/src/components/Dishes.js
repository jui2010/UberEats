import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import DishCard from './DishCard'

const styles = (theme) => ({
    ...theme.spread,
    root: {
        flexGrow: 1,
    },
    mainGrid : {
        paddingLeft : '30px',
        // paddingRight : '30px',
        // borderTop: '1px solid #a3a3a3'
    },
    dishCat : {
        paddingTop : '40px',
        paddingBottom : '10px',
        fontSize : '30px',
        fontWeight: '700',
        // border: '1px solid black'
    },
    dish : {
        border: '1px solid black',
    },
    dishCard : {
        marginTop : '10px'
    }
})

class Dishes extends Component {
    displayDishes(){
        const { classes, dishes, restaurantid} = this.props
        let allDishes = [] //array to render all the dishes according to the available dish category

        // filtering out each dish type into seperate arrays
        let appetizerDishes = []
        let saladDishes = []
        let mainCourseDishes = []
        let dessertDishes = []
        let beverageDishes = []
        
        if(dishes && dishes.some(dish => dish.dishCategory === 'Appetizer')){
            appetizerDishes = dishes.filter(dish => dish.dishCategory === 'Appetizer')
        }

        if(dishes && dishes.some(dish => dish.dishCategory === 'Salad')){
            saladDishes = dishes.filter(dish => dish.dishCategory === 'Salad')
        }

        if(dishes && dishes.some(dish => dish.dishCategory === 'Main Course')){
            mainCourseDishes = dishes.filter(dish => dish.dishCategory === 'Main Course')
            // console.log("mainCourseDishes " + JSON.stringify(mainCourseDishes))
        }

        if(dishes && dishes.some(dish => dish.dishCategory === 'Dessert')){
            dessertDishes = dishes.filter(dish => dish.dishCategory === 'Dessert')
        }

        if(dishes && dishes.some(dish => dish.dishCategory === 'Beverage')){
            beverageDishes = dishes.filter(dish => dish.dishCategory === 'Beverage')
        }

        //checking if a particular dish category exists for the restauarnt and then looping through that dish category array to display them
        if(appetizerDishes.length > 0){
            allDishes.push(
                <Grid key={"appetizer"} item xs={12} className={classes.dishCat}>Appetizer</Grid>
            )
            allDishes.push(
                appetizerDishes.map(appetizerDish => (      
                    <DishCard key={appetizerDish.dishid} dish={appetizerDish} className={classes.dishCard} restaurantid={restaurantid} />
                ))
            )
        }

        if(saladDishes.length > 0){
            allDishes.push(
                <Grid key={"salad"} item xs={12} className={classes.dishCat}>Salad</Grid>
            )
            allDishes.push(
                saladDishes.map(saladDish => (      
                    <DishCard key={saladDish.dishid} dish={saladDish} className={classes.dishCard}  restaurantid={restaurantid}/>
                ))
            )
        }

        if(mainCourseDishes.length > 0){
            allDishes.push(
                <Grid key={"mainCourse"} item xs={12} className={classes.dishCat}>Main Course</Grid>
            )
            allDishes.push(
                mainCourseDishes.map(mainCourseDish => (      
                    <DishCard key={mainCourseDish.dishid} dish={mainCourseDish} className={classes.dishCard}  restaurantid={restaurantid}/>
                ))
            )
        }

        if(dessertDishes.length > 0){
            allDishes.push(
                <Grid key={"dessert"} item xs={12} className={classes.dishCat}>Dessert</Grid>
            )
            allDishes.push(
                dessertDishes.map(dessertDish => (      
                    <DishCard key={dessertDish.dishid} dish={dessertDish} className={classes.dishCard}  restaurantid={restaurantid}/>
                ))
            )
        }

        if(beverageDishes.length > 0){
            allDishes.push(
                <Grid key={"beverage"} item xs={12} className={classes.dishCat}>Beverage</Grid>
            )
            allDishes.push(
                beverageDishes.map(beverageDish => (      
                    <DishCard key={beverageDish.dishid} dish={beverageDish} className={classes.dishCard}  restaurantid={restaurantid}/>
                ))
            )
        }

        return (
            <div>{allDishes}</div>
        )
    }

    render(){
        const { classes} = this.props

        return (
            <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1} className={classes.mainGrid}>
                {this.displayDishes()}
            </Grid>  
        )
    }
}

const mapStateToProps = (state) => ({
    restaurant : state.restaurant
})

export default connect(mapStateToProps, {} )(withStyles(styles)(Dishes))