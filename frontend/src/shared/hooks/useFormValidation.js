import { useState } from 'react';

/**
 * Simple, reusable form validation hook
 */
export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    // Required check
    if (rules.required && !value) {
      return rules.requiredMessage || 'This field is required';
    }

    // Min length
    if (rules.minLength && value.length < rules.minLength) {
      return rules.minLengthMessage || `Minimum ${rules.minLength} characters required`;
    }

    // Max length
    if (rules.maxLength && value.length > rules.maxLength) {
      return rules.maxLengthMessage || `Maximum ${rules.maxLength} characters allowed`;
    }

    // Email pattern
    if (rules.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return rules.emailMessage || 'Invalid email address';
      }
    }

    // Phone pattern (10 digits for India)
    if (rules.phone && value) {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(value)) {
        return rules.phoneMessage || 'Invalid phone number';
      }
    }

    // Custom validation
    if (rules.validate) {
      return rules.validate(value, values) || '';
    }

    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Validate on change if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateAll = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((name) => {
      const error = validateField(name, values[name]);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    return isValid;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    setValues,
  };
};

export default useFormValidation;
