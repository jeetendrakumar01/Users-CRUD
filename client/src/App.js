import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import Home from './components/Home';
import Navbar from './components/Navbar';

import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://users-crud-7kwg.onrender.com';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUserState] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_BASE_URL + '/users/');
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (user) => {
    try {
      const res = await axios.post(API_BASE_URL + '/users/', user);
      setUsers([res.data, ...users]);
    } catch (error) {
      console.error('Error adding user:', error);
      alert(error.response?.data?.message || 'Failed to add user');
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      const res = await axios.put(API_BASE_URL + '/users/' + id, updatedUser);
      setUsers(users.map((user) => (user._id === id ? res.data : user)));
      setEditingUserState(null);
      navigate('/users');
    } catch (error) {
      console.error('Error updating user:', error);
      alert(error.response?.data?.message || 'Failed to update user');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(API_BASE_URL + '/users/' + id);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const setEditingUser = (user) => {
    setEditingUserState(user);
    if (user) {
      navigate('/edit/' + user._id);
    } else {
      navigate('/add');
    }
  };

  return (
    <div className="container">
      <h1>  Mern-Stack Crud App  </h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/users"
          element={<UserList users={users} onEdit={setEditingUser} onDelete={deleteUser} />}
        />
        <Route
          path="/add"
          element={<UserForm onSubmit={addUser} />}
        />
        <Route
          path="/edit/:id"
          element={<UserForm users={users} editingUser={editingUser} onSubmit={updateUser} />}
        />
      </Routes>
    </div>
  );
};

export default App;
