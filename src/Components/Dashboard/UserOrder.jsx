import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../axios/axiosInstance';
import useAuth from '../../Hooks/useAuth';

const UserOrder = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axiosInstance.post(`/userOrders`,{email: user?.email});
                setOrders(res.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchOrders();
        }
    }, [user?.email]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
            {orders.length === 0 ? (
                <p className="text-center text-gray-500">No orders found</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>Items</th>
                                <th>Total</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order._id}>
                                    <td>{index + 1}</td>
                                    <td>{new Date(order.orderDate).toLocaleString()}</td>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserOrder;