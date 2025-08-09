import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}) =>{
    const checkAuth = localStorage.getItem('token')
    if(!checkAuth){
        return <Navigate to={'/login'} replace/>
    }
    return children
}
export default ProtectedRoute