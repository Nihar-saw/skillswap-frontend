import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { paymentsApi } from '../../api'

export default function PaymentDashboard() {
  const [activeTab, setActiveTab] = useState('wallet')

  const { data: wallet, isLoading: walletLoading } = useQuery({
    queryKey: ['wallet'],
    queryFn: () => paymentsApi.wallet().then((r) => r.data),
  })

  const { data: transactions, isLoading: txLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => paymentsApi.transactions().then((r) => r.data),
    enabled: activeTab === 'transactions',
  })

  const txList = Array.isArray(transactions) ? transactions : []

  return (
    <div>
      <div className="page-header">
        <h1>Wallet</h1>
        <p>Manage your skill credits and transactions</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['wallet', 'transactions'].map((t) => (
          <button key={t} type="button" className={`app-btn ${activeTab === t ? 'app-btn-primary' : 'app-btn-ghost'}`} style={{ padding: '8px 16px', textTransform: 'capitalize' }} onClick={() => setActiveTab(t)}>
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'wallet' && (
        walletLoading ? <div className="skeleton" style={{ height: 200 }} /> : (
          <div className="app-card" style={{ maxWidth: 420, background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', color: '#fff', border: 'none' }}>
            <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 8 }}>Available Balance</div>
            <div style={{ fontFamily: 'Outfit', fontSize: 42, fontWeight: 800 }}>{wallet?.balance ?? 0}</div>
            <div style={{ fontSize: 14, opacity: 0.85, marginTop: 4 }}>Skill Credits</div>
          </div>
        )
      )}

      {activeTab === 'transactions' && (
        txLoading ? <div className="skeleton" style={{ height: 300 }} /> : txList.length === 0 ? (
          <div className="empty-state app-card"><h3>No transactions yet</h3></div>
        ) : (
          <div className="feed-grid">
            {txList.map((tx) => (
              <article key={tx._id} className="app-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>
                    {tx.sender?.name || 'Unknown'} → {tx.receiver?.name || 'Unknown'}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--app-text-muted)', marginTop: 4 }}>
                    {new Date(tx.createdAt).toLocaleString()}
                    {tx.project?.title && ` · ${tx.project.title}`}
                  </div>
                </div>
                <div style={{ fontFamily: 'Outfit', fontSize: 18, fontWeight: 700, color: 'var(--app-primary)' }}>
                  {tx.amount}
                </div>
              </article>
            ))}
          </div>
        )
      )}
    </div>
  )
}
