import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ProductForm = () => {
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        name: "",
        price: "",
        description: "",
        images: [],
        imagePreviews: [],
    });

    const handleInputChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imagePreviews = files.map((file) => URL.createObjectURL(file));

        setProductData({
            ...productData,
            images: files,
            imagePreviews,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("price", productData.price);
        formData.append("description", productData.description);
        productData.images.forEach((image) => formData.append("images", image));

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You must be logged in to add a product.");
                return;
            }

            await axios.post("http://localhost:8000/products/add", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            navigate("/");
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-400 to-rose-600">
            <Navbar hideButtons={true} />
            <div className="p-8 bg-white rounded-2xl shadow-2xl w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Add New Product</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Product Name */}
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleInputChange}
                        placeholder="Product Name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />

                    {/* Price */}
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleInputChange}
                        placeholder="Price ($)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />

                    {/* Description */}
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        placeholder="Product Description"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    ></textarea>

                    {/* Image Upload */}
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />

                    {/* Image Previews */}
                    {productData.imagePreviews.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            {productData.imagePreviews.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt="Preview"
                                    className="w-full h-24 object-cover rounded-lg border border-gray-300"
                                />
                            ))}
                        </div>
                    )}

                    {/* Buttons */}
                    <button
                        type="submit"
                        className="w-full px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all transform hover:scale-105"
                    >
                        Add Product
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="w-full px-5 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow-md transition-all transform hover:scale-105"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
