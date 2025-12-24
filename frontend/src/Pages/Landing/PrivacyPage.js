import React from 'react';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import '../../App.css';

const PrivacyPage = () => {
    return (
        <div className="landing-page">
            <Navbar />

            <main className="page-content legal-page">
                <div className="container">
                    <h1>Privacy Policy</h1>
                    <p className="last-updated">Last Updated: December 23, 2025</p>

                    <section className="legal-section">
                        <h2>1. Introduction</h2>
                        <p>
                            WorkWise ("we", "us", or "our") respects your privacy and is committed to protecting your personal data.
                            This Privacy Policy explains how we collect, use, store, and share your information when you use our platform.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>2. Information We Collect</h2>

                        <h3>2.1 Information You Provide</h3>
                        <ul>
                            <li><strong>Account Information:</strong> Name, email address, phone number, password</li>
                            <li><strong>Profile Information:</strong> Skills, work experience, location, bio, profile photo</li>
                            <li><strong>Job Information:</strong> Job postings, applications, work history, ratings, and reviews</li>
                            <li><strong>Communication Data:</strong> Messages sent through our platform</li>
                            <li><strong>Payment Information:</strong> Processed securely through third-party payment providers</li>
                        </ul>

                        <h3>2.2 Information We Collect Automatically</h3>
                        <ul>
                            <li><strong>Usage Data:</strong> How you interact with our platform, features used, time spent</li>
                            <li><strong>Device Information:</strong> Device type, operating system, browser type, IP address</li>
                            <li><strong>Location Data:</strong> Approximate location based on IP address (precise location only with your permission)</li>
                            <li><strong>Cookies:</strong> We use cookies to enhance your experience and analyze platform usage</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>3. How We Use Your Information</h2>
                        <ul>
                            <li>To provide and maintain our services</li>
                            <li>To create and manage your account</li>
                            <li>To connect workers with employers and facilitate job matching</li>
                            <li>To process transactions and send related information</li>
                            <li>To communicate with you about your account, jobs, and platform updates</li>
                            <li>To personalize your experience and provide recommendations</li>
                            <li>To analyze platform usage and improve our services</li>
                            <li>To detect, prevent, and address fraud, security issues, or technical problems</li>
                            <li>To enforce our Terms of Service and protect user safety</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>4. How We Share Your Information</h2>

                        <h3>4.1 With Other Users</h3>
                        <p>
                            Your public profile information (name, photo, skills, ratings, reviews, work history)
                            is visible to other users to facilitate job matching and build trust.
                        </p>

                        <h3>4.2 With Service Providers</h3>
                        <p>
                            We share data with third-party service providers who help us operate our platform
                            (e.g., hosting, analytics, payment processing, customer support).
                        </p>

                        <h3>4.3 For Legal Reasons</h3>
                        <p>
                            We may disclose information if required by law, court order, or to protect rights,
                            safety, and security of our users or the public.
                        </p>

                        <h3>4.4 Business Transfers</h3>
                        <p>
                            In the event of a merger, acquisition, or sale of assets, your information may be transferred
                            to the new owner.
                        </p>

                        <h3>4.5 We DO NOT</h3>
                        <ul>
                            <li>Sell your personal information to third parties</li>
                            <li>Share your data with advertisers without your consent</li>
                            <li>Disclose private messages or sensitive information publicly</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>5. Data Security</h2>
                        <p>
                            We implement industry-standard security measures to protect your data, including:
                        </p>
                        <ul>
                            <li>Encryption of data in transit and at rest</li>
                            <li>Secure authentication and password protection</li>
                            <li>Regular security audits and monitoring</li>
                            <li>Access controls limiting who can view your data</li>
                        </ul>
                        <p>
                            However, no method of transmission over the internet is 100% secure.
                            While we strive to protect your data, we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>6. Your Rights and Choices</h2>
                        <ul>
                            <li><strong>Access:</strong> Request a copy of your personal data</li>
                            <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                            <li><strong>Deletion:</strong> Request deletion of your account and data</li>
                            <li><strong>Data Portability:</strong> Receive your data in a portable format</li>
                            <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
                            <li><strong>Cookie Settings:</strong> Manage cookie preferences in your browser</li>
                        </ul>
                        <p>
                            To exercise these rights, contact us at privacy@workwise.com
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>7. Data Retention</h2>
                        <p>
                            We retain your information for as long as your account is active or as needed to provide services.
                            After account deletion, we may retain certain information for legal compliance, dispute resolution,
                            and fraud prevention purposes.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>8. Children's Privacy</h2>
                        <p>
                            WorkWise is not intended for users under the age of 18. We do not knowingly collect
                            personal information from children. If you believe we have collected information from a child,
                            please contact us immediately.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>9. International Data Transfers</h2>
                        <p>
                            Your information may be transferred to and processed in countries other than your own.
                            We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>10. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of significant changes
                            via email or platform notification. Your continued use of WorkWise after changes indicates
                            acceptance of the updated policy.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>11. Contact Us</h2>
                        <p>
                            If you have questions about this Privacy Policy or our data practices, contact us at:
                        </p>
                        <ul>
                            <li>Email: privacy@workwise.com</li>
                            <li>Support: support@workwise.com</li>
                            <li>Contact Form: <a href="/contact">/contact</a></li>
                        </ul>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPage;
