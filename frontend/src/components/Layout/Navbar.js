import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { language, setLanguage, translations } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setMenuOpen] = useState(false);

    const loggedOutLinks = (
        <>
            <NavLink to="/login" className="nav-link">{translations.login}</NavLink>
            <Link to="/register" className="nav-button-primary">{translations.register}</Link>
        </>
    );

    const loggedInLinks = (
        <div className="profile-menu">
            <button onClick={() => setMenuOpen(!isMenuOpen)} className="profile-button">
                {translations.hiUser} {user?.name.split(' ')[0]}
            </button>
            {isMenuOpen && (
                <div className="profile-dropdown">
                    <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>{translations.dashboard}</NavLink>
                    <NavLink to="/dashboard/profile" onClick={() => setMenuOpen(false)}>{translations.myProfile}</NavLink>
                    <button onClick={() => { logout(); setMenuOpen(false); }}>{translations.logout}</button>
                </div>
            )}
        </div>
    );

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">🚀 WorkWise</Link>
                <div className="navbar-auth">
                <button onClick={toggleTheme} className="theme-toggle">
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
                    <select onChange={(e) => setLanguage(e.target.value)} value={language} className="language-selector">
                        <option value="en">English</option>
                        <option value="hi">हिन्दी</option>
                        <option value="kn">ಕನ್ನಡ</option>
                    </select>
                    {user ? loggedInLinks : loggedOutLinks}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;