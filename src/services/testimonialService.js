import axios from '../api/axios';

/**
 * Testimonial Service
 * Handles all testimonial/feedback operations
 */

// Submit testimonial (public)
export const submitTestimonial = async (data) => {
  const response = await axios.post('/testimonials', data);
  return response.data;
};

// Get approved testimonials (public)
export const getApprovedTestimonials = async (params = {}) => {
  const response = await axios.get('/testimonials/approved', { params });
  return response.data;
};

// Get all testimonials (admin)
export const getAllTestimonials = async (params = {}) => {
  const response = await axios.get('/testimonials', { params });
  return response.data;
};

// Get single testimonial (admin)
export const getTestimonialById = async (id) => {
  const response = await axios.get(`/testimonials/${id}`);
  return response.data;
};

// Approve/reject testimonial (admin)
export const approveTestimonial = async (id, data) => {
  const response = await axios.put(`/testimonials/${id}/approve`, data);
  return response.data;
};

// Delete testimonial (admin)
export const deleteTestimonial = async (id) => {
  const response = await axios.delete(`/testimonials/${id}`);
  return response.data;
};
