import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
// Custom styles for the modal popup
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'scroll',
  },
};

Modal.setAppElement('#root'); // Necessary for screen readers

export default function CreateUser() {
  
  const { number } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate(); 
  const [tob, setTob] = useState('');// To navigate to another page
  const [formData, setFormData] = useState({
    profileFor:'',
    fullName: '',
    dob: '',
    age:'',
    tob: '',
    pob:'',
    height: '',
    gender: '',
    phoneNumber:   number,
    alternateNumber: '',
    email: '',
    physicalStatus:'',
    maritalStatus: '',
    manglik: '',
    caste: '',
    religion:'',
    gotra: '',
    qualification: '',
    fieldOfStudy: '',
    occupation : '',
    occupationDetails:'',
    natureOfJob: '',
    placeOfWork: '',
    incomeInLPA: '',
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    numberOfBrothers: '0',
    numberOfSisters: '0',
    permanentAddress: '',
    landmark:'',
    pincode:'',
    state:'',
    district:'',
    city:'',
  });
 

  // Calculate age from the date of birth (DOB)
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Format date to dd/mm/yyyy
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleTobChange = (e) => {
    const { value } = e.target; // Get the value from the input
    setTob(value); // Update the local ToB state

    // Update the formData with the new time of birth
    setFormData((prevData) => ({
      ...prevData,
      tob: value,
    }));
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Handle DOB separately to auto-calculate age and format the date
    if (name === 'dob') {
      const age = calculateAge(value);
      setFormData((prevData) => ({
        ...prevData,
        dob: formatDate(value),
        age: age.toString(),
      }));
    }

    if (name === 'landmark' || name === 'permanentAddress') {
      fetchLocationData(value);
    }
  };

  const fetchLocationData = async (address) => {
    try {
      const response = await axios.get(`https://api.example.com/location?address=${address}`);
      const { pincode, state, district, city } = response.data; // Adjust based on your API response structure

      setFormData((prevData) => ({
        ...prevData,
        pincode: pincode || '',
        state: state || '',
        district: district || '',
        city: city || '',
      }));
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to another page and pass form data as state
    navigate('register-user', { state: formData });
  };

  return (
    <div>

      

      <button 
        onClick={openModal} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create User
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Create User Form"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Matrimonial Registration Form</h2>
        <button 
          onClick={closeModal} 
          className=" absolute  top-2 right-4 bg-red-500 text-white px-2 py-1 rounded"
        >
          Close
        </button>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
        <div className="col-span-2">
            <h3 className="font-bold text-lg mb-2"> Profile Is For </h3>
          </div>
          <div>
            <label>Profile for</label>
            <select name="profileFor" className="border p-2 w-full" onChange={handleChange} required >
              <option value="">Select</option>
              <option value="My self">My Self</option>
              <option value="male">My Son</option>
              <option value="male">My Daughter</option>
              <option value="male">My Brother</option>
              <option value="male">My Sister</option>
              <option value="male">My Friend</option>
              <option value="male">My Relative</option>

            </select>
          </div>

          
         
          {/* Personal Information Section */}
          <div className="col-span-2">
            <h3 className="font-bold text-lg mb-2">Personal Information</h3>
          </div>
          <div>
            <label>Full Name as per Adhar Card</label>
            <input type="text" name="fullName" className="border p-2 w-full" onChange={handleChange}  required />
          </div>
          <div>
            <label>DOB</label>
            <input
              type="date"
              name="dob"
              className="border p-2 w-full"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Age</label>
            <input
              type="number"
              name="age"
              className="border p-2 w-full"
              value={formData.age} // Automatically filled
              readOnly
            />
          </div>
          <div>
            <label>Time of Birth (TOB)</label>
            <input 
              type="time" 
              name="tob"
              className="border p-2 w-full"
              onChange={handleTobChange}
               
            />
            <p>Selected TOB: {tob}</p> {/* Display selected time of birth */}
          </div>
          <div>
            <label>POB</label>
            <input type="text" name="pob" className="border p-2 w-full" onChange={handleChange}   />
          </div>

          <div>
            <label>Height (in foot)</label>
            <input type="float" name="height" className="border p-2 w-full" onChange={handleChange}   />
          </div>
          <div>
            <label>Gender</label>
            <select name="gender" className="border p-2 w-full" onChange={handleChange} required >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label>Physical Status</label>
            <input type="text" name="physicalStatus" className="border p-2 w-full" onChange={handleChange} />
          </div>


          <div className="col-span-2">
            <h3 className="font-bold text-lg mb-2">Contact-Details </h3>
          </div>
          <div>
            <label>Contact Number</label>
            <input type="number" name="phoneNumber" className="border p-2 w-full" onChange={handleChange} required  value={number} readOnly />
          </div>
          <div>
            <label>Alternate Number</label>
            <input type="number" name="alternateNumber" className="border p-2 w-full" onChange={handleChange}   />
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" className="border p-2 w-full" onChange={handleChange}    />
          </div>

     

          <div className="col-span-2">
            <h3 className="font-bold text-lg mb-2">Marriage Details</h3>
          </div>
          <div>
            <label>Manglik</label>
            <select name="manglik" className="border p-2 w-full" onChange={handleChange}   >
              <option value="">Select YES or NO</option>
              <option value="Yes">Yes-Anshik</option>
              <option value="Yes">Yes-Purn</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label>Marital Status</label>
            <select name="maritalStatus" className="border p-2 w-full" onChange={handleChange}  >
              <option value="">Select</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorved">Divorved</option>
              <option value="Widowed">Widowed</option>      
            </select>
          </div>

        

          <div>
            <label> Religion </label>
            <select name="religion" className="border p-2 w-full" onChange={handleChange}  required >
              <option value="">Select</option>
              <option value="Hindu">Hindu</option>
              <option value="Sikh">Sikh</option>
              <option value="Jain">Jain </option>
             
            </select>
          </div>
          <div>
            <label>Caste</label>
            <input type="text" name="caste" className="border p-2 w-full" onChange={handleChange}   />
          </div>

          <div>
            <label>Gotra</label>
            <input type="text" name="gotra" className="border p-2 w-full" onChange={handleChange}   />
          </div>

         

          {/* Education & Job Section */}
          <div className="col-span-2">
            <h3 className="font-bold text-lg mb-2">Education & Job Details</h3>
          </div>
          <div>
            <label>Qualification</label>
            <select name="qualification" className="border p-2 w-full" onChange={handleChange}   >
              <option value="">Select Qualification</option>
              <option value="bachelors">Bachelors</option>
              <option value="masters">Masters</option>
              <option value="doctorate">Doctor</option>
              <option value="doctorate">High Schoo</option>
              <option value="doctorate">Associate Degree</option>
              <option value="doctorate">Technical Schoo</option>
              <option value="doctorate">MBBS</option>
              <option value="doctorate">JD</option>
              <option value="doctorate">MD</option>
              <option value="doctorate">Phd</option>
              <option value="doctorate">CA/ACCA</option>
              <option value="doctorate">Other</option>
            </select>
          </div>
          <div>
            <label>Field of Study</label>
            <input type="text" name="fieldOfStudy" className="border p-2 w-full" onChange={handleChange}   />
          </div>

          <div>
            <label>Occupation</label>
            <input type="text" name="occupation" className="border p-2 w-full" onChange={handleChange}   />
          </div>

          <div>
            <label>Occupation Details</label>
            <select name="occupationDetails" className="border p-2 w-full" onChange={handleChange}   >
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
            <label>Nature of Job</label>
            <input type="text" name="natureOfJob" className="border p-2 w-full" onChange={handleChange}   />
          </div>
          <div>
            <label>Place of Work</label>
            <input type="text" name="placeOfWork" className="border p-2 w-full" onChange={handleChange}   />
          </div>
          <div>
            <label>Income in LPA</label>
            <input type="float" name="incomeInLPA" className="border p-2 w-full" onChange={handleChange}   />
          </div>
 

        

          {/* Family Information */}
          <div className="col-span-2">
            <h3 className="font-bold text-lg mb-2">Family Information</h3>
          </div>
          <div>
            <label>Father's Name</label>
            <input type="text" name="fatherName" className="border p-2 w-full" onChange={handleChange}   />
          </div>
          <div>
            <label>Father's Occupation</label>
            <input type="text" name="fatherOccupation" className="border p-2 w-full" onChange={handleChange}   />
          </div>
          <div>
            <label>Mother's Name</label>
            <input type="text" name="motherName" className="border p-2 w-full" onChange={handleChange}   />
          </div>
          <div>
            <label>Mother's Occupation</label>
            <input type="text" name="motherName" className="border p-2 w-full" onChange={handleChange}   />
          </div>
          
          <div>
            <label>Brother</label>
            <input type="number" name="numberOfBrothers" className="border p-2 w-full" onChange={handleChange}   />
          </div>
          <div>
            <label>Sister</label>
            <input type="number" name="numberOfSisters" className="border p-2 w-full" onChange={handleChange}   />
          </div>

          {/* Postal Address */}
          <div className="col-span-2">
        <label>Permanent Address</label>
        <textarea
          name="permanentAddress"
          className="border p-2 w-full"
          rows="3"
          onChange={handleChange}
           
        ></textarea>
      </div>
      <div>
        <label>Landmark</label>
        <input
          type="text"
          name="landmark"
          className="border p-2 w-full"
          onChange={handleChange}
           
        />
      </div>
      <div>
        <label>Pincode</label>
        <input
          type="number"
          name="pincode"
          className="border p-2 w-full"
          onChange={handleChange}
           
           
        />
      </div>
      <div>
        <label>State</label>
        <input
          type="text"
          name="state"
          className="border p-2 w-full"
          onChange={handleChange}
           
          
        />
      </div>
      <div>
        <label>District</label>
        <input
          type="text"
          name="district"
          className="border p-2 w-full"
          onChange={handleChange}
           
          
        />
      </div>
      <div>
        <label>City</label>
        <input
          type="text"
          name="city"
          className="border p-2 w-full"
          onChange={handleChange}
           
        />
      </div>
          <div className="col-span-2 mt-4 text-center">
            <button 
              type="submit" 
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
