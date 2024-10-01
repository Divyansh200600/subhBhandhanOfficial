// src/UserDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const db = getFirestore();

  // Fetch user details from Firestore
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDoc = doc(db, 'users', userId); // Change 'users' to your collection name
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setUser({ id: userSnapshot.id, ...userSnapshot.data() });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [db, userId]);

  if (!user) return <p>Loading user details...</p>;

  return (
    <div className="p-6">
         
      <h2 className="text-3xl font-bold mb-4">{user.fullName}</h2>
      <div className="space-y-2">
        <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
        <p><strong>Alternate Number:</strong> {user.alternateNumber || 'N/A'}</p>
        <p><strong>Email:</strong> {user.email || 'N/A'}</p>
        <p><strong>DOB:</strong> {user.dob || 'N/A'}</p>
        <p><strong>Gender:</strong> {user.gender || 'N/A'}</p>
        <p><strong>Marital Status:</strong> {user.maritalStatus || 'N/A'}</p>
        <p><strong>Height:</strong> {user.height || 'N/A'}</p>
        <p><strong>Occupation:</strong> {user.occupation || 'N/A'}</p>
        <p><strong>Field of Study:</strong> {user.fieldOfStudy || 'N/A'}</p>
        <p><strong>Father's Name:</strong> {user.fatherName || 'N/A'}</p>
        <p><strong>Father's Occupation:</strong> {user.fatherOccupation || 'N/A'}</p>
        <p><strong>Mother's Name:</strong> {user.motherName || 'N/A'}</p>
        <p><strong>Mother's Occupation:</strong> {user.motherOccupation || 'N/A'}</p>
        <p><strong>Number of Brothers:</strong> {user.numberOfBrothers || 'N/A'}</p>
        <p><strong>Number of Sisters:</strong> {user.numberOfSisters || 'N/A'}</p>
        <p><strong>Religion:</strong> {user.religion || 'N/A'}</p>
        <p><strong>Gotra:</strong> {user.gotra || 'N/A'}</p>
        <p><strong>Permanent Address:</strong> {user.permanentAddress || 'N/A'}</p>
        <p><strong>Place of Birth:</strong> {user.pob || 'N/A'}</p>
        <p><strong>Profile For:</strong> {user.profileFor || 'N/A'}</p>
        <p><strong>Created At:</strong> {user.createdAt?.toDate().toLocaleString() || 'N/A'}</p>
      </div>
    </div>
  );
};

export default UserDetails;
