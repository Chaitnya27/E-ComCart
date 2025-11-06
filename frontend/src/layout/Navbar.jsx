import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold hover:text-blue-500 hover:underline">
          Vibe Commerce
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/products" className="hover:text-blue-500 hover:underline">
            Products
          </Link>
          <Link to="/cart" className="hover:text-blue-500 hover:underline">
            Cart
          </Link>
          <Link to="/orders" className="hover:text-blue-500 hover:underline">
            Orders
          </Link>
          <Link to="/add-product" className="hover:text-blue-500 hover:underline">
            Add Product
          </Link>
        </div>

        {/* Mobile menu toggle button (text-based) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none px-3 py-1 bg-stone-500 rounded hover:bg-blue-700 transition"
          >
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-500 px-4 py-3 space-y-2">
          <Link
            to="/products"
            className="block hover:text-black hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="block hover:text-black hover:underline"
            onClick={() => setIsOpen(false)}>
            Cart
          </Link>
           <Link
            to="/orders"
            className="block hover:text-black hover:underline"
            onClick={() => setIsOpen(false)}>
            Orders
          </Link>
          <Link
            to="/add-product"
            className="block hover:text-black hover:underline"
            onClick={() => setIsOpen(false)}
          >
            Add Product
          </Link>
        </div>
      )}
    </nav>
  );
}
