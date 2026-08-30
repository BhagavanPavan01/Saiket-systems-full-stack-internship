import React from 'react';

const UserCard = ({ user, onEdit, onDelete }) => {
  const userName = user?.name || 'Unknown User';
  const userEmail = user?.email || 'No email';
  const userAge = user?.age || 'N/A';
  const userProfession = user?.profession || 'Not specified';

  // Extract initials for the avatar
  const initials = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="user-card glass">
      <div className="card-header">
        <div className="avatar">{initials}</div>
        <div className="user-info">
          <h3>{userName}</h3>
          <p className="role">{userProfession}</p>
        </div>
      </div>

      <div className="card-body">
        <div className="info-row">
          <span>Email</span>
          <span>{userEmail}</span>
        </div>
        <div className="info-row">
          <span>Age</span>
          <span>{userAge} years</span>
        </div>
      </div>

      <div className="user-actions">
        <button className="btn btn-edit" onClick={() => onEdit(user)}>Edit</button>
        <button className="btn btn-delete" onClick={() => onDelete(user._id || user.id)}>Delete</button>
      </div>
    </div>
  );
};

export default UserCard;