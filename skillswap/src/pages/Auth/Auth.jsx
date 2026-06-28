import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const ROLE_MAP = {
  Founder: 'Founder',
  Developer: 'Freelancer',
  Designer: 'Freelancer',
  Investor: 'Investor',
}

function validatePassword(password) {
  if (password.length < 6) return 'Password must be at least 6 characters'
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return 'Password must contain at least one letter and one number'
  }
  return null
}

export default function Auth({ onLoginSuccess }) {
  const { login, register } = useAuth()
  const [authMode, setAuthMode] = useState('login')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Founder')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAuthSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setLoading(true)

    try {
      if (authMode === 'login') {
        if (!email.trim() || !password.trim()) {
          setErrorMessage('Please fill in all fields.')
          return
        }
        await login(email.trim().toLowerCase(), password)
        onLoginSuccess?.()
      } else if (authMode === 'register') {
        if (!name.trim() || !email.trim() || !password.trim()) {
          setErrorMessage('All fields are required.')
          return
        }
        const pwError = validatePassword(password)
        if (pwError) {
          setErrorMessage(pwError)
          return
        }
        await register({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          role: ROLE_MAP[role] || 'Freelancer',
        })
        onLoginSuccess?.()
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Authentication failed'
      setErrorMessage(typeof msg === 'string' ? msg : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-wrapper anim-fade">
      <div className="auth-container">
        <div className="auth-header">
          <div className="logo-icon" style={{ margin: '0 auto 16px', width: '50px', height: '50px', fontSize: '24px' }}>S</div>
          <h2>{authMode === 'login' ? 'Welcome Back' : 'Join SkillSwap AI'}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px' }}>
            {authMode === 'login'
              ? 'Sign in with your registered account.'
              : 'Create an account to access the platform.'}
          </p>
        </div>

        <div className="auth-tabs">
          <button type="button" className={`auth-tab ${authMode === 'login' ? 'active' : ''}`} onClick={() => { setAuthMode('login'); setErrorMessage('') }}>
            Sign In
          </button>
          <button type="button" className={`auth-tab ${authMode === 'register' ? 'active' : ''}`} onClick={() => { setAuthMode('register'); setErrorMessage('') }}>
            Register
          </button>
        </div>

        <div className="app-card" style={{ boxShadow: 'var(--app-shadow-md)' }}>
          {errorMessage && (
            <div style={{ background: '#FEE2E2', color: 'var(--danger)', padding: '12px', borderRadius: '12px', fontSize: '13px', fontWeight: '600', marginBottom: '16px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {authMode === 'register' && (
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Full Name</label>
                <input type="text" className="neom-input" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            )}

            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Email Address</label>
              <input type="email" className="neom-input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Password</label>
              <input type="password" className="neom-input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete={authMode === 'login' ? 'current-password' : 'new-password'} />
              {authMode === 'register' && (
                <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>Min 6 characters with letters and numbers</p>
              )}
            </div>

            {authMode === 'register' && (
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '8px', display: 'block' }}>Platform Role</label>
                <select className="neom-input" style={{ appearance: 'none' }} value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="Founder">Founder</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Investor">Investor</option>
                </select>
              </div>
            )}

            <button type="submit" className="app-btn app-btn-primary" style={{ padding: '14px', width: '100%', fontSize: '15px' }} disabled={loading}>
              {loading ? 'Please wait...' : authMode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
