import { useState } from 'react'

export default function Projects({ onViewChange }) {
  const [viewMode, setViewMode] = useState('grid') // grid, kanban, files
  const [projectsList, setProjectsList] = useState([
    { id: 1, title: 'Founder CRM Matchmaking', desc: 'Neural network algorithm matching founder criteria with freelancer skill sets.', budget: 1850, progress: 74, tech: ['React', 'Node', 'NLP'], owner: 'Anaya Rao' },
    { id: 2, title: 'Pitch Deck Generator', desc: 'Automated advisor engine generating custom pitch structures for pre-seed startups.', budget: 2400, progress: 58, tech: ['Python', 'Fine-Tuning', 'SVG'], owner: 'Dev Patel' },
    { id: 3, title: 'Escrow Wallet Upgrade', desc: 'Secure credit holding wallet releasing capital upon AI test validation.', budget: 3100, progress: 36, tech: ['Stripe', 'Security', 'Sockets'], owner: 'Mira Shah' }
  ])

  const [kanbanTasks, setKanbanTasks] = useState([
    { id: 101, title: 'Setup MERN socket channels', desc: 'Implement WebSocket connections for real-time notification alerts.', column: 'todo', priority: 'high', assignee: 'Aisha' },
    { id: 102, title: 'Audit wallet security loops', desc: 'Run automated static code reviews on payment callbacks.', column: 'progress', priority: 'high', assignee: 'Nihar' },
    { id: 103, title: 'Design neomorphic settings form', desc: 'Create soft layout inputs and toggles for Connected Accounts.', column: 'review', priority: 'medium', assignee: 'Mira' },
    { id: 104, title: 'Map database schemas', desc: 'Draft MongoDB project and transaction schemas.', column: 'done', priority: 'low', assignee: 'Kabir' }
  ])

  const [filesList, setFilesList] = useState([
    { name: 'pitch_deck_v3.pdf', size: '4.2 MB', date: 'Yesterday', owner: 'Dev Patel' },
    { name: 'schema_draft.json', size: '124 KB', date: '2 days ago', owner: 'Aisha' },
    { name: 'escrow_contract.js', size: '45 KB', date: '1 week ago', owner: 'Nihar' }
  ])

  const [searchQuery, setSearchQuery] = useState('')

  // Move task to another column in Kanban
  const moveTask = (taskId, direction) => {
    const columnsOrder = ['todo', 'progress', 'review', 'done']
    setKanbanTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task.id === taskId) {
          const currentIdx = columnsOrder.indexOf(task.column)
          let newIdx = currentIdx
          if (direction === 'right' && currentIdx < 3) newIdx++
          if (direction === 'left' && currentIdx > 0) newIdx--
          return { ...task, column: columnsOrder[newIdx] }
        }
        return task
      })
    })
  }

  const handleFileUpload = (e) => {
    e.preventDefault()
    // Simulated upload
    const mockFile = { name: 'workspace_config.yaml', size: '12 KB', date: 'Just now', owner: 'You' }
    setFilesList([mockFile, ...filesList])
  }

  const filteredProjects = projectsList.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tech.join(' ').toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="anim-fade" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Header controls & page switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div className="auth-tabs" style={{ width: '380px', margin: '0', gridTemplateColumns: 'repeat(3, 1fr)', borderRadius: '15px' }}>
          <button className={`auth-tab ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
            Project Grid
          </button>
          <button className={`auth-tab ${viewMode === 'kanban' ? 'active' : ''}`} onClick={() => setViewMode('kanban')}>
            Kanban Board
          </button>
          <button className={`auth-tab ${viewMode === 'files' ? 'active' : ''}`} onClick={() => setViewMode('files')}>
            Shared Files
          </button>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input 
            type="text" 
            className="neom-input" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '10px 16px', fontSize: '13px', width: '200px' }}
          />
          <button className="neom-button neom-button-primary" style={{ padding: '10px 20px', fontSize: '13px', whiteSpace: 'nowrap' }} onClick={() => onViewChange('AI Workspace')}>
            ✨ AI Plan Sprint
          </button>
        </div>
      </div>

      {/* Grid Mode */}
      {viewMode === 'grid' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {filteredProjects.map((p) => (
            <div key={p.id} className="neom-card neom-card-hover" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '280px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '12px', background: 'var(--primary-glow)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '20px', fontWeight: '700' }}>
                    {p.owner}
                  </span>
                  <strong style={{ fontSize: '14px', color: 'var(--secondary)' }}>{p.budget} credits</strong>
                </div>

                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{p.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '13.5px', lineHeight: '1.5', marginBottom: '20px' }}>{p.desc}</p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {p.tech.map((t, i) => (
                    <span key={i} className="skill-tag" style={{ padding: '4px 10px', fontSize: '11px', borderRadius: '8px' }}>{t}</span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>
                  <span>Sprint Completion</span>
                  <span>{p.progress}%</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Kanban Board Mode */}
      {viewMode === 'kanban' && (
        <div className="kanban-grid">
          {/* Columns */}
          {['todo', 'progress', 'review', 'done'].map((colName) => {
            const colTitle = colName === 'todo' ? 'To Do' : colName === 'progress' ? 'In Progress' : colName === 'review' ? 'In Review' : 'Completed'
            const colClass = colName === 'todo' ? 'priority-medium' : colName === 'progress' ? 'priority-high' : colName === 'review' ? 'priority-medium' : 'priority-low'
            const columnTasks = kanbanTasks.filter(t => t.column === colName)

            return (
              <div key={colName} className="kanban-column">
                <div className="kanban-column-header">
                  <span className={`task-priority ${colClass}`} style={{ fontSize: '12px', padding: '6px 12px' }}>
                    {colTitle} ({columnTasks.length})
                  </span>
                </div>

                <div className="neom-inset-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '400px', background: '#ECEFF6' }}>
                  {columnTasks.length === 0 ? (
                    <div style={{ margin: 'auto', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
                      Column empty
                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <div key={task.id} className="neom-card anim-fade" style={{ padding: '14px', borderRadius: '16px', background: 'var(--card-bg)' }}>
                        <span className={`task-priority ${task.priority === 'high' ? 'priority-high' : task.priority === 'medium' ? 'priority-medium' : 'priority-low'}`}>
                          {task.priority}
                        </span>
                        <strong style={{ display: 'block', fontSize: '14px', marginBottom: '6px', color: '#0F172A' }}>{task.title}</strong>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '12px' }}>{task.desc}</p>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--secondary)' }}>👤 {task.assignee}</span>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button className="neom-button" style={{ width: '26px', height: '26px', padding: '0', borderRadius: '6px', fontSize: '10px' }} onClick={() => moveTask(task.id, 'left')}>◀</button>
                            <button className="neom-button" style={{ width: '26px', height: '26px', padding: '0', borderRadius: '6px', fontSize: '10px' }} onClick={() => moveTask(task.id, 'right')}>▶</button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Shared Files Mode */}
      {viewMode === 'files' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px' }}>
          
          {/* Files List */}
          <div className="neom-card">
            <h3>Milestone Deliverables Log</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '4px 0 20px' }}>Active binary repository uploads for escrow validations.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filesList.map((file, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: '16px', background: '#F1F4FA', border: '1px solid rgba(255,255,255,0.7)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>📂</span>
                    <div>
                      <strong style={{ fontSize: '14px', display: 'block' }}>{file.name}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Uploaded {file.date} by {file.owner}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>{file.size}</span>
                    <button className="neom-button" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '11px' }}>➔ Download</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload panel */}
          <div className="neom-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ marginBottom: '8px' }}>Attach New Asset</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '20px' }}>Upload build directories, specifications, or schema drafts.</p>
            
            <div className="neom-inset-panel" style={{ height: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed rgba(99,102,241,0.2)', background: 'rgba(240, 243, 249, 0.5)' }}>
              <span style={{ fontSize: '32px', marginBottom: '12px' }}>☁️</span>
              <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', textAlign: 'center' }}>
                Drag your files here or
              </p>
              <button className="neom-button" style={{ padding: '6px 16px', borderRadius: '10px', fontSize: '12px', marginTop: '12px' }} onClick={handleFileUpload}>
                Browse Files
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
