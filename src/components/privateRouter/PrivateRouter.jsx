import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import Loading from "../Loading";

const PrivateRouter = ({children}) => {
    
    const {user,loading}=useAuth()
    const location=useLocation()
     if(loading){
        return  <Loading />
     }
     if(user){
        return children
     }
    return (
        <Navigate to="/signup" state={{from:location}} replace />
    );
};

export default PrivateRouter;