import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
    imageUrl: "",
  });

  const [error, setError] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const API_BASE = "http://localhost:5000/api";

  // ✅ Fetch product by ID
  useEffect(() => {
    axios
      .get(`${API_BASE}/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product", err));
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Validation
  const validate = () => {
    const newError = {};
    if (!product.name.trim()) newError.name = "Product name is required";
    if (!product.price || product.price <= 0)
      newError.price = "Enter a valid price";
    if (!product.description.trim())
      newError.description = "Description is required";
    if (!product.imageUrl.trim())
      newError.imageUrl = "Image URL is required";

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.put(`${API_BASE}/products/${id}`, product);
      alert("Product Updated Successfully");
      navigate("/products");
    } catch (err) {
      console.error("Error updating product", err);
      alert("Failed to update product");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Update Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
            />
            {error.name && (
              <p className="text-red-500 text-sm mt-1">{error.name}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
            />
            {error.price && (
              <p className="text-red-500 text-sm mt-1">{error.price}</p>
            )}
          </div>

          {/* Quantity */}
          
          {/* Description */}
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              rows="3"
              value={product.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
            ></textarea>
            {error.description && (
              <p className="text-red-500 text-sm mt-1">{error.description}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="block font-medium mb-1">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-200"
            />
            {error.imageUrl && (
              <p className="text-red-500 text-sm mt-1">{error.imageUrl}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
