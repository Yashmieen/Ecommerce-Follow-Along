import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/user/signup",
        { name, email, password }, // Ensure these keys match the backend's expected input
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        console.log("Signup successful");
        alert("Signup successful!");
        navigate("/"); // Redirect to login page after signup
      }
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response) {
        setError(err.response.data.message || "Invalid signup details.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-400 via-pink-100 to-pink-300 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
      Register as a new user
    </h2>
  </div>
  <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && <p className="text-red-600 text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-pink-700">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-3 py-2 border border-pink-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-pink-700">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-3 py-2 border border-pink-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-pink-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-3 py-2 border border-pink-300 rounded-md shadow-sm"
            required
          />
        </div>

        <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700">
          Sign Up
        </button>

        <div className="text-center mt-4">
          Already have an account? <Link to="/" className="text-pink-600 hover:text-pink-700">Sign In</Link>
        </div>
      </form>
    </div>
  </div>
</div>


  );
};

export default Signup;