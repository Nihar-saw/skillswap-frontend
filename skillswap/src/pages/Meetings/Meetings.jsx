import { useState } from 'react'

export default function Meetings({ onViewChange }) {
  const [micActive, setMicActive] = useState(true)
  const [videoActive, setVideoActive] = useState(true)
  const [sharingActive, setSharingActive] = useState(false)
  const [meetingNotes, setMeetingNotes] = useState(
    "Sprint Scrum Minutes - " + new Date().toLocaleDateString() + "\n" +
    "----------------------------------------\n" +
    "• Aisha: Handled Composite indexing on projectSchema.js. Deploy audit passing.\n" +
    "• Kabir: Working on AuthContext.jsx session verification.\n" +
    "• Action Item: Deploy build #184 to verify payment escrow release parameters."
  )

  const participants = [
    { name: 'Aisha Rao (Backend Dev)', avatar: 'AR', mic: true, video: true, talking: true },
    { name: 'Kabir Dev (Fullstack Dev)', avatar: 'KD', mic: false, video: true, talking: false },
    { name: 'You (Founder Mode)', avatar: 'JD', mic: micActive, video: videoActive, talking: false }
  ]

  return (
    <div className="anim-fade" style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr', gap: '32px', height: 'calc(100vh - 160px)' }}>
      
      {/* Left side: Video grid & controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
        
        {/* Video feed container */}
        <div className="neom-inset-panel" style={{ flex: 1, display: 'grid', gridTemplateColumns: sharingActive ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', background: '#ECEFF6', overflowY: 'auto' }}>
          
          {sharingActive ? (
            /* Screen Sharing Mock View */
            <div className="neom-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#1E293B', color: '#fff', position: 'relative' }}>
              <span style={{ fontSize: '48px', marginBottom: '16px' }}>🖥️</span>
              <strong style={{ fontSize: '18px' }}>You are sharing your screen</strong>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '6px' }}>Other participants can view your Live Code Editor window.</p>
              
              {/* Mini video overlays */}
              <div style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', gap: '10px' }}>
                {participants.slice(0, 2).map((p, i) => (
                  <div key={i} style={{ width: '60px', height: '45px', borderRadius: '8px', background: 'var(--card-bg)', border: '1px solid #fff', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800' }}>
                    {p.avatar}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Standard Grid Feeds */
            participants.map((p, idx) => (
              <div 
                key={idx} 
                className="neom-card" 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  background: p.video ? 'var(--card-bg)' : '#1E293B',
                  border: p.talking ? '2px solid var(--primary)' : '1.5px solid rgba(255,255,255,0.8)',
                  position: 'relative'
                }}
              >
                {/* Webcam initials / avatar */}
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  background: p.video ? 'var(--primary-glow)' : 'rgba(255,255,255,0.1)',
                  color: p.video ? 'var(--primary)' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: '800'
                }}>
                  {p.avatar}
                </div>

                <span style={{ position: 'absolute', bottom: '12px', left: '12px', fontSize: '12px', fontWeight: '700', color: p.video ? 'var(--text)' : '#fff' }}>
                  {p.name} {p.talking && '🔊'}
                </span>

                <span style={{ position: 'absolute', bottom: '12px', right: '12px', fontSize: '12px' }}>
                  {p.mic ? '🎙️' : '🔇'}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Video toolbar */}
        <div className="neom-card" style={{ display: 'flex', justifyContent: 'center', gap: '16px', padding: '16px' }}>
          <button 
            className={`neom-button ${micActive ? '' : 'active'}`} 
            onClick={() => setMicActive(!micActive)}
            style={{ width: '48px', height: '48px', borderRadius: '50%', padding: '0', fontSize: '18px' }}
            title={micActive ? 'Mute Mic' : 'Unmute Mic'}
          >
            {micActive ? '🎙️' : '🔇'}
          </button>

          <button 
            className={`neom-button ${videoActive ? '' : 'active'}`} 
            onClick={() => setVideoActive(!videoActive)}
            style={{ width: '48px', height: '48px', borderRadius: '50%', padding: '0', fontSize: '18px' }}
            title={videoActive ? 'Stop Video' : 'Start Video'}
          >
            {videoActive ? '📹' : '❌'}
          </button>

          <button 
            className={`neom-button ${sharingActive ? 'active' : ''}`} 
            onClick={() => setSharingActive(!sharingActive)}
            style={{ width: '48px', height: '48px', borderRadius: '50%', padding: '0', fontSize: '18px' }}
            title={sharingActive ? 'Stop Sharing' : 'Share Screen'}
          >
            🖥️
          </button>

          <button 
            className="neom-button neom-button-primary" 
            onClick={() => onViewChange('Whiteboard')}
            style={{ padding: '0 20px', borderRadius: '24px', fontSize: '13px', fontWeight: '700' }}
          >
            🎨 Launch Whiteboard
          </button>
        </div>
      </div>

      {/* Right side: Meeting minutes / notes */}
      <div className="neom-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px' }}>
        <h3>Collaborative Meeting Notes</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', margin: '4px 0 16px' }}>Minutes are synced in real time with the team repository workspace.</p>

        <textarea 
          className="neom-input" 
          value={meetingNotes} 
          onChange={e => setMeetingNotes(e.target.value)}
          style={{ flex: 1, minHeight: '200px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.6', padding: '16px', resize: 'none' }}
        />
        
        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
          <button className="neom-button" style={{ flex: 1, fontSize: '12px' }} onClick={() => setMeetingNotes('')}>Clear Notes</button>
          <button className="neom-button neom-button-primary" style={{ flex: 1, fontSize: '12px' }} onClick={() => onViewChange('Projects')}>Save to Sprints</button>
        </div>
      </div>

    </div>
  )
}
