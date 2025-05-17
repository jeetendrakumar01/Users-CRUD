import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import Home from './components/Home';
import Navbar from './components/Navbar';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://users-crud-7kwg.onrender.com');
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
      const res = await axios.post('https://users-crud-7kwg.onrender.com', user);
      setUsers([res.data, ...users]);
    } catch (error) {
      console.error('Error adding user:', error);
      alert(error.response?.data?.message || 'Failed to add user');
    }
  };

  const updateUser = async (id, updatedUser) => {
    try {
      const res = await axios.put(`https://users-crud-7kwg.onrender.com${id}`, updatedUser);
      setUsers(users.map((user) => (user._id === id ? res.data : user)));
      setEditingUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
      alert(error.response?.data?.message || 'Failed to update user');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  return (
    <Router>
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
    </Router>
  );
};

export default App;
