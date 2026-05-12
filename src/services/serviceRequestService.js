import axios from '../api/axios';

/**
 * Service Request Service
 * Handles all service request operations
 */

// Submit service request
export const submitServiceRequest = async (data) => {
  const response = await axios.post('/service-requests', data);
  return response.data;
};

// Get all service requests (admin)
export const getAllServiceRequests = async (params = {}) => {
  const response = await axios.get('/service-requests', { params });
  return response.data;
};

// Get single service request (admin)
export const getServiceRequestById = async (id) => {
  const response = await axios.get(`/service-requests/${id}`);
  return response.data;
};

// Update service request status (admin)
export const updateServiceRequestStatus = async (id, status) => {
  const response = await axios.put(`/service-requests/${id}`, { status });
  return response.data;
};

// Delete service request (admin)
export const deleteServiceRequest = async (id) => {
  const response = await axios.delete(`/service-requests/${id}`);
  return response.data;
};
