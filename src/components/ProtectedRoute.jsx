import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, requireDesigner = false, requireAdmin = false }) {
  const { user, loading, isDesigner, isAdmin } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    // Redirect to sign in, saving the attempted location
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  if (requireDesigner && !isDesigner) {
    // Redirect to submit page to become a designer
    return <Navigate to="/submit" replace />
  }

  if (requireAdmin && !isAdmin) {
    // Redirect home if trying to access admin without permission
    return <Navigate to="/" replace />
  }

  return children
}
