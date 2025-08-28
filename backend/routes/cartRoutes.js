const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const {auth}=require('../middleware/authMiddleware');

const router = express.Router();

//helper funtion to get userid or guest id

const getCart = async (userId,guestId)=>{
    if(userId){
        return await Cart.findOne({user:userId})
    }
    else if(guestId){
        
        return  await Cart.findOne({guestId:guestId})
       
    }
    return null;
}
//@route POST/api/cart
//@desc Add item to cart
//@access Public

router.post('/', async (req, res) => {
   
    const {productId,quantity,size,color,guestId, userId}=req.body;
    try{
        const product=await Product.findById(productId)
        if(!product){
            return res.status(404).json({msg:'Prroduct not found'})
        }
        // Determine if user or guest
            let cart=await getCart(userId,guestId)
            // If the cart exists, update it
            console.log(userId)
            if (cart) {
                const productIndex = cart.products.findIndex(
                (p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color  
            );
           
            if (productIndex > -1) {
                // If the product already exists, update the quantity
                cart.products[productIndex].quantity += quantity
            }
            else{
                //add new products
                cart.products.push({
                    productId,
                    name:product.name,
                    price:product.price,
                    image:product.images[0].url,
                    size,
                    color,
                    quantity,
                })
            }

        //total price
        cart.totalPrice=cart.products.reduce((acc,product)=>acc+product.price*product.quantity,
        0)
        await cart.save()
        return res.status(200).json(cart)
        }else{
            // If the cart does not exist, create it
            const newCart = await Cart.create({
                user:userId?userId:undefined,
                guestId:guestId?guestId:"guest_"+new Date().getTime(),
                products: [
                    {
                        productId,
                        name:product.name,
                        price:product.price,
                        image:product.images[0].url,
                        size,
                        color,
                        quantity,
                    },
                ],
                totalPrice:product.price*quantity,
            });
            return res.status(201).json(newCart)
        }
    }catch(err){
        console.error(err)
        res.status(500).json({msg:'Error adding item to cart'})
    }

})


// @route PUT/api/cart
// @desc Update product quantity in cart
// @access Public

router.put("/", async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;


  try {
    let cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    

    const productIndex = cart.products.findIndex((p) => 
        p.productId.toString() === productId.toString() && 
        p.size === size && 
        p.color === color
    );
    
    if(productIndex > -1){
        //update the quantity 
        if(quantity > 0 ){
            cart.products[productIndex].quantity = quantity
        }else{
            cart.products.splice(productIndex, 1)
        }
    cart.totalPrice=cart.products.reduce((acc,item)=> acc+item.price * item.quantity,0)
    await cart.save();
    return res.status(200).json(cart);
    } else{
        return res.status(404).json({ message: "Product not found in cart" });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product quantity in cart" });
  }
});

//@route DELETE/api/cart
//@desc delete product from the cart
//@access Public



router.delete("/", async (req, res) => {
  const { productId, size, color, guestId, userId } = req.body;
  try {
    let cart = await getCart(userId, guestId);

    if (!cart) return res.status(404).json({ message: "cart not found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId.toString() && //p.productId.toString {this is from db cart collection }and productId that we are sending to match
        p.size === size &&
        p.color === color
    );
   if (productIndex > -1) {
        cart.products.splice(productIndex, 1);
        cart.totalPrice = cart.products.reduce(
            (acc,items)=>acc +items.price*items.quantity,0
        )
        await cart.save();
        return res.status(200).json({ cart });
        } else {
        return res.status(404).json({ message: "Product not found in cart" });
    }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});

//@route GET/api/cart
//@desc display data of cart 
//@access Public
router.get("/", async (req, res) => {
  const { userId, guestId } = req.query;
  console.log(userId)

  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
        console.log(cart)
      res.json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route POST /api/cart/merge
// @desc Merge guest cart into user cart on login
// @access Private
router.post("/merge", auth, async (req, res) => {
  const { guestId } = req.body;
  console.log("local Storage Value of user after login",req.user._id)
  try {
    // Find the guest cart and user cart
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });
    
  if (guestCart) {
    if (guestCart.products.length === 0) {
      return res.status(400).json({ message: "Guest cart is empty" });
    }
  if(userCart) {
    // Merge guest cart into user cart
    guestCart.products.forEach((guestItem) => {
      const productIndex = userCart.products.findIndex(
        (item) =>
          item.productId.toString() === guestItem.productId.toString() &&
          item.size === guestItem.size &&
          item.color === guestItem.color
      );
      if (productIndex > -1) {
        // Item exists: update quantity
        userCart.products[productIndex].quantity += guestItem.quantity;
      } else {
        // Item does not exist: push it
        userCart.products.push(guestItem);
      }
    });
    userCart.totalPrice = userCart.products.reduce((acc,item)=>acc+item.price*item.quantity,0)
    await userCart.save(); 
    console.log("Saved User Cart :",userCart);
    //remove the guest cart after merging
    try {
      await Cart.deleteOne({ _id: guestCart._id });
    } catch (deleteError) {
        console.error("Error deleting guest cart:", deleteError);
        return res.status(500).json({ message: "Failed to delete guest cart after merge" });
      } 
  res.json(userCart)
  await userCart.save(); 
}else{
    // if the user not existing cart
    guestCart.user=req.user._id;
    guestCart.guestId=undefined
    await guestCart.save();
    res.status(200).json(guestCart)
}

}else{
    if(userCart){
        //Guest Cart already Merge return user cart
        return res.status(200).json(userCart)
    }
    res.status(404).json({message:"Guest card not found"})
}
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Server Error"})
  }
});

module.exports = router;
