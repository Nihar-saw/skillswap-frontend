import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { startupsApi } from '../../api'
import { Heart, Bookmark, MessageCircle } from 'lucide-react'

export default function Communities() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['startups'],
    queryFn: () => startupsApi.list().then((r) => r.data),
  })

  if (isLoading) return <div className="skeleton" style={{ height: 300 }} />
  if (isError) return <div className="empty-state"><h3>Unable to load communities</h3></div>

  const startups = Array.isArray(data) ? data : []

  return (
    <div>
      <div className="page-header">
        <h1>Communities</h1>
        <p>Professional startup discussions and networking</p>
      </div>

      {startups.length === 0 ? (
        <div className="empty-state app-card">
          <div className="empty-state-icon">💼</div>
          <h3>No communities yet</h3>
          <p>Startup communities will appear here as founders join the platform.</p>
        </div>
      ) : (
        <div className="feed-grid">
          {startups.map((s) => (
            <CommunityPost key={s._id} startup={s} />
          ))}
        </div>
      )}
    </div>
  )
}

function CommunityPost({ startup }) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <article className="app-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div className="sidebar-avatar">{startup.founder?.name?.[0]?.toUpperCase() || 'F'}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{startup.founder?.name || 'Founder'}</div>
          <div style={{ fontSize: 12, color: 'var(--app-text-muted)' }}>
            {startup.stage} · {new Date(startup.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{startup.startupName}</h3>
      <p style={{ fontSize: 14, color: 'var(--app-text-secondary)', lineHeight: 1.6, marginBottom: 14 }}>{startup.idea}</p>

      {startup.requiredSkills?.length > 0 && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
          {startup.requiredSkills.map((skill) => (
            <span key={skill} style={{ background: 'var(--app-primary-light)', color: 'var(--app-primary)', padding: '4px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600 }}>
              #{skill}
            </span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: 16, paddingTop: 12, borderTop: '1px solid var(--app-border)' }}>
        <button type="button" className="app-btn app-btn-ghost" style={{ padding: '6px 12px', fontSize: 13, color: liked ? 'var(--app-primary)' : undefined }} onClick={() => setLiked(!liked)}>
          <Heart size={15} fill={liked ? 'currentColor' : 'none'} /> {liked ? 'Liked' : 'Like'}
        </button>
        <button type="button" className="app-btn app-btn-ghost" style={{ padding: '6px 12px', fontSize: 13 }}>
          <MessageCircle size={15} /> Discuss
        </button>
        <button type="button" className="app-btn app-btn-ghost" style={{ padding: '6px 12px', fontSize: 13, color: bookmarked ? 'var(--app-primary)' : undefined }} onClick={() => setBookmarked(!bookmarked)}>
          <Bookmark size={15} fill={bookmarked ? 'currentColor' : 'none'} /> Save
        </button>
      </div>
    </article>
  )
}
