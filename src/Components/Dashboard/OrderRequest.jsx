import { useState, useEffect } from 'react';
import { axiosInstance } from '../../axios/axiosInstance';
import toast from 'react-hot-toast';

const OrderRequest = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastOrderTime, setLastOrderTime] = useState(Date.now());
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);

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

    const fetchOrderDetails = async (order) => {
        try {
            // Get menu items details for the order
            const itemsPromises = order.items.map(itemId => 
                axiosInstance.get(`/menu/${itemId}`)
            );
            
            const responses = await Promise.all(itemsPromises);
            const menuItems = responses.map(res => res.data);

            // Combine menu items with quantities and prices
            const detailedItems = menuItems.map((item, index) => ({
                ...item,
                quantity: order.quantities[index],
                price: order.prices[index],
                subtotal: order.prices[index] * order.quantities[index]
            }));

            setOrderDetails(detailedItems);
            setSelectedOrder(order);
        } catch (error) {
            console.error('Error fetching order details:', error);
            toast.error('Failed to load order details');
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    const handleClearOrderReq =()=>{
        const confirmClear = window.confirm("Are you sure you want to clear the order list?");
        if (confirmClear) {
            axiosInstance.delete('/orders/delete-all').then(res =>{
                console.log(res.data);
                if(res.data.deletedCount >0 ) {
                    toast.success('Order List Cleared');
                    setOrders([]);
                }
                else {
                    toast.error('Failed to clear order list');
                }
            })
            
            
        }
    }

    if(orders.length === 0){
        return(
            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className='text-3xl font-bold'>Your Order Request Queue is Empty</h1>
           
            </div>
        )
    }
    return (
        <div className="p-4">
            <div className="flex justify-between items-center  p-2">
                <h2 className="text-2xl font-semibold ">Order Requests</h2>
           
             <button className="btn"  onClick={handleClearOrderReq}>Clear Order List</button>
            </div>
                
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
                            <th>Details</th>
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
                                <td>
                                    <button 
                                        className='btn btn-ghost btn-sm'
                                        onClick={() => fetchOrderDetails(order)}
                                    >
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>

            {/* Add Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Order Details</h3>
                            <button 
                                className="btn btn-sm btn-circle btn-ghost"
                                onClick={() => {
                                    setSelectedOrder(null);
                                    setOrderDetails([]);
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        {/* Customer Info */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="font-semibold">Order Information</p>
                                <p>Customer: {selectedOrder.customerName}</p>
                                <p>Email: {selectedOrder.email}</p>
                                <p>Date: {new Date(selectedOrder.orderDate).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="font-semibold">Order Status</p>
                                <select 
                                    className="select select-bordered select-sm w-full max-w-xs mt-2"
                                    value={selectedOrder.status}
                                    onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="overflow-x-auto mb-6">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Item</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderDetails.map((item, index) => (
                                        <tr key={item._id}>
                                            <td>
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item.image} alt={item.name} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <div className="font-bold">{item.name}</div>
                                                    <div className="text-sm opacity-50">{item.category}</div>
                                                </div>
                                            </td>
                                            <td>${item.price.toFixed(2)}</td>
                                            <td>{item.quantity}</td>
                                            <td>${item.subtotal.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Total */}
                        <div className="text-right">
                            <p className="text-xl font-bold">
                                Total Amount: ${selectedOrder.totalAmount.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderRequest;