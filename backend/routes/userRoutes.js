const express = require('express');
const User = require('../models/User');
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs');
const {auth,admin} = require('../middleware/authMiddleware');

const router = express.Router();

//@rout POST/api/users/register
//@desc Register a new user
//@access Public
router.post("/register",async (req,res)=>{
    const {name,email,password} = req.body;
   try{
    //Registeration Logic
    let user = await User.findOne({email:email.toLowerCase()});
    if(user){
        return res.json({message:"Email already exists"})
    }
    user = new User({name,email,password});
    await user.save();

    //Create JWT Payload
    const payload = { user:{id:user._id,role:user.role}}

    //Sign and return token along with user data 

    jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"40h"},(err,token)=>
    { if (err) throw err;

      //Send the user and token reponse
      res.status(201).json({
        user:{
          id:user._id,
          name:user.name,
          email:user.email,
          role:user.role
        },
        token,
      })
    })
   } catch(e){
     console.error("Error in register Api :",e)
     res.status(500).send("Server Error")
   }
})

//@route POST/api/users//login
//@desc Login a user
//@access Public

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email
    const user = await User.findOne({ email:email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // 2. Compare password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // 3. Create JWT payload
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    // 4. Sign JWT token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        // 5. Send user and token
        res.status(200).json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (e) {
    res.status(500).send("Server Error");
  }
});


//@route GET/api/users/profile
//@des Get user profile
//@acces private
router.get("/profile",auth, admin , async (req, res) => {
  res.json(req.user);
});


module.exports = router;
