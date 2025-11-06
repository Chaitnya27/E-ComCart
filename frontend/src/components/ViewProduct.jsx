import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_BASE = 'http://localhost:5000/api';

  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  

  useEffect(() => {
    axios
      .get(`${API_BASE}/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => setError('Product not found'));
  }, [id]);

  const handleAddToCart = async () => {
  try {
    await axios.post(`${API_BASE}/cart`, { productId: product._id, qty: 1 });
    navigate('/cart');
  } catch (error) {
    alert('Failed to add product to cart');
  }
};

  const deleteProduct = async () => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${API_BASE}/products/${id}`);
      alert("Product has been Deleted Sucessfully")
    
     navigate('/products')
    } catch {
      setError('Failed to delete product.');
    }
  };

  if (error)
    return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!product) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className='min-h-screen flex flex-col bg-stone-200 '>
    <div className="max-w-4xl mx-auto  bg-white mt-10 rounded-xl shadow p-6 flex flex-col md:flex-row gap-8">
      {/* Left: Product Image */}
      <div className="flex-1 flex justify-center items-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-80 h-80 object-cover rounded-lg shadow-md border"
        />
      </div>

      {/* Right: Product Info */}
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-3">{product.name}</h2>
       

        <p className="text-gray-700 mb-4">{product.description}</p>

        

        <span className="text-xl text-blue-700 font-semibold mb-4">
          ₹{product.price}
        </span>

        <div className="mt-4 flex gap-3">
          <Link
            to={`/update-product/${product._id}`}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Update
          </Link>
          <button
            onClick={deleteProduct}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add to Cart
            </button>
         
        </div>
      </div>
    </div>
    </div>
  );
}
