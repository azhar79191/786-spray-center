import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../../services/authService'

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedRoute
