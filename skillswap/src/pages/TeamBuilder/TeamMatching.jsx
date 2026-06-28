import { useState } from 'react'

export default function TeamMatching() {
  const [selectedCandidate, setSelectedCandidate] = useState('aisha')
  const [isInvited, setIsInvited] = useState(false)
  const [inviteText, setInviteText] = useState('')
  const [showInviteModal, setShowInviteModal] = useState(false)

  const candidates = {
    aisha: {
      name: "Aisha Rao",
      role: "Backend Engineer",
      match: 96,
      avatar: "AR",
      bio: "Express specialist with a focus on WebSocket pipelines, REST controllers, and payment escrow architectures.",
      skills: [
        { label: "Node.js Serverless", user: 90, matching: 95 },
        { label: "MongoDB Aggregations", user: 85, matching: 90 },
        { label: "Socket Connections", user: 95, matching: 95 }
      ],
      draftInvite: "Hi Aisha! Your 96% compatibility index matches our need for socket connectivity integrations in the 'Founder CRM Matchmaking' project. We have credits secured in escrow. Let me know if you would like to sync!"
    },
    kabir: {
      name: "Kabir Dev",
      role: "Full-Stack Specialist",
      match: 91,
      avatar: "KD",
      bio: "MERN developer scaling clean database Schemas, React routes, and secure API routers.",
      skills: [
        { label: "React hooks", user: 88, matching: 90 },
        { label: "Express API routes", user: 85, matching: 85 },
        { label: "Webpack / Vite", user: 80, matching: 75 }
      ],
      draftInvite: "Hey Kabir! Saw your 91% fullstack match ranking. We have an open milestone on our CRM tool. Check out our workspace and let me know if you are open to collaborating!"
    },
    mira: {
      name: "Mira Shah",
      role: "UI/UX Designer",
      match: 88,
      avatar: "MS",
      bio: "Specializes in soft neomorphic SaaS layouts, Figma wireframing, and premium SVG web layouts.",
      skills: [
        { label: "Figma wireframes", user: 95, matching: 95 },
        { label: "CSS variables styling", user: 92, matching: 90 },
        { label: "SVG Vector artwork", user: 88, matching: 85 }
      ],
      draftInvite: "Hi Mira, we are looking for a UI specialist to redesign our pitch deck layouts and settings menus. Your design system fits our light theme. Let's swap skills!"
    }
  }

  const activeData = candidates[selectedCandidate]

  const triggerInvite = () => {
    setInviteText(activeData.draftInvite)
    setShowInviteModal(true)
  }

  const sendInvite = () => {
    setIsInvited(true)
    setShowInviteModal(false)
    setTimeout(() => setIsInvited(false), 3000)
  }

  return (
    <div className="anim-fade" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '32px' }}>
      
      {/* Left panel: list of candidates */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div className="neom-card">
          <h3>Suggested Platform Matches</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '4px 0 20px' }}>Ranked in real time based on active project gap audits.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.keys(candidates).map((key) => {
              const item = candidates[key]
              const isActive = selectedCandidate === key

              return (
                <div 
                  key={key} 
                  className={`neom-button ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedCandidate(key)}
                  style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderRadius: '18px', width: '100%', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
                    <div className="sidebar-avatar" style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}>{item.avatar}</div>
                    <div>
                      <strong style={{ fontSize: '14.5px', display: 'block' }}>{item.name}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.role}</span>
                    </div>
                  </div>
                  <span style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '800' }}>
                    {item.match}% match
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {isInvited && (
          <div className="anim-fade" style={{ background: '#DCFCE7', color: 'var(--success)', padding: '16px', borderRadius: '16px', fontSize: '13px', fontWeight: '700', border: '1px solid rgba(34,197,94,0.2)' }}>
            ✔ Invite sent successfully! The proposal is pending in escrow wallet.
          </div>
        )}
      </div>

      {/* Right panel: details & comparison */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div className="neom-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '380px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <span className="eyebrow" style={{ color: 'var(--secondary)' }}>Comparison Analysis</span>
                <h3 style={{ fontSize: '20px', marginTop: '4px' }}>{activeData.name} Details</h3>
              </div>
              <span style={{ fontSize: '11px', background: 'rgba(34, 197, 94, 0.1)', color: 'var(--success)', padding: '4px 10px', borderRadius: '12px', fontWeight: '700' }}>Available</span>
            </div>

            <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5', marginBottom: '24px' }}>
              "{activeData.bio}"
            </p>

            {/* Skills Comparison bar chart */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '13px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Skill overlap match-up</h4>
              {activeData.skills.map((skill, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600' }}>
                    <span>{skill.label}</span>
                    <span style={{ color: 'var(--primary)' }}>Competency: {skill.user}%</span>
                  </div>
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${skill.user}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '28px', borderTop: '1px solid rgba(0,0,0,0.04)', paddingTop: '20px' }}>
            <button className="neom-button neom-button-primary" style={{ width: '100%', padding: '14px' }} onClick={triggerInvite}>
              Invite to Collaborate (✨ Customized)
            </button>
          </div>
        </div>

      </div>

      {/* Invite Modal Overlay */}
      {showInviteModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(15,23,42,0.15)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }} className="anim-fade">
          <div className="neom-card" style={{ width: '90%', maxWidth: '480px', background: '#F8FAFC', padding: '32px' }}>
            <h3 style={{ marginBottom: '12px' }}>Tailor Team Proposal</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '20px' }}>
              AI has pre-populated this invite copy to maximize click-through ratios based on {activeData.name}'s profile.
            </p>
            
            <textarea 
              className="neom-input" 
              style={{ minHeight: '120px', fontFamily: 'inherit', fontSize: '13px', lineHeight: '1.5', padding: '16px', resize: 'none', marginBottom: '24px' }}
              value={inviteText}
              onChange={e => setInviteText(e.target.value)}
            />

            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="neom-button" style={{ flex: 1 }} onClick={() => setShowInviteModal(false)}>Cancel</button>
              <button className="neom-button neom-button-primary" style={{ flex: 1 }} onClick={sendInvite}>Send Invite ➔</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
