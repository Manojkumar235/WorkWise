import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const HomePage = () => {
    const navigate = useNavigate();
    const [view, setView] = useState('worker'); // 'worker' or 'hirer'

    return (
        <div className="landing-page">
            <Navbar />

            {/* Hero Section */}
            <header className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Your Next Opportunity is Around the Corner.</h1>
                    <p className="hero-subtitle">The smartest way to find local jobs and hire skilled workers in India.</p>
                    <div className="hero-search-box">
                        <input type="text" placeholder="e.g., 'Construction', 'Farming', 'Cleaning'" />
                        <button onClick={() => navigate('/register')} className="hero-search-button">Get Started</button>
                    </div>
                </div>
            </header>

            <main>
                {/* How It Works Section */}
                <section className="how-it-works-section">
                    <h2 className="section-title">How WorkWise Works</h2>
                    <div className="toggle-buttons">
                        <button onClick={() => setView('worker')} className={view === 'worker' ? 'active' : ''}>For Workers 👷</button>
                        <button onClick={() => setView('hirer')} className={view === 'hirer' ? 'active' : ''}>For Hirers 🏢</button>
                    </div>
                    <div className="steps-container">
                        {view === 'worker' ? (
                            <>
                                <div className="step-card"><span>1</span><h3>Create Profile</h3><p>Showcase your skills and experience in minutes.</p></div>
                                <div className="step-card"><span>2</span><h3>Find Local Jobs</h3><p>Get matched with jobs near you based on your skills.</p></div>
                                <div className="step-card"><span>3</span><h3>Get Hired</h3><p>Connect with hirers and start your next job.</p></div>
                            </>
                        ) : (
                            <>
                                <div className="step-card"><span>1</span><h3>Post a Job</h3><p>Describe your needs, location, and budget.</p></div>
                                <div className="step-card"><span>2</span><h3>Find Workers</h3><p>Browse profiles or let our AI match you with talent.</p></div>
                                <div className="step-card"><span>3</span><h3>Hire with Confidence</h3><p>Choose the best worker based on skills and reviews.</p></div>
                            </>
                        )}
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="cta-section">
                    <div className="cta-content">
                        <h2>Ready to Get Started?</h2>
                        <p>Join thousands of users finding success on WorkWise today.</p>
                        <div className="cta-buttons">
                            <Link to="/register?type=worker" className="btn-primary-large">Find Work Now</Link>
                            <Link to="/register?type=hirer" className="btn-secondary-large">Hire Talent Today</Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;