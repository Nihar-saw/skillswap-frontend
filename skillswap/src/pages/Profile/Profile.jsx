import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi } from '../../api'
import { useAuth } from '../../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [name, setName] = useState(user?.name || '')
  const [skills, setSkills] = useState(user?.skills?.join(', ') || '')
  const [saved, setSaved] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => usersApi.profile().then((r) => r.data),
    enabled: !!user,
  })

  const profile = data || user

  const updateMutation = useMutation({
    mutationFn: (payload) => usersApi.update(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    },
  })

  const handleSave = (e) => {
    e.preventDefault()
    updateMutation.mutate({
      name: name.trim(),
      skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
    })
  }

  if (isLoading && !profile) return <div className="skeleton" style={{ height: 400 }} />

  const initials = profile?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'U'

  return (
    <div>
      <div className="page-header">
        <h1>Profile</h1>
        <p>Your professional identity on SkillSwap</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
        <div className="app-card" style={{ textAlign: 'center' }}>
          <div className="sidebar-avatar" style={{ width: 80, height: 80, fontSize: 28, margin: '0 auto 16px' }}>{initials}</div>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>{profile?.name}</h2>
          <span style={{ display: 'inline-block', marginTop: 8, fontSize: 12, background: 'var(--app-primary-light)', color: 'var(--app-primary)', padding: '4px 12px', borderRadius: 99, fontWeight: 600 }}>
            {profile?.role}
          </span>
          <div style={{ marginTop: 20, padding: '16px 0', borderTop: '1px solid var(--app-border)' }}>
            <div style={{ fontFamily: 'Outfit', fontSize: 32, fontWeight: 700, color: 'var(--app-primary)' }}>{profile?.trustScore ?? 0}</div>
            <div style={{ fontSize: 12, color: 'var(--app-text-muted)' }}>Trust Score</div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--app-text-muted)', marginTop: 12 }}>{profile?.email}</p>
        </div>

        <div className="app-card">
          {saved && (
            <div style={{ background: '#DCFCE7', color: 'var(--app-success)', padding: 12, borderRadius: 10, fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
              Profile updated successfully.
            </div>
          )}
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Edit Profile</h3>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Full Name</label>
              <input className="neom-input" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Skills (comma-separated)</label>
              <input className="neom-input" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="React, Node.js, Python" style={{ width: '100%' }} />
            </div>
            <button type="submit" className="app-btn app-btn-primary" style={{ alignSelf: 'flex-start' }} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </form>

          {(profile?.skills?.length > 0) && (
            <div style={{ marginTop: 24 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Skills</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {profile.skills.map((s) => (
                  <span key={s} style={{ background: 'var(--app-primary-light)', color: 'var(--app-primary)', padding: '6px 12px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
