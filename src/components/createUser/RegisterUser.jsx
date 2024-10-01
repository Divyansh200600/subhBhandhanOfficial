import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { getFirestore, doc, getDoc, setDoc, updateDoc,Timestamp  } from 'firebase/firestore'; // Import Firestore functions

export default function RegisterUser() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const formData = location.state || {}; // Access form data passed from CreateUser
  const [latestValueOfForm, setLatestValueOfForm] = useState(null);
  const [newFormValue, setNewFormValue] = useState('');

  useEffect(() => {
    const fetchLatestValueOfForm = async () => {
      const db = getFirestore(); // Initialize Firestore
      const gender = formData.gender === 'male' ? 'male' : 'female'; // Determine gender
      const docRef = doc(db, 'latestValue', gender); // Reference to the document based on gender

      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fetchedValue = docSnap.data().value; // Fetch value field
          const updatedValue = fetchedValue + 1; // Update fetched value
          setLatestValueOfForm(updatedValue); // Update state

          // Create a new form value based on gender
          const genderPrefix = formData.gender === 'male' ? 'M' : 'F';
          const newValue = genderPrefix + updatedValue; // Combine gender prefix with updated value
          setNewFormValue(newValue); // Set new form value

          // Update the document in Firestore with the new value
          await updateDoc(docRef, { value: updatedValue }); // Update the Firestore document
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching additional data:', error);
      }
    };

    fetchLatestValueOfForm();
  }, [formData.gender]);

  // Function to save user data to Firestore
 // Function to save user data to Firestore
 const saveUserData = async (userData) => {
  const db = getFirestore(); 
  const number = `+91${userData.phoneNumber}`;
  const userDocRef = doc(db, 'users', number); 

  try {
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      alert('User is already registered.'); 
      return; 
    }

    
    // Add the current timestamp using Firestore's Timestamp
    const userDataWithTimestamp = {
      ...userData,
      phoneNumber: number,
      profilePicture: "",
      createdAt: Timestamp.now()   ,
      subscription: true
    };

    await setDoc(userDocRef, userDataWithTimestamp); 
    console.log('User data saved successfully:', userDataWithTimestamp);
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};


  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    if (newFormValue) {
      // Create a new user data object including the Uid
      const userDataWithUid = {
        ...formData, // Spread the existing form data
        uid: newFormValue // Add the new Uid field
      };

      await saveUserData(userDataWithUid); // Save user data to Firestore
      if (newFormValue) {
        alert('User data submitted successfully!'); // Alert for successful submission
        navigate('/home'); // Navigate to the /users route
      }
    }
  };

  useEffect(() => {
    if (latestValueOfForm) {
      console.log('Latest Value of Form:', latestValueOfForm); // Log updated state
    }
  }, [latestValueOfForm]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Registration Details</h1>
      <h2 className='text-2xl font-bold'>Personal Details</h2>
      <p><strong>Profile For:</strong> {formData.profileFor}</p>
      <p><strong>Full Name as per Aadhar Card:</strong> {formData.fullName}</p>
      <p><strong>Date of Birth:</strong> {formData.dob}</p>
      <p><strong>Age</strong> {formData.age}</p>
      <p><strong>TOB:</strong> {formData.tob}</p>
      <p><strong>POB:</strong> {formData.pob}</p>
      <p><strong>Gender:</strong> {formData.gender}</p>
      <p><strong>Height:</strong> {formData.height}</p>

      <h2 className='text-2xl font-bold'>Contact Details</h2>
      <p><strong>Contact Number:</strong> {formData.phoneNumber}</p>
      <p><strong>Alternate Number:</strong> {formData.alternateNumber}</p>
      <p><strong>Email:</strong> {formData.email}</p>

      <h2 className='text-2xl font-bold'>Marriage Details</h2>
      <p><strong>Marital Status:</strong> {formData.maritalStatus}</p>
      <p><strong>Manglik:</strong> {formData.manglik}</p>
      <p><strong>Religion:</strong> {formData.religion}</p>
      <p><strong>Caste:</strong> {formData.caste}</p>
      <p><strong>Gotra:</strong> {formData.gotra}</p>
      <p><strong>Physical Status:</strong> {formData.physicalStatus}</p>

      <h2 className='text-2xl font-bold'>Education Details</h2>
      <p><strong>Qualification:</strong> {formData.qualification}</p>
      <p><strong>Occupation:</strong> {formData.occupation}</p>
      <p><strong>Occupation Details :</strong> {formData.occupationDetails}</p>
      <p><strong>Job Nature:</strong> {formData.natureOfJob}</p>
      <p><strong>Work Place:</strong> {formData.placeOfWork}</p>
      <p><strong>Income:</strong> {formData.incomeInLPA}</p>

      <h2 className='text-2xl font-bold'>Family Details</h2>
      <p><strong>Father's Name:</strong> {formData.fatherName}</p>
      <p><strong>Father Occupation:</strong> {formData.fatherOccupation}</p>
      <p><strong>Mother Name:</strong> {formData.motherName}</p>
      <p><strong>Mother Occupation:</strong> {formData.motherOccupation}</p>
      <p><strong>Brother:</strong> {formData.numberOfBrothers}</p>
      <p><strong>Sister:</strong> {formData.numberOfSisters}</p>
      <p><strong>Permanent Address:</strong> {formData.permanentAddress}</p>
      <p><strong>Landmark:</strong> {formData.landmark}</p>
      <p><strong>Pincode:</strong> {formData.pincode}</p>
      <p><strong>State:</strong> {formData.state}</p>
      <p><strong>District:</strong> {formData.district}</p>
      <p><strong>City:</strong> {formData.city}</p>

      {/* Display additional data based on gender */}
      {latestValueOfForm && (
        <div className="mt-4">
          <h2 className='text-2xl font-bold'>Additional Information</h2>
          <p>{latestValueOfForm}</p>
        </div>
      )}

      {/* Display the new form value */}
      {newFormValue && (
        <div className="mt-4">
          <h2 className='text-2xl font-bold'>New Form Value</h2>
          <p>{newFormValue}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
      >
        Submit  
      </button>
    </div>
  );
}
