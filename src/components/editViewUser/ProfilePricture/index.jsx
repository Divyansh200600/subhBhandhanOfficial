import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { FaTrashAlt, FaUpload } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ProfilePicture = ({ uid }) => {
  const [profilePicture, setProfilePicture] = useState('');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', uid);

      try {
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.profilePicture) {
            setProfilePicture(data.profilePicture);
          } else {
            console.error('No profile picture available.');
          }
        } else {
          console.error('No such user document!');
        }
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchProfilePicture();
    }
  }, [uid]);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const storage = getStorage();
      const storageRef = ref(storage, `profilePictures/${uid}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        () => {},
        (error) => {
          console.error('Error uploading file:', error);
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateProfilePictureInFirestore(downloadURL);
          setUploading(false);
        }
      );
    }
  };

  const updateProfilePictureInFirestore = async (url) => {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', uid);

    try {
      await updateDoc(userDocRef, { profilePicture: url });
      setProfilePicture(url);
      Swal.fire({
        icon: 'success',
        title: 'Profile Picture Updated',
        text: 'Your profile picture has been updated successfully.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Error updating profile picture in Firestore:', error);
    }
  };

  const handleRemove = async () => {
    const storage = getStorage();
    const fileRef = ref(storage, profilePicture);

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to remove your profile picture?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteObject(fileRef);
          await updateProfilePictureInFirestore(''); // Clear the Firestore field
          setProfilePicture('');
          Swal.fire('Deleted!', 'Your profile picture has been removed.', 'success');
        } catch (error) {
          console.error('Error removing profile picture:', error);
        }
      }
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-picture text-center">
      <div className="flex justify-center items-center">
        {profilePicture ? (
          <div className="relative">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full shadow-md mb-4"
            />
            <button
              className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
              onClick={handleRemove}
              aria-label="Remove Profile Picture"
            >
              <FaTrashAlt className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <p className="text-gray-500">No picture</p>
          </div>
        )}
      </div>

      <div className="mt-4">
        <label className="block mb-2 text-gray-700 font-medium">Upload a new profile picture</label>
        <div className="flex justify-center items-center">
          <label
            className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition flex items-center gap-2"
          >
            <FaUpload className="w-5 h-5" />
            <span>Upload</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
        {uploading && <p className="mt-2 text-blue-500">Uploading...</p>}
      </div>
    </div>
  );
};

export default ProfilePicture;
