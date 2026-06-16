import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX, FiLock, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    
    const navigate = useNavigate();
    const location = useLocation();
    
    const token = localStorage.getItem('adminToken');
    const isAdminPage = location.pathname.startsWith('/admin');

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setMenuOpen(false);
        navigate('/');
    };

    // Smooth scroll handler for anchor links
    const handleAnchorClick = (e, targetId) => {
        e.preventDefault();
        setMenuOpen(false);
        
        if (location.pathname !== '/') {
            navigate('/');
            // Wait for navigation to complete before scrolling
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.getElementById(targetId);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className={`header-nav ${scrolled ? 'scrolled' : ''}`}>
            <div className="nav-content">
                <Link to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-primary)', filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.4))' }}>
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                        <circle cx="12" cy="7" r="2" fill="var(--accent-secondary)" stroke="var(--accent-secondary)"></circle>
                    </svg>
                    <span style={{ fontFamily: 'var(--font-code)', fontSize: '1.25rem', letterSpacing: '-0.5px' }}>
                        <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>HK_Stack</span>
                        <span style={{ color: 'var(--accent-secondary)', fontWeight: '600' }}>.AI</span>
                    </span>
                </Link>

                <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>

                <ul className={`nav-links ${menuOpen ? 'active' : ''}`} style={{ margin: 0 }}>
                    {isAdminPage ? (
                        <>
                            <li><Link to="/" onClick={() => setMenuOpen(false)}>View Site</Link></li>
                            <li><Link to="/admin" onClick={() => setMenuOpen(false)} className="active">Dashboard</Link></li>
                            {token && (
                                <li>
                                    <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                                        <FiLogOut /> Logout
                                    </button>
                                </li>
                            )}
                        </>
                    ) : (
                        <>
                            <li><a href="#hero" onClick={(e) => handleAnchorClick(e, 'hero')} className="active">Home</a></li>
                            <li><a href="#about" onClick={(e) => handleAnchorClick(e, 'about')}>About</a></li>
                            <li><a href="#skills" onClick={(e) => handleAnchorClick(e, 'skills')}>Skills</a></li>
                            <li><a href="#projects" onClick={(e) => handleAnchorClick(e, 'projects')}>Projects</a></li>
                            <li><a href="#education" onClick={(e) => handleAnchorClick(e, 'education')}>Education</a></li>
                            <li><a href="#contact" onClick={(e) => handleAnchorClick(e, 'contact')}>Contact</a></li>
                            
                            {token ? (
                                <li>
                                    <Link to="/admin" className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <FiLock /> Admin Portal
                                    </Link>
                                </li>
                            ) : (
                                <li>
                                    <Link to="/admin" style={{ padding: '6px' }} title="Admin Login" aria-label="Admin Portal">
                                        <FiLock style={{ opacity: 0.6 }} />
                                    </Link>
                                </li>
                            )}
                        </>
                    )}

                    <li>
                        <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
                            {theme === 'dark' ? <FiSun /> : <FiMoon />}
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
