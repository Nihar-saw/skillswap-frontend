import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '../../api'
import { Calendar, Flame, Users, TrendingUp, Bot } from 'lucide-react'

function PanelSkeleton() {
  return (
    <div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton" style={{ height: 48, marginBottom: 10 }} />
      ))}
    </div>
  )
}

export default function RightPanel() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboardApi.get().then((r) => r.data),
    staleTime: 60000,
  })

  if (isLoading) return <aside className="app-right-panel"><PanelSkeleton /></aside>
  if (isError) return (
    <aside className="app-right-panel">
      <div className="empty-state" style={{ padding: 24 }}>
        <p>Unable to load sidebar data</p>
      </div>
    </aside>
  )

  const deadlines = data?.deadlines || []
  const activities = data?.activities || []
  const leaderboard = data?.leaderboard || []
  const teams = data?.teams || []
  const meetings = data?.meetings || []

  return (
    <aside className="app-right-panel">
      <div className="panel-section">
        <div className="panel-section-title"><Calendar size={12} style={{ display: 'inline', marginRight: 4 }} />Upcoming Deadlines</div>
        {deadlines.length === 0 ? (
          <p style={{ fontSize: 13, color: 'var(--app-text-muted)' }}>No deadlines yet</p>
        ) : (
          deadlines.slice(0, 3).map((d) => (
            <div key={d._id} className="panel-item">
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{d.recommendation?.slice(0, 40) || 'Deadline'}</div>
                <div style={{ fontSize: 11, color: 'var(--app-text-muted)' }}>
                  {d.estimatedCompletion ? new Date(d.estimatedCompletion).toLocaleDateString() : 'TBD'}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="panel-section">
        <div className="panel-section-title"><Flame size={12} style={{ display: 'inline', marginRight: 4 }} />Study Streak</div>
        <div className="app-card" style={{ padding: 14, textAlign: 'center' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--app-primary)' }}>
            {data?.stats?.activeProjects || 0}
          </div>
          <div style={{ fontSize: 12, color: 'var(--app-text-muted)' }}>Active projects</div>
        </div>
      </div>

      <div className="panel-section">
        <div className="panel-section-title">Recent Activity</div>
        {activities.length === 0 ? (
          <p style={{ fontSize: 13, color: 'var(--app-text-muted)' }}>No recent activity</p>
        ) : (
          activities.slice(0, 4).map((a) => (
            <div key={a._id} className="panel-item">
              <div>
                <div style={{ fontSize: 13 }}>{a.description || a.action}</div>
                <div style={{ fontSize: 11, color: 'var(--app-text-muted)' }}>
                  {a.user?.name} · {new Date(a.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="panel-section">
        <div className="panel-section-title"><Users size={12} style={{ display: 'inline', marginRight: 4 }} />Top Members</div>
        {leaderboard.slice(0, 4).map((u, i) => (
          <div key={u._id} className="panel-item">
            <div style={{
              width: 28, height: 28, borderRadius: 8, background: 'var(--app-primary-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, color: 'var(--app-primary)',
            }}>
              #{i + 1}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{u.name}</div>
              <div style={{ fontSize: 11, color: 'var(--app-text-muted)' }}>Score: {u.trustScore}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="panel-section">
        <div className="panel-section-title"><TrendingUp size={12} style={{ display: 'inline', marginRight: 4 }} />Study Groups</div>
        {teams.length === 0 ? (
          <p style={{ fontSize: 13, color: 'var(--app-text-muted)' }}>No groups yet</p>
        ) : (
          teams.slice(0, 3).map((t) => (
            <div key={t._id} className="panel-item">
              <div style={{ fontWeight: 600, fontSize: 13 }}>{t.startup?.startupName || 'Team'}</div>
              <div style={{ fontSize: 11, color: 'var(--app-text-muted)' }}>{t.members?.length || 0} members</div>
            </div>
          ))
        )}
      </div>

      <div className="panel-section">
        <div className="panel-section-title"><Bot size={12} style={{ display: 'inline', marginRight: 4 }} />Quick AI</div>
        <button type="button" className="app-btn app-btn-primary" style={{ width: '100%' }}>
          Ask AI Assistant
        </button>
      </div>

      {meetings.length > 0 && (
        <div className="panel-section">
          <div className="panel-section-title">Upcoming Meetings</div>
          {meetings.slice(0, 2).map((m) => (
            <div key={m._id} className="panel-item">
              <div style={{ fontWeight: 600, fontSize: 13 }}>{m.title || m.roomId}</div>
              <div style={{ fontSize: 11, color: 'var(--app-text-muted)' }}>
                {new Date(m.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  )
}
