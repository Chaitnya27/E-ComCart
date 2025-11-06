import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Orders() {
  const API_BASE = 'http://localhost:5000/api';
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_BASE}/orders`);
        setOrders(res.data);
      } catch {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading orders...</div>;
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;
  if (orders.length === 0) return <div className="p-10 text-center">No orders found.</div>;

  return (
    <div className="min-h-screen bg-stone-200 flex justify-center items-start py-10">
      <div className="max-w-4xl w-full p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Your Orders</h2>

        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-lg p-4 mb-6 shadow-sm bg-gray-50"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg text-blue-700">
                Order #{order._id.slice(-6).toUpperCase()}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="space-y-4">
              {order.items.map(({ productId, quantity }) => (
                <div
                  key={productId._id}
                  className="flex items-center gap-4 border-b pb-3 last:border-none"
                >
                  {/* Product Image */}
                  <img
                    src={productId.imageUrl}
                    alt={productId.name}
                    className="w-20 h-20 object-cover rounded border"
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{productId.name}</h4>
                    <p className="text-sm text-gray-600">{productId.description}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Quantity: <span className="font-semibold">{quantity}</span>
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-right font-semibold text-blue-700">
                    ₹{productId.price * quantity}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-right font-bold text-lg text-green-700">
              Total: ₹{order.totalAmount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
