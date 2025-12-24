import React from 'react';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import '../../App.css';

const TermsPage = () => {
    return (
        <div className="landing-page">
            <Navbar />

            <main className="page-content legal-page">
                <div className="container">
                    <h1>Terms of Service</h1>
                    <p className="last-updated">Last Updated: December 23, 2025</p>

                    <section className="legal-section">
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using WorkWise ("the Platform"), you agree to be bound by these Terms of Service
                            ("Terms"). If you do not agree to these Terms, do not use the Platform.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>2. Eligibility</h2>
                        <ul>
                            <li>You must be at least 18 years old to use WorkWise</li>
                            <li>You must provide accurate and complete registration information</li>
                            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                            <li>You may not transfer your account to another person</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>3. User Accounts</h2>

                        <h3>3.1 Account Types</h3>
                        <p>WorkWise offers two types of accounts:</p>
                        <ul>
                            <li><strong>Worker Accounts:</strong> For individuals seeking work opportunities</li>
                            <li><strong>Employer Accounts:</strong> For individuals or businesses looking to hire workers</li>
                        </ul>

                        <h3>3.2 Account Responsibilities</h3>
                        <ul>
                            <li>You are responsible for all activities under your account</li>
                            <li>You must notify us immediately of any unauthorized access</li>
                            <li>You must not share your account credentials with others</li>
                            <li>You must keep your profile information accurate and up to date</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>4. User Conduct and Prohibited Activities</h2>

                        <p>You agree NOT to:</p>
                        <ul>
                            <li>Post false, misleading, or fraudulent information</li>
                            <li>Impersonate another person or entity</li>
                            <li>Harass, abuse, or harm other users</li>
                            <li>Discriminate based on race, religion, gender, age, disability, or other protected characteristics</li>
                            <li>Post jobs or seek work for illegal activities</li>
                            <li>Circumvent the platform to avoid fees</li>
                            <li>Use automated tools (bots, scrapers) without permission</li>
                            <li>Interfere with the platform's operation or security</li>
                            <li>Violate any applicable laws or regulations</li>
                            <li>Spam, solicit, or advertise unrelated services</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>5. Job Postings and Applications</h2>

                        <h3>5.1 For Employers</h3>
                        <ul>
                            <li>You are responsible for the accuracy of job postings</li>
                            <li>You must comply with all labor laws and regulations</li>
                            <li>You agree to treat workers fairly and professionally</li>
                            <li>You may not post discriminatory or illegal job requirements</li>
                        </ul>

                        <h3>5.2 For Workers</h3>
                        <ul>
                            <li>You represent that your skills and experience are accurate</li>
                            <li>You agree to fulfill commitments made to employers</li>
                            <li>You must conduct yourself professionally</li>
                            <li>You may not apply for jobs you are not qualified for</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>6. Payment and Fees</h2>
                        <ul>
                            <li>WorkWise may charge service fees for completed jobs or transactions</li>
                            <li>Payment terms are agreed upon between workers and employers</li>
                            <li>WorkWise is not responsible for payment disputes between users</li>
                            <li>All fees are non-refundable unless otherwise stated</li>
                            <li>We reserve the right to change our fee structure with notice</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>7. Ratings and Reviews</h2>
                        <ul>
                            <li>Ratings and reviews must be honest and based on actual experience</li>
                            <li>You may not post fake reviews or manipulate ratings</li>
                            <li>WorkWise reserves the right to remove reviews that violate our guidelines</li>
                            <li>Reviews are the opinions of individual users, not WorkWise</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>8. WorkWise's Role</h2>
                        <p>
                            WorkWise is a platform connecting workers and employers. We do NOT:
                        </p>
                        <ul>
                            <li>Act as an employer or employment agency</li>
                            <li>Control the quality, safety, or legality of jobs posted</li>
                            <li>Control the qualifications or conduct of users</li>
                            <li>Guarantee job completion or payment</li>
                            <li>Verify all information posted by users (though we make reasonable efforts)</li>
                        </ul>
                        <p>
                            Users are independent contractors responsible for their own actions, taxes, insurance, and legal compliance.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>9. Intellectual Property</h2>
                        <ul>
                            <li>WorkWise owns all platform content, design, logos, and trademarks</li>
                            <li>You retain ownership of content you post (profile, job postings, messages)</li>
                            <li>By posting content, you grant WorkWise a license to use, display, and distribute it on the platform</li>
                            <li>You may not copy, modify, or reverse-engineer any part of the platform</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>10. Disclaimers and Limitations of Liability</h2>

                        <h3>10.1 Service "As Is"</h3>
                        <p>
                            WorkWise is provided "AS IS" without warranties of any kind, express or implied.
                            We do not guarantee uninterrupted, secure, or error-free service.
                        </p>

                        <h3>10.2 User Interactions</h3>
                        <p>
                            You are solely responsible for your interactions with other users. WorkWise is not liable for
                            disputes, injuries, damages, or losses arising from user interactions.
                        </p>

                        <h3>10.3 Limitation of Liability</h3>
                        <p>
                            To the maximum extent permitted by law, WorkWise shall not be liable for any indirect,
                            incidental, special, consequential, or punitive damages, or any loss of profits or revenues.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>11. Indemnification</h2>
                        <p>
                            You agree to indemnify and hold WorkWise harmless from any claims, damages, losses, or expenses
                            arising from your use of the platform, violation of these Terms, or infringement of any third-party rights.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>12. Termination</h2>
                        <ul>
                            <li>You may delete your account at any time</li>
                            <li>WorkWise may suspend or terminate your account for violations of these Terms</li>
                            <li>We may discontinue the platform at any time without liability</li>
                            <li>Provisions that should survive termination (e.g., disclaimers, indemnification) will remain in effect</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>13. Dispute Resolution</h2>
                        <p>
                            Any disputes arising from these Terms or use of WorkWise shall be resolved through:
                        </p>
                        <ul>
                            <li>First, good-faith negotiation between the parties</li>
                            <li>If unresolved, binding arbitration in accordance with applicable laws</li>
                            <li>You waive the right to participate in class-action lawsuits</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>14. Governing Law</h2>
                        <p>
                            These Terms are governed by the laws of [Your Jurisdiction], without regard to conflict of law principles.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>15. Changes to Terms</h2>
                        <p>
                            We may update these Terms from time to time. We will notify users of material changes.
                            Continued use of the platform after changes constitutes acceptance of the updated Terms.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>16. Contact Information</h2>
                        <p>
                            For questions about these Terms, contact us at:
                        </p>
                        <ul>
                            <li>Email: legal@workwise.com</li>
                            <li>Support: support@workwise.com</li>
                            <li>Contact Form: <a href="/contact">/contact</a></li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>17. Severability</h2>
                        <p>
                            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions
                            will remain in full force and effect.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TermsPage;
