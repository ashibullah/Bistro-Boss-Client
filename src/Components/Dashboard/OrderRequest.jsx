import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../axios/axiosInstance';
import toast from 'react-hot-toast';


const OrderRequest = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastOrderTime, setLastOrderTime] = useState(Date.now());

    const fetchOrders = async () => {
        try {
            const response = await axiosInstance.get('/orders');
            setOrders(response.data);
            
            // Check for new orders
            const latestOrder = response.data[0];
            if (latestOrder && new Date(latestOrder.orderDate).getTime() > lastOrderTime) {
                // Play notification for new order
                new Audio('/notification.mp3').play();
                
                toast((t) => (
                    <div className="flex flex-col items-center gap-2">
                        <p className="font-semibold">New Order!</p>
                        <p>From: {latestOrder.customerName}</p>
                        <p>Amount: ${latestOrder.totalAmount.toFixed(2)}</p>
                    </div>
                ), {
                    duration: 10000,
                    style: {
                        background: '#333',
                        color: 'white',
                    },
                });
                setLastOrderTime(new Date(latestOrder.orderDate).getTime());
            }
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            toast.error('Failed to load orders');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        // Poll for new orders every 30 seconds
        const interval = setInterval(fetchOrders, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axiosInstance.patch(`/orders/${orderId}`, { status: newStatus });
            toast.success(`Order status updated to ${newStatus}`);
            fetchOrders();
        } catch (error) {
            console.error('Error updating order status:', error);
            toast.error('Failed to update order status');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-6">Order Requests</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Customer</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td>{new Date(order.orderDate).toLocaleString()}</td>
                                <td>{order.customerName}</td>
                                <td>{order.items.length} items</td>
                                <td>${order.totalAmount.toFixed(2)}</td>
                                <td>
                                    <span className={`badge ${
                                        order.status === 'pending' ? 'badge-warning' :
                                        order.status === 'processing' ? 'badge-info' :
                                        order.status === 'completed' ? 'badge-success' :
                                        'badge-error'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <select 
                                        className="select select-bordered select-sm w-full max-w-xs"
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderRequest;