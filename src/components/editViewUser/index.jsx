import { useParams, useNavigate } from "react-router-dom";
import ProfilePicture from "./ProfilePricture/index";
import Gallery from "./Gallery/index";
import UserData from "./userDatat/index"; // Import UserData component
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

export default function ViewAndEditUser() {
  const [userEmail, setUserEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userData, setUserData] = useState(null); // State for storing user data
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserEmail(user.email); // Get user email from Firebase Auth
      const extractedPhoneNumber = user.email.split('@')[0]; // Extract phone number from email
      const formattedNumber = `+91${extractedPhoneNumber}`; // Format the number with the country code
      setPhoneNumber(formattedNumber.toString()); // Set the extracted phone number with country code

      console.log(formattedNumber); // Log the formatted number

      // Fetch user data from Firestore
      const db = getFirestore();
      const userDocRef = doc(db, 'users', extractedPhoneNumber); // Use the extracted phone number as the document ID
      getDoc(userDocRef)
        .then((doc) => {
          if (doc.exists()) {
            setUserData(doc.data()); // Set user data if document exists
          } else {
            console.error("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error);
        });
    } else {
      setUserEmail('No user is logged in'); // Handle the case when no user is logged in
      setPhoneNumber(''); // Clear phone number when no user is logged in
    }
  }, []);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="py-3 px-2 sm:px-6">
      <button
        type="button"
        onClick={handleBack}
        className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-400"
      >
        Back
      </button>

      <div className="flex flex-col-reverse lg:flex-row lg:space-x-6 lg:items-start">
        {/* Main Content Area */}
        <div className="flex-grow">
          <div className="min-h-screen bg-gray-100 py-6 px-4 lg:px-0">
            <div className="bg-white shadow-md rounded-lg w-full max-w-4xl mx-auto p-6">
              <h2 className="text-2xl font-bold mb-6">
                User Details
              </h2>

              {/* Pass user data to UserData component */}
              {userData ? (
                <UserData user={userData} number={phoneNumber} />
              ) : (
                <p>Loading user data...</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar for Profile Picture and Gallery */}
        <div className="flex-shrink-0 lg:w-1/4 w-full">
          <div className="pt-5 lg:pt-0 lg:sticky lg:top-6">
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold mb-2">Profile Picture</h2>
              <ProfilePicture uid={phoneNumber} />
            </div>

            <div className="bg-white shadow-md rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-2">User Gallery</h2>
              <Gallery uid={phoneNumber} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
