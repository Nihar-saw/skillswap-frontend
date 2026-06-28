import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Bot, BookOpen, Users, MessageSquare, Bell,
  User, Settings, LogOut, Trophy, Calendar, FileText, Layers,
  ChevronLeft, ChevronRight, Search, CreditCard, Sparkles,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const NAV_ITEMS = [
  { to: '/app', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/app/ai', icon: Bot, label: 'AI Assistant' },
  { to: '/app/courses', icon: BookOpen, label: 'Courses' },
  { to: '/app/groups', icon: Users, label: 'Study Groups' },
  { to: '/app/communities', icon: Layers, label: 'Communities' },
  { to: '/app/flashcards', icon: Sparkles, label: 'Flashcards' },
  { to: '/app/notes', icon: FileText, label: 'Notes' },
  { to: '/app/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/app/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { to: '/app/messages', icon: MessageSquare, label: 'Messages' },
  { to: '/app/notifications', icon: Bell, label: 'Notifications', badgeKey: 'notifications' },
  { to: '/app/profile', icon: User, label: 'Profile' },
  { to: '/app/settings', icon: Settings, label: 'Settings' },
  { to: '/app/wallet', icon: CreditCard, label: 'Wallet' },
]

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose, unreadCount = 0 }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U'

  return (
    <aside className={`app-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">S</div>
        <span className="sidebar-logo-text sidebar-label">SkillSwap</span>
        <button
          type="button"
          onClick={onToggle}
          style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: collapsed ? 'none' : 'flex' }}
          aria-label="Collapse sidebar"
        >
          <ChevronLeft size={18} />
        </button>
        {collapsed && (
          <button type="button" onClick={onToggle} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }} aria-label="Expand sidebar">
            <ChevronRight size={18} />
          </button>
        )}
      </div>

      <div className="sidebar-search">
        <div style={{ position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input type="search" placeholder="Search..." aria-label="Search navigation" />
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-title">Workspace</div>
        {NAV_ITEMS.map(({ to, icon: Icon, label, end, badgeKey }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `sidebar-nav-item ${isActive ? 'active' : ''}`}
            onClick={onMobileClose}
          >
            <Icon size={18} strokeWidth={2} />
            <span className="sidebar-text">{label}</span>
            {badgeKey === 'notifications' && unreadCount > 0 && (
              <span className="sidebar-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-avatar">{initials}</div>
        <div className="sidebar-user-info" style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user?.name || 'User'}
          </div>
          <div style={{ fontSize: 11, color: 'var(--app-primary)', fontWeight: 600 }}>{user?.role}</div>
        </div>
        <button type="button" onClick={handleLogout} title="Sign out" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}>
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  )
}
