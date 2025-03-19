import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [otherProducts, setOtherProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:8000/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchOtherProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8000/products");
                const filteredProducts = response.data.filter((p) => p._id !== id).slice(0, 5);
                setOtherProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching other products:", error);
            }
        };

        if (id) {
            fetchProductDetails();
            fetchOtherProducts();
        }
    }, [id]);

    const handleAddToCart = async () => {
        if (product && quantity > 0) {
            try {
                const token = localStorage.getItem("token");
                await axios.post("http://localhost:8000/cart", {
                    productId: product._id,
                    quantity,
                }, { headers: { Authorization: `Bearer ${token}` } });

                console.log("✅ Product added to cart!");
                navigate("/cart");
            } catch (error) {
                console.error("❌ Error adding to cart:", error);
            }
        }
    };

    const handleBuyNow = () => {
        if (product && quantity > 0) {
            console.log(`Buying ${quantity} x ${product.name}`);
        }
    };

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (!product) return <p className="text-center text-red-500">Product not found</p>;

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-pink-400 to-rose-600 text-gray-900">
            <Navbar hideButtons={true} />

            {/* Product Details Section */}
            <div className="max-w-6xl mx-auto pt-20 px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 rounded-3xl bg-white shadow-lg backdrop-blur-md bg-opacity-30">
                    {/* Product Image */}
                    <div className="w-full h-[450px] flex justify-center items-center rounded-lg bg-white shadow-lg">
                        {product.images?.length > 0 ? (
                            <img
                                src={`http://localhost:8000/uploads/${product.images[0]}`}
                                alt={product.name}
                                className="w-full h-full object-contain p-4 rounded-lg transition-transform duration-300 hover:scale-105"
                            />
                        ) : (
                            <p className="text-gray-500">No image available</p>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                            <p className="text-2xl text-green-500 font-semibold mb-4">₹{product.price}</p>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-4">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span key={i} className={i < (product.rating || 0) ? "text-yellow-400" : "text-gray-400"}>
                                        ★
                                    </span>
                                ))}
                                <span className="text-gray-500 ml-2">({product.rating || 0})</span>
                            </div>

                            <p className="text-black leading-relaxed mb-6">{product.description || "No description available."}</p>

                            {/* Quantity Input */}
                            <div className="flex items-center bg-gray-200 p-3 rounded-xl w-50 gap-4 mb-4 shadow-md">
                                <label className="text-lg font-semibold">Quantity:</label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-20 bg-gray-100 text-gray-900 border border-gray-400 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 shadow-sm"
                                    min="1"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-blue-500 text-white text-lg py-3 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition-all"
                            >
                                🛒 Add to Cart
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="flex-1 bg-green-500 text-white text-lg py-3 rounded-lg font-semibold shadow-md hover:bg-green-600 transition-all"
                            >
                                ✅ Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Other Products Section */}
            {otherProducts.length > 0 && (
                <div className="max-w-6xl mx-auto mt-12 p-6">
                    <h2 className="text-3xl font-bold mb-6">🌟 Other Products</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {otherProducts.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white p-4 rounded-xl shadow-md cursor-pointer hover:scale-105 transition-transform"
                                onClick={() => navigate(`/product/${product._id}`)}
                            >
                                <div className="w-full h-[160px] flex justify-center items-center bg-gray-100 rounded-lg">
                                    {product.images?.[0] ? (
                                        <img
                                            src={`http://localhost:8000/uploads/${product.images[0]}`}
                                            alt={product.name}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <p className="text-gray-500">No image</p>
                                    )}
                                </div>
                                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                                <p className="text-green-500 mt-1">₹{product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
