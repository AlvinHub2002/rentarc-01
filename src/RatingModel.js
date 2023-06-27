const mongoose = require("mongoose")
const uri = "mongodb+srv://Rentarc01:rentarcpassword@rentarc-01.v6gdebq.mongodb.net/Rentarc-01"
const newRatingSchema=new mongoose.Schema({
    productId:String,
    Rating:Number,
    })

const rating =mongoose.model("rating",newRatingSchema)

module.exports=rating