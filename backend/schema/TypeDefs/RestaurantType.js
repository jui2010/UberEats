const graphql = require('graphql')
const {GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString} = graphql
const DishType = require('../TypeDefs/DishType')

const RestaurantType = new GraphQLObjectType({
    name : "Restaurant",
    fields : () => ({
        _id : { type : GraphQLString},
        restaurantName : { type : GraphQLString},
        email : { type : GraphQLString},
        password : { type : GraphQLString},
        location : { type : GraphQLString},
        address : { type : GraphQLString},
        deliveryFee : { type : GraphQLString},
        description : { type : GraphQLString},
        phone : { type : GraphQLString},
        timing : { type : GraphQLString},
        typeOfFood : { type : GraphQLString},
        typeOfRestaurant : { type : GraphQLString},
        tile : { type : GraphQLString},
        token : { type : GraphQLString},
        dishes : { type :  new GraphQLList(DishType)}
    })
})

module.exports = RestaurantType