import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import { useLanguage } from '../context/LanguageContext';

const HomePage = () => {
    const navigate = useNavigate();
    const { translations } = useLanguage();
    const [view, setView] = useState('worker'); // 'worker' or 'hirer'

    return (
        <div className="landing-page">
            <Navbar />

            <header className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">{translations.heroTitle}</h1>
                    <p className="hero-subtitle">{translations.heroSubtitle}</p>
                    <div className="hero-search-box">
                        <input type="text" placeholder="e.g., 'Construction', 'Farming', 'Cleaning'" />
                        <button onClick={() => navigate('/register')} className="hero-search-button">{translations.getStarted}</button>
                    </div>
                </div>
            </header>

            <main>
                {/* Trust Signals Section */}
                <section className="trust-signals-section">
                    <div className="container">
                        <div className="trust-stats">
                            <div className="trust-stat">
                                <h3>10,000+</h3>
                                <p>Active Workers</p>
                            </div>
                            <div className="trust-stat">
                                <h3>5,000+</h3>
                                <p>Jobs Completed</p>
                            </div>
                            <div className="trust-stat">
                                <h3>4.8/5</h3>
                                <p>Average Rating</p>
                            </div>
                            <div className="trust-stat">
                                <h3>98%</h3>
                                <p>Satisfaction Rate</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Problem → Solution → Outcome */}
                <section className="value-proposition-section">
                    <div className="container">
                        <h2 className="section-title">Why WorkWise?</h2>
                        <div className="value-prop-grid">
                            <div className="value-prop-card">
                                <div className="value-prop-icon">⚠️</div>
                                <h3>The Problem</h3>
                                <p>Finding reliable skilled workers is time-consuming and uncertain. Workers struggle to find consistent opportunities.</p>
                            </div>
                            <div className="value-prop-card highlight">
                                <div className="value-prop-icon">✓</div>
                                <h3>Our Solution</h3>
                                <p>WorkWise connects verified workers with employers through transparent profiles, ratings, and instant matching.</p>
                            </div>
                            <div className="value-prop-card">
                                <div className="value-prop-icon">🎯</div>
                                <h3>The Outcome</h3>
                                <p>Get work done faster with trusted professionals. Workers earn more with consistent opportunities.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="how-it-works-section">
                    <h2 className="section-title">{translations.howItWorks}</h2>
                    <div className="toggle-buttons">
                        <button onClick={() => setView('worker')} className={view === 'worker' ? 'active' : ''}>{translations.forWorkers}</button>
                        <button onClick={() => setView('hirer')} className={view === 'hirer' ? 'active' : ''}>{translations.forHirers}</button>
                    </div>
                    <div className="steps-container">
                        {view === 'worker' ? (
                            <>
                                <div className="step-card"><span>1</span><h3>{translations.step1Worker}</h3><p>{translations.step1WorkerDesc}</p></div>
                                <div className="step-card"><span>2</span><h3>{translations.step2Worker}</h3><p>{translations.step2WorkerDesc}</p></div>
                                <div className="step-card"><span>3</span><h3>{translations.step3Worker}</h3><p>{translations.step3WorkerDesc}</p></div>
                            </>
                        ) : (
                            <>
                                <div className="step-card"><span>1</span><h3>{translations.step1Hirer}</h3><p>{translations.step1HirerDesc}</p></div>
                                <div className="step-card"><span>2</span><h3>{translations.step2Hirer}</h3><p>{translations.step2HirerDesc}</p></div>
                                <div className="step-card"><span>3</span><h3>{translations.step3Hirer}</h3><p>{translations.step3HirerDesc}</p></div>
                            </>
                        )}
                    </div>
                </section>

                {/* Who It's For */}
                <section className="audience-section">
                    <div className="container">
                        <h2 className="section-title">Who Uses WorkWise?</h2>
                        <div className="audience-grid">
                            <div className="audience-card">
                                <h3>Skilled Workers</h3>
                                <p>Construction workers, farmers, cleaners, electricians, plumbers, painters, gardeners, and more</p>
                            </div>
                            <div className="audience-card">
                                <h3>Homeowners</h3>
                                <p>Find reliable help for home repairs, cleaning, gardening, and maintenance</p>
                            </div>
                            <div className="audience-card">
                                <h3>Small Businesses</h3>
                                <p>Hire temporary or project-based workers for seasonal work or special projects</p>
                            </div>
                            <div className="audience-card">
                                <h3>Contractors</h3>
                                <p>Build your team with verified skilled workers for large projects</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Proof / Testimonials placeholder */}
                <section className="testimonials-section">
                    <div className="container">
                        <h2 className="section-title">What Our Users Say</h2>
                        <div className="testimonials-grid">
                            <div className="testimonial-card">
                                <p className="testimonial-text">"WorkWise helped me find consistent work. I've completed over 50 jobs and built a solid reputation."</p>
                                <p className="testimonial-author">— Rajesh K., Construction Worker</p>
                            </div>
                            <div className="testimonial-card">
                                <p className="testimonial-text">"Finding reliable workers used to take weeks. Now I can hire qualified people in hours."</p>
                                <p className="testimonial-author">— Priya S., Homeowner</p>
                            </div>
                            <div className="testimonial-card">
                                <p className="testimonial-text">"The rating system gives me confidence. I know exactly who I'm hiring based on past work."</p>
                                <p className="testimonial-author">— Amit D., Small Business Owner</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta-section">
                    <div className="cta-content">
                        <h2>{translations.ctaTitle}</h2>
                        <p>{translations.ctaSubtitle}</p>
                        <div className="cta-buttons">
                            <Link to="/register?type=worker" className="btn-primary-large">{translations.ctaWorker}</Link>
                            <Link to="/register?type=hirer" className="btn-secondary-large">{translations.ctaHirer}</Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;