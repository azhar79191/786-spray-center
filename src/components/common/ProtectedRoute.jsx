import { Navigate } from 'react-router-dom'

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken')

  if (!token) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedRoute
