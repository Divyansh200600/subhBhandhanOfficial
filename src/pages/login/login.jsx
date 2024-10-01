import React, { useState } from 'react';
import { auth } from '../../utils/firebaseConfig'; // Adjust the import path if necessary
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Google from '../../assets/images/google.png'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sign in user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
      // Navigate to home page after successful login
      navigate('/home');
    } catch (error) {
      console.error('Error during login:', error);
      alert(error.message); // Show error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign in.</h2>

        {/* Sign in with Google */}
        <button className="w-full bg-gray-800 text-white p-3 rounded-lg mb-4 flex items-center justify-center space-x-2">
          <img src={Google}alt="Google" className="w-5 h-5" />
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center justify-center mb-4">
          <span className="border-b border-gray-500 w-full"></span>
          <span className="px-2 text-gray-400">or</span>
          <span className="border-b border-gray-500 w-full"></span>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-700 bg-gray-800 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-700 bg-gray-800 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg hover:opacity-90 transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Create Account link */}
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <span
            className="text-purple-500 cursor-pointer"
            onClick={() => navigate('/')}
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
