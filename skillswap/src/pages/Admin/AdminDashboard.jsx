import { useState } from 'react'

export default function AdminDashboard() {
  const [users, setUsers] = useState([
    { name: 'Nihar Patel', role: 'Sec Dev', trust: 96, active: true },
    { name: 'Aisha Rao', role: 'Developer', trust: 92, active: true },
    { name: 'Kabir Dev', role: 'Developer', trust: 88, active: true },
    { name: 'Mira Shah', role: 'Designer', trust: 91, active: true }
  ])

  const [systemLogs, setSystemLogs] = useState([
    { time: '12:04:12', event: 'MERN database health checked. Status: 100% online.', type: 'sys' },
    { time: '12:02:18', event: 'Admin credentials verification passed for session #N19.', type: 'security' },
    { time: '11:58:34', event: 'WebSockets compilation hook verified build #184.', type: 'build' },
    { time: '11:45:02', event: 'Escrow releasing 850 credits to Aisha Rao.', type: 'transaction' }
  ])

  const toggleUserActive = (name) => {
    setUsers(prev => prev.map(u => u.name === name ? { ...u, active: !u.active } : u))
  }

  const addLog = () => {
    const now = new Date()
    const timeStr = now.toTimeString().split(' ')[0]
    const newLog = { time: timeStr, event: 'Manual security check run. Integrity index 100%.', type: 'sys' }
    setSystemLogs([newLog, ...systemLogs])
  }

  return (
    <div className="anim-fade" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px' }}>
      
      {/* Left panel: Users trust database */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="neom-card">
          <h3>User Trust Ledger</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '4px 0 20px' }}>Platform user status controls and compiled trust scores.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {users.map((u, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  background: 'var(--card-bg)',
                  boxShadow: 'var(--neom-shadow)',
                  border: '1.5px solid rgba(255,255,255,0.8)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="sidebar-avatar" style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}>
                    {u.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <strong style={{ fontSize: '14.5px', display: 'block' }}>{u.name}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{u.role}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Trust score</span>
                    <strong style={{ fontSize: '13.5px', color: 'var(--secondary)' }}>{u.trust}%</strong>
                  </div>
                  
                  {/* Neomorphic Toggle */}
                  <div 
                    className={`neom-toggle ${u.active ? 'active' : ''}`}
                    onClick={() => toggleUserActive(u.name)}
                  >
                    <div className="neom-toggle-slider" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Revenue SVG Bar Chart */}
        <div className="neom-card">
          <h3>Revenue & AI Tokens Usage</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '4px 0 16px' }}>Weekly escrow platform volumes and AI review compilation credits.</p>

          <div className="neom-inset-panel" style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 320 100" width="100%" height="100%">
              {/* Bars representing weeks */}
              <rect x="20" y="30" width="20" height="70" rx="6" fill="var(--primary)" />
              <rect x="80" y="15" width="20" height="85" rx="6" fill="var(--secondary)" />
              <rect x="140" y="45" width="20" height="55" rx="6" fill="var(--accent)" />
              <rect x="200" y="25" width="20" height="75" rx="6" fill="var(--success)" />
              <rect x="260" y="35" width="20" height="65" rx="6" fill="var(--primary)" />
              <line x1="10" y1="100" x2="300" y2="100" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>

      {/* Right panel: System event logs */}
      <div className="neom-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '450px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>Security & System Logs</h3>
          <button className="neom-button" style={{ padding: '6px 12px', fontSize: '11px', borderRadius: '8px' }} onClick={addLog}>
            Run Audit
          </button>
        </div>

        <div className="neom-inset-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', background: '#0F172A', color: '#38BDF8', fontFamily: 'monospace', fontSize: '11.5px', overflowY: 'auto' }}>
          {systemLogs.map((log, idx) => (
            <div key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px', lineHeight: '1.4' }}>
              <span style={{ color: '#4ADE80', marginRight: '8px' }}>[{log.time}]</span>
              <span style={{ color: log.type === 'security' ? 'var(--danger)' : '#E2E8F0' }}>{log.event}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
