const graphql = require('graphql')
const {GraphQLObjectType, GraphQLInt, GraphQLString} = graphql

const UserType = new GraphQLObjectType({
    name : "User",
    fields : () => ({
        _id : { type : GraphQLString},
        firstname : { type : GraphQLString},
        lastname : { type : GraphQLString},
        email : { type : GraphQLString},
        password : { type : GraphQLString},
        profilePic : { type : GraphQLString},
        phone : { type : GraphQLString},
        nickname : { type : GraphQLString},
        about : { type : GraphQLString},
        city : { type : GraphQLString},
        country : { type : GraphQLString},
        state : { type : GraphQLString},
        dob : { type : GraphQLString},
        token : { type : GraphQLString}
    })
})

module.exports = UserType