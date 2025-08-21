const express = require('express');
const mongoose = require('mongoose');
const Checkout = require("../models/Checkout")
const Cart = require("../models/Cart")
//const Product = require("../models/Product")
const Order = require("../models/Order")

const {auth} = require("../middleware/authMiddleware");

const router = express.Router();

// @desc    Create a new checkout
// @route   POST /api/checkout
// @access  Private
router.post('/', auth, async (req, res) => {

    const { checkoutItems, shippingAddress,paymentMethod,totalPrice } = req.body;

        
    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(404).json({ message: 'Cart not found' });
    }
    try {
        // Create a new checkout
        const newCheckout = new Checkout({
            user: req.user._id,
            shippingAddress,
            totalPrice,
            paymentMethod,
            paymentStatus: 'pending',
            checkoutItems:checkoutItems,
            isPaid: false,
            
        });
        // Save the checkout to the database
         await newCheckout.save();
        res.status(201).json(newCheckout);
       
    } catch (error) {
        console.error("Error creating checkout:", error);
        res.status(500).json({ message: error.message });
    }
});


//@route  GET /api/checkout/:id/pay
// @desc   Update checkout payment status
// @access Private
router.put('/:id/pay', auth, async (req, res) => {
    const checkoutId = req.params.id;
    const {paymentStatus,paymentDetails} = req.body;

    try {
        // Find the checkout by ID
        const checkout = await Checkout.findById(checkoutId);
        if (!checkout) {
            return res.status(404).json({ message: 'Checkout not found' });
        }
        if(paymentStatus === 'paid') {
            checkout.isPaid = true;
            checkout.paidAt = Date.now();
            checkout.paymentDetails = paymentDetails; // Store payment details
            checkout.paymentStatus = paymentStatus;
            await checkout.save();
            res.status(200).json(checkout);
        }else{
            res.status(200).json({message:"Invalid payment Status"})
        }
        
    } catch (error) {
        console.error("Error updating payment status:", error);
        res.status(500).json({ message: error.message });
    }
});

//@route PUT/api/checkout/:id/finalize
// @desc   Finalize checkout and create an order
// @access Private
router.post('/:id/finalize', auth, async (req, res) => {
    
    try {
        const checkout= await Checkout.findById(req.params.id);
        if (!checkout) {
            return res.status(404).json({ message: 'Checkout not found' });
        }
        if (checkout.isPaid && !checkout.isfinalized) {
            //Create final order based on checkout details
          
            const finalOrder = await Order.create({
                user: checkout.user,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                orderItems: checkout.checkoutItems,
                isPaid:true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus:"paid",
                paymentDetails:checkout.paymentDetails
            });

            // Mark the checkout as finalized
            checkout.isfinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();
            
            //delete the cart associated with the user
            await Cart.findOneAndDelete({ user: checkout.user })
            res.status(201).json(finalOrder);
        }else if(checkout.isfinalized) {
            res.status(400).json({ message: 'Checkout is already finalized' });
        }else {
            res.status(400).json({ message: 'Checkout is not paid yet' });
        }
    } catch (error) {
        console.error("Error finalizing checkout:", error);
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;