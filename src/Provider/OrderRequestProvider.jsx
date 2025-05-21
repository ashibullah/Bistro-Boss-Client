import { createContext, useState } from "react";
import useAuth from "../Hooks/useAuth";

export const OrderRequestContext = createContext(null);

const OrderRequestProvider = ({ children }) => {
    const { groupedCart } = useAuth();
    const [orderRequest, setOrderRequest] = useState(null);

    const orderInfo = {
        orderRequest,
        setOrderRequest
    };

    return (
        <OrderRequestContext.Provider value={orderInfo}>
            {children}
        </OrderRequestContext.Provider>
    );
};

export default OrderRequestProvider;