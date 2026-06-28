import { useState, useRef, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi, messagesApi } from '../../api'
import { useAuth } from '../../context/AuthContext'
import { Send, Smile, Paperclip, Search, Pin } from 'lucide-react'

function makeRoomId(userId, otherId) {
  return [userId, otherId].sort().join('_')
}

export default function Chat() {
  const { user } = useAuth()
  const queryClient = useQueryClient()
  const [activeUserId, setActiveUserId] = useState(null)
  const [inputVal, setInputVal] = useState('')
  const [search, setSearch] = useState('')
  const scrollRef = useRef(null)

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => usersApi.list().then((r) => r.data),
  })

  const contacts = (Array.isArray(users) ? users : []).filter((u) => u._id !== user?._id)
  const filteredContacts = contacts.filter((u) => u.name?.toLowerCase().includes(search.toLowerCase()))

  const roomId = activeUserId && user?._id ? makeRoomId(user._id, activeUserId) : null

  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ['messages', roomId],
    queryFn: () => messagesApi.getRoom(roomId).then((r) => r.data),
    enabled: !!roomId,
    refetchInterval: 5000,
  })

  const sendMutation = useMutation({
    mutationFn: (text) => messagesApi.send({
      receiver: activeUserId,
      roomId,
      message: text,
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', roomId] })
      setInputVal('')
    },
  })

  const msgList = Array.isArray(messages) ? messages : []
  const activeContact = contacts.find((u) => u._id === activeUserId)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [msgList])

  const handleSend = () => {
    if (!inputVal.trim() || !activeUserId) return
    sendMutation.mutate(inputVal.trim())
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - var(--header-height) - 48px)', margin: '-24px', borderRadius: 'var(--app-radius)', overflow: 'hidden', border: '1px solid var(--app-border)' }}>
      {/* Sidebar - Discord style */}
      <div style={{ width: 280, background: 'var(--app-surface)', borderRight: '1px solid var(--app-border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 16, borderBottom: '1px solid var(--app-border)' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Messages</h2>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="search"
              placeholder="Search people..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '8px 10px 8px 32px', border: '1px solid var(--app-border)', borderRadius: 8, fontSize: 13, background: 'var(--app-bg)' }}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
          {usersLoading ? (
            <div className="skeleton" style={{ height: 48, margin: 8 }} />
          ) : filteredContacts.length === 0 ? (
            <p style={{ padding: 16, fontSize: 13, color: 'var(--app-text-muted)' }}>No contacts found</p>
          ) : (
            filteredContacts.map((c) => (
              <button
                key={c._id}
                type="button"
                onClick={() => setActiveUserId(c._id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px',
                  border: 'none', borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                  background: activeUserId === c._id ? 'var(--app-primary-light)' : 'transparent',
                  color: activeUserId === c._id ? 'var(--app-primary)' : 'var(--app-text)',
                }}
              >
                <div style={{ position: 'relative' }}>
                  <div className="sidebar-avatar" style={{ width: 36, height: 36 }}>
                    {c.name?.[0]?.toUpperCase()}
                  </div>
                  <span style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, background: 'var(--app-success)', borderRadius: '50%', border: '2px solid #fff' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--app-text-muted)' }}>{c.role}</div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--app-bg)' }}>
        {!activeUserId ? (
          <div className="empty-state" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
              <div className="empty-state-icon">💬</div>
              <h3>Select a conversation</h3>
              <p>Choose someone from the list to start messaging.</p>
            </div>
          </div>
        ) : (
          <>
            <div style={{ padding: '14px 20px', background: 'var(--app-surface)', borderBottom: '1px solid var(--app-border)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="sidebar-avatar">{activeContact?.name?.[0]?.toUpperCase()}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{activeContact?.name}</div>
                <div style={{ fontSize: 12, color: 'var(--app-success)' }}>Online</div>
              </div>
              <button type="button" className="app-btn app-btn-ghost" style={{ marginLeft: 'auto', padding: 8 }} aria-label="Pinned messages">
                <Pin size={16} />
              </button>
            </div>

            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {messagesLoading ? (
                <div className="skeleton" style={{ height: 60, width: '60%' }} />
              ) : msgList.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--app-text-muted)', fontSize: 14, margin: 'auto' }}>No messages yet. Say hello!</p>
              ) : (
                msgList.map((msg) => {
                  const isOwn = msg.sender?._id === user?._id || msg.sender === user?._id
                  return (
                    <div key={msg._id} style={{ display: 'flex', justifyContent: isOwn ? 'flex-end' : 'flex-start' }}>
                      <div style={{
                        maxWidth: '70%', padding: '10px 14px', borderRadius: isOwn ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                        background: isOwn ? 'var(--app-primary)' : 'var(--app-surface)',
                        color: isOwn ? '#fff' : 'var(--app-text)',
                        boxShadow: 'var(--app-shadow)', fontSize: 14, lineHeight: 1.5,
                      }}>
                        {!isOwn && <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 4, opacity: 0.8 }}>{msg.sender?.name}</div>}
                        {msg.message}
                        <div style={{ fontSize: 10, opacity: 0.7, marginTop: 4, textAlign: 'right' }}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {msg.status === 'read' && isOwn && ' · Read'}
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <div style={{ padding: 16, background: 'var(--app-surface)', borderTop: '1px solid var(--app-border)' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button type="button" className="app-btn app-btn-ghost" style={{ padding: 8 }} aria-label="Attach file"><Paperclip size={18} /></button>
                <button type="button" className="app-btn app-btn-ghost" style={{ padding: 8 }} aria-label="Emoji"><Smile size={18} /></button>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={`Message ${activeContact?.name}...`}
                  style={{ flex: 1, padding: '10px 14px', border: '1px solid var(--app-border)', borderRadius: 10, fontSize: 14, background: 'var(--app-bg)' }}
                />
                <button type="button" className="app-btn app-btn-primary" style={{ padding: '10px 14px' }} onClick={handleSend} disabled={sendMutation.isPending}>
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
