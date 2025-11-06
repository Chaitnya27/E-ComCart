import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    description: '',
    imageUrl: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const API_BASE = 'http://localhost:5000/api';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.price || !formData.description || !formData.imageUrl) {
      setError('Please fill in all required fields');
      setMessage('');
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/products`,formData);
      alert("Product Added SuccessFully");
      setMessage('Product added successfully!');
      setError('');
      navigate('/products')
    } catch (err) {
      setError('Failed to add product.');
      setMessage('');
      console.error(err);
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-blue-100 p-4'>
    <div className=" w-full max-w-md  p-6  rounded shadow mt-6  bg-white">
      <h2 className="text-xl font-semibold mb-4 text-center">Add Product</h2>

      {message && <p className="mb-3 text-green-600">{message}</p>}
      {error && <p className="mb-3 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price (₹) *</label>
          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>


        <div>
          <label className="block mb-1 font-medium">Description *</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL *</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
    </div>
  );
}

