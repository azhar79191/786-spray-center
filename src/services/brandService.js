import axios from '../api/axios';

/**
 * Brand Service
 * Handles all brand-related API calls
 */

// Get all brands
export const getAllBrands = async (params = {}) => {
  const response = await axios.get('/brands', { params });
  return response.data;
};

// Get single brand
export const getBrandById = async (id) => {
  const response = await axios.get(`/brands/${id}`);
  return response.data;
};

// Create brand
export const createBrand = async (data) => {
  const response = await axios.post('/brands', data);
  return response.data;
};

// Update brand
export const updateBrand = async (id, data) => {
  const response = await axios.put(`/brands/${id}`, data);
  return response.data;
};

// Delete brand
export const deleteBrand = async (id) => {
  const response = await axios.delete(`/brands/${id}`);
  return response.data;
};
