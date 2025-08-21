
import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slices/authSlice';
import { useEffect } from 'react';
import { clearCart } from '../../redux/slices/cartSlice';

const AdminSidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  },[user,navigate])

  const handleLogout =()=>{
    dispatch(logout());
    dispatch(clearCart())
    navigate("/")
  }
  return (
    <div className='p-6 '>
    <div className='mb-6'>
      <Link to="/admin" className="text-2xl font-medium">
       AvonThread
      </Link>
    </div>
    <h2 className='text-xl font-medium mb-6 text-center'> Admin Dashborad</h2>

    <nav className='flex flex-col space-y-2'>
      <NavLink to="/admin/users" className={({isActive})=>isActive?"bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2":"text-gray-300  hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2 "}>
        <FaUser />
        <span>Users </span>
      </NavLink>
      <NavLink to="/admin/products" className={({isActive})=>isActive?"bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2":"text-gray-300  hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2 "}>
        <FaBoxOpen />
        <span>Products </span>
      </NavLink>
      <NavLink to="/admin/orders" className={({isActive})=>isActive?"bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2":"text-gray-300  hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2 "}>
        <FaClipboardList />
        <span>orders </span>
      </NavLink>
      <NavLink to="/" className={({isActive})=>isActive?"bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2":"text-gray-300  hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2 "}>
        <FaStore />
        <span>Shop </span>
      </NavLink>
    </nav>  
    <div className='mt-6'>
       
      <button onClick={handleLogout} className=' flex items-center justify-center w-full bg-red-500 onhover:bg-red-600 text-white py-2 px-4 rounded'>
      <FaSignOutAlt/>
      
      <span>Logout</span>
      </button>
    </div>
    </div>
  )
}

export default AdminSidebar
