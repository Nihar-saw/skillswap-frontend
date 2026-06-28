import { useQuery } from '@tanstack/react-query'
import { filesApi } from '../../api'
import { FileText, Download } from 'lucide-react'

export default function Notes() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['files'],
    queryFn: () => filesApi.list().then((r) => r.data),
  })

  if (isLoading) return <div className="skeleton" style={{ height: 300 }} />
  if (isError) return <div className="empty-state"><h3>Unable to load notes & files</h3></div>

  const files = Array.isArray(data) ? data : []

  return (
    <div>
      <div className="page-header">
        <h1>Notes & Files</h1>
        <p>Your uploaded documents and study materials</p>
      </div>

      {files.length === 0 ? (
        <div className="empty-state app-card">
          <div className="empty-state-icon">📄</div>
          <h3>No files yet</h3>
          <p>Upload files through the API to see them here.</p>
        </div>
      ) : (
        <div className="feed-grid">
          {files.map((f) => (
            <article key={f._id} className="app-card" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--app-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--app-primary)', flexShrink: 0 }}>
                <FileText size={20} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.originalName}</h3>
                <p style={{ fontSize: 12, color: 'var(--app-text-muted)', marginTop: 4 }}>
                  {f.mimeType || 'File'} · {f.size ? `${Math.round(f.size / 1024)} KB` : ''} · {new Date(f.createdAt).toLocaleDateString()}
                </p>
                {f.project?.title && (
                  <p style={{ fontSize: 12, color: 'var(--app-primary)', marginTop: 4 }}>Project: {f.project.title}</p>
                )}
              </div>
              {f.url && (
                <a href={f.url} target="_blank" rel="noopener noreferrer" className="app-btn app-btn-ghost" style={{ padding: 8, flexShrink: 0 }} aria-label="Download">
                  <Download size={16} />
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
