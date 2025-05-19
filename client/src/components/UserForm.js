import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputMask from 'react-input-mask';


const UserForm = ({ onSubmit, users, editingUser }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingUser) {
      setFormData({
        name: editingUser.name,
        email: editingUser.email,
        phone: editingUser.phone,
        address: editingUser.address
      });
    } else if (id && users) {
      const userToEdit = users.find((user) => user._id === id);
      if (userToEdit) {
        setFormData({
          name: userToEdit.name,
          email: userToEdit.email,
          phone: userToEdit.phone,
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
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid. Format: (+91) 123456789';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log('Submitting form data:', formData);
    if (id) {
      onSubmit(id, formData);
    } else {
      onSubmit(formData);
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
        <label htmlFor="phone">Phone Number:</label>
        <div className="phone-input-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="phone-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            width="20"
            height="20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5h2l3.6 7.59-1.35 2.44a11.042 11.042 0 005.15 5.15l2.44-1.35L19 19v2a2 2 0 01-2 2c-9.94 0-18-8.06-18-18a2 2 0 012-2z"
            />
          </svg>
          <InputMask
            mask="(+91) 123456789"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(+91) 123456789"
          />
        </div>
        {errors.phone && <small className="error">{errors.phone}</small>}
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
