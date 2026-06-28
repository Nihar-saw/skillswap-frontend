import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { projectsApi, recommendationsApi } from '../../api'

export default function Flashcards() {
  const [projectId, setProjectId] = useState('')
  const [flipped, setFlipped] = useState(false)
  const [index, setIndex] = useState(0)

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsApi.list().then((r) => r.data),
  })

  const { data: recs, isLoading, isError } = useQuery({
    queryKey: ['recommendations', projectId],
    queryFn: () => recommendationsApi.get(projectId).then((r) => r.data),
    enabled: !!projectId,
  })

  const projectList = Array.isArray(projects) ? projects : []
  const cards = normalizeRecommendations(recs)

  return (
    <div>
      <div className="page-header">
        <h1>Flashcards</h1>
        <p>AI-generated study recommendations for your projects</p>
      </div>

      <div className="app-card" style={{ marginBottom: 20, maxWidth: 400 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Select a project</label>
        <select
          className="neom-input"
          value={projectId}
          onChange={(e) => { setProjectId(e.target.value); setIndex(0); setFlipped(false) }}
          style={{ width: '100%' }}
        >
          <option value="">Choose project...</option>
          {projectList.map((p) => (
            <option key={p._id} value={p._id}>{p.title}</option>
          ))}
        </select>
      </div>

      {!projectId ? (
        <div className="empty-state app-card">
          <div className="empty-state-icon">🃏</div>
          <h3>Select a project</h3>
          <p>Choose a project to load AI recommendation flashcards.</p>
        </div>
      ) : isLoading ? (
        <div className="skeleton" style={{ height: 240, maxWidth: 480 }} />
      ) : isError || cards.length === 0 ? (
        <div className="empty-state app-card">
          <h3>No flashcards available</h3>
          <p>Generate recommendations for this project on the backend first.</p>
        </div>
      ) : (
        <div style={{ maxWidth: 480 }}>
          <div
            className="app-card"
            onClick={() => setFlipped(!flipped)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setFlipped(!flipped)}
            style={{ minHeight: 200, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 32 }}
          >
            <div>
              <div style={{ fontSize: 12, color: 'var(--app-text-muted)', marginBottom: 12 }}>
                {flipped ? 'Answer' : 'Question'} · {index + 1}/{cards.length}
              </div>
              <p style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.6 }}>
                {flipped ? cards[index].back : cards[index].front}
              </p>
              <p style={{ fontSize: 12, color: 'var(--app-text-muted)', marginTop: 16 }}>Click to flip</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button type="button" className="app-btn app-btn-ghost" disabled={index === 0} onClick={() => { setIndex((i) => i - 1); setFlipped(false) }}>Previous</button>
            <button type="button" className="app-btn app-btn-primary" disabled={index >= cards.length - 1} onClick={() => { setIndex((i) => i + 1); setFlipped(false) }}>Next</button>
          </div>
        </div>
      )}
    </div>
  )
}

function normalizeRecommendations(recs) {
  if (!recs) return []
  const items = recs.recommendations || recs.items || recs.suggestions
  if (Array.isArray(items)) {
    return items.map((item, i) => ({
      front: typeof item === 'string' ? item : item.title || item.skill || `Recommendation ${i + 1}`,
      back: typeof item === 'string' ? 'Review this topic in your project.' : item.description || item.reason || 'Apply this to your project.',
    }))
  }
  if (typeof recs === 'object' && recs.recommendation) {
    return [{ front: 'Key Recommendation', back: recs.recommendation }]
  }
  return []
}
