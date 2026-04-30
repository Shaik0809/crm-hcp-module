import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { chatWithAgent, addChatMessage, clearChat } from '../store/interactionSlice'

export default function ChatInterface() {
  const dispatch = useDispatch()
  const { chatMessages, chatLoading } = useSelector(s => s.interactions)
  const [input, setInput] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const sendMessage = async () => {
    if (!input.trim() || chatLoading) return

    const userMessage = { role: 'user', content: input }
    dispatch(addChatMessage(userMessage))

    const history = chatMessages.map(m => ({ role: m.role, content: m.content }))

    await dispatch(chatWithAgent({
      message: input,
      conversation_history: history
    }))

    setInput('')
  }

  const suggestions = [
    "I visited Dr. Smith today, discussed Metformin",
    "What are my pending follow-ups?",
    "Search interactions with Dr. Johnson",
  ]

  return (
    <div style={{
      backgroundColor: 'white', borderRadius: '16px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.08)', overflow: 'hidden'
    }}>
      <div style={{
        backgroundColor: '#1a56db', padding: '16px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '22px' }}>🤖</span>
          <div>
            <div style={{ color: 'white', fontWeight: '600', fontSize: '15px' }}>
              CRM AI Assistant
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>
              Powered by Groq Gemma2
            </div>
          </div>
        </div>
        <button onClick={() => dispatch(clearChat())} style={{
          background: 'rgba(255,255,255,0.15)', border: 'none',
          color: 'white', padding: '6px 12px', borderRadius: '6px',
          cursor: 'pointer', fontSize: '12px'
        }}>
          Clear Chat
        </button>
      </div>

      <div style={{ height: '420px', overflowY: 'auto', padding: '20px' }}>
        {chatMessages.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>💬</div>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>
              Describe your HCP interaction and I'll log it for you!
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px',
                          alignItems: 'center' }}>
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => setInput(s)} style={{
                  padding: '8px 16px', borderRadius: '20px',
                  border: '1.5px solid #e2e8f0', background: 'white',
                  color: '#374151', cursor: 'pointer', fontSize: '13px'
                }}>{s}</button>
              ))}
            </div>
          </div>
        ) : (
          chatMessages.map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '12px'
            }}>
              <div style={{
                maxWidth: '75%', padding: '10px 14px', borderRadius: '12px',
                backgroundColor: msg.role === 'user' ? '#1a56db' : '#f1f5f9',
                color: msg.role === 'user' ? 'white' : '#1e293b',
                fontSize: '14px', lineHeight: '1.5'
              }}>
                {msg.content}
              </div>
            </div>
          ))
        )}
        {chatLoading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{
              padding: '10px 16px', borderRadius: '12px',
              backgroundColor: '#f1f5f9', color: '#64748b', fontSize: '14px'
            }}>
              🤔 Thinking...
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div style={{
        borderTop: '1px solid #e2e8f0', padding: '16px 20px',
        display: 'flex', gap: '10px'
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && sendMessage()}
          placeholder="Tell me about your HCP interaction..."
          style={{
            flex: 1, padding: '10px 14px', borderRadius: '8px',
            border: '1.5px solid #e2e8f0', fontSize: '14px', outline: 'none'
          }}
        />
        <button onClick={sendMessage} disabled={chatLoading} style={{
          padding: '10px 20px', backgroundColor: chatLoading ? '#94a3b8' : '#1a56db',
          color: 'white', border: 'none', borderRadius: '8px',
          cursor: chatLoading ? 'not-allowed' : 'pointer', fontWeight: '600'
        }}>
          Send →
        </button>
      </div>
    </div>
  )
}