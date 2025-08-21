
import { useSelector } from 'react-redux'
import {Navigate } from 'react-router-dom'

const Protected = ({children, role }) => {
  const { user } = useSelector((state)=>state.auth)
  if(!user || (role && user.role !== role )){
    console.log("Admin")
    return <Navigate to="/login" replace />
  }

  return children;
}
export default Protected
