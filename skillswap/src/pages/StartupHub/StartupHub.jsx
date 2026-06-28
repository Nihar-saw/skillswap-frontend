import { useState } from 'react'

export default function StartupHub() {
  const [roleMode, setRoleMode] = useState('founder') // founder, investor
  const [activeSlide, setActiveSlide] = useState(0)
  
  const pitchSlides = [
    { title: "1. The Vision", content: "SkillSwap AI maps founder needs directly to developer code metrics, replacing random matchmaking with validated transactional software sprints.", feedback: "Excellent clarity. Focus on emphasizing the exact developer matchmaking pain points you are solving." },
    { title: "2. The Problem", content: "Existing matching portals like Fiverr or LinkedIn rely on unverified reviews and resumes. Building tech teams is slow, risky, and subject to quality disputes.", feedback: "Highly relatable problem. Add a metric about how many startups fail due to co-founder misalignments." },
    { title: "3. The Product", content: "A premium SaaS with integrated sandbox editors, drawing boards, radar matches, and milestone-verified payment escrows.", feedback: "Product mock renders look good. Ensure you emphasize the AI Workspace verifier aspect." },
    { title: "4. TAM (Market Size)", content: "Total Addressable Market for freelance developers and remote SaaS hubs is $45B. Serviceable Obtainable Market (SOM) is $1.2B by year 3.", feedback: "TAM metrics look realistic. Reference your sources to increase investor trust scores." },
    { title: "5. Traction", content: "Over 1,420 active builders, $84.2k credit escrow volume transacted, and a 94.8% match rate within our pre-alpha testing community.", feedback: "Perfect traction chart. This is your strongest slide. Highlight the MoM growth explicitly." },
    { title: "6. The Ask", content: "Seeking a $500k pre-seed round to scale automated validator compilers and seed our payment credit pool.", feedback: "Ensure you state the exact runway length this capital will provide (e.g. 18 months)." }
  ]

  const networkStartups = [
    { name: 'FinRoute', target: '$400k', progress: 85, equity: '8%', match: 94, category: 'FinTech' },
    { name: 'CloudVault', target: '$600k', progress: 42, equity: '12%', match: 88, category: 'DevTools' },
    { name: 'EcoSphere', target: '$250k', progress: 10, equity: '6%', match: 71, category: 'CleanTech' }
  ]

  return (
    <div className="anim-fade" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Selector toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div className="auth-tabs" style={{ width: '320px', margin: '0', gridTemplateColumns: '1fr 1fr', borderRadius: '15px' }}>
          <button className={`auth-tab ${roleMode === 'founder' ? 'active' : ''}`} onClick={() => setRoleMode('founder')}>
            Founder Deck
          </button>
          <button className={`auth-tab ${roleMode === 'investor' ? 'active' : ''}`} onClick={() => setRoleMode('investor')}>
            Investor Board
          </button>
        </div>

        <div>
          <span style={{ fontSize: '13px', background: 'var(--primary-glow)', color: 'var(--primary)', padding: '6px 14px', borderRadius: '20px', fontWeight: '700' }}>
            Simulated Valuation: $1.2M
          </span>
        </div>
      </div>

      {roleMode === 'founder' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px' }}>
          
          {/* Pitch Deck Slide Builder */}
          <div className="neom-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '420px' }}>
            <div>
              <span className="eyebrow" style={{ color: 'var(--primary)' }}>Pitch Deck Optimizer</span>
              <h3 style={{ fontSize: '20px', marginTop: '6px', marginBottom: '20px' }}>{pitchSlides[activeSlide].title}</h3>
              
              <div className="neom-inset-panel" style={{ minHeight: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC' }}>
                <p style={{ fontSize: '16px', lineHeight: '1.6', textAlign: 'center', maxWidth: '440px', fontWeight: '500', color: '#334155' }}>
                  {pitchSlides[activeSlide].content}
                </p>
              </div>
            </div>

            {/* Slider triggers */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
              <button 
                className="neom-button" 
                disabled={activeSlide === 0} 
                onClick={() => setActiveSlide(prev => prev - 1)}
                style={{ opacity: activeSlide === 0 ? 0.5 : 1 }}
              >
                ◀ Previous Slide
              </button>
              
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)' }}>
                Slide {activeSlide + 1} of {pitchSlides.length}
              </span>

              <button 
                className="neom-button" 
                disabled={activeSlide === pitchSlides.length - 1} 
                onClick={() => setActiveSlide(prev => prev + 1)}
                style={{ opacity: activeSlide === pitchSlides.length - 1 ? 0.5 : 1 }}
              >
                Next Slide ▶
              </button>
            </div>
          </div>

          {/* AI Advisor Panel */}
          <div className="neom-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>🤖</span>
              <h3>Pitch Audit Feedback</h3>
            </div>
            
            <div className="neom-inset-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.1)' }}>
              <strong style={{ fontSize: '14px', color: 'var(--primary)', display: 'block', marginBottom: '8px' }}>AI Advisor Says:</strong>
              <p style={{ fontSize: '13px', lineHeight: '1.5', color: '#475569' }}>
                {pitchSlides[activeSlide].feedback}
              </p>
            </div>

            <div className="neom-button neom-button-primary" style={{ padding: '12px', fontSize: '13px', textAlign: 'center', display: 'block' }}>
              Request Investor Introduction
            </div>
          </div>

        </div>
      ) : (
        /* Investor Dashboard Mode */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div className="neom-card">
            <h3>Startups Seeking Funding Matching</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '4px 0 20px' }}>Startups sorted by AI match accuracy score relative to your investor preferences.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {networkStartups.map((s, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', alignItems: 'center', padding: '18px 24px', borderRadius: '20px', background: 'var(--card-bg)', boxShadow: 'var(--neom-shadow)', border: '1px solid rgba(255,255,255,0.8)' }}>
                  <div>
                    <strong style={{ fontSize: '16px', color: '#0F172A', display: 'block' }}>{s.name}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{s.category}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Target</span>
                    <strong style={{ fontSize: '14px' }}>{s.target}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Equity Offered</span>
                    <strong style={{ fontSize: '14px', color: 'var(--secondary)' }}>{s.equity}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>Traction</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                      <div className="progress-bar-container" style={{ width: '60px', height: '6px' }}>
                        <div className="progress-bar-fill" style={{ width: `${s.progress}%` }} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: '700' }}>{s.progress}%</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <button className="neom-button neom-button-primary" style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '12px' }}>
                      Audit Deck {s.match}% ➔
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '32px' }}>
            <div className="neom-card">
              <h3>Portfolio Yield Analytics</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '4px 0 20px' }}>Total asset growth indexes across funded escrow projects.</p>
              
              <div className="neom-inset-panel" style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* SVG bar chart */}
                <svg viewBox="0 0 300 100" width="100%" height="100%">
                  <rect x="20" y="30" width="16" height="70" rx="4" fill="var(--primary)" />
                  <rect x="70" y="10" width="16" height="90" rx="4" fill="var(--secondary)" />
                  <rect x="120" y="50" width="16" height="50" rx="4" fill="var(--accent)" />
                  <rect x="170" y="40" width="16" height="60" rx="4" fill="var(--success)" />
                  <rect x="220" y="25" width="16" height="75" rx="4" fill="var(--primary)" />
                  <line x1="10" y1="100" x2="260" y2="100" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
                </svg>
              </div>
            </div>

            <div className="neom-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3>Investor Insights</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.4', marginTop: '6px' }}>
                Our algorithms predict an average <strong>3.4x valuation multiplier</strong> for teams matching 90%+ compatibility metrics who deploy verified microservices within 4 sprints.
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  )
}
