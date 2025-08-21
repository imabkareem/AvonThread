const express = require('express');
const Product = require('../models/Product');
const {auth,admin} = require('../middleware/authMiddleware');


const router = express.Router();

/**
 * @desc   Create a new product
 * @route  POST /api/products
 * @access Private
 */
router.post('/', auth,admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      material,
      sizes,
      colors,
      collections,
      images,
      gender,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      material,
      sizes,
      colors,
      collections,
      images,
      gender,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id, // reference to user who created this
    });

    const createdProduct = await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product: createdProduct,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'Error creating product',
      error: e.message || e,
    });
  }
});


//@rout PUT/api/products/:id
//@desc Update an existing product using id
//@access Private/Admin 

router.put("/:id",auth,admin,async(req,res)=>{
  try {
    const  {name, description, price, discountPrice, countInStock, category, brand,
      material, sizes, colors, collections, images, gender, isFeatured, isPublished, tags,
      dimensions, weight, sku } = req.body;
      const updateFields = {name, description, price, discountPrice, countInStock, category, brand,
      material, sizes, colors, collections, images, gender, isFeatured, isPublished, tags,
      dimensions, weight, sku }
      const product = await Product.findByIdAndUpdate(req.params.id, updateFields, {
        new: true,
        runValidators:true
        });
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
          }
          res.status(200).json({ message: 'Product updated successfully', product });
          } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Error updating product', error: e.message ||
              e });
              }
})

//@route DELETE/api/products/:id
//@desc Delete a product by ID
//@access Private/Admin

router.delete("/:id",auth,admin,async(req,res)=>{
  try{
    const product = await Product.findByIdAndDelete(req.params.id);
    console.log(product)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
    } catch (e) {
        // console.error(e);
        res.status(500).json({ message: 'Error deleting product', error: e.message ||e 
        
      });
  }
})

//@route GET/api/products
//@desc Get all products and shorting  products
//@access Public

router.get("/",async(req,res)=>{
     try{
      const {collection,size,color,gender,minPrice,maxPrice,sortBy,search,category,material,brand,limit}=req.query
      let query = {};
      if (collection && collection.toLocaleLowerCase() !== 'all') {
        query.collections = collection;
     }
     if (category && category.toLocaleLowerCase() !== 'all') {
        query.category = category;
     }
     if(material){
      query.material = {$in: material.split(",")};
     }
      if(brand){
      query.brand = {$in: brand.split(",")};
     }
      if(size){
      query.sizes = {$in: size.split(",")};
     }
      if(color){
      query.colors = {$in: color.split(",")};
     }
     if(gender){
      query.gender = gender;
     }
     if(minPrice || maxPrice){
      query.price={}
      if(minPrice) query.price.$gte=Number(minPrice)
      if(maxPrice) query.price.$lte=Number(maxPrice)
     }
     if(search){
      query.$or=[
        {name:{$regex:search,$options:"i"} },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } }
      ]
      }

      //Sort Logic
      let sort = {}
      if(sortBy){
        switch(sortBy){
          case "priceAsc":
            sort = {price:1};
            break;
          case "priceDesc":
            sort = {price:-1};
            break;
          case "popularity":
            sort = {rating:-1};
            break;
          default:
             break;
        }
      }

      //fetch the product and apply sorting and limit

      let products = await Product.find(query)?.sort(sort)?.limit(Number(limit) || 0);
      res.json(products);

    }catch(e){
      console.error(e);
      res.status(500).json({message: 'Internal Server Error'});
     }
})
//@route GET /api/products/best-seller
//@desc Retrieve the product with highest rating
//@access Public
router.get("/best-seller", async (req, res) => {
  try {
     const bestSeller = await Product.findOne().sort({rating:-1})
     if(bestSeller){
      res.json(bestSeller);
      }else{
        res.status(404).json({message: 'No  best Seller found'});
        }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//@route GET/api/products/new-arrivals
//@desc Retrieve the new products
//@access Public
router.get("/new-arrivals", async (req, res) => {
  try {
    const newProducts = await Product.find().sort({createdAt:-1}).limit(8);
    res.json(newProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
      



//@route GET/api/products/:id
//@desc Get a single product by id
//@access Public

router.get("/:id",async(req,res)=>{
  try{
    let product = await Product.findById(req.params.id);
    if(!product) return res.status(404).json({message: 'Product not found'})
      res.json(product);
      }catch(e){
        console.error(e);
        res.status(500).json({message: 'Internal Server Error'})
        }
})


//@route GET /api/products/similar/:id
//@desc Get similar products by id
//@access Public

router.get("/similar/:id",async(req,res)=>{
  const {id}=req.params
  try{
    let product = await Product.findById(id);
    if(!product) return res.status(404).json({message: 'Product not found'})
      let similarProducts = await Product.find({category:product.category, _id:{$ne:id
    },gender:product.gender }).limit(4);//exculde the product itself and get similar products
    res.json(similarProducts);
    }catch(e){
      console.error(e);
      res.status(500).json({message: 'Internal Server Error'})
      }
})




module.exports = router;
