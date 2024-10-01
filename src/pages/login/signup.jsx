import React, { useState } from 'react';
import { auth, provider, db } from '../../utils/firebaseConfig'; // Ensure Firestore is imported
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { useNavigate } from 'react-router-dom';
import Google from '../../assets/images/google.png';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // Phone number state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prefix phone number with +91
      const formattedPhoneNumber = `+91${phoneNumber}`;

      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up successfully');

      // Store user information in Firestore with the phone number as document ID
      await setDoc(doc(db, 'users', formattedPhoneNumber), {
        email: email,
        phoneNumber: formattedPhoneNumber,
        password: password, // Note: Storing plain passwords is not recommended. Use hashing in a real app.
      });

      // Optionally log the user in after signing up
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');

      // Navigate to create-user page after successful signup
      navigate(`/create-user/${formattedPhoneNumber}`);
    } catch (error) {
      console.error('Error during sign up:', error);
      alert(error.message); // Show error message
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Sign in with Google using Firebase's signInWithPopup and GoogleAuthProvider
      await signInWithPopup(auth, provider);
      console.log('User signed in with Google successfully');
      // Navigate to create-user page after successful Google sign-in
      navigate(`/create-user`);
    } catch (error) {
      console.error('Error during Google sign in:', error);
      alert(error.message); // Show error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96 text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up.</h2>
        
        {/* Sign in with Google */}
        <button 
          onClick={handleGoogleSignIn} 
          className="w-full bg-gray-800 text-white p-3 rounded-lg mb-4 flex items-center justify-center space-x-2"
        >
          <img src={Google} alt="Google" className="w-5 h-5" />
          <span>Continue with Google</span>
        </button>

        <div className="flex items-center justify-center mb-4">
          <span className="border-b border-gray-500 w-full"></span>
          <span className="px-2 text-gray-400">or</span>
          <span className="border-b border-gray-500 w-full"></span>
        </div>

        {/* Email, Phone Number & Password Sign Up Form */}
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
            type="text"
            placeholder="Phone Number" // Phone number input field
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
