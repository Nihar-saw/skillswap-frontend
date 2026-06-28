import { useState } from 'react'

export default function LandingPage({ onGetStarted }) {
  const [activeFeature, setActiveFeature] = useState('matching') // matching, escrow, editor, whiteboard
  const [faqOpen, setFaqOpen] = useState({ 0: true })
  
  const toggleFaq = (index) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const features = {
    matching: {
      title: "AI-Powered Team Matching",
      desc: "Our neural network maps profiles, repos, and code styles to compute a high-precision 'Match Score' between founders, developers, and designers.",
      bullets: ["Deep Skill Graph Analysis", "Evolutionary Co-founder Matching", "Automated Gap Detection"],
      icon: "🧠"
    },
    escrow: {
      title: "Secure Escrow Contracts",
      desc: "Protect payouts using neomorphic smart milestone escrows. Funds are released automatically once AI Workspace verifies deployment criteria.",
      bullets: ["AI-backed code verification", "Automated milestone audits", "Fee-less credit transactions"],
      icon: "🛡️"
    },
    editor: {
      title: "Live Code Collaboration",
      desc: "Write code together in a VS Code inspired workspace with an integrated sandbox terminal and inline AI bug scanners.",
      bullets: ["Multi-user coding loops", "AI-driven architecture review", "Automated code complexity grading"],
      icon: "💻"
    },
    whiteboard: {
      title: "Futuristic Whiteboard",
      desc: "Brainstorm on a shared canvas. Add sticky notes, sketch architectural diagrams, and export directly into sprint boards.",
      bullets: ["Canvas drawing tools", "Post-it note collaboration", "Direct export to Kanban milestones"],
      icon: "🎨"
    }
  }

  return (
    <div className="landing-shell anim-fade">
      {/* Navbar */}
      <nav className="landing-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="logo-icon">S</div>
          <span className="logo-text">SkillSwap AI</span>
        </div>
        <div className="landing-nav-links">
          <a href="#features" className="landing-nav-link">Features</a>
          <a href="#pricing" className="landing-nav-link">Pricing</a>
          <a href="#testimonials" className="landing-nav-link">Testimonials</a>
          <a href="#faq" className="landing-nav-link">FAQ</a>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="neom-button" onClick={onGetStarted}>Sign In</button>
          <button className="neom-button neom-button-primary" onClick={onGetStarted}>Launch App</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="landing-hero">
        <div>
          <span className="hero-tagline">✨ The Future of Startup Collaboration</span>
          <h1 className="hero-title">
            Where Founders, Tech Talents, & AI Build the Next Unicorns.
          </h1>
          <p className="hero-desc">
            SkillSwap AI is a premium SaaS ecosystem uniting founders, engineers, and designers. Build fast, verify milestones via AI Workspaces, and secure transactions through smart escrows.
          </p>
          <div className="hero-btns">
            <button className="neom-button neom-button-primary" style={{ padding: '16px 36px', borderRadius: '18px', fontSize: '16px' }} onClick={onGetStarted}>
              Build Your Project Free
            </button>
            <button className="neom-button" style={{ padding: '16px 28px', borderRadius: '18px' }} onClick={onGetStarted}>
              Explore Hub ➔
            </button>
          </div>
        </div>

        {/* Animated Matching Pulse Illustration */}
        <div className="hero-illustration">
          <div className="neom-radar-ring">
            <div className="neom-radar-center">
              <span>🚀</span>
            </div>
            <div className="radar-node radar-node-1" title="AI PM Agent">🤖</div>
            <div className="radar-node radar-node-2" title="Founder Node">👔</div>
            <div className="radar-node radar-node-3" title="UI Designer Node">🎨</div>
            <div className="radar-node radar-node-4" title="Developer Node">💻</div>
          </div>
        </div>
      </header>

      {/* Startup Statistics Section */}
      <section style={{ padding: '60px 80px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div className="metrics-grid">
          <article className="neom-card metric-neom-card">
            <div className="metric-info">
              <span className="metric-label">Active Founders</span>
              <strong className="metric-value">1,420+</strong>
              <small className="metric-delta delta-up">▲ 12% MoM</small>
            </div>
            <div className="metric-icon-wrapper">👔</div>
          </article>

          <article className="neom-card metric-neom-card">
            <div className="metric-info">
              <span className="metric-label">Matches Completed</span>
              <strong className="metric-value">94.8%</strong>
              <small className="metric-delta delta-up">▲ 9% accuracy</small>
            </div>
            <div className="metric-icon-wrapper">🤝</div>
          </article>

          <article className="neom-card metric-neom-card">
            <div className="metric-info">
              <span className="metric-label">Escrow Transacted</span>
              <strong className="metric-value">4.2M</strong>
              <small className="metric-delta delta-up">▲ 28% growth</small>
            </div>
            <div className="metric-icon-wrapper">🪙</div>
          </article>

          <article className="neom-card metric-neom-card">
            <div className="metric-info">
              <span className="metric-label">AI Code Reviews</span>
              <strong className="metric-value">18.5k</strong>
              <small className="metric-delta delta-up">▲ 41% speedup</small>
            </div>
            <div className="metric-icon-wrapper">🤖</div>
          </article>
        </div>
      </section>

      {/* Features Catalog (Horizontal Tabs) */}
      <section id="features" style={{ padding: '80px 80px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div className="section-header">
          <h2>One Workspace, Endless Velocity</h2>
          <p>Everything your startup needs to go from napkin idea to verified code deployment, powered by automated intelligence.</p>
        </div>

        {/* Feature selection tabs */}
        <div className="auth-tabs" style={{ maxWidth: '640px', margin: '0 auto 40px', gridTemplateColumns: 'repeat(4, 1fr)', borderRadius: '16px' }}>
          <button className={`auth-tab ${activeFeature === 'matching' ? 'active' : ''}`} onClick={() => setActiveFeature('matching')} style={{ fontSize: '13px' }}>AI Match</button>
          <button className={`auth-tab ${activeFeature === 'escrow' ? 'active' : ''}`} onClick={() => setActiveFeature('escrow')} style={{ fontSize: '13px' }}>Escrow</button>
          <button className={`auth-tab ${activeFeature === 'editor' ? 'active' : ''}`} onClick={() => setActiveFeature('editor')} style={{ fontSize: '13px' }}>Sandbox</button>
          <button className={`auth-tab ${activeFeature === 'whiteboard' ? 'active' : ''}`} onClick={() => setActiveFeature('whiteboard')} style={{ fontSize: '13px' }}>Canvas</button>
        </div>

        {/* Feature Display Card */}
        <div className="neom-card anim-fade" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '48px', alignItems: 'center', minHeight: '360px' }}>
          <div style={{ padding: '16px' }}>
            <span style={{ fontSize: '40px', display: 'block', marginBottom: '20px' }}>{features[activeFeature].icon}</span>
            <h3 style={{ fontSize: '28px', marginBottom: '16px' }}>{features[activeFeature].title}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>{features[activeFeature].desc}</p>
            <button className="neom-button neom-button-primary" onClick={onGetStarted}>Try Feature Now</button>
          </div>
          <div className="neom-inset-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', height: '100%', minHeight: '260px' }}>
            <h4 style={{ fontSize: '16px', color: 'var(--primary)' }}>Key Capabilities</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {features[activeFeature].bullets.map((bullet, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: 'var(--success)' }}>✔</span>
                  <strong>{bullet}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: '80px 80px', background: 'rgba(255, 255, 255, 0.25)', borderTop: '1px solid rgba(255,255,255,0.4)' }}>
        <div className="section-header">
          <h2>Pricing Made Simple</h2>
          <p>Choose the level of startup acceleration that fits your milestone requirements. Scale as your traction takes off.</p>
        </div>

        <div className="pricing-grid">
          {/* Plan 1 */}
          <div className="neom-card pricing-card">
            <h4>Hobbyist / Talent</h4>
            <div className="pricing-price">$0<span>/forever</span></div>
            <p style={{ color: 'var(--text-muted)' }}>Perfect for engineers & designers looking to swap skills and build a portfolio.</p>
            <ul className="pricing-features">
              <li><span>✔</span> AI Skill Score Assessment</li>
              <li><span>✔</span> List up to 3 Active Projects</li>
              <li><span>✔</span> Escrow Wallet Integration</li>
              <li style={{ color: 'var(--text-muted)' }}>✘ Dedicated AI Startup Advisor</li>
            </ul>
            <button className="neom-button" style={{ width: '100%' }} onClick={onGetStarted}>Get Started</button>
          </div>

          {/* Plan 2 */}
          <div className="neom-card pricing-card premium" style={{ border: '2px solid var(--primary)' }}>
            <div className="premium-badge">POPULAR</div>
            <h4>Startup Builder</h4>
            <div className="pricing-price">$49<span>/month</span></div>
            <p style={{ color: 'var(--text-muted)' }}>For founders and cross-functional teams aiming to speed up execution with AI.</p>
            <ul className="pricing-features">
              <li><span>✔</span> AI-Powered Team Matching (Unlimited)</li>
              <li><span>✔</span> Kanban Milestone Verifications</li>
              <li><span>✔</span> AI Code Audit & Bug Scan (100 runs/mo)</li>
              <li><span>✔</span> AI Startup Advisor & Valuation index</li>
            </ul>
            <button className="neom-button neom-button-primary" style={{ width: '100%' }} onClick={onGetStarted}>Upgrade to Builder</button>
          </div>

          {/* Plan 3 */}
          <div className="neom-card pricing-card">
            <h4>Venture Hub</h4>
            <div className="pricing-price">Custom<span>/enterprise</span></div>
            <p style={{ color: 'var(--text-muted)' }}>For incubation centers, VC portfolios, and large scale software studios.</p>
            <ul className="pricing-features">
              <li><span>✔</span> Custom LLM Fine-Tuning on Repos</li>
              <li><span>✔</span> Advanced Admin controls & logs audit</li>
              <li><span>✔</span> Infinite AI workspace scans</li>
              <li><span>✔</span> Real-time investor pitch deck score cards</li>
            </ul>
            <button className="neom-button" style={{ width: '100%' }} onClick={onGetStarted}>Contact Sales</button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" style={{ padding: '80px 80px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <div className="section-header">
          <h2>Backed by High-Growth Builders</h2>
          <p>Hear how designers, software architects, and venture-backed founders leverage our neomorphic MERN ecosystem.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          <div className="neom-card">
            <span style={{ fontSize: '28px', color: 'var(--primary)' }}>“</span>
            <p style={{ fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.6' }}>
              "Finding a backend engineer who understood system architecture used to take weeks. SkillSwap matched me with Aisha in 10 minutes, and the AI Code review verified her code escrow in seconds."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="sidebar-avatar" style={{ background: '#E0E7FF', color: 'var(--primary)' }}>DR</div>
              <div>
                <strong>Dev Rohan</strong>
                <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)' }}>Founder, FinRoute</span>
              </div>
            </div>
          </div>

          <div className="neom-card">
            <span style={{ fontSize: '28px', color: 'var(--primary)' }}>“</span>
            <p style={{ fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.6' }}>
              "The Whiteboard and Sandbox editors are fantastic. We brainstorm and write code in one place, while the AI PM flags sprint anomalies before we run over budget. Invaluable."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="sidebar-avatar" style={{ background: '#F5E6FF', color: 'var(--secondary)' }}>MS</div>
              <div>
                <strong>Mira Shah</strong>
                <span style={{ display: 'block', fontSize: '12px', color: 'var(--text-muted)' }}>UI/UX Lead, CloudVault</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" style={{ padding: '80px 24px', width: '100%' }}>
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about SkillSwap AI credit models, security, and workspaces.</p>
        </div>

        <div className="faq-accordion">
          <div className="neom-card faq-item">
            <div className="faq-q" onClick={() => toggleFaq(0)}>
              <span>How does the AI compute the Skill Matching Score?</span>
              <strong>{faqOpen[0] ? '−' : '+'}</strong>
            </div>
            {faqOpen[0] && (
              <div className="faq-a">
                We pull data from connected GitHub repositories, inspect codebase architecture patterns, check coding velocity, and scan user-added skills. This maps a multi-dimensional graph compared directly to startup requirements.
              </div>
            )}
          </div>

          <div className="neom-card faq-item">
            <div className="faq-q" onClick={() => toggleFaq(1)}>
              <span>Is my code and IP secure in the Live Code Editor?</span>
              <strong>{faqOpen[1] ? '−' : '+'}</strong>
            </div>
            {faqOpen[1] && (
              <div className="faq-a">
                Absolutely. All editing rooms are isolated on secure WebSockets. We do not use user codebase files to train public models. Code reviews are carried out via a secure, private LLM pipeline.
              </div>
            )}
          </div>

          <div className="neom-card faq-item">
            <div className="faq-q" onClick={() => toggleFaq(2)}>
              <span>How do Escrow Wallet payments work?</span>
              <strong>{faqOpen[2] ? '−' : '+'}</strong>
            </div>
            {faqOpen[2] && (
              <div className="faq-a">
                Founders deposit credits into a smart escrow contract. The developers complete milestone tasks in the AI Workspace. Once our automated AI review approves the deployment code structure, the credits release immediately.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-column" style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div className="logo-icon">S</div>
              <span className="logo-text">SkillSwap AI</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', maxWidth: '300px' }}>
              Accelerating startup building through collaborative networks, code sandboxes, and automated intelligence.
            </p>
          </div>
          <div className="footer-column">
            <h4>Product</h4>
            <ul className="footer-links">
              <li><a href="#features" className="footer-link">Team Matching</a></li>
              <li><a href="#features" className="footer-link">Code Editor</a></li>
              <li><a href="#features" className="footer-link">Whiteboards</a></li>
              <li><a href="#pricing" className="footer-link">Pricing Models</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><a href="#testimonials" className="footer-link">About Us</a></li>
              <li><a href="#testimonials" className="footer-link">Testimonials</a></li>
              <li><a href="#faq" className="footer-link">Contact</a></li>
              <li><a href="#faq" className="footer-link">Support Desk</a></li>
            </ul>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '24px', maxWidth: '1200px', margin: '0 auto', width: '100%', fontSize: '13px', color: 'var(--text-muted)' }}>
          <span>© 2026 SkillSwap AI MERN Workspace. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
