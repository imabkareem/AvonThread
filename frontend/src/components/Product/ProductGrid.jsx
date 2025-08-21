
import { Link } from 'react-router-dom';
const ProductGrid = ({products,loading,error}) => {
  if(loading){
    return <div>Loading...</div>;
  }
  if(error){
    return <div>Error... {error}</div>;
  }
  return (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {products.map((item) => (
    <Link key={item._id} to={`/product/${item._id}`} className="block">
      <div className="bg-white p-4 rounded-lg hover:shadow-lg transition">
        <div className="w-full h-[500px] mb-4 overflow-hidden rounded-lg">
          {item.images?.[0]?.url ? (
            <img 
              src={item.images[0].url} 
              alt={item.images[0].alt || item.name} 
              className="w-full h-full object-cover" 
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}
        </div>
        <h3 className='text-sm mb-2'>{item.name}</h3>
        <p className='text-sm tracking-tighter font-medium mb-2 text-gray-500'>
          ${item.price.toFixed(2)}
        </p>
      </div>
    </Link>
  ))}
</div>

  )
}

export default ProductGrid
