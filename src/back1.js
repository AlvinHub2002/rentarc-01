const express = require('express');
const products = require("./productModel");
const cloudinary = require('./cloudinary');
const cors = require("cors");



const app = express();
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ limit :'100mb',extended: true }));
app.use(cors());

app.listen(3000, () => {
  console.log("Port connected");
});

app.get("/", cors(), (req, res) => {});

app.post('/', async (req, res) => {
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
