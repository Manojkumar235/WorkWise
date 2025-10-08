import React, { useState } from 'react';
import { authAPI } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';

const Login = ({ onLogin, switchToRegister }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { translations } = useLanguage();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await authAPI.login(formData);
      const { token, ...userData } = response.data;
      localStorage.setItem('workwise_token', token);
      localStorage.setItem('workwise_user', JSON.stringify(userData));
      onLogin(userData);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-card">
        <h3>{translations.loginTitle}</h3>
        <p>{translations.loginSubtitle}</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
                <label htmlFor="email">{translations.emailLabel}</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">{translations.passwordLabel}</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                />
            </div>

            <button type="submit" disabled={loading} className="btn-primary full-width">
                {loading ? 'Logging in...' : translations.login}
            </button>
        </form>

        <div className="auth-switch-alt">
            <p>Don't have an account? <button onClick={switchToRegister} className="btn-link">{translations.register}</button></p>
        </div>
    </div>
  );
};

export default Login;