import { gql } from '@apollo/client'

const signupUser = gql`
    mutation signupUser($firstname : String! $lastname: String! $email: String! $password: String!){
        signupUser(firstname : $firstname lastname : $lastname email: $email password: $password){
            firstname
            lastname
        }
    }
`

const loginUser = gql`
    mutation loginUser($email: String! $password: String!){
        loginUser(email: $email password: $password){
            token
        }
    }
`

const getAuthenticatedUserData = gql`
    mutation getAuthenticatedUserData($_id: String!){
        getAuthenticatedUserData(_id: $_id ){
            firstname
            lastname
            email
            profilePic
            phone
            nickname
            about
            city
            country
            state
            dob
        }
    }
`

const signupRestaurant = gql`
    mutation signupRestaurant($restaurantName : String! $location: String! $email: String! $password: String!){
        signupRestaurant(restaurantName : $restaurantName location : $location email: $email password: $password){
            restaurantName
            location
        }
    }
`

const loginRestaurant = gql`
    mutation loginRestaurant($email: String! $password: String!){
        loginRestaurant(email: $email password: $password){
            token
        }
    }
`

export {signupUser, loginUser, getAuthenticatedUserData, signupRestaurant, loginRestaurant}