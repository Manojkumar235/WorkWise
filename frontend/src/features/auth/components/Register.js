import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { authAPI } from '../services/authService';
import { useLanguage } from '../../../context/LanguageContext';
import { useToast } from '../../../context/ToastContext';
import ErrorMessage from '../../../shared/components/ErrorMessage';

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
  const [error, setError] = useState(null);
  const { translations } = useLanguage();
  const toast = useToast();

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
    if (error) setError(null);
  };

  const handlePincodeChange = async (e) => {
    const newPincode = e.target.value;
    setFormData({ ...formData, pincode: newPincode });
    setPincodeError('');

    if (newPincode.length === 6) {
        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${newPincode}`);
            const data = await response.json();
            if (data && data[0].Status === 'Success') {
                const { District, State } = data[0].PostOffice[0];
                setLocationData({ city: District, state: State });
                toast.success('Location details fetched');
            } else {
                setPincodeError('Invalid Pincode.');
                toast.error('Invalid PIN code');
            }
        } catch (err) {
            setPincodeError('Could not fetch location. Check your internet connection.');
            toast.error('Could not fetch location details');
        }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      const validationError = { message: 'Passwords do not match' };
      setError(validationError);
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      const validationError = { message: 'Password must be at least 6 characters' };
      setError(validationError);
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (formData.phoneNumber && !/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
      const validationError = { message: 'Please enter a valid 10-digit Indian phone number' };
      setError(validationError);
      toast.error('Invalid phone number');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { confirmPassword, ...registrationData } = formData;
      const finalPayload = { ...registrationData, ...locationData };
      const response = await authAPI.register(finalPayload);
      toast.success('Account created successfully! Welcome to WorkWise.');
      onRegister(response.data);
    } catch (err) {
      setError(err);
      if (err.isNetworkError) {
        toast.error('No internet connection. Please try again.');
      } else {
        toast.error(err.response?.data?.error || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card wider">
      <div className="auth-header">
        <h3>{translations.registerTitle}</h3>
        <p>Join the WorkWise community today</p>
      </div>

      {error && <ErrorMessage error={error} type="inline" />}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="user-type-toggle">
          <button
            type="button"
            className={formData.userType === 'WORKER' ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => setFormData({...formData, userType: 'WORKER'})}
          >
            👷 {translations.userTypeWorker}
          </button>
          <button
            type="button"
            className={formData.userType === 'HIRER' ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => setFormData({...formData, userType: 'HIRER'})}
          >
            🏢 {translations.userTypeHirer}
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="name">{translations.fullNameLabel}</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">{translations.emailLabel}</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="email@workwise.com" />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="10-digit number" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password">{translations.passwordLabel}</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required minLength="6" placeholder="Password" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="Repeat Password" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
              <label htmlFor="pincode">PIN Code</label>
              <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handlePincodeChange} maxLength="6" required placeholder="6-digit PIN" />
              {pincodeError && <span className="error-text-small">{pincodeError}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="city">City/District</label>
            <input type="text" id="city" value={locationData.city} readOnly className="readonly-input" placeholder="Auto-filled" />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary full-width margin-top">
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="auth-footer">
        <p>Already have an account? <button onClick={switchToLogin} className="btn-link-inline">Login here</button></p>
      </div>
    </div>
  );
};

export default Register;
