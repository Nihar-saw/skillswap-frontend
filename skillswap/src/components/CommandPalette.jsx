import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Bot, BookOpen, Users, MessageSquare, Bell,
  User, Settings, Trophy, Calendar, FileText, Layers, Sparkles, CreditCard,
} from 'lucide-react'

const COMMANDS = [
  { label: 'Dashboard', path: '/app', icon: LayoutDashboard },
  { label: 'AI Assistant', path: '/app/ai', icon: Bot },
  { label: 'Courses', path: '/app/courses', icon: BookOpen },
  { label: 'Study Groups', path: '/app/groups', icon: Users },
  { label: 'Communities', path: '/app/communities', icon: Layers },
  { label: 'Flashcards', path: '/app/flashcards', icon: Sparkles },
  { label: 'Notes', path: '/app/notes', icon: FileText },
  { label: 'Calendar', path: '/app/calendar', icon: Calendar },
  { label: 'Leaderboard', path: '/app/leaderboard', icon: Trophy },
  { label: 'Messages', path: '/app/messages', icon: MessageSquare },
  { label: 'Notifications', path: '/app/notifications', icon: Bell },
  { label: 'Profile', path: '/app/profile', icon: User },
  { label: 'Settings', path: '/app/settings', icon: Settings },
  { label: 'Wallet', path: '/app/wallet', icon: CreditCard },
]

export default function CommandPalette({ onClose }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    setSelected(0)
  }, [query])

  const go = (path) => {
    navigate(path)
    onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((s) => Math.min(s + 1, filtered.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((s) => Math.max(s - 1, 0))
    }
    if (e.key === 'Enter' && filtered[selected]) {
      go(filtered[selected].path)
    }
  }

  return (
    <div className="command-palette-overlay" onClick={onClose} role="presentation">
      <div className="command-palette" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Command palette">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search pages and actions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div style={{ maxHeight: 320, overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <div style={{ padding: 20, color: 'var(--app-text-muted)', fontSize: 14 }}>No results found</div>
          ) : (
            filtered.map((cmd, i) => {
              const Icon = cmd.icon
              return (
                <div
                  key={cmd.path}
                  className={`command-item ${i === selected ? 'selected' : ''}`}
                  onClick={() => go(cmd.path)}
                  onMouseEnter={() => setSelected(i)}
                  role="option"
                  aria-selected={i === selected}
                >
                  <Icon size={16} />
                  {cmd.label}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
