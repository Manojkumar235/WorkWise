import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { userAPI } from '../../services/api';
import SkillsManager from '../../components/Profile/SkillsManager';

const ProfilePage = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        bio: '',
        availabilityStatus: true,
        preferredLanguage: 'ENGLISH'
    });
    const [locationData, setLocationData] = useState({ city: '', state: '' });
    const [pincodeError, setPincodeError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                phoneNumber: user.phoneNumber || '',
                address: user.address || '',
                city: user.city || '',
                state: user.state || '',
                pincode: user.pincode || '',
                bio: user.bio || '',
                availabilityStatus: user.availabilityStatus !== undefined ? user.availabilityStatus : true,
                preferredLanguage: user.preferredLanguage || 'ENGLISH'
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
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
                    setFormData(prev => ({
                        ...prev,
                        city: District,
                        state: State
                    }));
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
        setLoading(true);
        setMessage('');
        setMessageType('');

        try {
            const finalUserData = {
                ...formData,
                ...locationData
            };
            const response = await userAPI.update(user.userId, finalUserData);
            
            // Update the user in context
            if (updateUser) {
                updateUser(response.data);
            }
            
            setMessage('Profile updated successfully!');
            setMessageType('success');
        } catch (error) {
            setMessage(error.response?.data?.error || 'Failed to update profile. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    const languages = [
        { value: 'ENGLISH', label: 'English' },
        { value: 'HINDI', label: 'हिंदी (Hindi)' },
        { value: 'TAMIL', label: 'தமிழ் (Tamil)' },
        { value: 'TELUGU', label: 'తెలుగు (Telugu)' },
        { value: 'BENGALI', label: 'বাংলা (Bengali)' },
        { value: 'MARATHI', label: 'मराठी (Marathi)' }
    ];

    const getUserTypeIcon = (type) => {
        switch (type) {
            case 'WORKER': return '👷';
            case 'HIRER': return '🏢';
            case 'BOTH': return '🤝';
            default: return '👤';
        }
    };

    return (
        <div className="dashboard-page">
            <header className="page-header">
                <h1>Your Profile</h1>
                <p>Keep your information up to date to attract more opportunities.</p>
            </header>

            <div className="profile-page-content">
                {/* Profile Summary Card */}
                <div className="profile-summary-card">
                    <div className="profile-avatar">
                        <div className="avatar-placeholder">
                            {getUserTypeIcon(user?.userType)}
                        </div>
                    </div>
                    <div className="profile-summary-info">
                        <h2>{user?.name}</h2>
                        <p className="user-type">{getUserTypeIcon(user?.userType)} {user?.userType?.replace('_', ' ')}</p>
                        <p className="user-email">{user?.email}</p>
                        {user?.trustScore && (
                            <div className="trust-score-display">
                                <span className="trust-label">Trust Score:</span>
                                <span className="trust-value">⭐ {user.trustScore}/5.0</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile Form */}
                <div className="profile-form-container">
                    <form onSubmit={handleSubmit} className="profile-form">
                        <h3>Personal Information</h3>

                        <div className="form-group">
                            <label htmlFor="name">Full Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Ramesh Kumar"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="e.g., +91 9876543210"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="bio">About You (Bio)</label>
                            <textarea
                                id="bio"
                                name="bio"
                                rows="4"
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="Tell us about your skills, experience, and what makes you unique..."
                                maxLength="500"
                            />
                            <small className="char-count">{formData.bio.length}/500</small>
                        </div>

                        <h3>Location Information</h3>

                        <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <textarea
                                id="address"
                                name="address"
                                rows="3"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter your complete address"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="pincode">PIN Code</label>
                                <input
                                    type="text"
                                    id="pincode"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handlePincodeChange}
                                    placeholder="6-digit Pincode"
                                    maxLength="6"
                                />
                                {pincodeError && <small className="error-text">{pincodeError}</small>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className={locationData.city ? 'autofilled-input' : ''}
                                    readOnly={!!locationData.city}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="state">State</label>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="State"
                                    className={locationData.state ? 'autofilled-input' : ''}
                                    readOnly={!!locationData.state}
                                />
                            </div>
                        </div>

                        <h3>Preferences</h3>

                        <div className="form-group">
                            <label htmlFor="preferredLanguage">Preferred Language</label>
                            <select
                                id="preferredLanguage"
                                name="preferredLanguage"
                                value={formData.preferredLanguage}
                                onChange={handleChange}
                            >
                                {languages.map(lang => (
                                    <option key={lang.value} value={lang.value}>
                                        {lang.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {(user?.userType === 'WORKER' || user?.userType === 'BOTH') && (
                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="availabilityStatus"
                                        checked={formData.availabilityStatus}
                                        onChange={handleChange}
                                    />
                                    I am currently available for work
                                </label>
                            </div>
                        )}

                        {message && (
                            <div className={`form-message ${messageType}`}>
                                {message}
                            </div>
                        )}

                        <div className="form-actions">
                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Skills Manager (only for workers) */}
                {(user?.userType === 'WORKER' || user?.userType === 'BOTH') && (
                    <div className="skills-section">
                        <SkillsManager userId={user?.userId} isEditable={true} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
