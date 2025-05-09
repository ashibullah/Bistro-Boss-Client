import React from 'react';
import useAuth from '../../Hooks/useAuth';

const Cart = () => {
    const { groupedCart, totalAmount, handleRemoveCartItem } = useAuth();

    const handleRemove = (itemId) => {
        handleRemoveCartItem(itemId);
    };

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
                                        <td className='text-left text-lg font-semibold'>$ {item.price}</td>
                                        <td>
                                            <p className="text-left text-lg font-semibold text-green-700">
                                                $ {item.price * item.quantity}
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
                                        onClick={() => handleRemove(item._id)}
                                        className="btn btn-error btn-sm text-white"
                                    >
                                        Clear Cart
                                    </button></td>
                                <td className='text-left text-lg font-semibold '>Total Price:</td>
                                <td className='text-left text-lg font-semibold text-green-700'>$ {totalAmount}</td>
                                <td>
                                    <button
                                        onClick={() => handleRemove(item._id)}
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