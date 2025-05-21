import { createContext } from "react";

export const OrderRequestContext = createContext(null);
const OrderRequestProvider = ({ children }) => {
    
    const orderInfo = {
            
        };
    
        return (
            <OrderRequestContext.Provider value={orderInfo}>
                {children}
            </OrderRequestContext.Provider>
        );
};

export default OrderRequestProvider;