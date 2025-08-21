const express = require('express');
const Order = require('../models/Order');
const { auth } = require('../middleware/authMiddleware');
const router = express.Router();

//@rote   GET /api/orders/my-orders
// @desc   Get all orders for the authenticated user
// @access Private

router.get('/my-orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
      
        res.status(500).json({ message: error.message });
    }
})

//route GET /api/orders/:id
// @desc Get order by ID
// @access Private

router.get('/:id', auth, async (req, res) => {
    const orderId = req.params.id;

    try {
        const order = await Order.findById(orderId).populate('user', 'name email');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;