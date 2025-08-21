const express = require('express');
const Subscriber = require('../models/Subscriber')
const router = express.Router();

//@routes POST /api/subscribe
//@desc HAndle  newsletter subscription
//@access Public
router.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    try {
        // Check if the email already exists
        let subscriber = await Subscriber.findOne({ email });
        if(subscriber) {
            return res.status(400).json({ error: 'Email already subscribed' });
        }
        // Create a new subscriber
        subscriber = new Subscriber({ email });
        await subscriber.save();
        res.status(201).json({ message: 'You have been subscribed to our newsletter' });

    }catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
})

module.exports = router;