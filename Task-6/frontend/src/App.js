import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  GraduationCap, Home, FileText, CheckSquare, BookOpen,
  BarChart2, UserPlus, Image as ImageIcon, Users,
  Search, ChevronRight, Menu, LogOut, Award, Activity, Settings
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';

const API_URL = 'http://localhost:5000/api/system';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('sml_user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      axios.defaults.headers.common['Authorization'] = `Bearer ${parsed.token}`;
    }
    setLoading(false);
  }, []);

  const login = async (role, email, password) => {
    const res = await axios.post(`${API_URL}/auth/${role}/login`, { email, password });
    setUser(res.data);
    localStorage.setItem('sml_user', JSON.stringify(res.data));
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    return res.data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sml_user');
    delete axios.defaults.headers.common['Authorization'];
  };
  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>;
};

// --- COMPONENTS ---
const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const getLinks = () => {
    if (user?.role === 'admin') {
      return [
        { label: 'Admin Dashboard', icon: <Home size={18} />, path: '/admin/dashboard' },
        { label: 'Students', icon: <Users size={18} />, path: '/admin/students' },
        { label: 'Teachers', icon: <BookOpen size={18} />, path: '/admin/teachers' },
      ];
    } else if (user?.role === 'teacher') {
      return [
        { label: 'Teacher Dashboard', icon: <Home size={18} />, path: '/teacher/dashboard' },
        { label: 'My Students', icon: <Users size={18} />, path: '/teacher/students' },
      ];
    } else {
      return [
        { label: 'My Dashboard', icon: <Home size={18} />, path: '/student/dashboard' },
        { label: 'My Profile', icon: <FileText size={18} />, path: '/student/profile' }
      ];
    }
  };

  return (
    <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
      <div className="brand">
        <div className="brand-icon-wrapper"><GraduationCap className="brand-icon" size={24} /></div>
        <h2>EduManage</h2>
        <button className="close-panel" onClick={() => setMobileOpen(false)}><ChevronRight size={18} /></button>
      </div>
      <nav className="nav-menu">
        {getLinks().map(link => (
          <div className="nav-section" key={link.path}>
            <ul className="nav-list">
              <li
                className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => handleNav(link.path)}
              >
                {link.icon} <span>{link.label}</span>
              </li>
            </ul>
          </div>
        ))}
        <div className="nav-section" style={{ marginTop: 'auto' }}>
          <ul className="nav-list">
            <li className="nav-item" onClick={() => { logout(); navigate('/') }} style={{ color: '#e11d48' }}>
              <LogOut size={18} /> <span>Log out ({user?.name.split(' ')[0]})</span>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

const Header = ({ title, setMobileOpen, mobileOpen }) => (
  <header className="top-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
    <button className="mobile-menu-btn" style={{ position: 'relative', left: '0', top: '0', display: 'block', border: 'none', background: 'transparent' }} onClick={() => setMobileOpen(!mobileOpen)}>
      <Menu size={24} />
    </button>
    <div className="breadcrumbs">
      <Home size={18} className="breadcrumb-icon" />
      <ChevronRight size={16} className="breadcrumb-separator" />
      <span className="breadcrumb-current">{title}</span>
    </div>
  </header>
);

// --- PAGES ---
const Login = () => {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const u = await login(role, email, password);
      navigate(`/${u.role}/dashboard`);
    } catch (err) {
      console.error("Login failed stack:", err);
      alert('Login Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fcfcfc' }}>
      <form onSubmit={handleLogin} style={{ padding: '40px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '350px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', justifyContent: 'center' }}>
          <div style={{ background: '#ffe4e6', color: '#e11d48', padding: '8px', borderRadius: '8px' }}><GraduationCap size={24} /></div>
          <h2 style={{ fontSize: '18px', fontWeight: 600 }}>EduManage Login</h2>
        </div>
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#666', marginBottom: '20px' }}>Select role to simulate RBAC logic.</p>
        <select value={role} onChange={e => setRole(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
          <option value="admin">Admin Portal</option>
          <option value="teacher">Teacher Portal</option>
          <option value="student">Student Portal</option>
        </select>
        <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
        <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '24px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Secure Login</button>
        <p style={{ marginTop: '16px', fontSize: '11px', color: '#999', textAlign: 'center' }}>admin@school.com / adminpassword <br /> teacher@school.com / teacherpassword <br /> Jason@gmail.com / password123</p>
      </form>
    </div>
  );
};

// Reusable Students List component for Admin/Teacher
const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/users?role=student`).then(res => setStudents(res.data)).catch(console.error);
  }, []);

  const filtered = students.filter(s => s.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="content-header">
        <h1 className="page-title">Directory</h1>
        <div className="filter-container" style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="filter-input hover-focus" style={{ padding: '8px 12px 8px 32px', borderRadius: '8px', border: '1px solid #e5e7eb' }} />
        </div>
      </div>
      <div className="students-grid">
        {filtered.map(st => (
          <div className="student-column" key={st._id}>
            <div className="grade-badge">{st.grade} <span className="grade-count">1</span></div>
            <div className="student-card">
              <h3 className="student-name">{st.name}</h3>
              <div className="student-photo-wrapper"><img src={st.photo} alt={st.name} className="student-photo" /></div>
              <div className="student-details">
                <div className="detail-group"><label>Email</label><p className="detail-val">{st.email}</p></div>
                <div className="detail-group"><label>Department</label><p className="detail-val">{st.department || 'N/A'}</p></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Dashboards
const AdminDashboard = () => (
  <div>
    <h1 className="page-title" style={{ marginBottom: '24px' }}>Platform Overview</h1>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
      <div className="student-card"><h3 style={{ fontSize: '14px', color: '#666' }}>Total Students</h3><p style={{ fontSize: '32px', fontWeight: 'bold' }}>2</p></div>
      <div className="student-card"><h3 style={{ fontSize: '14px', color: '#666' }}>Total Teachers</h3><p style={{ fontSize: '32px', fontWeight: 'bold' }}>1</p></div>
      <div className="student-card"><h3 style={{ fontSize: '14px', color: '#666' }}>System Health</h3><p style={{ fontSize: '32px', fontWeight: 'bold', color: 'green' }}>99%</p></div>
    </div>
  </div>
);

const StudentDashboard = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get(`${API_URL}/myprofile`).then(res => setData(res.data)).catch(console.error);
  }, []);

  if (!data) return <div>Loading profile...</div>;

  const { profile, scores, attendance, certificates } = data;
  const gpa = scores.reduce((acc, curr) => acc + curr.marks, 0) / (scores.length || 1);

  return (
    <div>
      <h1 className="page-title" style={{ marginBottom: '24px' }}>Welcome, {profile.name}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '24px' }}>
        <div className="student-card" style={{ height: 'fit-content' }}>
          <div className="student-photo-wrapper"><img src={profile.photo} className="student-photo" alt="" /></div>
          <h3 className="student-name" style={{ marginTop: '12px' }}>{profile.name}</h3>
          <div className="detail-group"><label>Student ID</label><p>{profile.studentId}</p></div>
          <div className="detail-group"><label>Course/Dept</label><p>{profile.course} / {profile.department}</p></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="student-card"><h3 style={{ fontSize: '13px', color: '#666' }}>Avg Score</h3><p style={{ fontSize: '24px', fontWeight: 'bold' }}>{gpa}%</p></div>
            <div className="student-card"><h3 style={{ fontSize: '13px', color: '#666' }}>Certificates</h3><p style={{ fontSize: '24px', fontWeight: 'bold' }}>{certificates.length}</p></div>
          </div>

          <div className="student-card">
            <h3 style={{ marginBottom: '16px' }}>Academic Scores</h3>
            {scores.map(s => <div key={s._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}><span>{s.subject}</span><strong>{s.grade} ({s.marks}/{s.totalMarks})</strong></div>)}
            {scores.length === 0 && <p style={{ color: '#999' }}>No scores documented.</p>}
          </div>

          <div className="student-card">
            <h3 style={{ marginBottom: '16px' }}>Recognitions</h3>
            {certificates.map(c => <div key={c._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#f0fdf4', color: '#166534', borderRadius: '8px', marginBottom: '8px' }}>
              <span><Award size={16} style={{ position: 'relative', top: '3px', marginRight: '6px' }} /> {c.title}</span> <span>{c.issueDate}</span>
            </div>)}
            {certificates.length === 0 && <p style={{ color: '#999' }}>No certificates earned yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

// -- MAIN LAYOUT WRAPPER --
const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="layout">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="main-content">
        <Header title="Management Console" mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="content-area">{children}</div>
      </main>
    </div>
  );
};

// -- PRIVATE ROUTE WRAPPER --
const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  if (!user) return <Navigate to="/" />;
  if (roles && !roles.includes(user.role)) return <Navigate to={`/${user.role}/dashboard`} />;
  return <Layout>{children}</Layout>;
};

const MainRouter = () => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading configuration...</div>;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Navigate to={`/${user.role}/dashboard`} />} />

        <Route path="/admin/dashboard" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/students" element={<PrivateRoute roles={['admin']}><StudentsList /></PrivateRoute>} />
        <Route path="/admin/teachers" element={<PrivateRoute roles={['admin']}><div className="student-card"><h3>Teacher Management</h3><p>Manage faculty permissions and roles here.</p></div></PrivateRoute>} />

        <Route path="/teacher/dashboard" element={<PrivateRoute roles={['teacher']}><div className="student-card"><h3>Teacher Portal</h3><p>Quick lookup of assigned students.</p></div></PrivateRoute>} />
        <Route path="/teacher/students" element={<PrivateRoute roles={['teacher']}><StudentsList /></PrivateRoute>} />

        <Route path="/student/dashboard" element={<PrivateRoute roles={['student']}><StudentDashboard /></PrivateRoute>} />
        <Route path="/student/profile" element={<PrivateRoute roles={['student']}><StudentDashboard /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainRouter />
    </AuthProvider>
  );
}