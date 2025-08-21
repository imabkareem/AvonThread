import { Link } from "react-router-dom"
import featureImage from "../../assets/featured.webp" 

const FeatureCollection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
    <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl">
        {/* Left Section */}
        <div className="lg:w-1/2 p-8 lg:text-left">
            <h2 className="text-lg font-semibold mb-2 text-gray-700">
            Comfort and style
            </h2>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Discover Our Feature Collection 
            </h2>
            <p className="text-gray-600 mb-6">
              Explore our curated selection of premium products designed to elevate your lifestyle. 
              From fashion to home essentials, find the perfect items that blend quality and style.
            </p>
            <Link to="/collection/all"  className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition duration-300">
              Shop Now
            </Link>
        </div>
        {/* Right Section */}
        <div className="lg:w-1/2">
            <img 
              src={featureImage}
                alt="Feature Collection"
                className="w-full h-full object-cover rounded-3xl lg:rounded-l-none lg:rounded-r-3xl"
            />
        </div>
    </div>

    </section>
  )
}

export default FeatureCollection
