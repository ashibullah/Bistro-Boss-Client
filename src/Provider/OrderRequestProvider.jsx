import { useState, useEffect } from "react";
import { OrderRequestContext } from "./OrderRequestContext";
import { axiosInstance } from "../axios/axiosInstance";
import io from 'socket.io-client';
import toast from 'react-hot-toast';
import useAuth from "../Hooks/useAuth";

const socket = io('http://localhost:5000');

const OrderRequestProvider = ({ children }) => {
    const [orderRequest, setOrderRequest] = useState(null);
    const [unreadOrders, setUnreadOrders] = useState(0);
    const [lastCheckedTime, setLastCheckedTime] = useState(Date.now());
    const { isAdmin, user , adminCheck } = useAuth();

    // Add console.log to debug
    adminCheck();

    useEffect(() => {
        // Socket connection
        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        // Listen for new orders
        socket.on('new-order', (order) => {
            setUnreadOrders(prev => prev + 1);
            // Play notification sound
            new Audio('/notification.mp3').play().catch(err => console.log(err));
            // Show toast
            toast((t) => (
                <div className="flex flex-col items-center gap-2">
                    <p className="font-semibold">
                        {isAdmin ? 'New Order Received!' : 'Order Placed Successfully!'}
                    </p>
                    <p>From: {order.customerName}</p>
                    <p>Total: ${order.totalAmount}</p>
                </div>
            ), {
                duration: 10000, // 10 seconds
                position: 'top-right',
                style: {
                    background: '#333',
                    color: 'white',
                }
            });
        });

        // Cleanup socket connection
        return () => {
            socket.off('connect');
            socket.off('new-order');
        };
    }, [isAdmin]);

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