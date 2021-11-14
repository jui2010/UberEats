let Dish = require('../models/dishModel')

async function handle_request(newDish, callback){
  console.log("in addDish service")
  console.log("dish:" + JSON.stringify(newDish) )
  newDish = new Dish(newDish)
  
  try{
    await Dish.findOne({_id : newDish.dishid}, async(err, dish) => {
      if(err){
        callback(err, {error : "Dish not found"})
      }
      if(dish){
        dish.dishName = newDish.dishName
        dish.dishPicture = newDish.dishPicture
        dish.dishDescription = newDish.dishDescription
        dish.dishCategory = newDish.dishCategory
        dish.cuisine = newDish.cuisine
        dish.dishType = newDish.dishType
        dish.dishPrice = newDish.dishPrice

        dish.save()
          .then(() => callback(null, dish) )
          .catch(err => callback(null, {error : "Could not update details"}))
      }
      else {
        callback(null, {error : "Dish not found"})
      }
    })
  }
  catch(err){
    console.log(err)
  }
}

exports.handle_request = handle_request