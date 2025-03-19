import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        email,
        password,
      });

      console.log("✅ Login successful!", response.data);

      const { token, user } = response.data;

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      localStorage.setItem("token", token);

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">
          Welcome Back!
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-pink-700 font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-pink-700 font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-pink-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-pink-800 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>

        <p className="text-center mt-2 text-sm text-pink-500">
          <Link to="/forgot-password" className="hover:underline">
            Forgot your password?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
