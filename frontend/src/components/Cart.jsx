import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const API_BASE = 'http://localhost:5000/api';

  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Fetch cart items initially
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_BASE}/cart`);
      setCart(res.data);
    } catch (err) {
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update quantity (instant UI change + backend update)
  const updateQuantity = async (id, newQty) => {
    if (newQty < 1) return;

    // instantly update UI
    setCart((prev) => {
      const updatedItems = prev.items.map((item) =>
        item.id === id ? { ...item, quantity: newQty, itemTotal: item.product.price * newQty } : item
      );
      const newTotal = updatedItems.reduce((acc, i) => acc + i.itemTotal, 0);
      return { ...prev, items: updatedItems, total: newTotal };
    });

    // then update backend quietly
    try {
      await axios.put(`${API_BASE}/cart/${id}`, { qty: newQty });
    } catch {
      setError('Failed to update quantity');
    }
  };

  // Remove item from cart (instant update)
  const removeItem = async (id) => {
    setCart((prev) => {
      const updatedItems = prev.items.filter((i) => i.id !== id);
      const newTotal = updatedItems.reduce((acc, i) => acc + i.itemTotal, 0);
      return { ...prev, items: updatedItems, total: newTotal };
    });

    try {
      await axios.delete(`${API_BASE}/cart/${id}`);
    } catch {
      setError('Failed to remove item');
    }
  };


  const placeOrder = async () => {
  try {
    const orderPayload = {
      items: cart.items.map(i => ({ 
        productId: i.product._id,
         quantity: i.quantity })),
      totalAmount: cart.total,
    };
    await axios.post(`${API_BASE}/orders`, orderPayload);
    alert('Order placed successfully!');
    setCart({items :[],total: 0});
    navigate('/orders');
  } catch(err) {
    console.error("Error Occured",err);
  }
};


  if (loading) return <div className="p-10 text-center">Loading cart...</div>;
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;
  if (cart.items.length === 0) return <div className="p-10 text-center">Your cart is empty</div>;

  return (
    <div className="min-h-screen flex flex-col bg-stone-200">
      <div className="grow flex justify-center items-start">
        <div className="max-w-4xl w-full p-6 bg-white rounded shadow mt-6">
          <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

          <div className="space-y-6">
            {cart.items.map(({ id, product, quantity, itemTotal }) => (
              <div key={id} className="flex items-center border-b pb-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded mr-6"
                />
                <div className="grow">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() => updateQuantity(id, quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => updateQuantity(id, quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-lg">₹{itemTotal}</p>
                  <button
                    onClick={() => removeItem(id)}
                    className="mt-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button
            onClick={placeOrder}
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition hover:cursor-pointer">
            Place Order
            </button>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <span className="text-xl font-bold">Total: ₹{cart.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
