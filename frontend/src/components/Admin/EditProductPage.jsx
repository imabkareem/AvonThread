import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../../redux/slices/adminProductSlice";
import { fetchProductDetails } from "../../redux/slices/productSlice";
import axios from "axios";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error} = useSelector((state)=>state.products)


  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });
  const [uploading, setUploading] = useState(false)//image uploading state
  useEffect(()=>{
    if(id){
      dispatch(fetchProductDetails(id))
    }
  },[dispatch,id])
  useEffect(()=>{
    if(selectedProduct){
      setProductData(selectedProduct)
    }
  },[selectedProduct])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };
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
          setProductData((prevData)=>({
            ...prevData,
            images:[...prevData.images, {url: data.imageUrl, altText: "" }]
          }));
          setUploading(false)
        }catch(error){
            console.error(error)
            setUploading(false)
        }
  }
  const handleUpdateSubmit = (e)=>{
    e.preventDefault()
    dispatch(updateProduct({id,productData}))
    navigate("/admin/products")
  }

  if(loading) return <p>Loading...  </p>
  if(error) return <p> Error: {error}</p>
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleUpdateSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="block font-semibold p-6 shadow-md rounded-md">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
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
            value={productData.description}
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
              value={productData.price}
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
              value={productData.countInStock}
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
              value={productData.sku}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          {/*sizes */}
           <div className="mb-6">
            <label className="block font-semibold mb-2">Size(comma-separated)</label>
            <input
              type="text"
              name="sizes"
              value={productData.sizes.join(", ")}
              onChange={(e)=>setProductData({...productData,sizes:e.target.value.split(",").map((size)=>size.trim())})}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          {/*colors */}
           <div className="mb-6">
            <label className="block font-semibold mb-2">Colors(comma-separated)</label>
            <input
              type="text"
              name="colors"
              value={productData.colors.join(", ")}
              onChange={(e)=>setProductData({...productData,colors:e.target.value.split(",").map((color)=>color.trim())})}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          {/* Image Upload */}
<div className="mb-6">
  <label className="block font-semibold mb-2">Upload Image</label>
  <input type="file" onChange={handleImageUpload} />

  <div className="flex gap-4 mt-4 flex-wrap">
    {/* Show existing images */}
    {productData.images.map((image, index) => (
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
  Update Product
</button>

      </form>
    </div>
  );
};

export default EditProductPage;
