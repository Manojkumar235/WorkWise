import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="app-footer">
        <div className="footer-content">
            <div className="feature-highlights">
                <div className="feature">
                    <span className="icon">🌾</span>
                    <span>Agricultural Workers</span>
                </div>
                <div className="feature">
                    <span className="icon">🏗️</span>
                    <span>Construction Labor</span>
                </div>
                <div className="feature">
                    <span className="icon">🏠</span>
                    <span>Domestic Services</span>
                </div>
                <div className="feature">
                    <span className="icon">🤖</span>
                    <span>AI-Powered Matching</span>
                </div>
                <div className="feature">
                    <span className="icon">🌍</span>
                    <span>Multi-Language Support</span>
                </div>
            </div>

            <div className="footer-links">
                <div className="footer-links-section">
                    <h4>Company</h4>
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact</Link>
                </div>
                <div className="footer-links-section">
                    <h4>Support</h4>
                    <Link to="/faq">FAQ</Link>
                    <Link to="/contact">Help Center</Link>
                </div>
                <div className="footer-links-section">
                    <h4>Legal</h4>
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/terms">Terms of Service</Link>
                </div>
            </div>

            <p className="footer-copyright">&copy; 2025 WorkWise - Connecting Workers, Creating Opportunities</p>
        </div>
    </footer>
);

export default Footer;