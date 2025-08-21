const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const products = require('./data/products');
const Cart = require('./models/Cart');


dotenv.config();

//Connet to mongoose
mongoose.connect(process.env.MONGO_URI)

//Function to seed data
const seedData = async()=>{
    try{
        //Clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        // create a default admin user
        const createdUser=await User.create({
            name: 'Admin',
            email: 'admin@example.com',
            password: 'password',
            role: 'admin',
        });
        const userID= createdUser._id

        const sampleProducts = products.map((product) => {
            return {...product,user:userID}
            });

            //insert the product in the the database
            await Product.insertMany(sampleProducts);
            console.log('Data seeded successfully');
            process.exit()

    } catch(err){
        console.log("Eror seeding the data ",err)
        process.exit(1)
        }

}
seedData()