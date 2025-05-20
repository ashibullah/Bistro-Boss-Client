import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../axios/axiosInstance';
import useAuth from '../../Hooks/useAuth';

const AddReview = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        details: '',
        rating: 1,
    });
    const [userReviews, setUserReviews] = useState([]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        formData.name = user.displayName;
        formData.email = user.email;

        try {
            const res = await axiosInstance.post('/reviews', formData);
            toast.success('Review added successfully!');
            setFormData({ name: '', details: '', rating: 1 });
            fetchUserReviews(); // Reload reviews after adding
        } catch (err) {
            console.error(err);
            toast.error('Failed to add review');
        }
    };

    const fetchUserReviews = async () => {
        try {
            const res = await axiosInstance.get(`/reviews/${user.email}`);
            setUserReviews(res.data);
        } catch (err) {
            console.error('Failed to fetch reviews', err);
        }
    };

    useEffect(() => {
        if (user?.email) {
            fetchUserReviews();
        }
    }, [user?.email]);

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl flex flex-col md:flex-row gap-8">
  
  {/* Review Form */}
  <div className="flex-1">
    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Add Your Review</h2>
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="name"
        value={user.displayName}
        disabled
        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
      />
      <textarea
        name="details"
        value={formData.details}
        onChange={handleChange}
        placeholder="Share your thoughts..."
        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
        rows="4"
        required
      ></textarea>
      <select
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      >
        {[1, 2, 3, 4, 5].map(n => (
          <option key={n} value={n}>
            {n} Star{n > 1 && 's'}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition duration-300"
      >
        Submit Review
      </button>
    </form>
  </div>

  {/* Review List */}
  <div className="flex-1">
    <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Your Reviews</h3>
    {userReviews.length === 0 ? (
      <p className="text-gray-500 text-sm">No reviews submitted yet.</p>
    ) : (
      <div className="space-y-4">
        {userReviews.map(review => (
          <div key={review._id} className="p-4 border border-gray-200 rounded-xl bg-gray-50 shadow-sm">
            <p className="text-sm text-gray-700 mb-1"><strong>Rating:</strong> {review.rating} ⭐</p>
            <p className="text-gray-800">{review.details}</p>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

    
    );
};

export default AddReview;
