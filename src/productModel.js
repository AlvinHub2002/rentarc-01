const mongoose = require("mongoose")
const uri = "mongodb+srv://Rentarc01:rentarcpassword@rentarc-01.v6gdebq.mongodb.net/Rentarc-01"
const newSchema=new mongoose.Schema({
    category: String,
    brand: String,
    title: String,
    description: String,
    price: Number,
    district: String,
    place:String,
    contact: String,
    images: [
        {
          public_id: { type: String },
          url: { type: String },
        },
      ],
      Renter:String,
      postDate:Date,
      averageRating:Number,
    })

const products =mongoose.model("products",newSchema)

module.exports=products