import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingPage.css';

const OnboardingPage = () => {
    const navigate = useNavigate();

    const handleSelect = (role) => {
        // Here you could also call an API to save the user's preference
        navigate('/dashboard');
    };

    return (
        <div className="onboarding-container">
            <div className="onboarding-card">
                <div className="onboarding-header">
                    <h1 className="brand-title">WorkWise</h1>
                </div>
                
                <div className="onboarding-content">
                    <h2>What do you want to do?</h2>
                    <p className="subtitle">You can always change this later</p>

                    <div className="option-list">
                        <button className="option-card" onClick={() => handleSelect('WORKER')}>
                            <div className="option-icon-wrapper blue">
                                <span className="option-icon">💼</span>
                            </div>
                            <div className="option-text">
                                <h3>Find Work</h3>
                                <p>Browse and apply for jobs near you</p>
                            </div>
                        </button>

                        <button className="option-card" onClick={() => handleSelect('HIRER')}>
                            <div className="option-icon-wrapper light-blue">
                                <span className="option-icon">👥</span>
                            </div>
                            <div className="option-text">
                                <h3>Hire Workers</h3>
                                <p>Post jobs and find skilled workers</p>
                            </div>
                        </button>
                    </div>

                    <button className="btn-outline-primary" onClick={() => handleSelect('BOTH')}>
                        I want to do Both
                    </button>
                </div>
                
                <div className="onboarding-footer">
                    <span className="help-icon">?</span>
                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;
