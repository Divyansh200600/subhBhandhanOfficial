import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa'; // Import trash icon for deletion

const Gallery = ({ uid }) => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const maxImages = 5; // Maximum number of images allowed in the gallery

  useEffect(() => {
    const fetchGalleryImages = async () => {
      const db = getFirestore();
      const userDocRef = doc(db, 'users', uid);

      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.gallery && Array.isArray(data.gallery)) {
            setGalleryImages(data.gallery);
          } else {
            console.error('No gallery available or not an array.');
          }
        } else {
          console.error('No such user document!');
        }
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchGalleryImages();
    }
  }, [uid]);

  // Handle file upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (galleryImages.length >= maxImages) {
      Swal.fire({
        icon: 'error',
        title: 'Limit Reached',
        text: `You can only upload up to ${maxImages} images.`,
      });
      return;
    }

    if (file) {
      uploadImage(file);
    }
  };

  const uploadImage = async (file) => {
    setUploading(true);
    const storage = getStorage();
    const storageRef = ref(storage, `gallery/${uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // You can monitor progress here if needed
      },
      (error) => {
        console.error('Error uploading file:', error);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        updateGallery(downloadURL);
      }
    );
  };

  const updateGallery = async (newImageUrl) => {
    const db = getFirestore();
    const userDocRef = doc(db, 'users', uid);

    const updatedGallery = [...galleryImages, newImageUrl]; // Add new image URL to the gallery

    try {
      await updateDoc(userDocRef, {
        gallery: updatedGallery,
      });
      setGalleryImages(updatedGallery); // Update local state with new gallery
      setUploading(false);
      Swal.fire({
        icon: 'success',
        title: 'Image Uploaded',
        text: 'Image has been added to the gallery.',
      });
    } catch (error) {
      console.error('Error updating gallery in Firestore:', error);
    }
  };

  // Handle image removal
  const handleRemoveImage = async (indexToRemove) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedGallery = galleryImages.filter((_, index) => index !== indexToRemove);
        const db = getFirestore();
        const userDocRef = doc(db, 'users', uid);

        try {
          await updateDoc(userDocRef, { gallery: updatedGallery });
          setGalleryImages(updatedGallery); // Update local state
          Swal.fire('Deleted!', 'Your image has been removed.', 'success');
        } catch (error) {
          console.error('Error removing image from Firestore:', error);
        }
      }
    });
  };

  if (loading) {
    return <p className="text-center">Loading gallery...</p>;
  }

  return (
    <div className="gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {galleryImages.length > 0 ? (
        galleryImages.map((imageUrl, index) => (
          <div key={index} className="gallery-item relative group">
            <img
              src={imageUrl}
              alt={`Gallery item ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-200 group-hover:scale-105"
            />
            {/* Remove Button with Icon */}
            <button
              className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-lg transition-opacity duration-200 opacity-0 group-hover:opacity-100"
              onClick={() => handleRemoveImage(index)}
            >
              <FaTrashAlt size={18} />
            </button>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">No images in the gallery.</p>
      )}

      {/* File input for uploading new image */}
      {galleryImages.length < maxImages && (
        <div className="upload-section mt-4 col-span-full">
          <label className="block text-sm font-medium text-gray-700">Add Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {uploading && <p className="text-center mt-2 text-blue-500">Uploading...</p>}
        </div>
      )}

      {galleryImages.length === maxImages && (
        <p className="col-span-full text-center text-gray-500">Maximum of {maxImages} images allowed.</p>
      )}
    </div>
  );
};

export default Gallery;
