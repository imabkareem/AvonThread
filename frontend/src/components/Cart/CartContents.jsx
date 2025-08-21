import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeItemFromCart,updateItemQuantityInCart } from "../../redux/slices/cartSlice";
const CartContents = ({ cart, userId, guestId }) => {
    const dispatch= useDispatch()

    const handleAddtoCart=(productId,delta,quantity,size,color)=>{
        const newQuantity = quantity + delta;
        if(newQuantity >= 1 ){
            dispatch(updateItemQuantityInCart({guestId,userId,productId,quantity:newQuantity,size,color}))
        }
    }
    const handleRemoveFromCart = (productId,size,color) => {
        dispatch(removeItemFromCart({userId, guestId, productId,size,color}))
    }   
    
  return (
    <div>
       {cart.products.map((product,index) => (
        <div
            key={index}
            className="flex items-start justify-between p-4 border-b">
            <div className="flex items-start">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-24 object-cover mr-4 rounded" 

                />
                <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">
                        size: {product.size} | color: {product.color}
                    </p>
                    <div className="flex items-center mt-2">
                        <button
                         onClick={()=>handleAddtoCart(product.productId,-1,product.quantity,product.size,product.color)}
                         className="border rounded px-2 py-1 text-xl font-medium" >
                            -
                        </button>
                        <span className="mx-2 text-lg font-semibold">{product.quantity}</span>
                        <button onClick={()=>handleAddtoCart(product.productId,1,product.quantity,product.size,product.color)}
                         className="border rounded px-2 py-1 text-xl font-medium" >
                            +
                        </button>

                    </div>
                    
                </div>
                            
            </div>
            <div>
                <p  className="whitespace-nowrap text-base font-medium" >$ {product.price.toLocaleString()}</p>
                <button
                onClick={()=>handleRemoveFromCart(product.productId,product.size,product.color)}>
                    <RiDeleteBin6Line className=" w-6 h-6 mt-2 text-red-500 text-2xl hover:text-red-700" />
                </button>
            </div>
        </div>
       ))}
    </div>
  )
}

export default CartContents
