import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addUser, deleteUser, fetchAllUsers, updateUserDetails } from "../../redux/slices/adminSlice"
import { toast } from "sonner"
const UserManagement = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const { users, loading, error } = useSelector((state) => state.admin)
    
    useEffect(()=>{
      if(user && user.role !== 'admin'){
        navigate('/')
      }else if (user && user.role === "admin") {
        dispatch(fetchAllUsers());
      }
    },[user,navigate,dispatch ])

    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:"",
        role:"customer",
    })
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit =(e)=>{
        e.preventDefault()
        dispatch(addUser(formData))
        setFormData({
                name:"",
                email:"",
                password:"",
                role:""
        })
    }
    const handleRoleChange =(userId,newRole)=>{
      dispatch(updateUserDetails({id:userId,role:newRole}))
   
    }
  const handleDelete = async (userId) => {
    if(window.confirm("Are you sure to delete this admin"))
  try {
    await dispatch(deleteUser(userId)).unwrap();
    toast.success("User deleted successfully");
  } catch (err) {
    toast.error(err || "Failed to delete user");
  }
};
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2  className="text-2xl font-bold mb-4"> User Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{typeof error === "string" ? error : error.message}</p>}
      {/*Add new user form */}
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
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
             <div className="mb-4">
                <label className="block text-gray-700" >Role</label>
                <select 
                name="role" 
                value={formData.role}
                 onChange={handleChange}
                 className="w-full p-2 border rounded"
                >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
                </select>
            </div>
             <button 
                  type="submit" 
                  className=" text-white p-2 border rounded bg-green-500 hover:bg-green-600" >Add User</button> 
        </form>
      </div>
      {/*User list */}
      <div className="shadow-md sm:roundelg  overflow-auto ">
      <table className="min-w-full text-left text-gray-500">
        <thead className=" bg-gray-100 text-xs uppercase text-gray-700">
          <tr>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,index)=>(
            <tr key={index}>
              <td className=" p-4 font-medium text-gray-900 whitespace-nowrap">
                {user.name}
              </td>
              <td className="p-4">
              {user.email}
              </td>
              <td className="p-4">
              <select 
                value={user.role} 
                className=" p-2 border rounded"
                onChange={(e)=>handleRoleChange(user._id,e.target.value)}> 
                 <option value="customer">Customer</option>
                 <option value="admin">Admin</option>
              </select>
              </td>
              <td className="p-4">
             <button
             onClick={() => user.role !== "customer" && handleDelete(user._id)}
             disabled={user.role === "customer"}
             className={`px-4 py-2 rounded-md text-white transition-colors 
               ${user.role === "customer" 
                  ? "bg-gray-400 cursor-not-allowed" 
                 : "bg-red-500 hover:bg-red-600"}`}
                  title={user.role === "customer" ? "Cannot delete customers" : "Delete user"}
             >
             Delete
             </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>
    </div>
  )
}

export default UserManagement
