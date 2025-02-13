import React from 'react';
import SignUpForm from '../components/auth/SignUpForm';

const SignUpPage = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;