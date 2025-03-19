import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Card = ({ id, name, price, image, onAddToCart, onBuyNow, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:8000/products/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          onDelete(id);
          console.log("✅ Product deleted successfully!");
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete product");
        }
      } catch (error) {
        console.error("❌ Error deleting product:", error);
      }
    }
  };

  const handleAddToCart = async () => {
    if (quantity > 0) {
      try {
        const token = localStorage.getItem("token");

        await axios.post(
          "http://localhost:8000/cart",
          { productId: id, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("✅ Product added to cart!");
        navigate("/cart");
      } catch (error) {
        console.error("❌ Error adding to cart:", error);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-100 via-purple-200 to-blue-100 rounded-3xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 border border-gray-300 w-full max-w-sm">
      {/* Product Image */}
      <div className="relative w-full h-64 flex justify-center items-center bg-white rounded-t-3xl">
        <img
          src={image}
          alt={name}
          onClick={() => navigate(`/product/${id}`)}
          className="cursor-pointer object-contain h-full w-full p-4 rounded-t-3xl transition-transform duration-200 hover:scale-105"
        />

        {/* Edit Button */}
        <button
          onClick={onEdit}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition-all"
        >
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material-outlined/24/edit--v1.png"
            alt="edit-icon"
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="text-center p-6 text-gray-900">
        <h3 className="font-bold text-2xl">{name}</h3>
        <p className="text-xl text-pink-600 font-semibold my-2">₹{price}</p>

        {/* Action Buttons */}
        <div className="flex justify-center items-center gap-4 mt-4 pb-4">
          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="flex items-center cursor-pointer justify-center bg-pink-500 py-2 px-6 rounded-lg text-white font-semibold hover:bg-pink-600 transition-all shadow-md"
          >
            🛒 Add to Cart
          </button>

          {/* Buy Now & Delete Button Container */}
          <div className="flex gap-3">
            {/* Buy Now */}
            <button
              onClick={onBuyNow}
              className="bg-green-500 cursor-pointer text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-600 transition-all shadow-md"
            >
              Buy Now
            </button>

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="bg-red-500 cursor-pointer text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition-all shadow-md"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
