import React, { useState, useEffect } from 'react';
import { skillAPI } from '../../services/api';

const SkillsManager = ({ userId, isEditable = true }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    skillName: '',
    category: '',
    experienceYears: 0,
    description: '',
    minHourlyRate: '',
    maxHourlyRate: '',
    cropSpecialization: '',
    isSeasonalSkill: false,
    certificationDetails: ''
  });

  const skillCategories = [
    'CONSTRUCTION', 'ELECTRICAL', 'PLUMBING', 'CARPENTRY', 'PAINTING', 'MASONRY',
    'FARMING', 'CROP_HARVESTING', 'LIVESTOCK', 'IRRIGATION', 'AGRICULTURAL_MACHINERY',
    'CLEANING', 'COOKING', 'CHILDCARE', 'ELDERCARE', 'GARDENING',
    'RETAIL_ASSISTANCE', 'INVENTORY_MANAGEMENT', 'CASHIER', 'DELIVERY',
    'PHOTOGRAPHY', 'VIDEOGRAPHY', 'GRAPHIC_DESIGN', 'EVENT_DECORATION',
    'DRIVING', 'LOGISTICS', 'MOVING_SERVICES',
    'GENERAL_LABOR', 'SECURITY', 'MAINTENANCE', 'OTHER'
  ];

  useEffect(() => {
    fetchSkills();
  }, [userId]);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = userId 
        ? await skillAPI.getUserSkills(userId)
        : await skillAPI.getMySkills();
      setSkills(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Error fetching skills:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillData = {
        ...formData,
        experienceYears: parseInt(formData.experienceYears) || 0,
        minHourlyRate: formData.minHourlyRate ? parseFloat(formData.minHourlyRate) : null,
        maxHourlyRate: formData.maxHourlyRate ? parseFloat(formData.maxHourlyRate) : null,
      };

      if (editingSkill) {
        await skillAPI.update(editingSkill.id, skillData);
      } else {
        await skillAPI.add(skillData);
      }

      resetForm();
      fetchSkills();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to save skill');
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      skillName: skill.skillName || '',
      category: skill.category || '',
      experienceYears: skill.experienceYears || 0,
      description: skill.description || '',
      minHourlyRate: skill.minHourlyRate || '',
      maxHourlyRate: skill.maxHourlyRate || '',
      cropSpecialization: skill.cropSpecialization || '',
      isSeasonalSkill: skill.isSeasonalSkill || false,
      certificationDetails: skill.certificationDetails || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (skillId) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) {
      return;
    }

    try {
      await skillAPI.delete(skillId);
      fetchSkills();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete skill');
    }
  };

  const resetForm = () => {
    setFormData({
      skillName: '',
      category: '',
      experienceYears: 0,
      description: '',
      minHourlyRate: '',
      maxHourlyRate: '',
      cropSpecialization: '',
      isSeasonalSkill: false,
      certificationDetails: ''
    });
    setEditingSkill(null);
    setShowAddForm(false);
  };

  if (loading) {
    return <div className="loading-message">Loading skills...</div>;
  }

  return (
    <div className="skills-manager">
      <div className="skills-header">
        <h3>Skills & Expertise</h3>
        {isEditable && (
          <button
            className="btn-primary-small"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? 'Cancel' : '+ Add Skill'}
          </button>
        )}
      </div>

      {showAddForm && isEditable && (
        <form onSubmit={handleSubmit} className="skill-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="skillName">Skill Name *</label>
              <input
                type="text"
                id="skillName"
                name="skillName"
                value={formData.skillName}
                onChange={handleChange}
                required
                placeholder="e.g., Wheat Harvesting, Electrical Wiring"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {skillCategories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="experienceYears">Years of Experience</label>
              <input
                type="number"
                id="experienceYears"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="minHourlyRate">Min Hourly Rate (₹)</label>
              <input
                type="number"
                id="minHourlyRate"
                name="minHourlyRate"
                value={formData.minHourlyRate}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="e.g., 200"
              />
            </div>

            <div className="form-group">
              <label htmlFor="maxHourlyRate">Max Hourly Rate (₹)</label>
              <input
                type="number"
                id="maxHourlyRate"
                name="maxHourlyRate"
                value={formData.maxHourlyRate}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="e.g., 500"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Describe your expertise in this skill..."
            />
          </div>

          {['FARMING', 'CROP_HARVESTING', 'LIVESTOCK', 'IRRIGATION', 'AGRICULTURAL_MACHINERY'].includes(formData.category) && (
            <div className="form-group">
              <label htmlFor="cropSpecialization">Crop Specialization</label>
              <input
                type="text"
                id="cropSpecialization"
                name="cropSpecialization"
                value={formData.cropSpecialization}
                onChange={handleChange}
                placeholder="e.g., Wheat, Rice, Cotton"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="certificationDetails">Certification Details</label>
            <input
              type="text"
              id="certificationDetails"
              name="certificationDetails"
              value={formData.certificationDetails}
              onChange={handleChange}
              placeholder="e.g., Certified Electrician, ITI Certificate"
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isSeasonalSkill"
                checked={formData.isSeasonalSkill}
                onChange={handleChange}
              />
              This is a seasonal skill
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary-small" onClick={resetForm}>
              Cancel
            </button>
            <button type="submit" className="btn-primary-small">
              {editingSkill ? 'Update Skill' : 'Add Skill'}
            </button>
          </div>
        </form>
      )}

      {skills.length === 0 ? (
        <div className="empty-skills">
          <p>No skills added yet. {isEditable && 'Add your first skill to get started!'}</p>
        </div>
      ) : (
        <div className="skills-list">
          {skills.map(skill => (
            <div key={skill.id} className="skill-card">
              <div className="skill-card-header">
                <div>
                  <h4>{skill.skillName}</h4>
                  <span className="skill-category">{skill.category?.replace(/_/g, ' ')}</span>
                </div>
                {isEditable && (
                  <div className="skill-actions">
                    <button
                      className="btn-icon"
                      onClick={() => handleEdit(skill)}
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-icon"
                      onClick={() => handleDelete(skill.id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                )}
              </div>

              <div className="skill-card-body">
                {skill.experienceYears > 0 && (
                  <div className="skill-info-item">
                    <span className="info-label">Experience:</span>
                    <span>{skill.experienceYears} years</span>
                  </div>
                )}

                {(skill.minHourlyRate || skill.maxHourlyRate) && (
                  <div className="skill-info-item">
                    <span className="info-label">Rate:</span>
                    <span>
                      ₹{skill.minHourlyRate || '0'} - ₹{skill.maxHourlyRate || '0'}/hour
                    </span>
                  </div>
                )}

                {skill.cropSpecialization && (
                  <div className="skill-info-item">
                    <span className="info-label">Crop:</span>
                    <span>{skill.cropSpecialization}</span>
                  </div>
                )}

                {skill.description && (
                  <p className="skill-description">{skill.description}</p>
                )}

                {skill.certificationDetails && (
                  <div className="skill-certification">
                    <span className="cert-icon">🏆</span>
                    <span>{skill.certificationDetails}</span>
                  </div>
                )}

                {skill.isSeasonalSkill && (
                  <span className="seasonal-badge">🌾 Seasonal</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsManager;

