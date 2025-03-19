import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8000/cart", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCart(response.data);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    const handleIncrease = async (productId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:8000/cart/increase/${productId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCart(response.data);
        } catch (error) {
            console.error("Error increasing quantity:", error);
        }
    };

    const handleDecrease = async (productId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:8000/cart/decrease/${productId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCart(response.data);
        } catch (error) {
            console.error("Error decreasing quantity:", error);
        }
    };

    const totalPrice = cart.reduce(
        (sum, item) => sum + (item?.productId?.price || 0) * item?.quantity,
        0
    );
    const totalQuantity = cart.reduce((sum, item) => sum + item?.quantity, 0);

    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:8000/cart/checkout",
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("Checkout successful");
            setCart([]);
        } catch (error) {
            console.error("Error during checkout:", error);
            console.log("Checkout failed. Please try again.");
        }
    };

    const handleClearCart = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete("http://localhost:8000/cart/clear", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCart([]);
            console.log("Cart cleared successfully");
        } catch (error) {
            console.error("Error clearing cart:", error);
            console.log("Failed to clear cart. Please try again.");
        }
    };

    return (
        <div>
            <Navbar hideButtons={true} />
            <div className="min-h-screen bg-gradient-to-br from-pink-400 to-rose-600 flex flex-col items-center p-6">
                <h1 className="text-4xl font-bold mb-6 text-center">Your Cart</h1>

                {cart.length === 0 ? (
                    <p className="text-black">Your cart is empty</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Box - Cart Items */}
                        <div className="bg-white p-6 rounded-lg shadow-md text-black">
                            <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>
                            <div className="space-y-4">
                                {cart.map((item) =>
                                    item?.productId ? (
                                        <div
                                            key={item._id}
                                            className="flex justify-between items-center border-b pb-4"
                                        >
                                            <div className="flex items-center gap-4">
                                                {item?.productId?.images?.[0] ? (
                                                    <img
                                                        src={`http://localhost:8000/uploads/${item.productId.images[0]}`}
                                                        alt={item.productId.name}
                                                        className="w-20 h-20 object-contain"
                                                    />
                                                ) : (
                                                    <div className="w-20 h-20 bg-gray-600 flex items-center justify-center">
                                                        No Image
                                                    </div>
                                                )}
                                                <div>
                                                    <h2 className="text-xl font-bold">{item.productId.name}</h2>
                                                    <p className="text-green-400">${item.productId.price}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleDecrease(item.productId._id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                                >
                                                    -
                                                </button>
                                                <span className="text-lg font-semibold">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleIncrease(item.productId._id)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    ) : null
                                )}
                            </div>
                        </div>

                        {/* Right Box - Summary Section */}
                        <div className="bg-white p-6 rounded-lg shadow-md text-black">
                            <h2 className="text-2xl font-semibold mb-4">Summary</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between text-lg">
                                    <p>Total Quantity:</p>
                                    <p>{totalQuantity}</p>
                                </div>
                                <div className="flex justify-between text-lg">
                                    <p>Total Price:</p>
                                    <p>${totalPrice.toFixed(2)}</p>
                                </div>
                            </div>

                            {/* Checkout and Clear Cart Buttons */}
                            <button
                                onClick={handleCheckout}
                                className="w-full bg-green-500 text-white py-3 mt-4 rounded-lg hover:bg-green-600 transition"
                            >
                                Proceed to Checkout
                            </button>
                            <button
                                onClick={handleClearCart}
                                className="w-full bg-red-500 text-white py-3 mt-2 rounded-lg hover:bg-red-600 transition"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
