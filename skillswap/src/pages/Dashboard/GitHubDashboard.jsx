import { useState } from 'react'

export default function GitHubDashboard() {
  const [selectedRepo, setSelectedRepo] = useState('founder-crm')
  const [hoveredCell, setHoveredCell] = useState(null)

  const repos = {
    'founder-crm': {
      stars: 18,
      forks: 4,
      commits: 142,
      aiScore: 94,
      languages: [
        { label: 'JavaScript', pct: 55, color: '#F7DF1E' },
        { label: 'CSS Styles', pct: 30, color: '#563D7C' },
        { label: 'MongoDB config', pct: 15, color: '#4DB33D' }
      ],
      report: 'High code readability. Composite index coverage stands at 100%. Code structures are clean and modular.'
    },
    'pitch-deck-gen': {
      stars: 12,
      forks: 2,
      commits: 84,
      aiScore: 88,
      languages: [
        { label: 'Python NLP', pct: 70, color: '#3572A5' },
        { label: 'React SVG', pct: 20, color: '#61DAFB' },
        { label: 'Markdown doc', pct: 10, color: '#0F172A' }
      ],
      report: 'NLP parameters fine-tuning structures verified. Documentation contains minor gaps regarding local environment configurations.'
    },
    'escrow-wallet': {
      stars: 31,
      forks: 9,
      commits: 218,
      aiScore: 96,
      languages: [
        { label: 'Solidity Smart Code', pct: 45, color: '#AA6746' },
        { label: 'JavaScript API', pct: 40, color: '#F7DF1E' },
        { label: 'Security test scripts', pct: 15, color: '#EF4444' }
      ],
      report: 'Escrow payment security constraints validated. Multi-stage testing hooks cover 94% of boundary conditions. High quality rating.'
    }
  }

  const activeData = repos[selectedRepo]

  // Mock Calendar Contributions data (5 weeks x 7 days)
  const commitGrid = [
    [0, 2, 4, 1, 0, 0, 3],
    [5, 8, 2, 0, 1, 2, 4],
    [0, 0, 3, 5, 8, 2, 1],
    [2, 4, 1, 0, 0, 3, 5],
    [8, 2, 0, 1, 2, 4, 0]
  ]

  const getCellColor = (commits) => {
    if (commits === 0) return '#E2E8F0'
    if (commits < 3) return '#C7D2FE' // light indigo
    if (commits < 6) return '#818CF8' // medium indigo
    return '#4F46E5' // dark indigo
  }

  return (
    <div className="anim-fade" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '32px' }}>
      
      {/* Left panel: connected repositories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="neom-card">
          <h3>Synced Repositories</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '4px 0 20px' }}>Select a repository to inspect AI portfolio audit logs.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.keys(repos).map((key) => {
              const r = repos[key]
              const isActive = selectedRepo === key

              return (
                <div 
                  key={key} 
                  className={`neom-button ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedRepo(key)}
                  style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderRadius: '18px', width: '100%', cursor: 'pointer' }}
                >
                  <div style={{ textAlign: 'left' }}>
                    <strong style={{ fontSize: '15px', color: '#0F172A', display: 'block' }}>{key}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>⭐ {r.stars} stars · {r.forks} forks</span>
                  </div>
                  <span style={{ background: 'var(--primary-glow)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '800' }}>
                    AI Score: {r.aiScore}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Custom SVG Language Donut Card */}
        <div className="neom-card">
          <h3>Language Distribution</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '4px 0 16px' }}>Computed across selected repository assets.</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ width: '100px', height: '100px' }}>
              <svg viewBox="0 0 40 40" width="100%" height="100%">
                {/* SVG circular composition */}
                <circle cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke="#E2E8F0" strokeWidth="4" />
                <circle cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke="var(--primary)" strokeWidth="4.5" strokeDasharray="55 45" strokeDashoffset="25" />
                <circle cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke="var(--secondary)" strokeWidth="4.5" strokeDasharray="30 70" strokeDashoffset="70" />
                <circle cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke="var(--accent)" strokeWidth="4.5" strokeDasharray="15 85" strokeDashoffset="100" />
              </svg>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              {activeData.languages.map((lang, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: lang.color }} />
                    <span>{lang.label}</span>
                  </div>
                  <strong>{lang.pct}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel: contribution matrix & audit details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Commit Contributions heat map calendar */}
        <div className="neom-card" style={{ position: 'relative' }}>
          <h3>Commit History calendar</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '4px 0 20px' }}>Daily production releases synced automatically from repository webhooks.</p>

          <div className="neom-inset-panel" style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', background: '#F8FAFC' }}>
            {commitGrid.map((week, weekIdx) => (
              <div key={weekIdx} style={{ display: 'flex', gap: '8px' }}>
                {week.map((commits, dayIdx) => (
                  <div 
                    key={dayIdx} 
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '6px',
                      background: getCellColor(commits),
                      boxShadow: commits > 0 ? '1px 1px 3px rgba(0,0,0,0.06)' : 'none',
                      cursor: 'pointer',
                      transition: 'transform 0.1s'
                    }}
                    onMouseEnter={() => setHoveredCell({ week: weekIdx, day: dayIdx, commits })}
                    onMouseLeave={() => setHoveredCell(null)}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Hover tooltips */}
          {hoveredCell && (
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--text)',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '11px',
              fontWeight: '700',
              pointerEvents: 'none',
              zIndex: 10
            }}>
              {hoveredCell.commits} commits on Week {hoveredCell.week + 1}, Day {hoveredCell.day + 1}
            </div>
          )}
        </div>

        {/* AI Portfolio report details */}
        <div className="neom-card">
          <span className="eyebrow" style={{ color: 'var(--primary)' }}>Automated Portfolio Audit</span>
          <h3 style={{ fontSize: '18px', marginTop: '4px', marginBottom: '16px' }}>AI Repo Review Findings</h3>
          
          <div className="neom-inset-panel" style={{ background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.08)' }}>
            <p style={{ fontSize: '13.5px', lineHeight: '1.6', color: '#334155' }}>
              {activeData.report}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
            <div className="neom-button" style={{ textAlign: 'center', display: 'block', fontSize: '12px' }}>
              Download PDF Report
            </div>
            <div className="neom-button neom-button-primary" style={{ textAlign: 'center', display: 'block', fontSize: '12px' }}>
              Verify on LinkedIn
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
