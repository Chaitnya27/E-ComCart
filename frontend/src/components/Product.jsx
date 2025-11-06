import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Product() {
  const [products, setProducts] = useState([]);

  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`${API_BASE}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setProducts([]);
      }
    }

    fetchProducts();
  }, []);

  return (
  <div className="max-w-7xl mx-auto px-4 py-8 min-h-screen flex flex-col justify-center items-center bg-stone-100">
    <h2 className="text-2xl font-semibold mb-6">Products</h2>

    {products.length === 0 ? (
      <div className="text-center text-gray-500">No products found.</div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="bg-white rounded-xl shadow-md border border-gray-200 flex flex-col overflow-hidden transition-transform hover:scale-105 hover:shadow-lg duration-200"
          >
            {/* Image Section */}
            <div className="flex justify-center items-center bg-gray-50 p-3 border-b border-gray-100">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-72 h-72 object-cover rounded-lg border border-blue-200"
              />
            </div>

            {/* Info Section */}
            <div className="flex flex-col px-4 py-3 items-start grow">
              <h3 className="text-lg font-semibold mb-1 text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-1 line-clamp-2">
                {product.description}
              </p>

              <span className="font-bold text-blue-700 text-lg mb-3">
                ₹{product.price}
              </span>
            </div>
          </Link>
        ))}
      </div>
    )}
  </div>
);
}
