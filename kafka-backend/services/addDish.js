let Dish = require('../models/dishModel')

async function handle_request(newDish, callback){
  console.log("in addDish service")
  console.log("dish:" + JSON.stringify(newDish) )
  newDish = new Dish(newDish)
  
  newDish.save((err, data) => {
    if(err){
      callback(err, "Error")
    }
    callback(null, data)
  })
}

exports.handle_request = handle_request