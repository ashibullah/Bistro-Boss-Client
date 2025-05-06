import React from 'react';
import useAuth from '../Hooks/useAuth';
import { FaTrash } from 'react-icons/fa';

const ShowCartDashboard = () => {
    const { groupedCart, totalAmount, handleRemoveCartItem, handleCartClear } = useAuth();

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">My Cart</h2>
                <button 
                    onClick={handleCartClear}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                    Clear Cart
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg">
                {groupedCart.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        Your cart is empty
                    </div>
                ) : (
                    <>
                        <table className="w-full">
                            <thead className="bg-orange-900 text-white">
                                <tr>
                                    <th className="p-4 text-left">Item</th>
                                    <th className="p-4 text-center">Quantity</th>
                                    <th className="p-4 text-right">Price</th>
                                    <th className="p-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedCart.map((item) => (
                                    <tr key={item._id} className="border-b">
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <div>
                                                    <h3 className="font-semibold">{item.name}</h3>
                                                    <p className="text-sm text-gray-500">{item.category}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">{item.quantity}</td>
                                        <td className="p-4 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => handleRemoveCartItem(item._id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="bg-gray-50">
                                <tr>
                                    <td colSpan="2" className="p-4 font-semibold text-right">Total:</td>
                                    <td className="p-4 font-semibold text-right">${totalAmount.toFixed(2)}</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
};

export default ShowCartDashboard;