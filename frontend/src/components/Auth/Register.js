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
    phoneNumber: '',
    userType: 'WORKER',
    address: '',
    pincode: '',
    preferredLanguage: 'ENGLISH'
  });
  const [locationData, setLocationData] = useState({ city: '', state: '' });
  const [pincodeError, setPincodeError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { translations } = useLanguage();

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

  const handlePincodeChange = async (e) => {
    const newPincode = e.target.value;
    setFormData({ ...formData, pincode: newPincode });
    setPincodeError('');
    setLocationData({ city: '', state: '' });

    if (newPincode.length === 6) {
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${newPincode}`);
            const data = await response.json();
            if (data && data[0].Status === 'Success') {
                const { District, State } = data[0].PostOffice[0];
                setLocationData({ city: District, state: State });
            } else {
                setPincodeError('Invalid Pincode.');
            }
        } catch (error) {
            setPincodeError('Could not fetch location.');
        }
    }
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
      const finalUserData = { ...registrationData, ...locationData };
      const response = await authAPI.register(finalUserData);
      onRegister(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    // This is now a single card, just like the login page
    <div className="auth-form-card">
      <form onSubmit={handleSubmit} className="auth-form">
        <h3>{translations.registerTitle}</h3>
        {error && <div className="error-message">{error}</div>}

        <fieldset>
          <legend>I am a...</legend>
          <div className="user-type-selector">
            <label className={formData.userType === 'WORKER' ? 'active' : ''}>
              <input type="radio" name="userType" value="WORKER" checked={formData.userType === 'WORKER'} onChange={handleChange} />
              👷 {translations.userTypeWorker}
            </label>
            <label className={formData.userType === 'HIRER' ? 'active' : ''}>
              <input type="radio" name="userType" value="HIRER" checked={formData.userType === 'HIRER'} onChange={handleChange} />
              🏢 {translations.userTypeHirer}
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

        <div className="form-row">
          <div className="form-group">
              <label htmlFor="pincode">PIN Code</label>
              <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handlePincodeChange} placeholder="6-digit Pincode" maxLength="6" required />
              {pincodeError && <small className="error-text">{pincodeError}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" value={locationData.city} placeholder="Auto-filled" readOnly className="autofilled-input" />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary full-width">
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="auth-switch-alt">
        <p>Already have an account? <button onClick={switchToLogin} className="btn-link">Login here</button></p>
      </div>
    </div>
  );
};

export default Register;