import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';


const UserForm = ({ onSubmit, users, editingUser }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91', // Added countryCode field with a default
    phoneNumber: '', // Renamed phone to phoneNumber
    address: ''
  });

  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        email: editingUser.email,
        countryCode: editingUser.countryCode || '+91', // Handle existing countryCode or set default
        phoneNumber: editingUser.phoneNumber || '', // Handle existing phoneNumber
        address: editingUser.address
      });
    } else if (id && users) {
      const userToEdit = users.find((user) => user._id === id);
      if (userToEdit) {
        setFormData({
          name: userToEdit.name,
          email: userToEdit.email,
          countryCode: userToEdit.countryCode || '+91', // Handle existing countryCode or set default
          phoneNumber: userToEdit.phoneNumber || '', // Handle existing phoneNumber
          address: userToEdit.address
        });
      }
    }
  }, [id, users, editingUser]);

  
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value.trim()}); // Trim whitespace
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log('Submitting form data:', formData);

    // Concatenate country code and phone number for submission
    const phoneForSubmission = `${formData.countryCode}${formData.phoneNumber}`;

    if (id) {
      onSubmit(id, { ...formData, phone: phoneForSubmission });
 } else {
      onSubmit({ ...formData, phone: phoneForSubmission });
    }
    navigate('/users');
  };

  return (
    <form onSubmit={handleSubmit} className="user-form" noValidate>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <small className="error">{errors.name}</small>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <small className="error">{errors.email}</small>}
      </div>
      <div className="phone-input-container">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <div className="phone-inputs"> {/* Use a wrapper for the two phone inputs */}
          <input
            type="text"
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            placeholder="+91" // Placeholder for country code
            className="country-code-input" // Add a class for styling
          />
          <InputMask
            mask="9999999999"
            name="phoneNumber" // Changed name to phoneNumber
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        {errors.phoneNumber && <small className="error">{errors.phoneNumber}</small>}
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input id="address" name="address" value={formData.address} onChange={handleChange} />
        {errors.address && <small className="error">{errors.address}</small>}
      </div>
      <button type="submit">{id ? 'Update' : 'Add'} User</button>
    </form>
  );
};

export default UserForm;
