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
    Firstname:{
        type:String,
        required :true
    },

    Lastname:{
        type:String
    },

    email:{
        type:String,
        required :true
    },
    password:{
        type:String,
        required:true
    }
})

const collection =mongoose.model("users",newSchema)

module.exports=collection