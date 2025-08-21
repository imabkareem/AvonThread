import { useDispatch, useSelector } from "react-redux";  
import { fetchAllOrders, updateOrderDeliveryStatus } from "../../redux/slices/adminOrderSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const OrderMangementPage = () => {
  const { orders, loading, error } = useSelector((state)=>state.adminOrders)
  const { user } = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
    
  useEffect(()=>{
           if(user && user.role !== 'admin'){
             navigate('/')
           }else if (user && user.role === "admin") {
             dispatch(fetchAllOrders());
           }
         },[user,navigate,dispatch ])
   const handleStatusChange = (orderId,status)=>{
        dispatch(updateOrderDeliveryStatus({id:orderId,status:status}))
  }
  
  if(loading) return <p>Loading...</p>
  if(error) return <p>Error: {error.message}</p>
  return (
    <div className=" max-w-7xl mx-auto p-6 ">
      <h1 className=" text-2xl font-bold mb-6">Order Management</h1>
      <div className=" overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="min-w-full text-left text-gray-500">
        <thead className=" bg-gray-100 text-xs uppercase text-gray-700">
          <tr>
            <th className=" py-3 px-4">Order ID</th>
            <th className=" py-3 px-4">Customer</th>
            <th className=" py-3 px-4">Total Price</th>
            <th className=" py-3 px-4">Status</th>
            <th className=" py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className=" ">
          {orders.length > 0 ? (
            orders.map((order)=>(
              <tr key={order._id} className="border-b hover:bg-gray-50 cursor-pointer">
                  <td className=" py-4 px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="p-4">{order.user.name}</td>
                  <td className="p-4">${order.totalPrice.toFixed(2)}</td>
                  <td className="p-4">
                    <select
                    value={order.status}
                    onChange={(e)=>handleStatusChange(order._id,e.target.value)}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 " >
                      <option value="processing" >Processing</option>
                      <option value="shipped" >Shipped</option>
                      <option value="delivered" >Delivered</option>
                      <option value="canceled" >Canceled</option>    
                    </select>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={()=>handleStatusChange(order._id,"delivered")}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >Mark as Delivered</button>
                  </td>
              </tr>
            ))
          ):(
            <tr>
              <td colSpan={5} className="p4 text-center text-gray-500" >
                No orders found.
              </td>
            </tr>
          )}
        </tbody>

        </table>
      </div>
    </div>
  )
}

export default OrderMangementPage
