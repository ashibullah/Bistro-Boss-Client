import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../axios/axiosInstance';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';

const DashboardMenu = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        recipe: '',
        image: '',
        category: '',
        price: ''
    });

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        try {
            const response = await axiosInstance.get('/menu');
            setMenu(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching menu:', error);
            toast.error('Failed to load menu items');
            setLoading(false);
        }
    };

    const handleDelete = (itemId) => {
        toast((t) => (
            <div className="flex flex-col items-center gap-3">
                <p className="text-lg">Are you sure you want to delete this item?</p>
                <div className="flex gap-4">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => {
                            toast.dismiss(t.id);
                            axiosInstance.delete(`/menu/${itemId}`)
                                .then(res => {
                                    console.log(res);
                                    if (res.data.deletedCount > 0) {
                                        toast.success('Item deleted successfully');
                                        fetchMenu();
                                    }
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                    toast.error('Failed to delete item');
                                });
                        }}
                    >
                        Delete
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-200 rounded"
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), {
            duration: 5000,
            style: {
                background: '#333',
                color: 'white',
                padding: '1rem',
            },
        });
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setFormData({
            name: item.name,
            recipe: item.recipe,
            image: item.image,
            category: item.category,
            price: item.price
        });
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditItem(null);
        setFormData({
            name: '',
            recipe: '',
            image: '',
            category: '',
            price: ''
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert price to number
        const itemData = {
            ...formData,
            price: parseFloat(formData.price)
        };
        // console.log(itemData);

        try {
            if (editItem) {
                // console.log("inside if ")
                // console.log(itemData);
                const res = await axiosInstance.patch(`/menu/${editItem._id}`, itemData);
                // console.log(res);
                if (res.statusText === 'OK') {
                    // console.log(res)
                    toast.success('Item updated successfully');
                    setIsModalOpen(false);
                    fetchMenu();
                }
            } 
            else {
                const res = await axiosInstance.post('/menu', itemData);
                if (res.data.insertedId) {
                    toast.success('Item added successfully');
                    setIsModalOpen(false);
                    fetchMenu();
                }
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(editItem ? 'Failed to update item' : 'Failed to add item');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    // Group menu items by category
    const groupedMenu = menu.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Menu Management</h2>
                <button
                    onClick={handleAdd}
                    className="btn btn-primary"
                >
                    <FaPlus className="mr-2" /> Add New Item
                </button>
            </div>

            {Object.entries(groupedMenu).map(([category, items]) => (
                <div key={category} className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 capitalize">{category}</h3>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Recipe</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => (
                                    <tr key={item._id}>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.name}</td>
                                        <td className="max-w-xs truncate">{item.recipe}</td>
                                        <td>${item.price}</td>
                                        <td className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="btn btn-ghost btn-xs tooltip"
                                                data-tip="Edit"
                                            >
                                                <FaEdit className="text-blue-600" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                className="btn btn-ghost btn-xs tooltip"
                                                data-tip="Delete"
                                            >
                                                <FaTrashAlt className="text-red-600" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h3 className="text-lg font-semibold mb-4">
                            {editItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="label">Recipe</label>
                                <textarea
                                    name="recipe"
                                    value={formData.recipe}
                                    onChange={handleInputChange}
                                    className="textarea textarea-bordered w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="label">Image URL</label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="label">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="select select-bordered w-full"
                                    required
                                >
                                    <option value="">Select category</option>
                                    <option value="salad">Salad</option>
                                    <option value="pizza">Pizza</option>
                                    <option value="soup">Soup</option>
                                    <option value="dessert">Dessert</option>
                                    <option value="drinks">Drinks</option>
                                    <option value="popular">Popular</option>
                                </select>
                            </div>
                            <div>
                                <label className="label">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                    required
                                    step="0.01"
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    {editItem ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardMenu;