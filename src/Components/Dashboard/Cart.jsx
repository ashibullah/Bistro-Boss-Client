import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { axiosInstance } from '../../axios/axiosInstance';
import toast from 'react-hot-toast';

const Cart = () => {
    const { groupedCart, totalAmount, handleRemoveCartItem, handleCartClear, user } = useAuth();

    const handleRemove = (itemId) => {
        handleRemoveCartItem(itemId);
    };

    const handlePlaceOrder = async () => {
        try {
            const orderData = {
                email: user?.email,
                items: groupedCart.map(item => item._id), // array of menu IDs
                quantities: groupedCart.map(item => item.quantity), // array of quantities
                prices: groupedCart.map(item => item.price), // array of prices
                totalAmount: totalAmount,
                status: 'pending',
                orderDate: new Date(),
                customerName: user?.displayName
            };

            const response = await axiosInstance.post('/orders', orderData);
            
            if (response.data.insertedId) {
                handleCartClear(); // Clear the cart after successful order
                toast.success('Order placed successfully!');
                // Play notification sound
                new Audio('/notification.mp3').play();
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order');
        }
    };

    if (groupedCart.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center h-screen'>
                <h1 className='text-3xl font-bold'>Your Cart is Empty</h1>
                <p className='text-lg'>Add some items to your cart!</p>
            </div>
        );
    }
    return (
        <div className=''>
            <p className='font-semibold text-3xl'>Your Cart</p>

            <div className="overflow-x-auto w-full">
                <div className="max-w-full">
                    <table className="table w-full table-auto">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price(each)</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                groupedCart.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name + "'s Image"}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{item.name}</div>
                                                    <div className="text-sm opacity-50">{item.category}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className='text-lg font-semibold'>
                                                {"x " + item.quantity}
                                            </p>
                                        </td>
                                        <td className='text-left text-lg font-semibold'>$ {item.price.toFixed(2)}</td>
                                        <td>
                                            <p className="text-left text-lg font-semibold text-green-700">
                                                $ {(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleRemove(item._id)}
                                                className="btn btn-error btn-sm text-white"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td></td>
                                <td><button
                                        onClick={handleCartClear}
                                        className="btn btn-error btn-sm text-white"
                                    >
                                        Clear Cart
                                    </button></td>
                                <td className='text-left text-lg font-semibold '>Total Price:</td>
                                <td className='text-left text-lg font-semibold text-green-700'>$ {totalAmount.toFixed(2)}</td>
                                <td>
                                    <button
                                        onClick={() => handlePlaceOrder()}
                                        className="btn btn-success btn-sm text-white"
                                    >
                                        Place Order
                                    </button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cart;