const graphql = require('graphql')
const {GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString} = graphql
const DishType = require('../TypeDefs/DishType')
const DishInputType = require('../TypeDefs/DishInputType')

const OrderType = new GraphQLObjectType({
    name : "Order",
    fields : () => ({
        _id : { type : GraphQLString},
        restaurantid : { type : GraphQLString},
        restaurantName : { type : GraphQLString},
        location : { type : GraphQLString},
        userid : { type : GraphQLString},
        firstname : { type : GraphQLString},
        lastname : { type : GraphQLString},
        deliveryOrPickup : { type : GraphQLString},
        orderStatus : { type : GraphQLString},
        orderDate : { type : GraphQLString},
        orderTime : { type : GraphQLString},
        instructions : { type : GraphQLString},
        dishes : { type :  new GraphQLList(DishInputType) },
    })
})

module.exports = OrderType