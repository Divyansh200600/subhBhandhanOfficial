// src/Home.js
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const db = getFirestore();

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users'); // Adjust the collection name as necessary
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [db]);

  // Handle card click to show user details
  const handleCardClick = (userId) => {
    navigate(`/user/${userId}`); // Navigate to user detail page
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Home</h2>
      <div className="max-h-screen overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.length > 0 ? (
            users.map(user => (
              <div
                key={user.id}
                className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col"
                onClick={() => handleCardClick(user.id)}
              >
                <div className="flex items-center">
                  {/* Profile Picture */}
                  <img
                    src={user.profilePicture || 'default-profile.png'} // Fallback image
                    alt={user.fullName || 'Profile'}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{user.fullName || 'Unnamed User'}</h3>
                    <p className="text-gray-600">DOB: {user.dob}, {user.height}-feet</p>
                    
                    <p className="text-gray-600">{user.occupationDetails }</p>
                    <p className="text-gray-600">{user.qualification || 'Qualification not specified'}</p>
                  </div>
                </div>
                {/* Optional Buttons for actions */}
                {/* <div className="flex justify-between mt-4">
                  <button className="bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-600">Shortlist</button>
                  <button className="bg-gray-300 text-gray-700 rounded px-2 py-1 hover:bg-gray-400">Send Interest</button>
                </div> */}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">
              <p className="text-lg text-gray-500">No users found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
