import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { addProduct, deleteProduct, fetchAllProducts } from "../../redux/slices/adminProductSlice";
import axios from "axios";
const ProductManagementPage = () => {
    // const products =[
    //     {
    //         _id:1234,
    //         name:"Shirt",
    //         price:1111,
    //         sku:"12313210"
    //     },
    //     {
    //         _id:1234,
    //         name:"Shirt",
    //         price:1111,
    //         sku:"12313210"
    //     },
    //     {
    //         _id:1234,
    //         name:"Shirt",
    //         price:1111,
    //         sku:"12313210"
    //     },
    //     {
    //         _id:1234,
    //         name:"Shirt",
    //         price:1111,
    //         sku:"12313210"
    //     },
    //     {
    //         _id:1234,
    //         name:"Shirt",
    //         price:1111,
    //         sku:"12313210"
    //     },
    //     {
    //         _id:1234,
    //         name:"Shirt",
    //         price:1111,
    //         sku:"12313210"
    //     },
    // ]
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false)//image uploading state
  const { user } = useSelector((state) => state.auth);
  const { products, loading, error } = useSelector((state) => state.adminProducts);
  

  useEffect(()=>{
    if(user && user.role !== 'admin'){
      navigate('/')
    }else if (user && user.role === "admin") {
      dispatch(fetchAllProducts());
    }
  },[user,navigate,dispatch ])
    const [formData,setFormData] = useState({
      name: "",
      description: "",
      price: 0,
      discountPrice: 0,
      countStock: 0,
      sku: "",
      category: "Top Wear",
      brand: "",
      tags:[],
      sizes: [],
      colors: [],
      collections: "",
      material: "",
      gender: "Women",
      images: [],
    })

      const handleChange = (e)=>{
          setFormData({
              ...formData,
              [e.target.name]:e.target.value
          })
      }
      const handleSubmit = (e)=>{
          e.preventDefault()
          console.log(formData)
          dispatch(addProduct(formData))
        
          setFormData({
                  name: "",
                  description: "",
                  price: 0,
                  discountPrice: 0,
                  countInStock: 0,
                  sku: "",
                  category: "Top Wear",
                  brand: "",
                  sizes: [],
                  colors: [],
                  tags: [],
                  collections: "",
                  material: "",
                  gender: "Women",
                  images: [],
          })
      }

        const handleImageUpload = async (e)=>{
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append("image",file);

        try{
          setUploading(true);
          const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/api/upload`, formData,
            {
              headers:{"Content-Type": "multipart/formData"}
            }
          );
          setFormData((prevData)=>({
            ...prevData,
            images:[...prevData.images, {url: data.imageUrl, altText: "" }]
          }));
          setUploading(false)
        }catch(error){
            console.error(error)
            setUploading(false)
        }
  }
    const handleDelete = (productId)=>{
      console.log(productId)
        if(window.confirm("Are you sure to delete product")){
            dispatch(deleteProduct(productId))
        }
    }
  if(loading) return <p> Loading...</p>
  if(error) return <p>{error.message}</p>
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2  className="text-2xl font-bold mb-4"> Product Management</h2>
      {/*add new Products */}
        <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="block font-semibold p-6 shadow-md rounded-md">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold p-6 shadow-md rounded-md">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
            required
          />
        </div>

        {/* Price input */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          {/* discountPrice input */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Discount Price</label>
            <input
              type="number"
              name="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          

          {/* Count In stock */}
          <div className="mb-6">
            <label className="block font-semibold mb-2">count in Stock</label>
            <input
              type="number"
              name="countInStock"
              value={formData.countInStock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          {/*SKU */}
           <div className="mb-6">
            <label className="block font-semibold mb-2">SKU</label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          {/*Category */}
          <div className="mb-4">
                <label className="block text-gray-700" >Category</label>
                <select 
                name="category" 
                value={formData.category}
                 onChange={handleChange}
                 className="w-full p-2 border rounded"
                >
                <option value="Top Wear">Top Wear</option>
                <option value="Bottom Wear">Bottom Wear</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                </select>
            </div>
            {/*Brand */}
            <div className="mb-6">
          <label className="block font-semibold p-6 shadow-md rounded-md">
            Brand
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/*Material */}
            <div className="mb-6">
          <label className="block font-semibold p-6 shadow-md rounded-md">
            Material
          </label>
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
          {/*sizes */}
           <div className="mb-6">
            <label className="block font-semibold mb-2">Size(comma-separated)</label>
            <input
              type="text"
              name="sizes"
              value={formData.sizes.join(", ")}
              onChange={(e)=>setFormData({...formData,sizes:e.target.value.split(",").map((size)=>size.trim())})}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
           {/*tags */}
           <div className="mb-6">
            <label className="block font-semibold mb-2">tags(comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags.join(", ")}
              onChange={(e)=>setFormData({...formData,tags:e.target.value.split(",").map((tag)=>tag.trim())})}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          {/*colors */}
           <div className="mb-6">
            <label className="block font-semibold mb-2">Colors(comma-separated)</label>
            <input
              type="text"
              name="colors"
              value={formData.colors.join(", ")}
              onChange={(e)=>setFormData({...formData,colors:e.target.value.split(",").map((color)=>color.trim())})}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          {/*Collection */}
          <div className="mb-6">
          <label className="block font-semibold p-6 shadow-md rounded-md">
            Collection
          </label>
          <input
            type="text"
            name="collections"
            value={formData.collections}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/*Gender */}
        <div className="mb-4">
                <label className="block text-gray-700" >Gender</label>
                <select 
                name="gender" 
                value={formData.gender}
                 onChange={handleChange}
                 className="w-full p-2 border rounded"
                >
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                </select>
        </div>
          {/* Image Upload */}
          <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          <div className="flex gap-4 mt-4 flex-wrap">
          {/* Show existing images */}
          {formData.images.map((image, index) => (
            <div key={index}>
              <img
                src={image.url}
                alt={image.altText || "Product Image"}
                className="w-20 h-20 object-cover rounded-md shadow-md"
              />
            </div>
          ))}

    {/* Show spinner only when uploading */}
    {uploading && (
      <div className="w-20 h-20 flex items-center justify-center border rounded-md bg-gray-100">
        <span className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
      </div>
    )}
  </div>
</div>
          <button
  type="submit"
  className={`w-full py-2 rounded-md transition-colors 
              ${uploading ? "bg-gray-400 cursor-not-allowed text-white" : "bg-green-500 hover:bg-green-600 text-white"}`}
  disabled={uploading}
>
  Add Product
</button>

      </form>
    </div>



       {/*Add new user form */}
      {/* <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Add New Product</h3>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700" >Name </label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  className="w-full p-2 border rounded" />
            </div>
             <div className="mb-4">
                <label className="block text-gray-700" >Email </label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  className="w-full p-2 border rounded" />
            </div>
             <div className="mb-4">
                <label className="block text-gray-700 "  >Password </label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange}
                  className="w-full p-2 border rounded" />
            </div>
             
             <button 
                  type="submit" 
                  className=" text-white p-2 border rounded bg-green-500 hover:bg-green-600" >Add User</button> 
        </form> 
        </div>*/}


      {/*Products List */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
        <thead className=" bg-gray-100 text-xs uppercase text-gray-700">
        <tr>
            <th className="py-3 px-4 ">Name</th>
            <th className="py-3 px-4 ">Price</th>
            <th className="py-3 px-4 ">SKU</th>
            <th className="py-3 px-4 ">Action</th>
        </tr>
        </thead>
        <tbody className="">
            {products.length>0 ?
            (products.map((product)=>(
                <tr key={product._id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                >
                    <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                        {product.name}
                    </td>
                    <td className="p-4 ">
                        ${product.price}
                    </td>
                    <td className="p-4 ">
                        {product.sku}
                    </td>
                    <td className="p-4">
                        <Link to={`/admin/products/${product._id}/edit`}
                        className=" bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600 ">
                        Edit
                        </Link>
                        <button onClick={()=>handleDelete(product._id)} className=" bg-red-500 text-white px-2 py-0.5 rounded hover:bg-red-600">Delete</button>
                    </td>

                </tr>
            ))):(
                    <tr>
                        <td>No order Found</td>
                    </tr>
            )}
        </tbody>
        </table>
      </div>
       
    </div>
  )
}

export default ProductManagementPage
