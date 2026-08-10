import React from 'react';

const UserCard = ({ user, onEdit, onDelete }) => {
  // Safe data handling
  const userName = user?.name || 'Unknown User';
  const userEmail = user?.email || 'No email';
  const userAge = user?.age || 'N/A';
  const userProfession = user?.profession || 'Not specified';
  const joinedDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown';

  return (
    <div className="user-card">
      <div className="user-info">
        <h3>{userName}</h3>
        <p><strong>Email:</strong> {userEmail}</p>
        <p><strong>Age:</strong> {userAge}</p>
        <p><strong>Profession:</strong> {userProfession}</p>
        <p><strong>Joined:</strong> {joinedDate}</p>
      </div>
      <div className="user-actions">
        <button 
          className="btn btn-edit"
          onClick={() => onEdit(user)}
        >
          Edit
        </button>
        <button 
          className="btn btn-delete"
          onClick={() => onDelete(user._id || user.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;