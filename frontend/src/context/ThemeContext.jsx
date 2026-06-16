import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Theme State
    const [theme, setTheme] = useState(() => {
        const localTheme = localStorage.getItem('theme');
        return localTheme || 'dark'; // default theme is dark
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    // Toast Notifications State
    const [toasts, setToasts] = useState([]);

    const showToast = (message, type = 'success', duration = 4000) => {
        const id = Date.now() + Math.random().toString(36).substr(2, 9);
        setToasts(prevToasts => [...prevToasts, { id, message, type }]);
        
        setTimeout(() => {
            setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
        }, duration);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, showToast }}>
            {children}
            
            {/* Toast Container Render */}
            <div className="toast-container">
                {toasts.map(toast => (
                    <div key={toast.id} className={`toast toast-${toast.type}`}>
                        <span>{toast.message}</span>
                    </div>
                ))}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
