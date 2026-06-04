import axios from '../api/axios';

/**
 * Gallery Service
 * Handles all gallery-related API calls
 */

// Get all gallery images
export const getAllGalleryImages = async (params = {}, config = {}) => {
  const response = await axios.get('/gallery', { params, ...config });
  return response.data;
};

// Get single gallery image
export const getGalleryImageById = async (id) => {
  const response = await axios.get(`/gallery/${id}`);
  return response.data;
};

// Create gallery image
export const createGalleryImage = async (data) => {
  const response = await axios.post('/gallery', data);
  return response.data;
};

// Update gallery image
export const updateGalleryImage = async (id, data) => {
  const response = await axios.put(`/gallery/${id}`, data);
  return response.data;
};

// Delete gallery image
export const deleteGalleryImage = async (id) => {
  const response = await axios.delete(`/gallery/${id}`);
  return response.data;
};
