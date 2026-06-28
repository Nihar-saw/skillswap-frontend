import { useState, useRef, useEffect } from 'react'

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('general') // general, advisor, pm, coder
  const [messages, setMessages] = useState({
    general: [
      { sender: 'assistant', text: 'Hello! I am your SkillSwap general companion. How can I help you build your startup today?' }
    ],
    advisor: [
      { sender: 'assistant', text: 'Welcome to the Startup Advisory deck. Ask me about pitch decks, valuations, investor matching, or market sizing.' }
    ],
    pm: [
      { sender: 'assistant', text: 'PM Engine active. I can analyze sprint velocities, detect task delay risks, or outline project milestones.' }
    ],
    coder: [
      { sender: 'assistant', text: 'Coding assistant initialized. Paste a snippet or specify a bug to run an automated AI design review.' }
    ]
  })
  const [inputVal, setInputVal] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isOpen, activeTab])

  const handleSendMessage = () => {
    if (!inputVal.trim()) return
    
    const userText = inputVal
    setInputVal('')

    // Append user message
    setMessages(prev => ({
      ...prev,
      [activeTab]: [...prev[activeTab], { sender: 'user', text: userText }]
    }))

    // Simulated responses based on tab and message
    setTimeout(() => {
      let replyText = "Interesting! Let me process that request in my neural model..."
      
      if (activeTab === 'general') {
        if (userText.toLowerCase().includes('help') || userText.toLowerCase().includes('features')) {
          replyText = "SkillSwap AI provides a Whiteboard, Live Code Editor, Startup Hub, Payments, and Admin tools. Select a specialized tab above to get started!"
        } else {
          replyText = `Understood. I can help connect you with developers or designers. What specific skills does your startup need?`
        }
      } else if (activeTab === 'advisor') {
        if (userText.toLowerCase().includes('pitch') || userText.toLowerCase().includes('deck')) {
          replyText = "Tip: Keep your pitch deck under 10 slides. Focus on Problem, Solution, Traction, Market Size (TAM), and Team. Your current Pitch Deck score is 88/100."
        } else if (userText.toLowerCase().includes('valuation')) {
          replyText = "Based on current MERN workspace metrics and team composition, your simulated pre-seed valuation is $1.2M. Add a designer to increase score."
        } else {
          replyText = "Startup Advisor: To secure pre-seed funding, ensure you have active escrow contracts showing transactional validation."
        }
      } else if (activeTab === 'pm') {
        if (userText.toLowerCase().includes('delay') || userText.toLowerCase().includes('risk')) {
          replyText = "Warning: The 'Escrow Wallet Upgrade' project has a 34% delay risk due to open API bugs. I recommend reallocating Aisha to assist."
        } else {
          replyText = "PM Advisor: Kanban tasks are currently balanced. Workload index is 68% (optimal)."
        }
      } else if (activeTab === 'coder') {
        if (userText.toLowerCase().includes('bug') || userText.toLowerCase().includes('error')) {
          replyText = "Bug analysis: Found potential memory leak in socket connection listener. Recommend implementing useEffect cleanup function."
        } else {
          replyText = "Code review: Structure looks clean. Standard ES6 syntax utilized. AI review score: 94/100."
        }
      }

      setMessages(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], { sender: 'assistant', text: replyText }]
      }))
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <button 
        className="floating-ai-trigger" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Assistant"
        title="SkillSwap AI Assistant"
      >
        {isOpen ? '✕' : '✨'}
      </button>

      {/* Floating Assistant Panel */}
      {isOpen && (
        <section className="floating-ai-panel anim-fade">
          <header className="ai-panel-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="logo-icon" style={{ width: '28px', height: '28px', fontSize: '14px', borderRadius: '8px' }}>✨</div>
              <h3 style={{ fontSize: '15px' }}>SkillSwap AI Copilot</h3>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--success)', fontWeight: '700', background: 'rgba(34,197,94,0.1)', padding: '2px 8px', borderRadius: '20px' }}>Online</span>
          </header>

          {/* Assistant Sub-Agent Tabs */}
          <div className="ai-panel-tabs">
            <button 
              className={`ai-panel-tab ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => setActiveTab('general')}
            >
              General
            </button>
            <button 
              className={`ai-panel-tab ${activeTab === 'advisor' ? 'active' : ''}`}
              onClick={() => setActiveTab('advisor')}
            >
              Advisor
            </button>
            <button 
              className={`ai-panel-tab ${activeTab === 'pm' ? 'active' : ''}`}
              onClick={() => setActiveTab('pm')}
            >
              AI PM
            </button>
            <button 
              className={`ai-panel-tab ${activeTab === 'coder' ? 'active' : ''}`}
              onClick={() => setActiveTab('coder')}
            >
              Coder
            </button>
          </div>

          {/* Message List */}
          <div className="ai-chat-messages" ref={scrollRef}>
            {messages[activeTab].map((msg, index) => (
              <div key={index} className={`ai-msg ${msg.sender === 'user' ? 'user' : 'assistant'}`}>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Typing Area */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                className="neom-input" 
                style={{ padding: '10px 14px', borderRadius: '12px', fontSize: '13px' }}
                placeholder={`Ask AI ${activeTab === 'general' ? 'Assistant' : activeTab === 'advisor' ? 'Advisor' : activeTab === 'pm' ? 'Project Manager' : 'Coder'}...`}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button 
                className="neom-button neom-button-primary"
                style={{ width: '38px', height: '38px', borderRadius: '12px', padding: '0', flexShrink: '0' }}
                onClick={handleSendMessage}
              >
                ➔
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
