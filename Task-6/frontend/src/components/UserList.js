import React from 'react';
import UserCard from './UserCard';

const UserList = ({ users, onEdit, onDelete }) => {
  console.log('UserList rendered with users:', users);

  if (!users || users.length === 0) {
    return (
      <div className="user-list">
        <div className="user-list-header">
          <h2>Users</h2>
          <div className="debug-info">
            No users to display (array length: {users ? users.length : 'null'})
          </div>
        </div>
        <div className="no-users">
          <p>No users found. Add your first user!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h2>Users ({users.length})</h2>
      </div>
      <div className="users-grid">
        {users.map((user, index) => (
          <UserCard
            key={user._id || user.id || `user-${index}`}
            user={user}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;