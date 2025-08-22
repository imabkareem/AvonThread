const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const  userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const checkoutRoutes = require("./routes/checkoutRoutes")
const orderRoutes = require("./routes/orderRoutes")
const uploadRoutes = require("./routes/uploadRoutes")
const subscriberRoutes = require("./routes/subscriberRoutes")
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const orderAdminRoutes = require("./routes/orderAdminRoutes");

const app = express();
app.use(express.json())
app.use(cors())

dotenv.config()
 const PORT = process.env.PORT || 9000;

 //connect  mongo db database
 connectDB()
app.get("/",(req,res)=>{
    res.send("Welcome to AvonThread!")
})

//API user ROUTES
app.use("/api/users",userRoutes)

//API Product Routes
app.use("/api/products",productRoutes)

//API cart Routes
app.use("/api/cart",cartRoutes)

//API checkout Routes
app.use("/api/checkout",checkoutRoutes)

//API order Routes
app.use("/api/orders",orderRoutes)

//API upload Routes
app.use("/api/upload", uploadRoutes);

//API subscriber Routes
app.use("/api", subscriberRoutes);

//API admin Routes
app.use("/api/admin/users", adminRoutes);

//API product admin Routes
app.use("/api/admin/products", productAdminRoutes);

//API order admin Routes
app.use("/api/admin/orders", orderAdminRoutes);

const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "/client/dist")));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname1, "client", "dist", "index.html"))
);

app.listen(process.env.PORT,()=>{
     console.log(`Server is running on: http://localhost:${PORT}`);
})


