const express = require('express');
const collection =require("./mongo")
const cors =require("cors")
const products = require("./productModel");
const cloudinary = require('./cloudinary');
const app =express()
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ limit :'100mb',extended: true }));
app.use(cors())

app.listen(3000,()=>
{
    console.log("port connected")
})


app.get("/",cors(),(req,res)=>{

})

app.post("/",async(req,res)=>{
    const{email,password}=req.body;

    try{
        const check=await collection.findOne({email:email})
        if (check){
            if(check.password===password){
                res.json('success')
            }
            else{
                res.json('wrongpass')
            }
        }
        else{
            res.json("notexist")
        }
    }

    catch(e){
        res.json("notexists")
    }
})


app.post("/Signup",async(req,res)=>{
    const{Firstname,Lastname,email,password}=req.body
    const data={
        Firstname:Firstname,
        Lastname:Lastname,
        email:email,
        password:password
    }

    try{
        const check=await collection.findOne({email:email})
        if (check){
            res.json("exist")
        }
        else if (data.Firstname!=='' && data.Lastname!==''&&data.email!==''&& data.password!==''){
            res.json("perfect")
            await collection.insertMany([data])
        }
        else if (data.Firstname==='' && data.Lastname===''&&data.email===''&& data.password===''){
            res.json("incomplete")

    }
    }
    catch(e){
        res.json("notexists")
    }
})


app.post('/Navbar', (req, res) => {

    res.send({ message: 'Logout successful' });
  });





  app.post('/Post', async (req, res) => {
    const { category, brand, title, description, price, location, contact, images } = req.body;
    try {
      const uploadedImages = [];
      for (let i = 0; i < images.length; i++) {
          const image = images[i];
          console.log(image)
          const result = await cloudinary.uploader.upload(image, {
            folder: 'products',
          });
        
          const imageObj = {
            public_id: result.public_id,
            url: result.secure_url,
          };
        
          uploadedImages[i] = imageObj;
        }
    console.log(uploadedImages)
      const product = new products({
        category,
        brand,
        title,
        description,
        price,
        location,
        contact,
        images:uploadedImages
      });
  
      const add = await product.save();
  
      if (add) {
        res.json('perfect');
      } else {
        res.json('imperfect');
      }
    } catch (e) {
      res.json("notexists");
    }
  });
  
  
  app.get('/product-list', async (req, res) => {
    try {
      const productData = await products.find({});
      res.json(productData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  app.get('/Categorypage', async (req, res) => {
    try {
    const category = req.headers['x-selected-category'];
      console.log(category)
      const productData = await products.find({category:category});
      res.json(productData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });