const graphql = require('graphql')
const {GraphQLObjectType, GraphQLInt, GraphQLString} = graphql

const DishType = new GraphQLObjectType({
    name : "Dish",
    fields : () => ({
        _id : { type : GraphQLString},
        restaurantid : { type : GraphQLString},
        dishName : { type : GraphQLString },
        dishPrice : { type : GraphQLString },
        dishDescription : { type : GraphQLString },
        dishCategory : { type : GraphQLString },
        dishPicture : { type : GraphQLString },
        dishType : { type : GraphQLString },
        cuisine : { type : GraphQLString },
    })
})

module.exports = DishType