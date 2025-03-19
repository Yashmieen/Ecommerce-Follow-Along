import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", address);
    if (profilePic) formData.append("profilePic", profilePic);

    try {
      const response = await axios.post("http://localhost:8000/user/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        console.log("✅ Signup successful!");
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">
          Create Your Account
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-pink-700 font-medium mb-1">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-pink-700 font-medium mb-1">Email</label>
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
            <label htmlFor="password" className="block text-pink-700 font-medium mb-1">Password</label>
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

          <div>
            <label htmlFor="address" className="block text-pink-700 font-medium mb-1">Address</label>
            <input
              id="address"
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="profilePic" className="block text-pink-700 font-medium mb-1">Profile Picture</label>
            <input
              id="profilePic"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border border-pink-300 rounded-lg cursor-pointer file:bg-pink-500 file:text-white file:py-2 file:px-4 file:border-0 file:rounded-lg hover:file:bg-pink-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-pink-600">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-800 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;