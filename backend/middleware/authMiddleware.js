const jwt = require('jsonwebtoken');
const  User  = require('../models/User');

//Middleware to auth routes

const auth = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)//token :from imported JWT package  and jwt variable
            req.user = await User.findById(decoded.user.id).select("-password") //Exclude Password
            next()
        }catch(error){
            console.error("Token verification failed")
            res.status(401).json({message:"Not autorized ,token failed"})
        }
    } else{
        res.status(401).json({message:"Not autorized ,token failed"})
    }
}

//middleware to cheack user is admin

const admin = async (req, res, next) => {
    if(req.user && req.user.role ==="admin"){
        next()
    } 
    else{
        res.status(401).json({message:"Not autorized ,you are not admin"})
    }
}
           
module.exports = {auth,admin};