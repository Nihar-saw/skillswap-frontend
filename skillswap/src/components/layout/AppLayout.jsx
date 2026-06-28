import { useState, useEffect, useCallback } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Menu, Search, Bell } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import Sidebar from './Sidebar'
import RightPanel from './RightPanel'
import CommandPalette from '../CommandPalette'
import { dashboardApi } from '../../api'
import { useAuth } from '../../context/AuthContext'
import '../../styles/app-layout.css'

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const navigate = useNavigate()
  const { user } = useAuth()

  const { data } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboardApi.get().then((r) => r.data),
    staleTime: 60000,
  })

  const unreadCount = data?.stats?.unreadNotifications ?? 0

  const handleKeyDown = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      setCommandOpen(true)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U'

  return (
    <div className="app-shell">
      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} role="presentation" />}

      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        unreadCount={unreadCount}
      />

      <div className={`app-main ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <header className="app-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              type="button"
              className="app-btn app-btn-ghost"
              style={{ display: 'none', padding: 8 }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              id="mobile-menu-btn"
            >
              <Menu size={20} />
            </button>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input
                type="search"
                placeholder="Search workspace... (Ctrl+K)"
                onFocus={() => setCommandOpen(true)}
                readOnly
                style={{
                  width: 280, padding: '8px 12px 8px 36px', border: '1px solid var(--app-border)',
                  borderRadius: 10, fontSize: 13, background: 'var(--app-bg)', cursor: 'pointer',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              className="app-btn app-btn-ghost"
              style={{ padding: 8, position: 'relative' }}
              onClick={() => navigate('/app/notifications')}
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute', top: 4, right: 4, width: 8, height: 8,
                  background: 'var(--app-danger)', borderRadius: '50%', border: '2px solid #fff',
                }} />
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/app/profile')}
              className="sidebar-avatar"
              style={{ border: 'none', cursor: 'pointer' }}
              aria-label="Profile"
            >
              {initials}
            </button>
          </div>
        </header>

        <div className="app-content-area">
          <main className="app-center">
            <div className="page-enter">
              <Outlet />
            </div>
          </main>
          <RightPanel />
        </div>
      </div>

      {commandOpen && <CommandPalette onClose={() => setCommandOpen(false)} />}
    </div>
  )
}
