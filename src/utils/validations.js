/**
 * Form validation utilities
 */

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Validate phone number (Pakistani format)
 */
export const isValidPhone = (phone) => {
  const regex = /^(\+92|0)?[0-9]{10,11}$/
  return regex.test(phone.replace(/\s/g, ''))
}

/**
 * Validate required field
 */
export const isRequired = (value) => {
  return value !== undefined && value !== null && value.toString().trim() !== ''
}

/**
 * Validate minimum length
 */
export const minLength = (value, min) => {
  return value && value.toString().trim().length >= min
}

/**
 * Validate maximum length
 */
export const maxLength = (value, max) => {
  return value && value.toString().trim().length <= max
}

/**
 * Validate contact form
 */
export const validateContactForm = (values) => {
  const errors = {}

  if (!isRequired(values.name)) {
    errors.name = 'Name is required'
  } else if (!minLength(values.name, 2)) {
    errors.name = 'Name must be at least 2 characters'
  } else if (!maxLength(values.name, 100)) {
    errors.name = 'Name cannot exceed 100 characters'
  }

  if (!isRequired(values.email)) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Please enter a valid email address'
  }

  if (values.phone && !isValidPhone(values.phone)) {
    errors.phone = 'Please enter a valid Pakistani phone number'
  }

  if (!isRequired(values.subject)) {
    errors.subject = 'Subject is required'
  } else if (!minLength(values.subject, 5)) {
    errors.subject = 'Subject must be at least 5 characters'
  }

  if (!isRequired(values.message)) {
    errors.message = 'Message is required'
  } else if (!minLength(values.message, 10)) {
    errors.message = 'Message must be at least 10 characters'
  } else if (!maxLength(values.message, 5000)) {
    errors.message = 'Message cannot exceed 5000 characters'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Validate product search
 */
export const validateSearch = (query) => {
  const errors = {}

  if (!isRequired(query)) {
    errors.query = 'Search query is required'
  } else if (!minLength(query, 2)) {
    errors.query = 'Search must be at least 2 characters'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
