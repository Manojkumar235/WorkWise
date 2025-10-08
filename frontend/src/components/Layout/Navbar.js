import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setMenuOpen] = useState(false);

    const loggedOutLinks = (
        <>
            <NavLink to="/login" className="nav-link">Login</NavLink>
            <Link to="/register" className="nav-button-primary">Register</Link>
        </>
    );

    const loggedInLinks = (
        <div className="profile-menu">
            <button onClick={() => setMenuOpen(!isMenuOpen)} className="profile-button">
                Hi, {user?.name.split(' ')[0]}
            </button>
            {isMenuOpen && (
                <div className="profile-dropdown">
                    <NavLink to="/dashboard/home" onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
                    <NavLink to="/dashboard/profile" onClick={() => setMenuOpen(false)}>My Profile</NavLink>
                    <button onClick={() => { logout(); setMenuOpen(false); }}>Logout</button>
                </div>
            )}
        </div>
    );

    return (
        <nav className="navbar modern-nav">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">🚀 WorkWise</Link>
                <div className="navbar-links">
                    {user && <NavLink to="/dashboard/find-jobs" className="nav-link">Find Jobs</NavLink>}
                    {user && (user.userType === 'HIRER' || user.userType === 'BOTH') && (
                         <NavLink to="/dashboard/post-job" className="nav-link">Post a Job</NavLink>
                    )}
                </div>
                <div className="navbar-auth">
                    {user ? loggedInLinks : loggedOutLinks}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;