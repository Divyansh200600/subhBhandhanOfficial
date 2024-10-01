import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

const Profile = () => {
  const [userEmail, setUserEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      setUserEmail(user.email); // Get user email from Firebase Auth
      const extractedPhoneNumber = user.email.split('@')[0]; // Extract phone number from email
      setPhoneNumber(extractedPhoneNumber); // Set the extracted phone number
    } else {
      setUserEmail('No user is logged in'); // Handle the case when no user is logged in
      setPhoneNumber(''); // Clear phone number when no user is logged in
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">Profile</h2>
      <p className="mt-4"><strong>Email:</strong> {userEmail}</p>
      {phoneNumber && (
        <p className="mt-4"><strong>Phone Number:</strong> {phoneNumber}</p>
      )}
    </div>
  );
};

export default Profile;
