import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Loading";
import { useAuth } from "../../hooks/useAuth";

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