const express = require('express');
const collection =require("./mongo")
const cors =require("cors")
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const products = require("./productModel");
const unverified =require('./unverifiedModel');
const rented =require('./RentedProductsModel')
const rating=require('./RatingModel')
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
        // console.log(check.role)
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

            const transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: 'myrentarc@gmail.com',
                pass: 'wqjbrpzjophakbiw',
              },
            });
          
            const mailOptions = {
              from: 'myrentarc@gmail.com',
              to: data.email,
              subject: 'Welcome to RentArc',
              text: `Your RentArc account has been created\n\nUsername:${data.email}\nName:${data.Firstname} ${data.Lastname}\nPassword:${data.password}(do not share)`,
              
            };
          
            try {
              await transporter.sendMail(mailOptions);
              console.log('Email notification sent successfully');
            } catch (error) {
              console.error('Error sending email notification:', error);
            }

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
        averageRating:"0",
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
  })


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
      const admin = await collection.findOne({email: 'admina@gmail.com'});
      const user = await collection.find({});
      // console.log(user)
      const response = {
        productData,unverifiedProduct,admin,user
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
      res.status(500).json({ error: 'Server error' });5
    }
  });
  

  app.get('/Profile', async (req, res) => {
    const loggedin = req.query.loggedin;
    try {
      const profile = await collection.findOne({ email:loggedin });
      const ownedproduct = await products.find({Renter: loggedin});
      const rentals= await rented.find({RentedBy: loggedin});
      if(!ownedproduct){
        return res.status(404).json({ error: 'Product not found' })
      }
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
      const response={profile,ownedproduct,rentals}
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
    const { category, brand, title, description, price, district,place, contact, images,Renter,postDate,averageRating } = req.body;
    console.log(category)
    const id=req.header('productId')
    try{

      const unverifiedProduct = await unverified.findOne({
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
        averageRating,
      });
     

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
        averageRating,
      });
  
      const add = await unverifiedproduct.save();
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'myrentarc@gmail.com',
          pass: 'wqjbrpzjophakbiw',
        },
      });
      
        const mailOptions = {
          from: 'myrentarc@gmail.com',
          to: unverified.Renter,
          subject: 'product Verified',
         text: `Your product has been verified  by the admin.\n\nProduct Details:\nCategory: ${category}\nBrand: ${brand}\nTitle: ${title}\nDescription: ${description}\nPrice: ${price}\nDistrict: ${district}\nPlace: ${place}\nContact: ${contact}\nRenter: ${Renter}\nPost Date: ${postDate}\nAverage Rating: ${averageRating}\n This product is now available for renting `,
         
        };
      
        try {
          await transporter.sendMail(mailOptions);
          console.log('Email notification sent successfully');
        } catch (error) {
          console.error('Error sending email notification:', error);
        }
      await unverified.findByIdAndDelete(unverifiedProduct._id);

  
      if (add) {
        res.json('perfect');

      } else {
        res.json('imperfect');
      }
    } catch (e) {
      res.json("notexists");
    }
  });


  

  app.delete('/Unverified', async (req, res) => {
    const { category, brand, title, description, price, district, place, contact, images, Renter, postDate, averageRating } = req.body;
    const id = req.header('productId');
  
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'myrentarc@gmail.com',
        pass: 'wqjbrpzjophakbiw',
      },
    });
  
    const mailOptions = {
      from: 'myrentarc@gmail.com',
      to: Renter,
      subject: 'Product Declined',
      text: `Your product has been declined by the admin.\n\nProduct Details:\nCategory: ${category}\nBrand: ${brand}\nTitle: ${title}\nDescription: ${description}\nPrice: ${price}\nDistrict: ${district}\nPlace: ${place}\nContact: ${contact}\nRenter: ${Renter}\nPost Date: ${postDate}\nAverage Rating: ${averageRating}`,
      
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email notification sent successfully');
    } catch (error) {
      console.error('Error sending email notification:', error);
    }
    console.log(category);
  
    try {
      const unverifiedProduct = await unverified.findOne({
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
        averageRating,
      });
  
      if (!unverifiedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      await unverified.findByIdAndDelete(unverifiedProduct._id);
  
      res.json('Product deleted successfully from the unverified collection');
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Failed to delete product' });
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
      const product=await products.findOneAndDelete({ _id: id });
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'myrentarc@gmail.com',
          pass: 'wqjbrpzjophakbiw',
        },
      });
    
      const mailOptions = {
        from: 'myrentarc@gmail.com',
        to: 'alvinvargheseavm@gmail.com',
        subject: 'Product Removed',
        text: `Your product has been Removed .\n\nProduct Details:\nCategory: ${product.category}\nBrand: ${product.brand}\nTitle: ${product.title}\nDescription: ${product.description}\nPrice: ${product.price}\nDistrict: ${product.district}\nPlace: ${product.place}\nContact: $product.{contact}`,
        
      };
    
      try {
        await transporter.sendMail(mailOptions);
        console.log('Email notification sent successfully');
      } catch (error) {
        console.error('Error sending email notification:', error);
      }
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
      const rentedPeriod = JSON.parse(req.header('RentedPeriod'));
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

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'myrentarc@gmail.com',
          pass: 'wqjbrpzjophakbiw',
        },
      });
    
      const mailOptions = {
        from: 'myrentarc@gmail.com',
        to: loggedin,
        subject: 'Payment Successful',
        text: `Yout payment for the product : ${product.brand} with product ID : ${id} is successful.\n\nTotal amount : ${rs}\nOrder ID : ${order.id}\nOrder Date : ${order.created_at}\nRented period : ${rentedPeriod.fromDate} to ${rentedPeriod.toDate}\n\nPlease collect your Product from the renter : ${renter.email} on : ${rentedPeriod.fromDate}`,
        
      };
    
      try {
        await transporter.sendMail(mailOptions);
        console.log('Email notification sent successfully');
      } catch (error) {
        console.error('Error sending email notification:', error);
      }



      const productDetails = new rented ({
        productId:id,
        category: product.category,
        brand: product.brand,
        title: product.title,
        district: product.district,
        place:product.place,
        price:product.price,
        contact: product.contact,
        Renter:renter.email,
        images:product.images,
        RentedBy:loggedin,
        RentedPeriod:{
          fromDate:rentedPeriod.fromDate,
          toDate:rentedPeriod.toDate,
      },
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





  app.get(`/Rating/:id`, async (req, res) => {
    const { id } = req.params;
    try {
      const product = await products.findOne({ _id: id });
      // console.log(product)
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      // const renter=await collection.findOne({ email:product.Renter});
  
      //console.log(response)
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });




  app.post(`/Rating/:id`, async (req, res) => {
    try {
      const { id } = req.params;
      const { rating: currentRating } = req.body;
  
      const newRating = new rating({ 
        productId: id,
        Rating: currentRating,
      });
      await newRating.save();
  
      const productRatings = await rating.find({ productId: id });
      const ratingSum = productRatings.reduce((sum, rating) => sum + rating.Rating, 0);
      const averageRating = (ratingSum / productRatings.length).toFixed(1);
      
  
      await products.findByIdAndUpdate(id, { averageRating });
  
      res.json(newRating);
    } catch (error) {
      console.error('Error saving rating:', error);
      res.status(500).json({ error: 'Failed to save rating' });
    }
  });



  app.get('/Navbar', async (req, res) => {
    try {
      // Fetch top 4 products based on averageRating in descending order
      const topProducts = await products.find()
        .sort({ averageRating: -1 })
        .limit(4);
  
      res.json(topProducts);
    } catch (error) {
      console.error('Error fetching top products:', error);
      res.status(500).json({ error: 'Failed to fetch top products' });
    }
  });



  app.get(`/MyRental_detail/:id`, async (req, res) => {
    const { id } = req.params;
    try {
      const product = await products.findOne({ _id: id });
      console.log(id)
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      const renter=await collection.findOne({ email:product.Renter});
  // console.log(response)
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



  app.delete(`/MyRental_detail/:id`, async (req, res) => {
    const {id} = req.params;
    const {loggedin}=req.body;
    
    console.log(id)
    try {
      const rent=await rented.findOneAndDelete({ productId: id });
      
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'myrentarc@gmail.com',
          pass: 'wqjbrpzjophakbiw',
        },
      });
    
      const mailOptions = {
        from: 'myrentarc@gmail.com',
        to: loggedin,
        subject: 'Order cancelled',
        text: `Your Order has been cancelled : ${rent.brand} with product ID : ${id} is successful.\n\nTotal amount : ${rent.Amount}\nOrder ID : ${rent.paymentId}\nOrder Date : ${rent.paymentDate}\n\n Refund will be processed within 7 working days`,
        
      };
    
      try {
        await transporter.sendMail(mailOptions);
        console.log('Email notification sent successfully');
      } catch (error) {
        console.error('Error sending email notification:', error);
      }


      res.status(200).json('Product deleted successfully' );
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json('Failed to delete product' );
    }
  });

 

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'myrentarc@gmail.com',
      pass: 'wqjbrpzjophakbiw',
    },
  });
  
  const sendEmailNotification = async (email) => {
    const mailOptions = {
      from: 'myrentarc@gmail.com',
      to: email,
      subject: 'Account Deletion',
      text: `Your RentArc account has been deleted\nusername:${email} `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email notification sent successfully');
    } catch (error) {
      console.error('Error sending email notification:', error);
    }
  };
  
  app.delete('/AdminPortal', async (req, res) => {
    try {
      const { currentmail } = req.body;
  
      await collection.findOneAndDelete({ email: currentmail });
      const userEmailAddress = currentmail; // Replace with the user's email address
      await sendEmailNotification(userEmailAddress);
  
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });
  