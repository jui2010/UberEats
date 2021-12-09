const graphql = require('graphql')
const {GraphQLObjectType, GraphQLInt, GraphQLString} = graphql

const DishInputType = new GraphQLObjectType({
    name : "DishInput",
    fields : () => ({
        _id : { type : GraphQLString},
        dishid : { type : GraphQLString},
        restaurantid : { type : GraphQLString},
        dishName : { type : GraphQLString },
        dishPrice : { type : GraphQLString },
        dishDescription : { type : GraphQLString },
        dishCategory : { type : GraphQLString },
        dishPicture : { type : GraphQLString },
        dishType : { type : GraphQLString },
        dishQuantity : { type : GraphQLString },
        cuisine : { type : GraphQLString },
    })
})

module.exports = DishInputType