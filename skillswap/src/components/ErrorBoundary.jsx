import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('Application error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: '#F8FAFC',
          fontFamily: 'Inter, sans-serif',
        }}>
          <div style={{
            maxWidth: '480px',
            textAlign: 'center',
            background: '#fff',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
              Something went wrong
            </h1>
            <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>
              The application encountered an unexpected error. Please reload the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#2563EB',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 24px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Reload Application
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
