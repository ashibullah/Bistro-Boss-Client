import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router-dom";

const Bypass = ({children}) => {
    const {user} = useContext(AuthContext);
    
    if(user) return <Navigate to="/" />;
    return children;
};

export default Bypass;


export const PrivateRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    
    if(!user) return <Navigate to="/login" />;
    return children;
};

