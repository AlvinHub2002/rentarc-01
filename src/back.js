const express = require('express');
const collection =require("./mongo")
const cors =require("cors")
const products = require("./productModel");
const unverified =require('./unverifiedModel');
const cloudinary = require('./cloudinary');
const { Collection } = require('mongoose');
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
        console.log(check.role)
        if (check){
            if(check.password===password){
              if(check.role==='admin'){
                res.json('success-admin')
              }
              else{
                res.json('success-user')
              }
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
    const { category, brand, title, description, price, district,place, contact, images,postDate } = req.body;
    const username = req.body.username;
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

      const user = await collection.findOne({ email:username });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }



    console.log(uploadedImages)
      const unverifiedproduct = new unverified({
        category,
        brand,
        title,
        description,
        price,
        district,
        place,
        contact,
        images:uploadedImages,
        Renter:user.email,
        postDate,
      });
  
      const add = await unverifiedproduct.save();
  
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


  app.get(`/Product_detail/:id`, async (req, res) => {
    const { id } = req.params;
    try {
      const product = await products.findOne({ _id: id });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const renter=await collection.findOne({ email:product.Renter});
  
      const response = {
        product,renter
      }
      //console.log(response)
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });



  app.get('/AdminPortal', async (req, res) => {
    try {
      const productData = await products.find({});
      const unverifiedProduct = await unverified.find({});
      const response = {
        productData,unverifiedProduct
      }
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  app.get(`/Confirmation/:id`, async (req, res) => {
    const { id } = req.params;
    try {
      const product = await products.findOne({ _id: id });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const renter=await collection.findOne({ email:product.Renter});
  
      const response = {
        product,renter
      }
      //console.log(response)
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

  app.get('/Profile', async (req, res) => {
    const loggedin = req.query.loggedin;
    try {
      const profile = await collection.findOne({ email:loggedin });
      if (!profile) {
        return res.status(404).json({ error: 'Product not found' });
      }
      //console.log(response)
      res.json(profile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

  app.get(`/Unverified/:id`, async (req, res) => {
    const { id } = req.params;
    try {
      const product = await unverified.findOne({ _id: id });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const renter=await collection.findOne({ email:product.Renter});
  
      const response = {
        product,renter
      }
      //console.log(response)
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });




  app.post('/Unverified', async (req, res) => {
    const { category, brand, title, description, price, district,place, contact, images,Renter,postDate } = req.body;
    try{
      console.log(req.body.Renter)

      const unverifiedproduct = new products({
        category,
        brand,
        title,
        description,
        price,
        district,
        place,
        contact,
        images,
        Renter,
        postDate,
      });
  
      const add = await unverifiedproduct.save();
      console.log(unverifiedproduct._id)
      // await unverified.deleteOne({_id:'648df552a1ee48ddbe33b2cb'});

  
      if (add) {
        res.json('perfect');

      } else {
        res.json('imperfect');
      }
    } catch (e) {
      res.json("notexists");
    }
  });