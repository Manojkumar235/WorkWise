import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Import Pages (use correct casing for paths)
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardLayout from './Pages/Dashboard/DashboardLayout';
import DashboardHome from './Pages/Dashboard/DashboardHome';
//import JobSearchPage from './pages/Dashboard/JobSearchPage';
//import PostJobPage from './pages/Dashboard/PostJobPage';
//import ProfilePage from './pages/Dashboard/ProfilePage';
//import MyJobsPage from './pages/Dashboard/MyJobsPage';
import AuthLayout from './components/Layout/AuthLayout';

import './App.css';

// Protected Route Component
const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loading-spinner"></div>
                <p>Loading WorkWise...</p>
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
    const { user } = useAuth();

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />

                {/* Authentication Routes with the new Layout */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
                    <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
                </Route>

                {/* Protected Dashboard Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardLayout />}>
                         <Route index element={<Navigate to="home" replace />} />
                         <Route path="home" element={<DashboardHome />} />
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;