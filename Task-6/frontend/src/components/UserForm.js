import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onSave, onCancel, isEdit = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    profession: '',
    password: ''
  });

  useEffect(() => {
    if (user && isEdit) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        age: user.age || '',
        profession: user.profession || '',
        password: '' // Don't pre-fill password for security
      });
    }
  }, [user, isEdit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="user-form">
      <h2>{isEdit ? 'Edit User' : 'Add New User'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Profession:</label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            required
          />
        </div>

        {!isEdit && (
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEdit ? 'Update User' : 'Add User'}
          </button>
          {isEdit && (
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;