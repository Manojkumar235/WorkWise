import React, { useState } from 'react';
import Navbar from '../../components/Layout/Navbar';
import Footer from '../../components/Layout/Footer';
import '../../App.css';

const FAQPage = () => {
    const [openFAQ, setOpenFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const faqs = [
        {
            category: "Getting Started",
            questions: [
                {
                    q: "What is WorkWise?",
                    a: "WorkWise is a platform connecting skilled workers with employers. We help workers find jobs and employers find reliable talent across various industries including construction, farming, cleaning, and more."
                },
                {
                    q: "Is WorkWise free to use?",
                    a: "Creating an account and browsing opportunities is completely free. We only charge a small service fee when a job is successfully completed through our platform."
                },
                {
                    q: "How do I create an account?",
                    a: "Click 'Get Started' or 'Register' and choose whether you're a worker looking for jobs or an employer looking to hire. Fill in your basic information, and you'll be ready to go in minutes."
                },
                {
                    q: "Do I need to download an app?",
                    a: "While we recommend using our mobile app for the best experience, you can access all core features through our website as well."
                }
            ]
        },
        {
            category: "For Workers",
            questions: [
                {
                    q: "How do I find jobs?",
                    a: "After creating your profile, browse available jobs in your area, filter by category and skills, and apply directly. You can also receive personalized job recommendations based on your profile."
                },
                {
                    q: "How does the rating system work?",
                    a: "After completing a job, employers can rate your work. These ratings build your reputation on the platform. Higher ratings increase your visibility and help you get more job opportunities."
                },
                {
                    q: "What types of jobs are available?",
                    a: "We feature jobs across multiple categories including construction, farming, cleaning, delivery, repairs, gardening, painting, and many more skilled and semi-skilled roles."
                },
                {
                    q: "How do I get paid?",
                    a: "Payment terms are agreed upon between you and the employer before starting work. WorkWise facilitates the connection and provides tools to track work completion and payment status."
                },
                {
                    q: "Can I work in multiple categories?",
                    a: "Yes! You can add multiple skills to your profile and apply for jobs across different categories that match your expertise."
                }
            ]
        },
        {
            category: "For Employers",
            questions: [
                {
                    q: "How do I post a job?",
                    a: "After creating your employer account, click 'Post Job', fill in the job details including category, requirements, location, and budget. Your job will be visible to relevant workers immediately."
                },
                {
                    q: "How do I find reliable workers?",
                    a: "Our platform shows worker ratings, reviews, completed jobs, and verified skills. You can filter by rating, experience, location, and specific skills to find the best match."
                },
                {
                    q: "Can I hire the same worker again?",
                    a: "Absolutely! You can save workers to your favorites and directly contact them for future work without posting a new job."
                },
                {
                    q: "What if I'm not satisfied with the work?",
                    a: "We encourage clear communication before, during, and after the job. If issues arise, our support team is available to help mediate and find fair solutions."
                },
                {
                    q: "How many workers can I hire at once?",
                    a: "You can hire as many workers as you need. When posting a job, simply specify how many people you need, and multiple workers can apply."
                }
            ]
        },
        {
            category: "Safety & Trust",
            questions: [
                {
                    q: "Are worker profiles verified?",
                    a: "We verify basic information for all users. Workers build credibility through completed jobs and ratings. We recommend checking ratings, reviews, and work history before hiring."
                },
                {
                    q: "How does WorkWise ensure safety?",
                    a: "We use rating systems, user verification, and community guidelines. We encourage users to meet in public places initially and maintain communication through our platform for record-keeping."
                },
                {
                    q: "What if someone misuses the platform?",
                    a: "You can report any suspicious activity or policy violations. Our team reviews all reports promptly and takes appropriate action including account suspension or removal."
                },
                {
                    q: "Is my personal information safe?",
                    a: "Yes. We use industry-standard security measures to protect your data. We never share your personal information with third parties without your consent. Read our Privacy Policy for details."
                }
            ]
        },
        {
            category: "Technical Support",
            questions: [
                {
                    q: "I forgot my password. What should I do?",
                    a: "Click 'Forgot Password' on the login page, enter your registered email, and we'll send you instructions to reset your password."
                },
                {
                    q: "The app/website isn't working properly. What should I do?",
                    a: "Try refreshing the page or restarting the app. If issues persist, contact our support team through the Contact page with details about the problem."
                },
                {
                    q: "Can I use WorkWise on multiple devices?",
                    a: "Yes, you can access your account from any device. Your information syncs automatically across all platforms."
                },
                {
                    q: "Which browsers are supported?",
                    a: "WorkWise works best on modern browsers including Chrome, Firefox, Safari, and Edge. Make sure your browser is updated to the latest version."
                }
            ]
        }
    ];

    return (
        <div className="landing-page">
            <Navbar />

            <main className="page-content">
                <section className="faq-hero">
                    <div className="container">
                        <h1>Frequently Asked Questions</h1>
                        <p className="lead">Find answers to common questions about WorkWise</p>
                    </div>
                </section>

                <section className="faq-content">
                    <div className="container">
                        {faqs.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="faq-category">
                                <h2 className="faq-category-title">{category.category}</h2>
                                <div className="faq-list">
                                    {category.questions.map((faq, faqIndex) => {
                                        const faqKey = `${categoryIndex}-${faqIndex}`;
                                        return (
                                            <div key={faqKey} className="faq-item">
                                                <button
                                                    className={`faq-question ${openFAQ === faqKey ? 'active' : ''}`}
                                                    onClick={() => toggleFAQ(faqKey)}
                                                >
                                                    <span>{faq.q}</span>
                                                    <span className="faq-toggle">{openFAQ === faqKey ? '−' : '+'}</span>
                                                </button>
                                                {openFAQ === faqKey && (
                                                    <div className="faq-answer">
                                                        <p>{faq.a}</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="faq-cta">
                    <div className="container">
                        <h2>Still have questions?</h2>
                        <p>Our support team is here to help</p>
                        <a href="/contact" className="btn-primary-large">Contact Support</a>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default FAQPage;
