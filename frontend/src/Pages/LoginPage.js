import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../features/auth/components/Login';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleAuthSuccess = (data) => {
        // 'data' contains { token, name, email, userType, userId } from backend
        login(data); // AuthContext handles the storage
        navigate('/dashboard');
    };

    return (
        <div className="auth-page">
            {/* The Login component is existing form from src/components/Auth/Login.js */}
            <Login onLogin={handleAuthSuccess} switchToRegister={() => navigate('/register')} />
        </div>
    );
};

export default LoginPage;