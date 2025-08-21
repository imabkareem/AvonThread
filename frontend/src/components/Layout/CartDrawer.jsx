
import { IoMdClose } from "react-icons/io"
import CartContents from "../Cart/CartContents"
import { useNavigate } from "react-router-dom"
import {useSelector } from "react-redux"

const CartDrawer = ({drawerOpen,toggleCartDrawer}) => {
  const navigate = useNavigate()
  const {cart} = useSelector((state) => state.cart)
  const {user,guestId}=useSelector(state=>state.auth)
  const userId = user ? user._id : null;
 
  const handleCheckout =()=>{
    toggleCartDrawer()
    if(!user){
      navigate("/login?redirect=checkout")
    }else{
      navigate("/checkout")
    }
  }
    
  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg  transform transition-transorm duration-300 flex flex-col z-50 ${drawerOpen? "translate-x-0": "translate-x-full"}`}>
    {/*close buttun cart*/}
        <div className="flex justify-end p-4">
            <button onClick={toggleCartDrawer}>
                <IoMdClose className="h-6 w-6 text-gray-600" />
            </button>
        </div>
        {/*cart content*/}
        <div className="flex-grow p-4 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
            {/* Cart items will go here */}
            {cart && cart?.products?.length>0?(<CartContents cart={cart} userId={userId} guestId={guestId} />):(<p>Your Cart is empty</p>)}
        </div>
        {/*cart footer*/}
        <div className="p-4 bg-white border-0 sticky">
        {cart && cart?.products?.length>0 && (
          <>
            <button onClick={handleCheckout} className="w-full bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 transition-colors">
            Checkout
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Shipping and taxes calculated at checkout.
          </p>
          </>
        )}
          
        </div>
    </div>
  )
}
export default CartDrawer
