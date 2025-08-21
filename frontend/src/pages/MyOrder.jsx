import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../redux/slices/orderSlice";
import { useDispatch, useSelector } from 'react-redux'
const MyOrder = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {orders , loading, error} = useSelector((state)=>state.orders)
    

    const handleClickedRow =(orderId)=>{  
        navigate(`/order/${orderId}`)
    }
    
    useEffect(()=>{
        dispatch(fetchOrders())
    },[dispatch])

  
    if(loading) return <p>Loading... </p>
    if(error) return <p>Error: {error}</p>  
  
      
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>
        <div className="realative shadow-md sm;rounded-lg overflow-hidden">
            <table className="min-w-full text-left text-gray-500">
                <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                <tr>
                    <th className="py-2 px-4 sm:py-3">Image</th>
                    <th className="py-2 px-4 sm:py-3">OrderId</th>
                    <th className="py-2 px-4 sm:py-3">Created</th>
                    <th className="py-2 px-4 sm:py-3">Shipping Address</th>
                    <th className="py-2 px-4 sm:py-3">Item</th>
                    <th className="py-2 px-4 sm:py-3">Price</th>
                    <th className="py-2 px-4 sm:py-3">Status</th>
                </tr>
            </thead>
                <tbody>
                    {orders.length>0?(
                        orders.map((order)=>(
                           <tr key={order._id} onClick={()=>handleClickedRow(order._id)} className="border-b hover:border-gray-50 cursor-pointer">
                                <td className="py-2 px-2 sm:py-4 sm:px-4">
                                    <img
                                        src={order.orderItems[0].image}
                                        className="w-10 h-10 sm:h-12 sm:w-12 object-cover rounded-lg"
                                    />
                                </td>
                                <td className="py-2 px-2 sm:py-4 sm:px-4">
                                      {order._id}
                                </td>
                                 <td className="py-2 px-2 sm:py-4 sm:px-4">
                                {new Date(order.createdAt).toLocaleDateString()}{" "}
                                {new Date(order.createdAt).toLocaleTimeString()}
                                </td>
                                 <td className="py-2 px-2 sm:py-4 sm:px-4">
                                {order.shippingAddress.city },{order.shippingAddress.country}
                                </td>
                                 <td className="py-2 px-2 sm:py-4 sm:px-4">
                                {order.orderItems[0].name}
                                </td>
                                 <td className="py-2 px-2 sm:py-4 sm:px-4">
                                ${order.totalPrice}
                                </td>
                                 <td className={`py-2 px-2 sm:py-4 sm:px-4 text-white ${order.isPaid?"bg-gray-700":"bg-red-700 "}`}>
                                {order.isPaid?"Paid":"COD"}
                                </td>
                                
                           </tr> 
                        )
                        )
                    ): (
                        <tr>
                            <td
                             colSpan={7}
                             
                             className="py-2 px-2 sm:py-4 sm:px-4 text-gray-500"
                             >
                                No order found
                            </td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default MyOrder
