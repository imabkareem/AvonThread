const express = require('express');
const multer = require('multer');

const cloudinary = require('cloudinary').v2;

const streamifier = require('streamifier');

require("dotenv").config();

const router = express.Router();

//Cloudinary Configration

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//Multer setup using memory

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
    try{
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        // Create a stream to upload the file to Cloudinary
        const streamUpload = (fileBuffer)=>{
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error,result)=>{
                    if(result){
                        resolve(result);
                    }else{
                        reject(error)
                    }
                })
                // Use streamifier to convert the buffer to a stream
                streamifier.createReadStream(fileBuffer).pipe(stream)
            })
        }
        //Call the StreamUpload funtion
        const result =await streamUpload(req.file.buffer);

        //Resonse with the uploaded image URL
        res.json({
            message: 'Image uploaded successfully',
            imageUrl: result.secure_url,
        });
    }catch (error) {
        console.error('Error uploading image:', error);
        return res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
})

module.exports = router;