import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#F1F5F9', fontFamily: 'Inter, sans-serif',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="skeleton" style={{ width: 48, height: 48, borderRadius: 12, margin: '0 auto 16px' }} />
          <p style={{ color: '#64748B', fontSize: 14 }}>Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  return children
}
