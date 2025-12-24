import React from 'react';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import '../../App.css';

const AboutPage = () => {
    return (
        <div className="landing-page">
            <Navbar />

            <main className="page-content">
                <section className="about-hero">
                    <div className="container">
                        <h1>About WorkWise</h1>
                        <p className="lead">Connecting skilled workers with opportunities, empowering communities through meaningful work.</p>
                    </div>
                </section>

                <section className="mission-section">
                    <div className="container">
                        <h2>Our Mission</h2>
                        <p>
                            WorkWise exists to bridge the gap between skilled workers and those who need their services.
                            We believe everyone deserves access to dignified work and fair opportunities, regardless of their background.
                        </p>
                        <p>
                            Our platform removes traditional barriers in the job market by providing a transparent,
                            efficient, and trust-based system where workers can showcase their skills and employers
                            can find reliable talent quickly.
                        </p>
                    </div>
                </section>

                <section className="vision-section">
                    <div className="container">
                        <h2>Our Vision</h2>
                        <p>
                            We envision a world where finding work or hiring talent is seamless, transparent, and built on trust.
                            WorkWise aims to become the go-to platform for skill-based employment,
                            especially in sectors that have traditionally been underserved by technology.
                        </p>
                    </div>
                </section>

                <section className="values-section">
                    <div className="container">
                        <h2>Our Values</h2>
                        <div className="values-grid">
                            <div className="value-card">
                                <h3>Trust</h3>
                                <p>Building credibility through verified profiles, ratings, and transparent communication.</p>
                            </div>
                            <div className="value-card">
                                <h3>Accessibility</h3>
                                <p>Making job opportunities available to everyone, everywhere, with minimal barriers.</p>
                            </div>
                            <div className="value-card">
                                <h3>Fairness</h3>
                                <p>Ensuring equal opportunity and fair compensation for all workers on our platform.</p>
                            </div>
                            <div className="value-card">
                                <h3>Efficiency</h3>
                                <p>Streamlining the hiring process to save time and resources for both parties.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="problem-solution-section">
                    <div className="container">
                        <h2>The Problem We Solve</h2>
                        <div className="problem-solution-grid">
                            <div className="problem-box">
                                <h3>For Workers</h3>
                                <ul>
                                    <li>Limited access to job opportunities</li>
                                    <li>Difficulty showcasing skills and experience</li>
                                    <li>Lack of trust from potential employers</li>
                                    <li>Inefficient job search processes</li>
                                </ul>
                            </div>
                            <div className="solution-box">
                                <h3>Our Solution</h3>
                                <ul>
                                    <li>Centralized platform with diverse opportunities</li>
                                    <li>Skill-based profiles with verified credentials</li>
                                    <li>Rating and review system building reputation</li>
                                    <li>Smart matching and instant communication</li>
                                </ul>
                            </div>
                        </div>
                        <div className="problem-solution-grid">
                            <div className="problem-box">
                                <h3>For Employers</h3>
                                <ul>
                                    <li>Hard to find reliable skilled workers</li>
                                    <li>Time-consuming screening processes</li>
                                    <li>Uncertainty about worker quality</li>
                                    <li>Limited reach to qualified candidates</li>
                                </ul>
                            </div>
                            <div className="solution-box">
                                <h3>Our Solution</h3>
                                <ul>
                                    <li>Pre-verified pool of skilled workers</li>
                                    <li>Filtered search and smart recommendations</li>
                                    <li>Transparent ratings and work history</li>
                                    <li>Access to diverse talent across regions</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-section">
                    <div className="cta-content">
                        <h2>Ready to Get Started?</h2>
                        <p>Join thousands of workers and employers already using WorkWise</p>
                        <div className="cta-buttons">
                            <a href="/register" className="btn-primary-large">Get Started</a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;
