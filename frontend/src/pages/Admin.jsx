import React, { useState, useEffect } from 'react';
import { adminLogin, adminSignup, fetchMessages, deleteMessage } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { FiLock, FiSearch, FiTrash2, FiDownload, FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Admin = () => {
    const { showToast } = useTheme();
    const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
    
    // Auth Login states
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [loggingIn, setLoggingIn] = useState(false);
    const [isSignupMode, setIsSignupMode] = useState(false);

    // Messages States
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        if (token) {
            loadMessages();
        }
    }, [token, page, search]);

    const loadMessages = async () => {
        setLoading(true);
        try {
            const res = await fetchMessages(token, page, search);
            if (res.success) {
                setMessages(res.data);
                setTotalPages(res.pagination.pages);
                setTotalItems(res.pagination.total);
            }
        } catch (err) {
            console.error(err);
            if (err.response?.status === 401) {
                showToast('Session expired, please login again.', 'error');
                handleLogout();
            } else {
                showToast('Failed to retrieve contact messages.', 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
    };

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        if (!loginData.username || !loginData.password) {
            showToast('Email and password are required', 'error');
            return;
        }

        setLoggingIn(true);
        try {
            if (isSignupMode) {
                const res = await adminSignup(loginData.username, loginData.password);
                if (res.success) {
                    showToast(res.message || 'Signed up successfully! Please log in.', 'success');
                    setIsSignupMode(false); // Switch back to login
                }
            } else {
                const res = await adminLogin(loginData.username, loginData.password);
                if (res.success) {
                    localStorage.setItem('adminToken', res.token);
                    setToken(res.token);
                    showToast('Logged in successfully.', 'success');
                }
            }
        } catch (err) {
            console.error(err);
            showToast(err.response?.data?.message || 'Authentication failed.', 'error');
        } finally {
            setLoggingIn(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setToken('');
        setMessages([]);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this message record?')) return;
        
        try {
            const res = await deleteMessage(token, id);
            if (res.success) {
                showToast(res.message, 'success');
                // Refresh message list
                loadMessages();
            }
        } catch (err) {
            console.error(err);
            showToast('Failed to delete message.', 'error');
        }
    };

    // Export messages state to CSV File downloader
    const handleExportCSV = () => {
        if (messages.length === 0) {
            showToast('No message records to export.', 'error');
            return;
        }

        const csvHeaders = ['Date', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'IP Address'];
        const csvRows = messages.map(msg => [
            new Date(msg.createdAt).toLocaleString().replace(/,/g, ''),
            `"${msg.name.replace(/"/g, '""')}"`,
            msg.email,
            msg.phone,
            `"${msg.subject.replace(/"/g, '""')}"`,
            `"${msg.message.replace(/"/g, '""')}"`,
            msg.ipAddress || ''
        ]);

        const csvContent = [
            csvHeaders.join(','),
            ...csvRows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `portfolio_messages_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('Submissions exported to CSV.', 'success');
    };

    // Render Login Interface
    if (!token) {
        return (
            <div className="section-container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="glass-card" style={{ maxWidth: '400px', width: '100%', padding: '40px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', fontSize: '1.5rem', marginBottom: '16px' }}>
                            <FiLock />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>{isSignupMode ? 'Admin Sign Up' : 'Admin Portal'}</h2>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-dark)', marginTop: '8px' }}>
                            {isSignupMode ? 'Create a secure admin credentials account' : 'Log in to view portfolio contact submissions'}
                        </p>
                    </div>

                    <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ position: 'relative' }}>
                            <input 
                                type="email" 
                                className="form-input" 
                                name="username"
                                placeholder=" "
                                value={loginData.username} 
                                onChange={handleLoginChange} 
                                required 
                            />
                            <label className="form-label">Email Address</label>
                        </div>

                        <div style={{ position: 'relative' }}>
                            <input 
                                type="password" 
                                className="form-input" 
                                name="password"
                                placeholder=" "
                                value={loginData.password} 
                                onChange={handleLoginChange} 
                                required 
                            />
                            <label className="form-label">Password</label>
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={loggingIn} style={{ width: '100%', marginTop: '10px' }}>
                            {loggingIn ? (isSignupMode ? 'Registering...' : 'Logging in...') : (isSignupMode ? 'Register Account' : 'Sign In')}
                        </button>
                        
                        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.85rem' }}>
                            <button 
                                type="button" 
                                onClick={() => setIsSignupMode(!isSignupMode)}
                                style={{ background: 'none', border: 'none', color: 'var(--accent-secondary)', cursor: 'pointer', textDecoration: 'underline' }}
                            >
                                {isSignupMode ? 'Already have an admin account? Sign In' : 'Create new admin credentials? Sign Up'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // Render Dashboard Interface
    return (
        <div className="section-container" style={{ minHeight: '80vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)' }}>Submissions Dashboard</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>Total Messages: {totalItems}</p>
                </div>
                <button className="btn btn-secondary" onClick={handleExportCSV} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FiDownload /> Export CSV
                </button>
            </div>

            <div className="glass-card" style={{ padding: '24px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div className="search-wrapper" style={{ flexGrow: 1, maxWidth: '100%' }}>
                        <FiSearch />
                        <input 
                            type="text" 
                            className="search-input" 
                            placeholder="Search by name, email, subject, text..." 
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1); // reset page to 1 on search
                            }}
                        />
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            ) : messages.length === 0 ? (
                <div className="glass-card" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No contact submissions found matching criteria.
                </div>
            ) : (
                <>
                    <div className="admin-table-container glass-card">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Contact Info</th>
                                    <th>Subject & Message</th>
                                    <th>Metadata</th>
                                    <th style={{ textAlign: 'center' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map(msg => (
                                    <tr key={msg._id}>
                                        <td style={{ whiteSpace: 'nowrap', fontSize: '0.85rem' }}>
                                            {new Date(msg.createdAt).toLocaleString()}
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{msg.name}</div>
                                            <div style={{ fontSize: '0.8rem', marginTop: '2px' }}><a href={`mailto:${msg.email}`}>{msg.email}</a></div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-dark)', marginTop: '2px' }}>{msg.phone}</div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px' }}>{msg.subject}</div>
                                            <div style={{ fontSize: '0.85rem', whiteSpace: 'pre-wrap' }}>{msg.message}</div>
                                        </td>
                                        <td style={{ fontSize: '0.8rem', color: 'var(--text-dark)' }}>
                                            <div>IP: {msg.ipAddress || 'Unknown'}</div>
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <button 
                                                className="btn btn-secondary" 
                                                onClick={() => handleDelete(msg._id)} 
                                                style={{ color: '#ef4444', border: '1px solid rgba(239,68,68,0.2)', padding: '8px 12px' }}
                                                title="Delete entry"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="pagination-wrap">
                            <button 
                                className="page-btn" 
                                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                disabled={page === 1}
                            >
                                <FiChevronLeft />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                                <button 
                                    key={pageNum} 
                                    className={`page-btn ${pageNum === page ? 'active' : ''}`}
                                    onClick={() => setPage(pageNum)}
                                >
                                    {pageNum}
                                </button>
                            ))}
                            <button 
                                className="page-btn" 
                                onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={page === totalPages}
                            >
                                <FiChevronRight />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Admin;
