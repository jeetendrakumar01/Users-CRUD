import React from 'react';

const UserList = ({ users, onEdit, onDelete }) => {
  const handleEdit = (user) => {
    onEdit(user);
  };

  const handleAdd = () => {
    onEdit(null); 
  };

  return (
    <div>
      <button
        className="btn btn-add"
        onClick={handleAdd}
        style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', marginBottom: '10px' }}
      >
        Add
      </button>
      {users.length === 0 ? (
        <p>No users found. Please add some.</p>
      ) : (
        <table className="user-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#343a40', color: 'white' }}>
              <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Name</th>
              <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Email</th>
              <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Phone Number</th>
              <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Address</th>
              <th style={{ padding: '10px', border: '1px solid #dee2e6' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{user.name}</td>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{user.email}</td>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{user.phone}</td>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>{user.address}</td>
                <td style={{ padding: '10px', border: '1px solid #dee2e6' }}>
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEdit(user)}
                    style={{ backgroundColor: '#ffc107', color: 'black', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' }}
                    title="Edit User"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => onDelete(user._id)}
                    style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
                    title="Delete User"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
