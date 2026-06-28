import { useQuery } from '@tanstack/react-query'
import { usersApi } from '../../api'
import { Medal } from 'lucide-react'

export default function Leaderboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => usersApi.list().then((r) => r.data),
  })

  if (isLoading) return <div className="skeleton" style={{ height: 400 }} />
  if (isError) return <div className="empty-state"><h3>Unable to load leaderboard</h3></div>

  const users = Array.isArray(data) ? data : []

  return (
    <div>
      <div className="page-header">
        <h1>Leaderboard</h1>
        <p>Top members ranked by trust score</p>
      </div>

      {users.length === 0 ? (
        <div className="empty-state app-card">
          <div className="empty-state-icon">🏆</div>
          <h3>No rankings yet</h3>
          <p>Members will appear here as they join the platform.</p>
        </div>
      ) : (
        <div className="app-card" style={{ padding: 0, overflow: 'hidden' }}>
          {users.map((u, i) => (
            <div key={u._id} style={{
              display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px',
              borderBottom: i < users.length - 1 ? '1px solid var(--app-border)' : 'none',
              background: i < 3 ? 'rgba(37, 99, 235, 0.02)' : undefined,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: i === 0 ? '#FEF3C7' : i === 1 ? '#F1F5F9' : i === 2 ? '#FFEDD5' : 'var(--app-bg)',
                color: i === 0 ? '#D97706' : 'var(--app-text-secondary)', fontWeight: 800, fontSize: 14,
              }}>
                {i < 3 ? <Medal size={18} /> : `#${i + 1}`}
              </div>
              <div className="sidebar-avatar">{u.name?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{u.name}</div>
                <div style={{ fontSize: 12, color: 'var(--app-text-muted)' }}>{u.role} · {u.skills?.slice(0, 3).join(', ') || 'No skills listed'}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Outfit', fontSize: 20, fontWeight: 700, color: 'var(--app-primary)' }}>{u.trustScore ?? 0}</div>
                <div style={{ fontSize: 11, color: 'var(--app-text-muted)' }}>Trust Score</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
