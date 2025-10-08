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