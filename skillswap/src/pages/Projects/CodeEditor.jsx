import { useState } from 'react'

export default function CodeEditor() {
  const [activeFile, setActiveFile] = useState('App.jsx')
  const [terminalLogs, setTerminalLogs] = useState([
    'SkillSwap AI Sandbox environment v1.0.2 ready.',
    'Type "help" or run terminal scripts like "npm run build" or "git status".'
  ])
  const [terminalInput, setTerminalInput] = useState('')
  const [aiReport, setAiReport] = useState(null)
  const [isAuditing, setIsAuditing] = useState(false)

  const files = {
    'App.jsx': {
      code: `import React, { useState } from 'react';\nimport Sidebar from './components/Sidebar';\n\nfunction App() {\n  const [view, setView] = useState('Dashboard');\n\n  return (\n    <main className="app-shell">\n      <Sidebar active={view} onChange={setView} />\n      <section className="workspace">\n        <h1>SkillSwap Command Center</h1>\n      </section>\n    </main>\n  );\n}\n\nexport default App;`,
      language: 'javascript'
    },
    'server.js': {
      code: `const express = require('express');\nconst app = express();\nconst PORT = process.env.PORT || 5000;\n\napp.use(express.json());\n\napp.post('/api/escrow/release', (req, res) => {\n  // TODO: Implement security rate-limit verification\n  const { contractId } = req.body;\n  res.json({ status: 'released', id: contractId });\n});\n\napp.listen(PORT, () => console.log('Listening on port ' + PORT));`,
      language: 'javascript'
    },
    'package.json': {
      code: `{\n  "name": "skillswap-mern",\n  "version": "1.0.0",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "server": "node server.js"\n  },\n  "dependencies": {\n    "express": "^4.19.2",\n    "react": "^19.0.0"\n  }\n}`,
      language: 'json'
    }
  }

  const [codeBuffers, setCodeBuffers] = useState({
    'App.jsx': files['App.jsx'].code,
    'server.js': files['server.js'].code,
    'package.json': files['package.json'].code
  })

  const handleCodeChange = (e) => {
    const val = e.target.value
    setCodeBuffers(prev => ({
      ...prev,
      [activeFile]: val
    }))
  }

  const handleTerminalSubmit = (e) => {
    e.preventDefault()
    if (!terminalInput.trim()) return

    const cmd = terminalInput.trim().toLowerCase()
    let response = []

    if (cmd === 'help') {
      response = [
        'Available commands:',
        '  npm run build - Compile Vite web bundle',
        '  git status    - Check modified files in branch',
        '  node server   - Start mock backend escrow listener',
        '  clear         - Clear terminal console logs'
      ]
    } else if (cmd === 'npm run build') {
      response = [
        'vite v8.1.0 building for production...',
        '✓ 42 modules transformed.',
        'dist/index.html                  0.48 kB │ gzip: 0.32 kB',
        'dist/assets/index-Bf_H28a.css    12.4 kB │ gzip: 4.10 kB',
        'dist/assets/index-D82h8a9.js    248.5 kB │ gzip: 74.20 kB',
        '✓ built in 1.48s. Compilation successful!'
      ]
    } else if (cmd === 'git status') {
      response = [
        'On branch main',
        'Your branch is up to date with \'origin/main\'.',
        'Changes not staged for commit:',
        '  (use "git add <file>..." to update what will be committed)',
        '    modified:   src/pages/Projects/CodeEditor.jsx',
        '    modified:   src/index.css',
        'no changes added to commit (use "git add" and/or "git commit -a")'
      ]
    } else if (cmd === 'node server') {
      response = [
        '[nodemon] starting `node server.js`',
        'DB connection established with MERN database.',
        'Listening on port 5000. Escrow verification listener active.'
      ]
    } else if (cmd === 'clear') {
      setTerminalLogs([])
      setTerminalInput('')
      return
    } else {
      response = [`Command not found: "${cmd}". Type "help" for a list of available actions.`]
    }

    setTerminalLogs(prev => [...prev, `$ ${terminalInput}`, ...response])
    setTerminalInput('')
  }

  const runAiReview = () => {
    setIsAuditing(true)
    setAiReport(null)

    setTimeout(() => {
      setIsAuditing(false)
      const currentCode = codeBuffers[activeFile]
      
      // Dynamic AI suggestions based on file content
      if (activeFile === 'server.js') {
        setAiReport({
          score: 72,
          bugs: [
            { line: 7, severity: 'Critical', desc: 'Missing rate-limit middleware on release endpoint. Escrows are vulnerable to credential spamming.' },
            { line: 8, severity: 'Medium', desc: 'Plain TODO comment left in production routing file. Clean prior to main branch pull.' }
          ]
        })
      } else if (activeFile === 'App.jsx') {
        setAiReport({
          score: 94,
          bugs: [
            { line: 12, severity: 'Low', desc: 'Header layout could leverage css variables directly instead of hardcoding text color.' }
          ]
        })
      } else {
        setAiReport({
          score: 98,
          bugs: [
            { line: 'All', severity: 'None', desc: 'File schema conforms fully to standard configurations.' }
          ]
        })
      }
    }, 1500)
  }

  return (
    <div className="editor-layout anim-fade">
      
      {/* File Tree Explorer (Left column) */}
      <div className="neom-card editor-sidebar">
        <h4 style={{ fontSize: '14px', marginBottom: '8px', color: 'var(--primary)' }}>Project Explorer</h4>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontWeight: '700', fontSize: '12px', color: 'var(--text-muted)', padding: '6px' }}>📁 src/pages</div>
          <button 
            className={`file-tree-item ${activeFile === 'App.jsx' ? 'active' : ''}`}
            onClick={() => { setActiveFile('App.jsx'); setAiReport(null); }}
            style={{ width: '100%', textAlign: 'left', border: 'none' }}
          >
            📄 App.jsx
          </button>
          
          <div style={{ fontWeight: '700', fontSize: '12px', color: 'var(--text-muted)', padding: '6px', marginTop: '10px' }}>📁 backend</div>
          <button 
            className={`file-tree-item ${activeFile === 'server.js' ? 'active' : ''}`}
            onClick={() => { setActiveFile('server.js'); setAiReport(null); }}
            style={{ width: '100%', textAlign: 'left', border: 'none' }}
          >
            📄 server.js
          </button>
          
          <div style={{ fontWeight: '700', fontSize: '12px', color: 'var(--text-muted)', padding: '6px', marginTop: '10px' }}>📁 config</div>
          <button 
            className={`file-tree-item ${activeFile === 'package.json' ? 'active' : ''}`}
            onClick={() => { setActiveFile('package.json'); setAiReport(null); }}
            style={{ width: '100%', textAlign: 'left', border: 'none' }}
          >
            📄 package.json
          </button>
        </div>
      </div>

      {/* Code Text Area & Terminal (Center column) */}
      <div className="editor-main-pane">
        
        {/* Editor Wrapper */}
        <div className="editor-text-area-wrapper">
          <div style={{ background: '#0F172A', color: '#64748B', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px', fontWeight: '700' }}>
            <span>📄 {activeFile} ({files[activeFile].language})</span>
            <span style={{ color: '#38BDF8' }}>UTF-8</span>
          </div>
          <textarea 
            className="code-textarea"
            value={codeBuffers[activeFile]}
            onChange={handleCodeChange}
            spellCheck="false"
          />
        </div>

        {/* Console Terminal */}
        <div className="terminal-pane">
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '6px', marginBottom: '8px', fontWeight: '700' }}>
            🐚 Sandbox Terminal console
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {terminalLogs.map((log, idx) => (
              <div key={idx} style={{ whiteSpace: 'pre-wrap' }}>{log}</div>
            ))}
          </div>

          <form onSubmit={handleTerminalSubmit} className="terminal-input-wrapper">
            <span className="terminal-prompt">skillswap-sandbox ~ $</span>
            <input 
              type="text" 
              className="terminal-input"
              value={terminalInput}
              onChange={e => setTerminalInput(e.target.value)}
              placeholder="run npm scripts..."
            />
          </form>
        </div>

      </div>

      {/* AI Review & Bug scanner (Right column) */}
      <div className="neom-card editor-ai-pane" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h3>AI Code Analyzer</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>Trigger instant architectural lint scans.</p>
        </div>

        <button 
          className="neom-button neom-button-primary" 
          onClick={runAiReview}
          disabled={isAuditing}
          style={{ width: '100%', padding: '12px' }}
        >
          {isAuditing ? 'Auditing Codebase...' : '✨ Audit File Buffer'}
        </button>

        {isAuditing && (
          <div className="skeleton" style={{ height: '140px', borderRadius: '16px' }} />
        )}

        {aiReport && (
          <div className="anim-fade" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="neom-inset-panel" style={{ textAlign: 'center', background: '#F8FAFC' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>File Quality Score</span>
              <strong style={{ display: 'block', fontSize: '32px', color: aiReport.score > 85 ? 'var(--success)' : aiReport.score > 60 ? 'var(--warning)' : 'var(--danger)', marginTop: '4px' }}>
                {aiReport.score}/100
              </strong>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Code Flags ({aiReport.bugs.length})</h4>
              {aiReport.bugs.map((bug, idx) => (
                <div key={idx} style={{ padding: '12px', borderRadius: '12px', background: bug.severity === 'Critical' ? '#FEE2E2' : '#FEF3C7', color: bug.severity === 'Critical' ? 'var(--danger)' : 'var(--warning)', fontSize: '12px', lineHeight: '1.4' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', marginBottom: '4px' }}>
                    <span>Line {bug.line} · {bug.severity}</span>
                  </div>
                  <p style={{ color: '#1F2937' }}>{bug.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!aiReport && !isAuditing && (
          <div className="empty-state" style={{ padding: '24px 12px' }}>
            <div className="empty-state-icon" style={{ width: '48px', height: '48px', fontSize: '20px', marginBottom: '12px' }}>🛡️</div>
            <p style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>No audit report loaded. Click audit to scan compiler structures.</p>
          </div>
        )}

      </div>

    </div>
  )
}
