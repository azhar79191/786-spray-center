import axios from '../api/axios';

/**
 * Auth Service
 * Handles authentication API calls
 */

/**
 * Login admin
 */
export const login = async (credentials) => {
  const response = await axios.post('/auth/login', credentials);
  
  if (response.data.success && response.data.data.token) {
    // Store token and admin info
    localStorage.setItem('adminToken', response.data.data.token);
    localStorage.setItem('adminUser', JSON.stringify(response.data.data.admin));
  }
  
  return response.data;
};

/**
 * Logout admin
 */
export const logout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
};

/**
 * Get current admin
 */
export const getMe = async () => {
  const response = await axios.get('/auth/me');
  return response.data;
};

/**
 * Update password
 */
export const updatePassword = async (passwords) => {
  const response = await axios.put('/auth/password', passwords);
  return response.data;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('adminToken');
  return !!token;
};

/**
 * Get stored token
 */
export const getToken = () => {
  return localStorage.getItem('adminToken');
};

/**
 * Get stored admin user
 */
export const getAdminUser = () => {
  const user = localStorage.getItem('adminUser');
  return user ? JSON.parse(user) : null;
};

/**
 * Create new admin (superadmin only)
 */
export const createAdmin = async (adminData) => {
  const response = await axios.post('/auth/admin', adminData);
  return response.data;
};

/**
 * Get all admins (superadmin only)
 */
export const getAllAdmins = async () => {
  const response = await axios.get('/auth/admins');
  return response.data;
};

/**
 * Update admin status (superadmin only)
 */
export const updateAdminStatus = async (id, status) => {
  const response = await axios.put(`/auth/admin/${id}/status`, status);
  return response.data;
};
