import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

export const PublicRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    const location = useLocation();
    const from = location.state?.from || "/";
    
    if(user) return <Navigate to={from} replace />;
    return children;
};

export const AdminRoute = ({children})=>{
    
    const { isAdmin , adminCheck} = useAuth();
    const location = useLocation();
    adminCheck();
    if(!isAdmin){
        toast.error('Only admin can access this page')
        return <Navigate to="/dashboard/cart" state={{ from: location }} replace />;
    }
    return children;
}

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default PrivateRoute;

