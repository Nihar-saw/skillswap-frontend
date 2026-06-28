import { useQuery } from '@tanstack/react-query'
import { projectsApi } from '../../api'

export default function Courses() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsApi.list().then((r) => r.data),
  })

  if (isLoading) return <PageSkeleton title="Courses" />
  if (isError) return <ErrorState title="Courses" />

  const projects = Array.isArray(data) ? data : []

  return (
    <div>
      <div className="page-header">
        <h1>Courses</h1>
        <p>Learning projects from the platform</p>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state app-card">
          <div className="empty-state-icon">📚</div>
          <h3>No courses yet</h3>
          <p>Projects will appear here once created on the platform.</p>
        </div>
      ) : (
        <div className="feed-grid">
          {projects.map((p) => (
            <article key={p._id} className="app-card app-card-interactive">
              <div style={{ fontSize: 12, color: 'var(--app-primary)', fontWeight: 600, marginBottom: 6 }}>{p.category || 'General'}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{p.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--app-text-secondary)', lineHeight: 1.5, marginBottom: 12 }}>
                {p.description?.slice(0, 120)}{p.description?.length > 120 ? '...' : ''}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'var(--app-text-muted)' }}>
                <span>{p.owner?.name || 'Unknown'}</span>
                <span>{p.budget ? `$${p.budget}` : 'Open budget'}</span>
              </div>
              {p.skillsRequired?.length > 0 && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
                  {p.skillsRequired.slice(0, 4).map((s) => (
                    <span key={s} style={{ background: 'var(--app-primary-light)', color: 'var(--app-primary)', padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600 }}>{s}</span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

function PageSkeleton({ title }) {
  return (
    <div>
      <div className="skeleton" style={{ height: 32, width: 180, marginBottom: 24 }} />
      <div className="skeleton" style={{ height: 140, marginBottom: 12 }} />
      <div className="skeleton" style={{ height: 140 }} />
    </div>
  )
}

function ErrorState({ title }) {
  return (
    <div className="empty-state">
      <h3>Unable to load {title}</h3>
      <p>Please try again later.</p>
    </div>
  )
}
