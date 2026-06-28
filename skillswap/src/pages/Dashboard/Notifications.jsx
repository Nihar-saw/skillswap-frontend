import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { notificationsApi } from '../../api'

export default function Notifications() {
  const [filter, setFilter] = useState('all')
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationsApi.list().then((r) => r.data),
  })

  const markReadMutation = useMutation({
    mutationFn: (id) => notificationsApi.markRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notifications'] }),
  })

  const list = Array.isArray(data) ? data : []

  const filteredList = list.filter((n) => {
    if (filter === 'all') return true
    return n.type === filter
  })

  if (isLoading) return <div className="skeleton" style={{ height: 400 }} />
  if (isError) return <div className="empty-state"><h3>Unable to load notifications</h3></div>

  return (
    <div>
      <div className="page-header">
        <h1>Notifications</h1>
        <p>System alerts and updates</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {['all', 'system', 'project', 'message'].map((f) => (
          <button key={f} type="button" className={`app-btn ${filter === f ? 'app-btn-primary' : 'app-btn-ghost'}`} style={{ padding: '6px 14px', fontSize: 12, textTransform: 'capitalize' }} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      {filteredList.length === 0 ? (
        <div className="empty-state app-card">
          <div className="empty-state-icon">🔔</div>
          <h3>No notifications</h3>
          <p>You're all caught up.</p>
        </div>
      ) : (
        <div className="feed-grid">
          {filteredList.map((item) => (
            <article
              key={item._id}
              className="app-card"
              style={{
                borderLeft: !item.isRead ? '3px solid var(--app-primary)' : undefined,
                opacity: item.isRead ? 0.85 : 1,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div>
                  <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--app-text-secondary)', lineHeight: 1.5 }}>{item.message}</p>
                  <p style={{ fontSize: 12, color: 'var(--app-text-muted)', marginTop: 8 }}>
                    {item.sender?.name ? `${item.sender.name} · ` : ''}{new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                {!item.isRead && (
                  <button type="button" className="app-btn app-btn-ghost" style={{ padding: '6px 12px', fontSize: 12, flexShrink: 0 }} onClick={() => markReadMutation.mutate(item._id)}>
                    Mark read
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
