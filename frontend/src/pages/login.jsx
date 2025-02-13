import React from 'react';
import Login from '../components/auth/Login/';

const LoginPage = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-green-400 to-teal-500">
      <div className="w-full sm:max-w-md p-4">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;