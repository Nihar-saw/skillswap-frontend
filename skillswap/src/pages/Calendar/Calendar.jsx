import { useQuery } from '@tanstack/react-query'
import { meetingsApi } from '../../api'
import { Calendar, Video } from 'lucide-react'

export default function CalendarPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['meetings'],
    queryFn: () => meetingsApi.list().then((r) => r.data),
  })

  if (isLoading) return <div className="skeleton" style={{ height: 300 }} />
  if (isError) return <div className="empty-state"><h3>Unable to load calendar</h3></div>

  const meetings = Array.isArray(data) ? data : []

  const grouped = meetings.reduce((acc, m) => {
    const date = new Date(m.createdAt).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    if (!acc[date]) acc[date] = []
    acc[date].push(m)
    return acc
  }, {})

  return (
    <div>
      <div className="page-header">
        <h1>Calendar</h1>
        <p>Meetings and scheduled sessions</p>
      </div>

      {meetings.length === 0 ? (
        <div className="empty-state app-card">
          <div className="empty-state-icon">📅</div>
          <h3>No meetings scheduled</h3>
          <p>Your meeting rooms will appear here.</p>
        </div>
      ) : (
        Object.entries(grouped).map(([date, items]) => (
          <section key={date} style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--app-text-muted)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Calendar size={16} /> {date}
            </h2>
            <div className="feed-grid">
              {items.map((m) => (
                <article key={m._id} className="app-card" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--app-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--app-primary)' }}>
                    <Video size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700 }}>{m.title || m.roomId}</h3>
                    <p style={{ fontSize: 13, color: 'var(--app-text-muted)' }}>
                      Host: {m.host?.name || 'Unknown'} · {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {m.project?.title && <p style={{ fontSize: 12, color: 'var(--app-primary)', marginTop: 2 }}>{m.project.title}</p>}
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 99, background: m.active ? 'rgba(22,163,74,0.1)' : 'var(--app-bg)', color: m.active ? 'var(--app-success)' : 'var(--app-text-muted)' }}>
                    {m.active ? 'Active' : 'Ended'}
                  </span>
                </article>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}
