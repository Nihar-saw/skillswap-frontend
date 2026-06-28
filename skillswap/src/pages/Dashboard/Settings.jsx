import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function Settings() {
  const { user } = useAuth()
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const Toggle = ({ value, onChange, label }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--app-border)' }}>
      <span style={{ fontSize: 14 }}>{label}</span>
      <button type="button" onClick={() => onChange(!value)} style={{
        width: 44, height: 24, borderRadius: 99, border: 'none', cursor: 'pointer',
        background: value ? 'var(--app-primary)' : '#CBD5E1', position: 'relative', transition: 'background 0.2s',
      }} aria-pressed={value}>
        <span style={{
          position: 'absolute', top: 3, left: value ? 22 : 3, width: 18, height: 18,
          borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
        }} />
      </button>
    </div>
  )

  return (
    <div>
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account preferences</p>
      </div>

      {saved && (
        <div style={{ background: '#DCFCE7', color: 'var(--app-success)', padding: 12, borderRadius: 10, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
          Settings saved.
        </div>
      )}

      <div className="app-card" style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Account</h3>
        <p style={{ fontSize: 14, color: 'var(--app-text-secondary)' }}>Signed in as <strong>{user?.email}</strong></p>
        <p style={{ fontSize: 13, color: 'var(--app-text-muted)', marginTop: 4 }}>Role: {user?.role}</p>
      </div>

      <div className="app-card" style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Notifications</h3>
        <Toggle value={emailNotifs} onChange={setEmailNotifs} label="Email notifications" />
      </div>

      <div className="app-card">
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Security</h3>
        <p style={{ fontSize: 14, color: 'var(--app-text-secondary)', marginBottom: 12 }}>
          Your session is secured with JWT authentication. Tokens refresh automatically.
        </p>
        <button type="button" className="app-btn app-btn-primary" onClick={handleSave}>Save Preferences</button>
      </div>
    </div>
  )
}
