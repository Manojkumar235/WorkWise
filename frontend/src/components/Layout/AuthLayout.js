import React from 'react';
import { Outlet, Link } from 'react-router-dom'; // Combined imports

const AuthLayout = () => {
    return (
        <div className="auth-layout">
            <div className="auth-container">
                <div className="auth-header">
                    <Link to="/" className="auth-brand">🚀 WorkWise</Link>
                </div>
                {/* The Login or Register page will be rendered here */}
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;