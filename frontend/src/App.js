import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import NetworkStatus from './shared/components/NetworkStatus';

// Import Pages (use correct casing for paths)
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import DashboardLayout from './Pages/Dashboard/DashboardLayout';
import DashboardHome from './Pages/Dashboard/DashboardHome';
import JobSearchPage from './Pages/Dashboard/JobSearchPage';
import PostJobPage from './Pages/Dashboard/PostJobPage';
import ProfilePage from './Pages/Dashboard/ProfilePage';
import MyJobsPage from './Pages/Dashboard/MyJobsPage';
import WorkerSearchPage from './Pages/Dashboard/WorkerSearchPage';
import JobDetailPage from './Pages/Dashboard/JobDetailPage';
import AuthLayout from './components/Layout/AuthLayout';
import OnboardingPage from './Pages/OnboardingPage';

// Landing Site Pages
import AboutPage from './Pages/Landing/AboutPage';
import FAQPage from './Pages/Landing/FAQPage';
import ContactPage from './Pages/Landing/ContactPage';
import PrivacyPage from './Pages/Landing/PrivacyPage';
import TermsPage from './Pages/Landing/TermsPage';

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
            <NetworkStatus />
            <Routes>
                {/* Public Landing Site Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />

                {/* Authentication Routes with the new Layout */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
                    <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
                </Route>

                <Route path="/onboarding" element={user ? <OnboardingPage /> : <Navigate to="/login" />} />

                {/* Protected Dashboard Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<DashboardLayout />}>
                         <Route index element={<Navigate to="home" replace />} />
                         <Route path="home" element={<DashboardHome />} />
                         <Route path="find-jobs" element={<JobSearchPage />} />
                         <Route path="post-job" element={<PostJobPage />} />
                         <Route path="my-jobs" element={<MyJobsPage />} />
                         <Route path="profile" element={<ProfilePage />} />
                         <Route path="find-workers" element={<WorkerSearchPage />} />
                         <Route path="jobs/:id" element={<JobDetailPage />} />
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;