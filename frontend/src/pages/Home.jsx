import Hero from "../components/Layout/Hero"
import GenderCollectionSection from "../components/Product/GenderCollectionSection"
import NewArrivals from "../components/Product/NewArrivals"
import ProductDetails from "../components/Product/ProductDetails"
import ProductGrid from "../components/Product/ProductGrid"
import FeatureCollection from "../components/Product/FeatureCollection"
import FeaturedSection from "../components/Product/FeaturedSection"
import {useDispatch, useSelector} from "react-redux"
import { useEffect,useState } from "react"
import { fetchProductsByFilters } from "../redux/slices/productSlice"
import axios from "axios"

const Home = () => {
  const dispatch = useDispatch()
  const {products, loading, error} = useSelector((state) => state.products)
  const [bestSellerProduct, setBestSellerProduct] = useState(null)
  
  useEffect(()=>{
    // Fetch product for a specific collection
    dispatch( fetchProductsByFilters({
      gender:"Women",
      category:"Bottom Wear",
      limit:"8"
    })
  )
    //Fetch best seller product
    const fetchBestSeller = async()=>{
      try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/products/best-seller`)
        setBestSellerProduct(response.data)
      }catch(error){
        console.error(error)
      }
    }
    fetchBestSeller()
  },[dispatch])
  return (
    <div>
      <Hero />
      <GenderCollectionSection/>
      <NewArrivals />
      <h2 className="text-center text-3xl font-bold mb-4">
        Best Sellers
      </h2>
      {bestSellerProduct? (<ProductDetails productId={bestSellerProduct._id} />):(
        <div className="text-center text-lg font-bold text-gray-500">Loading Best Sellers Prduct ....</div>
      )}
      <div className="container mx-auto">
        <h2 className="text-center text-3xl font-bold mb-4"> Top Wears for Women</h2>
        
        <ProductGrid products={products} loading={loading} error={error}/>
      </div>
      <FeatureCollection />
      <FeaturedSection />
    </div>
  )
}

export default Home
