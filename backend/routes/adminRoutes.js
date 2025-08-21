const express = require('express');
const User = require('../models/User');
const { auth, admin } = require('../middleware/authMiddleware');

const router = express.Router();

//@route GET /api/admin/users
//@desc Get all users (Admin only)
//@access Private/Admin
router.get("/", auth, admin, async (req, res) => {
  try {
    const users = await User.find({}).select("-password"); // Exclude password field
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//@route POST /api/admin/users
//@desc Create a new user (Admin only)
//@access Private/Admin
router.post("/", auth, admin, async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = new User({
      name,
      email,
      password,
      role:role || 'customer' // Default role is 'user'
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//@route PUT/api/admin/users/:id
//@desc Update a user (Admin only)
//@access Private/Admin
router.put("/:id",auth,admin,async(req,res)=>{
  try{
    const user = await User.findById(req.params.id);
    if(user){
      user.name=req.body.name || user.name
      user.email=req.body.email || user.email
      user.role =req.body.role || user.role
    }
    await user.save()
    res.json(user)
  }catch(error){
    console.error()
    res.status(500).json({ message: "Server Error" });
  }
})

//@route DELETE /api/admin/users/:id
//@desc Delete a user (Admin only)
//@access Private/Admin
router.delete("/:id", auth, admin, async(req, res) => {
  try {
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === 'customer') {
      return res.status(403).json({ message: "Cannot delete customers" });
    }
    await user.deleteOne();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;