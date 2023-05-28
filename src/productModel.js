const mongoose = require("mongoose")
const uri = "mongodb+srv://Rentarc01:rentarcpassword@rentarc-01.v6gdebq.mongodb.net/Rentarc-01"
// mongoose.connect("mongodb://localhost:27017",{ useNewUrlParser: true, useUnifiedTopology: true })
async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("Database connected...")
    }catch(error){
        console.error(error)
    }
}

connect();
const newSchema=new mongoose.Schema({
    category: String,
    brand: String,
    title: String,
    description: String,
    price: Number,
    location: String,
    contact: String,
    images: [
        {
          public_id: { type: String },
          url: { type: String },
        },
      ],
})

const products =mongoose.model("products",newSchema)

module.exports=products