import { BrowserRouter, Route,Routes } from "react-router-dom"
import UserLayout from "./components/Layout/UserLayout"
import Home from "./pages/Home"
import { Toaster } from "sonner"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import CollectionPage from "./pages/CollectionPage"
import ProductDetails from "./components/Product/ProductDetails"
import Checkout from "./components/Cart/Checkout"
import OrderConfirmationPage from "./pages/OrderConfirmationPage"
import OrderDetails from "./pages/OrderDetails"
import MyOrder from "./pages/MyOrder"
import AdminLayout from "./components/Admin/AdminLayout"
import AdminHomePage from "./pages/AdminHomePage"
import UserManagement from "./components/Admin/UserManagement"
import ProductManagementPage from "./components/Admin/ProductManagementPage"
import EditProductPage from "./components/Admin/EditProductPage"
import OrderMangementPage from "./components/Admin/OrderMangementPage"

import {Provider } from "react-redux"
import store from "./redux/store"
import Protected from "./components/Common/Protected"
function App() {
  return (
  <Provider store={store}>
    <BrowserRouter>
    <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* User Layout */}
        <Route path="/" element={<UserLayout/>}>
        {/* Home Page */}
        <Route index element={<Home/>} />
        {/*Login Page */}
        <Route path="login" element={<Login/>}/>
        {/* Register Page */}
        <Route path="register" element={<Register/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="collection/:collection" element={<CollectionPage/>}/>
        <Route path="product/:id" element={<ProductDetails/>} />
        <Route path="checkout" element={<Checkout/>} />
        <Route 
          path="order-confirmation"
          element={<OrderConfirmationPage/>}
          />
          <Route path="order/:id" element={<OrderDetails/>} />
          <Route path="my-orders" element={<MyOrder/>} />
        </Route>
        <Route path="/admin" element={<Protected role="admin"><AdminLayout/></Protected>}>
          <Route index element={<AdminHomePage/>}/>
          <Route path="users" element={<UserManagement/>} />
          <Route path="products" element={<ProductManagementPage/>} />
          <Route path="products/:id/edit" element={<EditProductPage/>}/>
          <Route path="orders" element={<OrderMangementPage/>}/>
        </Route>
      </Routes>   
    </BrowserRouter>
  </Provider>
  )
}

export default App
