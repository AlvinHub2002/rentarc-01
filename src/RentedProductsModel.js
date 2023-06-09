const mongoose = require("mongoose")
const uri = "mongodb+srv://Rentarc01:rentarcpassword@rentarc-01.v6gdebq.mongodb.net/Rentarc-01"
const newSchema=new mongoose.Schema({
    productId:String,
    category: String,
    brand: String,
    title: String,
    district: String,
    place:String,
    price:Number,
    contact: String,
    Renter:String,
    RentedBy:String,
    images: [
        {
          public_id: { type: String },
          url: { type: String },
        },
      ],
    RentedPeriod:{
        fromDate:Date,
        toDate:Date,
    },
    paymentDate:Date,
    paymentId:String,
    Amount:Number,
    })

const rented =mongoose.model("rented",newSchema)

module.exports=rented