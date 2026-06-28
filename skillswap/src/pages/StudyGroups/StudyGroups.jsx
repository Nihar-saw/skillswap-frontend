import { useQuery } from '@tanstack/react-query'
import { teamsApi } from '../../api'

export default function StudyGroups() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['teams'],
    queryFn: () => teamsApi.list().then((r) => r.data),
  })

  if (isLoading) return <Skeleton />
  if (isError) return <div className="empty-state"><h3>Unable to load study groups</h3></div>

  const teams = Array.isArray(data) ? data : []

  return (
    <div>
      <div className="page-header">
        <h1>Study Groups</h1>
        <p>Collaborate with teams across the platform</p>
      </div>

      {teams.length === 0 ? (
        <div className="empty-state app-card">
          <div className="empty-state-icon">👥</div>
          <h3>No study groups yet</h3>
          <p>Teams will appear here when startups form groups.</p>
        </div>
      ) : (
        <div className="feed-grid">
          {teams.map((t) => (
            <article key={t._id} className="app-card">
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{t.startup?.startupName || 'Study Group'}</h3>
              <p style={{ fontSize: 13, color: 'var(--app-text-muted)', marginBottom: 12 }}>Stage: {t.startup?.stage || 'Active'}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {(t.members || []).map((m) => (
                  <div key={m.user?._id || m._id} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: 'var(--app-bg)', padding: '6px 10px', borderRadius: 8, fontSize: 12,
                  }}>
                    <div className="sidebar-avatar" style={{ width: 24, height: 24, fontSize: 10 }}>
                      {m.user?.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <span>{m.user?.name || 'Member'}</span>
                    {m.role && <span style={{ color: 'var(--app-text-muted)' }}>· {m.role}</span>}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

function Skeleton() {
  return (
    <div>
      <div className="skeleton" style={{ height: 32, width: 200, marginBottom: 24 }} />
      <div className="skeleton" style={{ height: 160 }} />
    </div>
  )
}
