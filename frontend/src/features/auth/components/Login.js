import React, { useState } from 'react';
import { authAPI } from '../services/authService';
import { useLanguage } from '../../../context/LanguageContext';
import { useToast } from '../../../context/ToastContext';
import Button from '../../../components/UI/Button';
import ErrorMessage from '../../../shared/components/ErrorMessage';

const Login = ({ onLogin, switchToRegister }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { translations } = useLanguage();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(formData);
      onLogin(response.data);
      toast.success('Login successful! Welcome back.');
    } catch (err) {
      setError(err);
      if (!err.isNetworkError) {
        toast.error(err.response?.data?.error || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    handleSubmit({ preventDefault: () => {} });
  };

  return (
    <div className="auth-form-card">
        <h3>{translations.loginTitle}</h3>
        <p>{translations.loginSubtitle}</p>

        {error && <ErrorMessage error={error} onRetry={error.isNetworkError ? handleRetry : null} type="inline" />}

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

            <Button type="submit" disabled={loading} block>
                {loading ? 'Logging in...' : translations.login}
            </Button>
        </form>

        <div className="auth-switch-alt">
            <p>Don't have an account? <button onClick={switchToRegister} className="btn-link">{translations.register}</button></p>
        </div>
    </div>
  );
};

export default Login;
