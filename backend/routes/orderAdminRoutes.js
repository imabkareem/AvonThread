const express = require('express');
const { auth, admin } = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const router = express.Router();

// @route GET /api/admin/orders
// @desc Get all orders (Admin only)
// @access Private/Admin
router.get('/', auth, admin, async (req, res) => {
   
    try {
        const orders = await Order.find({}).populate("user","name email"); // Populate user details
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

//@route PUT/api/admin/orders/:id
//@desc Update an order status (Admin only)
//@access Private/Admin

router.put("/:id",auth,admin,async(req,res)=>{
    try{
        const order = await Order.findById(req.params.id).populate("user","name");
        if(order){
            order.status = req.body.status || order.status; // Update status
            order.isDelivered = 
                req.body.status === "delivered" ? true : order.isDelivered; // Update delivery status
          
            order.deliveredAt = req.body.status === "delivered" ? new Date() : order.deliveredAt; // Set delivery date if delivered
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({message:"Order not found"});
        }
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }  
})

// @route DELETE /api/admin/orders/:id
// @desc Delete an order (Admin only)
// @access Private/Admin
router.delete("/:id", auth, admin, async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (order) {
            res.json({ message: "Order deleted successfully" });
        }
        else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;