import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { dashboardApi } from '../../api'
import { useAuth } from '../../context/AuthContext'
import { BookOpen, Wallet, Bot, Trophy, ArrowRight } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboardApi.get().then((r) => r.data),
  })

  if (isLoading) {
    return (
      <div>
        <div className="skeleton" style={{ height: 32, width: 240, marginBottom: 24 }} />
        <div className="stats-row">
          {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton" style={{ height: 100 }} />)}
        </div>
        <div className="skeleton" style={{ height: 200 }} />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📡</div>
        <h3>Unable to load dashboard</h3>
        <p>Please check your connection and try again.</p>
        <button type="button" className="app-btn app-btn-primary" style={{ marginTop: 16 }} onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    )
  }

  const stats = data?.stats || {}
  const projects = data?.projects || []
  const activities = data?.activities || []
  const files = data?.files || []
  const notifications = data?.notifications || []

  return (
    <div>
      <div className="page-header">
        <h1>Good {getGreeting()}, {user?.name?.split(' ')[0] || 'there'}</h1>
        <p>Your productivity command center</p>
      </div>

      <div className="stats-row">
        <div className="stat-card app-card-interactive" onClick={() => navigate('/app/courses')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate('/app/courses')}>
          <div className="stat-card-label"><BookOpen size={14} style={{ display: 'inline', marginRight: 4 }} />Active Projects</div>
          <div className="stat-card-value">{stats.activeProjects ?? 0}</div>
          <div className="stat-card-delta">From your workspace</div>
        </div>
        <div className="stat-card app-card-interactive" onClick={() => navigate('/app/wallet')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate('/app/wallet')}>
          <div className="stat-card-label"><Wallet size={14} style={{ display: 'inline', marginRight: 4 }} />Wallet Balance</div>
          <div className="stat-card-value">{stats.escrowBalance ?? 0}</div>
          <div className="stat-card-delta">Skill credits</div>
        </div>
        <div className="stat-card app-card-interactive" onClick={() => navigate('/app/notifications')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate('/app/notifications')}>
          <div className="stat-card-label">Notifications</div>
          <div className="stat-card-value">{stats.unreadNotifications ?? 0}</div>
          <div className="stat-card-delta">Unread</div>
        </div>
        <div className="stat-card app-card-interactive" onClick={() => navigate('/app/leaderboard')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate('/app/leaderboard')}>
          <div className="stat-card-label"><Trophy size={14} style={{ display: 'inline', marginRight: 4 }} />Trust Score</div>
          <div className="stat-card-value">{stats.trustScore ?? 0}</div>
          <div className="stat-card-delta">Your rank metric</div>
        </div>
      </div>

      <div className="dashboard-sections">
        <section className="app-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Continue Learning</h2>
            <button type="button" className="app-btn app-btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }} onClick={() => navigate('/app/courses')}>
              View all <ArrowRight size={14} />
            </button>
          </div>
          {projects.length === 0 ? (
            <p style={{ fontSize: 14, color: 'var(--app-text-muted)' }}>No projects yet. Start a course to begin.</p>
          ) : (
            projects.slice(0, 4).map((p) => (
              <div key={p._id} style={{ padding: '12px 0', borderBottom: '1px solid var(--app-border)' }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: 'var(--app-text-muted)', marginTop: 2 }}>{p.category || 'Project'} · {p.budget ? `$${p.budget}` : 'Open'}</div>
              </div>
            ))
          )}
        </section>

        <section className="app-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Recent PDFs & Files</h2>
            <button type="button" className="app-btn app-btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }} onClick={() => navigate('/app/notes')}>
              View all
            </button>
          </div>
          {files.length === 0 ? (
            <p style={{ fontSize: 14, color: 'var(--app-text-muted)' }}>No files uploaded yet.</p>
          ) : (
            files.slice(0, 4).map((f) => (
              <div key={f._id} style={{ padding: '12px 0', borderBottom: '1px solid var(--app-border)' }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{f.originalName}</div>
                <div style={{ fontSize: 12, color: 'var(--app-text-muted)' }}>
                  {f.size ? `${Math.round(f.size / 1024)} KB` : ''} · {new Date(f.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </section>

        <section className="app-card">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Activity Stream</h2>
          {activities.length === 0 ? (
            <p style={{ fontSize: 14, color: 'var(--app-text-muted)' }}>No recent activity.</p>
          ) : (
            activities.slice(0, 5).map((a) => (
              <div key={a._id} style={{ padding: '10px 0', borderBottom: '1px solid var(--app-border)', fontSize: 13 }}>
                <strong>{a.user?.name}</strong> {a.description || a.action}
                <div style={{ fontSize: 11, color: 'var(--app-text-muted)', marginTop: 2 }}>
                  {new Date(a.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </section>

        <section className="app-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>AI Suggestions</h2>
            <button type="button" className="app-btn app-btn-primary" style={{ padding: '6px 12px', fontSize: 12 }} onClick={() => navigate('/app/ai')}>
              <Bot size={14} /> Open AI
            </button>
          </div>
          {notifications.length === 0 ? (
            <p style={{ fontSize: 14, color: 'var(--app-text-muted)' }}>No AI suggestions yet. Check back after starting a project.</p>
          ) : (
            notifications.slice(0, 3).map((n) => (
              <div key={n._id} style={{ padding: '10px 0', borderBottom: '1px solid var(--app-border)', fontSize: 13 }}>
                <div style={{ fontWeight: 600 }}>{n.title}</div>
                <div style={{ color: 'var(--app-text-secondary)', marginTop: 2 }}>{n.message}</div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}
