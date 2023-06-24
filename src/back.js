const express = require('express');
const collection =require("./mongo")
const cors =require("cors")
const mongoose = require('mongoose');
const products = require("./productModel");
const unverified =require('./unverifiedModel');
const rented =require('./RentedProductsModel')
const cloudinary = require('./cloudinary');
const { Collection } = require('mongoose');
const Razorpay = require('razorpay');

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
      const ownedproduct = await products.find({Renter: loggedin});
      console.log(ownedproduct)
      if(!ownedproduct){
        return res.status(404).json({ error: 'Product not found' })
      }
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
      const response={profile,ownedproduct}
      res.json(response);
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



  app.get(`/MyProduct_detail/:id`, async (req, res) => {
    const { id } = req.params;
    try {
      const product = await products.findOne({ _id: id });
      console.log(id)
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


  app.delete(`/MyProduct_detail/:id`, async (req, res) => {
    const {id} = req.params;
    console.log(id)
    try {
      await products.findOneAndDelete({ _id: id });
      res.status(200).json('Product deleted successfully' );
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json('Failed to delete product' );
    }
  });
  


  const razorpay = new Razorpay({
    key_id: 'rzp_test_oiCrE3lrqCUw7w',
    key_secret: 'lS6rvhZwhtBqGZZn01zE5hSr',
  });


  app.post(`/Confirmation/:id`, async (req, res) => {
    try {
      const { amount } = req.body;
      const loggedin=req.header('LoggedIn')
      console.log(loggedin)
      const options = {
        amount,
        currency: 'INR',
        receipt: 'order_receipt',
      };
      const rs=amount/100;
      const order = await razorpay.orders.create(options);
      const { id } = req.params;
      const product = await products.findOne({ _id: id });
      const renter=await collection.findOne({ email:product.Renter});
      const productDetails = new rented ({
        productId:id,
        category: product.category,
        brand: product.brand,
        title: product.title,
        district: product.district,
        place:product.place,
        contact: product.contact,
        Renter:renter.email,
        RentedBy:loggedin,
        paymentDate:order.created_at,
        paymentId:order.id,
        Amount:rs,
      });

      const rentedProduct = await productDetails.save();
  
      res.json({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create payment order' });
    }
  });