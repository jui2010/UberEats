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

const getSelectedRestaurantData = gql`
    mutation getSelectedRestaurantData($restaurantName: String!){
        getSelectedRestaurantData(restaurantName : $restaurantName){
            _id 
            restaurantName 
            email  
            location 
            address 
            deliveryFee 
            description 
            phone 
            timing 
            typeOfFood 
            typeOfRestaurant 
            tile 
            dishes {
                _id
                restaurantid
                dishName
                dishPrice
                dishDescription
                dishCategory
                dishPicture
                dishType
                cuisine
            } 
        }
    }
`

const getAuthenticatedRestaurantData = gql`
    mutation getAuthenticatedRestaurantData($restaurantid: String!){
        getAuthenticatedRestaurantData(restaurantid : $restaurantid){
            _id 
            restaurantName 
            email  
            location 
            address 
            deliveryFee 
            description 
            phone 
            timing 
            typeOfFood 
            typeOfRestaurant 
            tile 
        }
    }
`

const addDish = gql`
    mutation addDish(
        $restaurantid : String,
        $dishName : String,
        $dishPrice : String,
        $dishDescription : String,
        $dishCategory : String,
        $dishPicture : String, 
        $dishType : String,
        $cuisine : String
        ){
        addDish(
            restaurantid : $restaurantid,
            dishName : $dishName,
            dishPrice : $dishPrice,
            dishDescription : $dishDescription,
            dishCategory : $dishCategory,
            dishPicture : $dishPicture, 
            dishType : $dishType,
            cuisine : $cuisine
        ){
            _id 
            restaurantid
            dishName
            dishPrice
            dishDescription
            dishCategory
            dishPicture 
            dishType
            cuisine
        }
    }
`

const editDish = gql`
    mutation editDish(
        $dishid : String,
        $dishName : String,
        $dishPrice : String,
        $dishDescription : String,
        $dishCategory : String,
        $dishPicture : String, 
        $dishType : String,
        $cuisine : String
        ){
        editDish(
            dishid : $dishid,
            dishName : $dishName,
            dishPrice : $dishPrice,
            dishDescription : $dishDescription,
            dishCategory : $dishCategory,
            dishPicture : $dishPicture, 
            dishType : $dishType,
            cuisine : $cuisine
        ){
            _id 
            restaurantid
            dishName
            dishPrice
            dishDescription
            dishCategory
            dishPicture 
            dishType
            cuisine
        }
    }
`

const editProfile = gql`
    mutation editProfile(
        $phone: String
        $nickname: String
        $dob: String
        $about: String
        $city: String
        $state: String
        $country: String
        ){
        editProfile(
            phone : $phone
            nickname : $nickname
            dob : $dob
            about : $about
            city : $city
            state : $state
            country : $country
        ){
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

const editRestaurantProfile = gql`
    mutation editRestaurantProfile(
        $restaurantid : String,
        $restaurantName: String,
        $phone: String,
        $location: String,
        $address: String,
        $description: String,
        $deliveryFee: String,
        $timing: String,
        $tile: String,
        $typeOfRestaurant: String,
        $typeOfFood: String
        ){
        editRestaurantProfile(
            restaurantid : $restaurantid,
            restaurantName: $restaurantName,
            phone: $phone,
            location: $location,
            address: $address,
            description: $description,
            deliveryFee: $deliveryFee,
            timing: $timing,
            tile: $tile,
            typeOfRestaurant: $typeOfRestaurant,
            typeOfFood: $typeOfFood
        ){
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

const createOrder = gql`
    mutation createOrder(
        $userid : String!,
        $firstname : String!,
        $lastname : String!,
        $restaurantid : String!,
        $restaurantName : String!,
        $location : String!,
        $deliveryOrPickup : String!,
        $orderStatus : String!,
        $instructions : String!,
        $dishes : [DishInputType] 
        ){
        createOrder(
            userid : $userid,
            firstname : $firstname,
            lastname : $lastname,
            restaurantid : $restaurantid,
            restaurantName : $restaurantName,
            location : $location,
            deliveryOrPickup : $deliveryOrPickup,
            orderStatus : $orderStatus,
            instructions : $instructions,
            dishes : $dishes
        ){
            _id 
            userid
            firstname
            lastname
            restaurantid
            restaurantName
            location
            deliveryOrPickup
            orderStatus
            instructions
            dishes {
                dishid
                dishName
                dishQuantity
                dishPrice
            }
        }
    }
`

const getOrders = gql`
    mutation getOrders(
        $userid : String!
        ){
        getOrders(
            userid : $userid
        ){
            _id 
            userid
            firstname
            lastname
            restaurantid
            restaurantName
            location
            deliveryOrPickup
            orderStatus
            instructions
            dishes {
                dishid
                dishName
                dishQuantity
                dishPrice
            }
        }
    }
`

const getOrderSummary = gql`
    mutation getOrderSummary(
        $restaurantid : String!
        ){
        getOrderSummary(
            restaurantid : $restaurantid
        ){
            _id 
            userid
            firstname
            lastname
            restaurantid
            restaurantName
            location
            deliveryOrPickup
            orderStatus
            instructions
            dishes {
                dishid
                dishName
                dishQuantity
                dishPrice
            }
        }
    }
`

const changeOrderStatus = gql`
    mutation getOrderSummary(
        $orderid : String!
        $orderStatus : String!
        ){
        getOrderSummary(
            orderid : $orderid
            orderStatus : $orderStatus
        ){
            _id 
            userid
            firstname
            lastname
            restaurantid
            restaurantName
            location
            deliveryOrPickup
            orderStatus
            instructions
            dishes {
                dishid
                dishName
                dishQuantity
                dishPrice
            }
        }
    }
`

export {signupUser, loginUser, getAuthenticatedUserData, signupRestaurant, loginRestaurant, 
    getSelectedRestaurantData, getAuthenticatedRestaurantData, addDish, editDish, editProfile, editRestaurantProfile,
    createOrder, getOrders, getOrderSummary, changeOrderStatus}