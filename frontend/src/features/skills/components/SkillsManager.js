import React, { useState, useEffect, useCallback } from 'react';
import { skillAPI } from '../services/skillService';
import { useToast } from '../../../context/ToastContext';
import { SKILL_CATEGORIES } from '../../../constants/categories';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';

const SkillsManager = ({ userId, isEditable = true }) => {
  const toast = useToast();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [submitting, setSubmitting] = useState(false);
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

  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true);
      const response = userId
        ? await skillAPI.getUserSkills(userId)
        : await skillAPI.getMySkills();
      setSkills(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      if (!err.isNetworkError) {
        toast.error('Failed to load skills');
      }
    } finally {
      setLoading(false);
    }
  }, [userId, toast]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const skillData = {
        ...formData,
        experienceYears: parseInt(formData.experienceYears) || 0,
        minHourlyRate: formData.minHourlyRate ? parseFloat(formData.minHourlyRate) : null,
        maxHourlyRate: formData.maxHourlyRate ? parseFloat(formData.maxHourlyRate) : null,
      };

      if (editingSkill) {
        await skillAPI.update(editingSkill.id, skillData);
        toast.success('Skill updated successfully!');
      } else {
        await skillAPI.add(skillData);
        toast.success('Skill added successfully!');
      }

      resetForm();
      fetchSkills();
    } catch (err) {
      if (err.isNetworkError) {
        toast.error('No internet connection. Please try again.');
      } else {
        toast.error(err.response?.data?.error || 'Failed to save skill');
      }
    } finally {
      setSubmitting(false);
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
      toast.success('Skill deleted successfully');
      fetchSkills();
    } catch (err) {
      if (err.isNetworkError) {
        toast.error('No internet connection. Please try again.');
      } else {
        toast.error(err.response?.data?.error || 'Failed to delete skill');
      }
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

  if (loading && skills.length === 0) {
    return <LoadingSpinner size="medium" text="Loading skills..." />;
  }

  return (
    <div className="skills-manager">
      <div className="skills-header">
        <h3>Skills & Expertise</h3>
        {isEditable && !showAddForm && (
          <button className="btn-primary btn-sm" onClick={() => setShowAddForm(true)}>
            + Add New Skill
          </button>
        )}
      </div>

      {showAddForm && isEditable && (
        <div className="skill-form-card">
          <h4>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Skill Name *</label>
                <input
                  type="text"
                  name="skillName"
                  value={formData.skillName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Rice Harvesting, Electrical Wiring"
                />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {SKILL_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat.replace(/_/g, ' ')}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Years of Experience</label>
                <input
                  type="number"
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Seasonal Skill?</label>
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    name="isSeasonalSkill"
                    checked={formData.isSeasonalSkill}
                    onChange={handleChange}
                  />
                  <span>Yes, this is seasonal work</span>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Min Hourly Rate (₹)</label>
                <input
                  type="number"
                  name="minHourlyRate"
                  value={formData.minHourlyRate}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>
              <div className="form-group">
                <label>Max Hourly Rate (₹)</label>
                <input
                  type="number"
                  name="maxHourlyRate"
                  value={formData.maxHourlyRate}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description / Details</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Briefly describe your experience with this skill..."
                rows="3"
              />
            </div>

            {formData.category.includes('FARMING') || formData.category.includes('CROP') ? (
              <div className="form-group">
                <label>Crop Specialization</label>
                <input
                  type="text"
                  name="cropSpecialization"
                  value={formData.cropSpecialization}
                  onChange={handleChange}
                  placeholder="e.g. Rice, Wheat, Cotton"
                />
              </div>
            ) : null}

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={resetForm} disabled={submitting}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? 'Saving...' : editingSkill ? 'Update Skill' : 'Save Skill'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="skills-grid">
        {skills.length === 0 ? (
          <p className="no-skills">No skills added yet.</p>
        ) : (
          skills.map(skill => (
            <div key={skill.id} className="skill-card">
              <div className="skill-card-header">
                <span className="skill-category-tag">{skill.category?.replace(/_/g, ' ')}</span>
                {isEditable && (
                  <div className="skill-actions">
                    <button className="btn-icon" onClick={() => handleEdit(skill)}>✏️</button>
                    <button className="btn-icon delete" onClick={() => handleDelete(skill.id)}>🗑️</button>
                  </div>
                )}
              </div>
              <h4>{skill.skillName}</h4>
              <p className="skill-exp">{skill.experienceYears} years experience</p>
              {skill.description && <p className="skill-desc">{skill.description}</p>}
              <div className="skill-footer">
                {skill.minHourlyRate && (
                  <span className="skill-rate">
                    ₹{skill.minHourlyRate}{skill.maxHourlyRate ? ` - ₹${skill.maxHourlyRate}` : ''} / hr
                  </span>
                )}
                {skill.isSeasonalSkill && <span className="seasonal-badge">Seasonal</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SkillsManager;
