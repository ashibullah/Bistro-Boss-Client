import { useState, useEffect } from "react";
import { OrderRequestContext } from "./OrderRequestContext";
import { axiosInstance } from "../axios/axiosInstance";

const OrderRequestProvider = ({ children }) => {
    const [orderRequest, setOrderRequest] = useState(null);
    const [unreadOrders, setUnreadOrders] = useState(0);
    const [lastCheckedTime, setLastCheckedTime] = useState(Date.now());

    useEffect(() => {
        const fetchUnreadOrders = async () => {
            try {
                const response = await axiosInstance.get('/orders');
                const newOrders = response.data.filter(
                    order => new Date(order.orderDate).getTime() > lastCheckedTime
                );
                setUnreadOrders(newOrders.length);
            } catch (error) {
                console.error('Error fetching unread orders:', error);
            }
        };

        const interval = setInterval(fetchUnreadOrders, 30000);
        fetchUnreadOrders();

        return () => clearInterval(interval);
    }, [lastCheckedTime]);

    const markOrdersAsRead = () => {
        setLastCheckedTime(Date.now());
        setUnreadOrders(0);
    };

    const orderInfo = {
        orderRequest,
        setOrderRequest,
        unreadOrders,
        markOrdersAsRead
    };

    return (
        <OrderRequestContext.Provider value={orderInfo}>
            {children}
        </OrderRequestContext.Provider>
    );
};

export default OrderRequestProvider;