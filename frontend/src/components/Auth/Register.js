import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';

const Register = ({ onRegister, switchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'WORKER',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { translations } = useLanguage();

  // This hook allows selecting a user type from the URL (e.g., from the homepage buttons)
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (type === 'hirer') {
      setFormData(prev => ({ ...prev, userType: 'HIRER' }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const { confirmPassword, ...registrationData } = formData;
      const response = await authAPI.register(registrationData);
      onRegister(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-layout">
      <div className="register-branding">
        <div className="branding-content">
          <h1>🚀 WorkWise</h1>
          <h2>Join India's Most Trusted Labor Marketplace.</h2>
          <p>Whether you're looking for work or hiring skilled labor, you're in the right place. Create your account to get started.</p>
        </div>
      </div>

      <div className="register-form-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h3>{translations.registerTitle}</h3>

          {error && <div className="error-message">{error}</div>}

          <fieldset>
            <legend>I am a...</legend>
            <div className="user-type-selector">
              <label className={formData.userType === 'WORKER' ? 'active' : ''}>
                <input type="radio" name="userType" value="WORKER" checked={formData.userType === 'WORKER'} onChange={handleChange} />
                👷 {translations.userTypeWorker}
                <span>{translations.userTypeWorkerDesc}</span>
              </label>
              <label className={formData.userType === 'HIRER' ? 'active' : ''}>
                <input type="radio" name="userType" value="HIRER" checked={formData.userType === 'HIRER'} onChange={handleChange} />
                🏢 {translations.userTypeHirer}
                <span>{translations.userTypeHirerDesc}</span>
              </label>
            </div>
          </fieldset>

          <div className="form-group">
            <label htmlFor="name">{translations.fullNameLabel}</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Ramesh Kumar" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">{translations.emailLabel}</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">{translations.passwordLabel}</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Minimum 6 characters" required />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" required />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary full-width">
            {loading ? 'Creating Account...' : translations.registerTitle}
          </button>
        </form>

        <div className="auth-switch-alt">
          <p>Already have an account? <button onClick={switchToLogin} className="btn-link">{translations.login}</button></p>
        </div>
      </div>
    </div>
  );
};

export default Register;