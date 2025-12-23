import React, { useState } from 'react';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import '../../App.css';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Implement actual form submission to backend
        setSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({ name: '', email: '', subject: '', message: '' });
            setSubmitted(false);
        }, 3000);
    };

    return (
        <div className="landing-page">
            <Navbar />

            <main className="page-content">
                <section className="contact-hero">
                    <div className="container">
                        <h1>Contact Us</h1>
                        <p className="lead">We're here to help. Reach out to our team with any questions or concerns.</p>
                    </div>
                </section>

                <section className="contact-content">
                    <div className="container">
                        <div className="contact-grid">
                            <div className="contact-info">
                                <h2>Get in Touch</h2>
                                <p>
                                    Whether you need technical support, have a question about our services,
                                    or want to provide feedback, we'd love to hear from you.
                                </p>

                                <div className="contact-methods">
                                    <div className="contact-method">
                                        <h3>Email</h3>
                                        <p>General Inquiries: <a href="mailto:support@workwise.com">support@workwise.com</a></p>
                                        <p>Technical Support: <a href="mailto:tech@workwise.com">tech@workwise.com</a></p>
                                        <p>Business/Partnerships: <a href="mailto:business@workwise.com">business@workwise.com</a></p>
                                    </div>

                                    <div className="contact-method">
                                        <h3>Response Time</h3>
                                        <p>We typically respond within 24-48 hours on business days.</p>
                                        <p>Urgent technical issues are prioritized and addressed faster.</p>
                                    </div>

                                    <div className="contact-method">
                                        <h3>Support Hours</h3>
                                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                                        <p>Sunday: Closed</p>
                                        <p className="note">(Times in your local timezone)</p>
                                    </div>
                                </div>

                                <div className="faq-link">
                                    <h3>Quick Answers</h3>
                                    <p>Before contacting us, check our <a href="/faq">FAQ page</a> for immediate answers to common questions.</p>
                                </div>
                            </div>

                            <div className="contact-form-container">
                                <h2>Send Us a Message</h2>

                                {submitted ? (
                                    <div className="form-success">
                                        <h3>✓ Message Sent Successfully!</h3>
                                        <p>Thank you for contacting WorkWise. We'll get back to you soon.</p>
                                    </div>
                                ) : (
                                    <form className="contact-form" onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="name">Full Name *</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Your name"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email">Email Address *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                placeholder="your.email@example.com"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="subject">Subject *</label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select a subject</option>
                                                <option value="general">General Inquiry</option>
                                                <option value="technical">Technical Support</option>
                                                <option value="account">Account Issue</option>
                                                <option value="billing">Billing/Payment</option>
                                                <option value="safety">Safety/Trust Concern</option>
                                                <option value="partnership">Business/Partnership</option>
                                                <option value="feedback">Feedback/Suggestion</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="message">Message *</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows="6"
                                                placeholder="Tell us how we can help..."
                                            ></textarea>
                                        </div>

                                        <button type="submit" className="btn-primary-large">
                                            Send Message
                                        </button>

                                        <p className="form-note">
                                            * Required fields. We'll never share your information with third parties.
                                            See our <a href="/privacy">Privacy Policy</a>.
                                        </p>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="other-resources">
                    <div className="container">
                        <h2>Other Resources</h2>
                        <div className="resources-grid">
                            <div className="resource-card">
                                <h3>Help Center</h3>
                                <p>Browse our FAQ for instant answers</p>
                                <a href="/faq" className="btn-secondary">Visit FAQ</a>
                            </div>
                            <div className="resource-card">
                                <h3>About WorkWise</h3>
                                <p>Learn more about our mission and values</p>
                                <a href="/about" className="btn-secondary">Learn More</a>
                            </div>
                            <div className="resource-card">
                                <h3>Get Started</h3>
                                <p>Create an account and start connecting</p>
                                <a href="/register" className="btn-secondary">Sign Up</a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;
