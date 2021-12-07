import { gql } from '@apollo/client'

const getAllRestaurants = gql`
    {
        getAllRestaurants{
            _id 
            restaurantName 
            email 
            password 
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

export {getAllRestaurants}
