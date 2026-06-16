import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="footer-content">
                <Link to="/" className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-primary)' }}>
                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                        <polyline points="2 17 12 22 22 17"></polyline>
                        <polyline points="2 12 12 17 22 12"></polyline>
                        <circle cx="12" cy="7" r="1.5" fill="var(--accent-secondary)" stroke="var(--accent-secondary)"></circle>
                    </svg>
                    <span style={{ fontFamily: 'var(--font-code)', fontSize: '1.05rem', letterSpacing: '-0.5px' }}>
                        <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>HK_Stack</span>
                        <span style={{ color: 'var(--accent-secondary)', fontWeight: '600' }}>.AI</span>
                    </span>
                </Link>
                <span className="footer-copy">&copy; {new Date().getFullYear()} Haribhushan Kumar. All rights reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;
