import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

export const PublicRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    const location = useLocation();
    const from = location.state?.from || "/";
    
    if(user) return <Navigate to={from} replace />;
    return children;
};

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default PrivateRoute;

