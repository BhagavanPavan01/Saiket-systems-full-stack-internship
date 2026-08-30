import React from 'react';
import UserCard from './UserCard';

const UserList = ({ users, onEdit, onDelete }) => {
  if (!users || users.length === 0) {
    return (
      <div className="no-users">
        <p>No users found matching your criteria.</p>
      </div>
    );
  }

  return (
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
  );
};

export default UserList;