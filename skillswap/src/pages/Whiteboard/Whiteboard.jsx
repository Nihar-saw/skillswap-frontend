import { useState, useRef, useEffect } from 'react'

export default function Whiteboard() {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushColor, setBrushColor] = useState('#6366F1') // primary indigo default
  const [brushSize, setBrushSize] = useState(5)
  const [isEraser, setIsEraser] = useState(false)

  // Draggable Sticky Notes state
  const [stickies, setStickies] = useState([
    { id: 1, text: 'Brainstorm: MERN socket pipeline parameters', x: 80, y: 120, color: '#FEF3C7', dragging: false },
    { id: 2, text: 'Valuation trigger: Add interactive vector charts', x: 260, y: 80, color: '#DCFCE7', dragging: false }
  ])

  // Drag coordinates offset tracker
  const dragOffsetRef = useRef({ x: 0, y: 0 })
  const activeDragIdRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      // Adjust canvas resolution dynamically to fit containing panel
      canvas.width = canvas.parentElement.clientWidth
      canvas.height = canvas.parentElement.clientHeight
      
      const ctx = canvas.getContext('2d')
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
    }
  }, [])

  // Drawing Canvas Handlers
  const startDrawing = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')

    ctx.beginPath()
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
    setIsDrawing(true)
  }

  const draw = (e) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const ctx = canvas.getContext('2d')

    ctx.lineWidth = brushSize
    ctx.strokeStyle = isEraser ? '#F8FAFC' : brushColor // Eraser matches card background
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const exportCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const url = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = 'skillswap_whiteboard.png'
    link.href = url
    link.click()
  }

  // Draggable post-it note logic
  const handleStickyMouseDown = (id, e) => {
    e.stopPropagation()
    activeDragIdRef.current = id
    const target = stickies.find(s => s.id === id)
    dragOffsetRef.current = {
      x: e.clientX - target.x,
      y: e.clientY - target.y
    }
  }

  const handleGlobalMouseMove = (e) => {
    if (activeDragIdRef.current === null) return
    const id = activeDragIdRef.current
    const offset = dragOffsetRef.current

    setStickies(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          x: e.clientX - offset.x,
          y: e.clientY - offset.y
        }
      }
      return s
    }))
  }

  const handleGlobalMouseUp = () => {
    activeDragIdRef.current = null
  }

  const addStickyNote = () => {
    const newSticky = {
      id: Date.now(),
      text: 'Double click to edit note...',
      x: 150,
      y: 150,
      color: '#FEE2E2',
      dragging: false
    }
    setStickies([...stickies, newSticky])
  }

  const updateStickyText = (id, text) => {
    setStickies(prev => prev.map(s => s.id === id ? { ...s, text } : s))
  }

  return (
    <div 
      className="whiteboard-container anim-fade"
      onMouseMove={handleGlobalMouseMove}
      onMouseUp={handleGlobalMouseUp}
    >
      
      {/* Drawing Toolbar */}
      <div className="neom-card whiteboard-toolbar">
        
        {/* Colors Selection */}
        <div className="toolbar-group">
          <strong>Color:</strong>
          {['#6366F1', '#8B5CF6', '#06B6D4', '#EF4444', '#22C55E', '#1F2937'].map((c) => (
            <div 
              key={c}
              className={`color-dot ${brushColor === c && !isEraser ? 'active' : ''}`}
              style={{ background: c }}
              onClick={() => { setBrushColor(c); setIsEraser(false); }}
            />
          ))}
          <button 
            className={`neom-button ${isEraser ? 'active' : ''}`}
            onClick={() => setIsEraser(true)}
            style={{ padding: '6px 12px', fontSize: '11px', borderRadius: '8px' }}
          >
            🧹 Eraser
          </button>
        </div>

        {/* Brush Size Slider */}
        <div className="toolbar-group">
          <strong>Size:</strong>
          <input 
            type="range" 
            min="2" 
            max="25" 
            value={brushSize} 
            onChange={e => setBrushSize(parseInt(e.target.value))}
            style={{ width: '100px', cursor: 'pointer', accentColor: 'var(--primary)' }}
          />
          <span style={{ fontSize: '12px', fontWeight: '700' }}>{brushSize}px</span>
        </div>

        {/* Action controls */}
        <div className="toolbar-group">
          <button className="neom-button" style={{ padding: '8px 14px', borderRadius: '10px', fontSize: '12px' }} onClick={addStickyNote}>
            📌 Add Note
          </button>
          <button className="neom-button" style={{ padding: '8px 14px', borderRadius: '10px', fontSize: '12px' }} onClick={clearCanvas}>
            🗑 Clear
          </button>
          <button className="neom-button neom-button-primary" style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '12px' }} onClick={exportCanvas}>
            ➔ Export PNG
          </button>
        </div>
      </div>

      {/* Interactive whiteboard zone */}
      <div className="whiteboard-canvas-wrapper" style={{ minHeight: '450px' }}>
        
        {/* Post-it Notes layers */}
        {stickies.map((sticky) => (
          <textarea
            key={sticky.id}
            className="sticky-note"
            style={{
              left: `${sticky.x}px`,
              top: `${sticky.y}px`,
              background: sticky.color,
              zIndex: activeDragIdRef.current === sticky.id ? 100 : 5
            }}
            value={sticky.text}
            onChange={e => updateStickyText(sticky.id, e.target.value)}
            onMouseDown={e => handleStickyMouseDown(sticky.id, e)}
          />
        ))}

        {/* Main Canvas layer */}
        <canvas 
          ref={canvasRef}
          className="whiteboard-canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>

    </div>
  )
}
