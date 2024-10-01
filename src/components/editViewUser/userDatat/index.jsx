import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

export default function ViewAndEditUser({ number }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    fullName: "",
    fatherName: "",
    email: "",
    subscription: "",
    profileFor: '',
    dob: '',
    age:'',
    tob: '',
    pob: '',
    height: '',
    gender: '',
    phoneNumber: number,
    alternateNumber: '',
    physicalStatus: '',
    maritalStatus: '',
    manglik: '',
    caste: '',
    religion: '',
    gotra: '',
    qualification: '',
    fieldOfStudy: '',
    occupation: '',
    occupationDetails: '',
    natureOfJob: '',
    placeOfWork: '',
    incomeInLPA: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    numberOfBrothers: '0',
    numberOfSisters: '0',
    permanentAddress: '',
    landmark: '',
    pincode: '',
    state: '',
    district: '',
    city: '',
  });

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      const db = getFirestore();
      const userDocRef = doc(db, "users", number); // Use phoneNumber as document ID
      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data()); // Set user data from Firestore
        } else {
          console.error("No such user!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [number]);

  // Handle form input changes
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle save after editing
  const handleSave = async () => {
    const db = getFirestore();
    const userDocRef = doc(db, "users", number); // Use phoneNumber as document ID
    try {
      await updateDoc(userDocRef, userData);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User details updated successfully!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Confirm before entering edit mode
  const handleEdit = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to edit the user's details?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsEditing(true); // Enable edit mode
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header section with title and Edit button */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">
          Phone Number: <span className="text-blue-600">{number}</span>
        </h3>

        {/* Edit Button on the right */}
        {!isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
          >
            Edit Details
          </button>
        )}
         {isEditing && (
          <div className="flex justify-start mt-6">
            <button
            
              type="button"
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* User Data Form */}
      <form className="space-y-6">
        <h1 className="font-bold text-2xl">Personal Information</h1>
        {/* Personal Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Existing fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* New fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={userData.dob}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={userData.age}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Time of Birth</label>
            <input
              type="time"
              name="tob"
              value={userData.tob}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Height</label>
            <input
              type="text"
              name="height"
              value={userData.height}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
  <label className="block text-sm font-medium text-gray-700">Gender</label>
  <select
    name="gender"
    value={userData.gender}
    onChange={handleChange}
    disabled={!isEditing}
    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
</div>


          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Alternate Number</label>
            <input
              type="text"
              name="alternateNumber"
              value={userData.alternateNumber}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Physical Status</label>
            <input
              type="text"
              name="physicalStatus"
              value={userData.physicalStatus}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
  <label className="block text-sm font-medium text-gray-700">Marital Status</label>
  <select
    name="maritalStatus"
    value={userData.maritalStatus}
    onChange={handleChange}
    disabled={!isEditing}
    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="">Select Marital Status</option>
    <option value="Single">Single</option>
    <option value="Married">Married</option>
    <option value="Divorced">Divorced</option>
    <option value="Widowed">Widowed</option>
  </select>
</div>


          <div>
  <label className="block text-sm font-medium text-gray-700">Manglik</label>
  <select
    name="manglik"
    value={userData.manglik}
    onChange={handleChange}
    disabled={!isEditing}
    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="">Select Manglik Status</option>
    <option value="Yes - Anshik">Yes - Anshik</option>
    <option value="Yes - Purn">Yes - Purn</option>
    <option value="No">No</option>
  </select>
</div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Caste</label>
            <input
              type="text"
              name="caste"
              value={userData.caste}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
  <label className="block text-sm font-medium text-gray-700">Religion</label>
  <select
    name="religion"
    value={userData.religion}
    onChange={handleChange}
    disabled={!isEditing}
    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="">Select</option>
    <option value="Hindu">Hindu</option>
    <option value="Sikh">Sikh</option>
    <option value="Jain">Jain</option>
  </select>
</div>


          <div>
            <label className="block text-sm font-medium text-gray-700">Gotra</label>
            <input
              type="text"
              name="gotra"
              value={userData.gotra}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
  <label className="block text-sm font-medium text-gray-700">Qualification</label>
  <select
    name="qualification"
    value={userData.qualification}
    onChange={handleChange}
    disabled={!isEditing}
    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="">Select Qualification</option>
    <option value="Bachelors">Bachelors</option>
    <option value="Masters">Masters</option>
    <option value="Doctorate">Doctorate</option>
    <option value="HighSchool">High School</option>
    <option value="AssociateDegree">Associate Degree</option>
    <option value="TechnicalSchool">Technical School</option>
    <option value="Mbbs">MBBS</option>
    <option value="Jd">JD</option>
    <option value="Md">MD</option>
    <option value="Phd">PhD</option>
    <option value="CaAcca">CA/ACCA</option>
    <option value="Other">Other</option>
  </select>
</div>


          <div>
            <label className="block text-sm font-medium text-gray-700">Field of Study</label>
            <input
              type="text"
              name="fieldOfStudy"
              value={userData.fieldOfStudy}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Occupation</label>
            <input
              type="text"
              name="occupation"
              value={userData.occupation}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
  <label className="block text-sm font-medium text-gray-700">Occupation Details</label>
  <select
    name="occupationDetails"
    value={userData.occupationDetails}
    onChange={handleChange}
    disabled={!isEditing}
    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  >
    <option value="">Select Occupation</option>
    <option value="Government Job">Government Job</option>
    <option value="Private Job">Private Job</option>  
    <option value="Service">Service</option>
    <option value="Business">Business</option>
    <option value="Self-Employed">Self-Employed</option>
    <option value="Politician">Politician</option>
  </select>
</div>


          <div>
            <label className="block text-sm font-medium text-gray-700">Nature of Job</label>
            <input
              type="text"
              name="natureOfJob"
              value={userData.natureOfJob}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Place of Work</label>
            <input
              type="text"
              name="placeOfWork"
              value={userData.placeOfWork}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Income (in LPA)</label>
            <input
              type="text"
              name="incomeInLPA"
              value={userData.incomeInLPA}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Father's Name</label>
            <input
              type="text"
              name="fatherName"
              value={userData.fatherName}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Father's Occupation</label>
            <input
              type="text"
              name="fatherOccupation"
              value={userData.fatherOccupation}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
            <input
              type="text"
              name="motherName"
              value={userData.motherName}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mother's Occupation</label>
            <input
              type="text"
              name="motherOccupation"
              value={userData.motherOccupation}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Brothers</label>
            <input
              type="number"
              name="numberOfBrothers"
              value={userData.numberOfBrothers}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Sisters</label>
            <input
              type="number"
              name="numberOfSisters"
              value={userData.numberOfSisters}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Permanent Address</label>
            <input
              type="text"
              name="permanentAddress"
              value={userData.permanentAddress}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Landmark</label>
            <input
              type="text"
              name="landmark"
              value={userData.landmark}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={userData.pincode}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={userData.state}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">District</label>
            <input
              type="text"
              name="district"
              value={userData.district}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={userData.city}
              onChange={handleChange}
              disabled={!isEditing}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

         {/* Save Button */}
        
      </form>
    </div>
  );
};

 
