import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError("No token found. Please log in.");
                    return;
                }

                const response = await axios.get('http://localhost:8000/user/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load profile.");
            }
        };

        fetchProfile();
    }, []);

    if (error) {
        return <div className="text-center text-red-500 mt-4">{error}</div>;
    }

    if (!user) {
        return <div className="text-center mt-4">Loading...</div>;
    }

    return (
        <>
            <Navbar hideButtons={true} />
            <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-pink-400 to-rose-600 p-6">
                
                <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md text-center">
                    {/* Profile Picture */}
                    <div className="flex justify-center mb-6">
                        <img
                            src={user.profilePic 
                                ? `http://localhost:8000${user.profilePic}`  
                                : "https://img.icons8.com/ios-filled/100/user-male-circle.png"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-pink-500 shadow-lg transition-transform transform hover:scale-105 hover:shadow-pink-500"
                        />
                    </div>

                    {/* Welcome Text */}
                    <h1 className="text-3xl font-bold mb-6 text-gray-900">
                        <span className='text-pink-500'>Welcome, </span>
                        <span className='text-gray-800'>{user.name} 👋</span>
                    </h1>

                    {/* User Details */}
                    <div className="space-y-4 text-lg text-gray-700 text-left">
                        <div className="bg-pink-100 p-3 rounded-lg shadow-sm">
                            <strong className="text-pink-500">Name:</strong>
                            <span className="ml-2">{user.name}</span>
                        </div>
                        <div className="bg-pink-100 p-3 rounded-lg shadow-sm">
                            <strong className="text-pink-500">Email:</strong>
                            <span className="ml-2">{user.email}</span>
                        </div>
                        <div className="bg-pink-100 p-3 rounded-lg shadow-sm">
                            <strong className="text-pink-500">Address:</strong>
                            <span className="ml-2">{user.address || "Not provided"}</span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button 
                        className="mt-6 px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition-all transform hover:scale-105"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </>
    );
};

export default Profile;
