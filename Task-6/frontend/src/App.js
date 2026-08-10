import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import {
  registerUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser
} from './services/api';
import AIAssistant from './components/AIAssistant';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);

  // Debug state
  const [debugInfo, setDebugInfo] = useState('');

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const userData = localStorage.getItem('currentUser');

    console.log('App mounted - Token exists:', !!token, 'User data exists:', !!userData);
    setDebugInfo(`App mounted - Token: ${!!token}, User: ${!!userData}`);

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        console.log('Parsed user:', parsedUser);
        setCurrentUser(parsedUser);
        loadUsers();
      } catch (error) {
        console.error('Error parsing user data:', error);
        handleLogout();
      }
    }
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      console.log('Starting to load users...');
      setDebugInfo('Loading users...');

      const usersData = await getUsers();
      console.log('Raw users data from API:', usersData);
      setDebugInfo(`Loaded ${Array.isArray(usersData) ? usersData.length : 'no'} users`);

      // Handle different response formats
      let usersArray = [];
      if (Array.isArray(usersData)) {
        usersArray = usersData;
      } else if (usersData && Array.isArray(usersData.users)) {
        usersArray = usersData.users;
      } else if (usersData && usersData.data) {
        usersArray = usersData.data;
      } else {
        console.warn('Unexpected users data format:', usersData);
        usersArray = [];
      }

      console.log('Processed users array:', usersArray);
      setUsers(usersArray);
      setError('');
    } catch (error) {
      console.error('Error loading users:', error);
      setError('Failed to load users. Please try again.');
      setUsers([]);
      setDebugInfo('Error loading users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuth = async (authData) => {
    try {
      setIsLoading(true);
      setError('');
      console.log('Auth attempt:', isLogin ? 'Login' : 'Register', authData);

      let userData;
      if (isLogin) {
        userData = await loginUser({
          email: authData.email,
          password: authData.password
        });
      } else {
        userData = await registerUser(authData);
      }

      console.log('Auth response:', userData);

      // Handle different response structures
      const user = userData.user || userData;
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      setSuccess(`Successfully ${isLogin ? 'logged in' : 'registered'}!`);
      await loadUsers();
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.response?.data?.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUser = async (userData) => {
    try {
      setError('');
      console.log('Adding user:', userData);
      await registerUser(userData);
      setSuccess('User added successfully!');
      setShowUserForm(false);
      await loadUsers();
    } catch (error) {
      console.error('Add user error:', error);
      setError(error.response?.data?.message || 'Failed to add user');
    }
  };

  const handleEditUser = async (userData) => {
    try {
      setError('');
      console.log('Editing user:', editingUser._id, userData);
      await updateUser(editingUser._id, userData);
      setSuccess('User updated successfully!');
      setEditingUser(null);
      await loadUsers();
    } catch (error) {
      console.error('Edit user error:', error);
      setError(error.response?.data?.message || 'Failed to update user');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setError('');
        console.log('Deleting user:', userId);
        await deleteUser(userId);
        setSuccess('User deleted successfully!');
        await loadUsers();
      } catch (error) {
        console.error('Delete user error:', error);
        setError(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('userToken');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setUsers([]);
    setSuccess('Logged out successfully!');
    setDebugInfo('Logged out');
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  // Debug component to show current state
  const DebugPanel = () => (
    <div style={{
      background: '#f8f9fa',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #dee2e6',
      borderRadius: '4px',
      fontSize: '12px'
    }}>
      <strong>Debug Info:</strong> {debugInfo} |
      <strong> Users Count:</strong> {users.length} |
      <strong> Current User:</strong> {currentUser ? currentUser.name : 'None'} |
      <strong> Loading:</strong> {isLoading ? 'Yes' : 'No'}
      <button
        onClick={loadUsers}
        style={{ marginLeft: '10px', padding: '2px 8px', fontSize: '10px' }}
      >
        Reload Users
      </button>
    </div>
  );

  // Simple login form component
  const AuthForm = () => (
    <div className="auth-form">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const authData = isLogin ? {
          email: formData.get('email'),
          password: formData.get('password')
        } : {
          name: formData.get('name'),
          email: formData.get('email'),
          password: formData.get('password'),
          age: formData.get('age'),
          profession: formData.get('profession')
        };
        handleAuth(authData);
      }}>
        {!isLogin && (
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            required
          />
        </div>

        {!isLogin && (
          <>
            <div className="form-group">
              <label>Age:</label>
              <input
                type="number"
                name="age"
                required
              />
            </div>

            <div className="form-group">
              <label>Profession:</label>
              <input
                type="text"
                name="profession"
                required
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            required
            minLength="6"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
        </button>
      </form>

      <div className="auth-switch">
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            className="link-btn"
            onClick={() => {
              setIsLogin(!isLogin);
              clearMessages();
            }}
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );

  if (!currentUser) {
    return (
      <div className="app">
        <div className="auth-container">
          <div className="auth-card">
            <div className="header">
              <h1>User Management System</h1>
              <p>Please {isLogin ? 'login' : 'register'} to continue</p>
            </div>

            {error && <div className="alert error">{error}</div>}
            {success && <div className="alert success">{success}</div>}

            <AuthForm />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="main-header">
        <div className="header-content">
          <div className="header-info">
            <h1>User Management System</h1>
            <p>Welcome back, {currentUser.name}!</p>
          </div>
          <div className="user-actions">
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowUserForm(!showUserForm);
                setEditingUser(null);
              }}
            >
              {showUserForm ? 'Cancel' : 'Add User'}
            </button>
            <button className="btn btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* Debug Panel - remove in production */}
        <DebugPanel />

        {error && <div className="alert error">{error}</div>}
        {success && <div className="alert success">{success}</div>}

        {editingUser ? (
          <div className="form-section">
            <h2>Edit User</h2>
            <UserForm
              user={editingUser}
              onSave={handleEditUser}
              onCancel={() => setEditingUser(null)}
              isEdit={true}
            />
          </div>
        ) : showUserForm ? (
          <div className="form-section">
            <h2>Add New User</h2>
            <UserForm
              onSave={handleAddUser}
              onCancel={() => setShowUserForm(false)}
              isEdit={false}
            />
          </div>
        ) : null}

        <div className="users-section">
          {isLoading ? (
            <div className="loading">Loading users...</div>
          ) : (
            <UserList
              users={users}
              onEdit={(user) => {
                setEditingUser(user);
                setShowUserForm(false);
              }}
              onDelete={handleDeleteUser}
            />
          )}
        </div>
      </main>
      <AIAssistant />
    </div>
  );
}

export default App;