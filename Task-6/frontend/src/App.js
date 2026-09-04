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

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
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
// Home Page Component
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <header style={{ padding: '20px 40px', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563eb', fontWeight: 'bold', fontSize: '24px' }}>
          <GraduationCap size={32} />
          <span>Bpcreatives</span>
        </div>
        <button onClick={() => navigate('/login')} style={{ padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
          Login Portal
        </button>
      </header>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', color: '#1f2937', marginBottom: '20px', fontWeight: '800' }}>Student Management System</h1>
        <p style={{ fontSize: '18px', color: '#4b5563', maxWidth: '600px', marginBottom: '40px' }}>Streamline your educational journey with our comprehensive management platform. Designed for students, teachers, and administrators.</p>
        <button onClick={() => navigate('/login')} style={{ padding: '16px 32px', background: '#e11d48', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 6px rgba(225, 29, 72, 0.3)' }}>
          Get Started
        </button>
      </main>
      <footer style={{ padding: '20px', textAlign: 'center', color: '#6b7280', fontSize: '14px', background: 'white' }}>
        &copy; {new Date().getFullYear()} Bpcreatives. All rights reserved.
      </footer>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const u = await login(email, password);
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
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#666', marginBottom: '20px' }}>Sign in to access your portal.</p>
        <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '12px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
        <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '24px', border: '1px solid #e5e7eb', borderRadius: '6px' }} />
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Secure Login</button>
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

// Admin Dashboard features
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

const AdminUsers = ({ roleType }) => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: roleType, department: '', grade: '' });

  const fetchUsers = () => {
    axios.get(`${API_URL}/users?role=${roleType}`).then(res => setUsers(res.data)).catch(console.error);
  };

  useEffect(() => { fetchUsers(); }, [roleType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/users`, form);
      alert('User created!');
      setForm({ name: '', email: '', password: '', role: roleType, department: '', grade: '' });
      fetchUsers();
    } catch (err) {
      alert('Error creating user: ' + err.response?.data?.message || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await axios.delete(`${API_URL}/users/${id}`);
      fetchUsers();
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '24px' }}>
      <div className="student-card">
        <h3>Create {roleType}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          <input type="text" placeholder="Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          <input type="email" placeholder="Email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          <input type="password" placeholder="Password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          {roleType === 'student' && (
            <>
              <input type="text" placeholder="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
              <input type="text" placeholder="Grade/Class" value={form.grade} onChange={e => setForm({ ...form, grade: e.target.value })} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
            </>
          )}
          <button type="submit" style={{ padding: '10px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add {roleType}</button>
        </form>
      </div>
      <div className="student-card" style={{ height: 'fit-content' }}>
        <h3>Existing {roleType}s</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
          {users.map(u => (
            <div key={u._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
              <div>
                <strong>{u.name}</strong>
                <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>{u.email} {u.department ? `- ${u.department}` : ''}</p>
              </div>
              <button onClick={() => handleDelete(u._id)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
            </div>
          ))}
          {users.length === 0 && <p style={{ color: '#9ca3af' }}>No {roleType}s found.</p>}
        </div>
      </div>
    </div>
  );
};

const TeacherPortal = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ studentId: '', type: 'attendance', date: '', status: 'Present', subject: '', marks: '', maxMarks: '' });

  useEffect(() => {
    axios.get(`${API_URL}/users?role=student`).then(res => setStudents(res.data)).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.type === 'attendance') {
        await axios.post(`${API_URL}/attendance`, { student: form.studentId, date: form.date, status: form.status });
        alert('Attendance added successfully!');
      } else {
        const grade = (form.marks / form.maxMarks) >= 0.9 ? 'A+' : (form.marks / form.maxMarks) >= 0.8 ? 'A' : (form.marks / form.maxMarks) >= 0.7 ? 'B' : 'C';
        await axios.post(`${API_URL}/scores`, {
          student: form.studentId,
          course: form.subject,
          subject: form.subject,
          marks: Number(form.marks),
          totalMarks: Number(form.maxMarks),
          grade
        });
        alert('Marks assigned successfully!');
      }
      setForm({ ...form, subject: '', marks: '', maxMarks: '' });
    } catch (err) {
      alert('Error submitting data: ' + err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h1 className="page-title">Teacher Action Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', gap: '24px' }}>
        <div className="student-card">
          <h3>Record Academic Data</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
              <option value="attendance">Add Student Attendance</option>
              <option value="marks">Assign Marks / Conduct Assignment</option>
            </select>
            <select required value={form.studentId} onChange={e => setForm({ ...form, studentId: e.target.value })} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
              <option value="">-- Select Student --</option>
              {students.map(s => <option key={s._id} value={s._id}>{s.name} ({s.email})</option>)}
            </select>

            {form.type === 'attendance' ? (
              <>
                <input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </>
            ) : (
              <>
                <input type="text" placeholder="Subject / Assignment Name" required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input type="number" placeholder="Marks Obtained" required value={form.marks} onChange={e => setForm({ ...form, marks: e.target.value })} style={{ padding: '10px', flex: 1, border: '1px solid #ccc', borderRadius: '4px' }} />
                  <input type="number" placeholder="Max Marks" required value={form.maxMarks} onChange={e => setForm({ ...form, maxMarks: e.target.value })} style={{ padding: '10px', flex: 1, border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>
              </>
            )}
            <button type="submit" style={{ padding: '12px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
              Submit Data
            </button>
          </form>
        </div>
        <div className="student-card">
          <h3>Quick Help</h3>
          <p style={{ color: '#4b5563', lineHeight: '1.6' }}>
            Welcome to the Teacher Action Board. From here you can manage all primary interactions with your students.<br /><br />
            - <strong>Attendance:</strong> Select a date and mark a student Present or Absent.<br />
            - <strong>Assignments:</strong> Input the assignment name, scored marks, and maximum possible marks. The grade will be calculated automatically based on standard percentages.
          </p>
        </div>
      </div>
    </div>
  );
};


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
          <div className="student-card">
            <h3 style={{ marginBottom: '16px' }}>Attendance History</h3>
            {attendance.map(a => (
              <div key={a._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                <span>{new Date(a.date).toLocaleDateString()}</span>
                <strong style={{ color: a.status === 'Present' ? '#16a34a' : '#ef4444' }}>{a.status}</strong>
              </div>
            ))}
            {attendance.length === 0 && <p style={{ color: '#999' }}>No attendance records.</p>}
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
        <Route path="/" element={!user ? <HomePage /> : <Navigate to={`/${user.role}/dashboard`} />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to={`/${user.role}/dashboard`} />} />

        <Route path="/admin/dashboard" element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} />
        <Route path="/admin/students" element={<PrivateRoute roles={['admin']}><AdminUsers roleType="student" /></PrivateRoute>} />
        <Route path="/admin/teachers" element={<PrivateRoute roles={['admin']}><AdminUsers roleType="teacher" /></PrivateRoute>} />

        <Route path="/teacher/dashboard" element={<PrivateRoute roles={['teacher']}><TeacherPortal /></PrivateRoute>} />
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