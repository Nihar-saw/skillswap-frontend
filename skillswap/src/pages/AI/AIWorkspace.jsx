import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { projectsApi, aiApi } from '../../api'
import { Bot, Send } from 'lucide-react'

export default function AIWorkspace() {
  const [selectedProject, setSelectedProject] = useState('')
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => projectsApi.list().then((r) => r.data),
  })

  const projectList = Array.isArray(projects) ? projects : []

  const handleAnalyze = async () => {
    if (!selectedProject) {
      setError('Select a project first')
      return
    }
    setLoading(true)
    setError('')
    setResponse(null)
    try {
      const project = projectList.find((p) => p._id === selectedProject)
      const { data } = await aiApi.projectAnalysis({
        project: selectedProject,
        description: prompt || project?.description,
      })
      setResponse(data)
    } catch (err) {
      setError(err.response?.data?.message || 'AI analysis failed. Ensure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1>AI Assistant</h1>
        <p>Project analysis and intelligent recommendations</p>
      </div>

      <div className="app-card" style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Select Project</label>
        <select className="neom-input" value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)} style={{ width: '100%', maxWidth: 400, marginBottom: 16 }}>
          <option value="">Choose a project...</option>
          {projectList.map((p) => (
            <option key={p._id} value={p._id}>{p.title}</option>
          ))}
        </select>

        <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 8 }}>Additional Context (optional)</label>
        <textarea
          className="neom-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you'd like the AI to analyze..."
          rows={3}
          style={{ width: '100%', marginBottom: 16, resize: 'vertical' }}
        />

        <button type="button" className="app-btn app-btn-primary" onClick={handleAnalyze} disabled={loading}>
          <Bot size={16} /> {loading ? 'Analyzing...' : 'Run AI Analysis'}
        </button>
      </div>

      {error && (
        <div style={{ background: '#FEE2E2', color: 'var(--app-danger)', padding: 14, borderRadius: 10, fontSize: 14, marginBottom: 16 }}>
          {error}
        </div>
      )}

      {loading && (
        <div>
          <div className="skeleton" style={{ height: 120, marginBottom: 12 }} />
          <div className="skeleton" style={{ height: 80 }} />
        </div>
      )}

      {response && (
        <div className="app-card">
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Send size={16} /> AI Response
          </h3>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: 14, lineHeight: 1.6, color: 'var(--app-text-secondary)', fontFamily: 'inherit' }}>
            {typeof response === 'string' ? response : JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}

      {!response && !loading && !error && (
        <div className="empty-state app-card">
          <div className="empty-state-icon">🤖</div>
          <h3>Ready to assist</h3>
          <p>Select a project and run an AI analysis to get started.</p>
        </div>
      )}
    </div>
  )
}
