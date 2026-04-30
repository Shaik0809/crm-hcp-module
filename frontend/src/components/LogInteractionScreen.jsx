import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../store/interactionSlice'
import LogInteractionForm from './LogInteractionForm'
import ChatInterface from './ChatInterface'

export default function LogInteractionScreen() {
  const dispatch = useDispatch()
  const activeTab = useSelector(state => state.interactions.activeTab)

  return (
    <div>
      <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>
        Log HCP Interaction
      </h1>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>
        Record your interaction via form or let AI do it for you through chat
      </p>

      <div style={{
        display: 'flex',
        backgroundColor: '#e2e8f0',
        borderRadius: '12px',
        padding: '4px',
        marginBottom: '24px',
        width: 'fit-content'
      }}>
        {[
          { id: 'form', label: '📝 Structured Form' },
          { id: 'chat', label: '🤖 AI Chat' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => dispatch(setActiveTab(tab.id))}
            style={{
              padding: '10px 24px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              backgroundColor: activeTab === tab.id ? 'white' : 'transparent',
              color: activeTab === tab.id ? '#1a56db' : '#64748b',
              boxShadow: activeTab === tab.id ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'form' ? <LogInteractionForm /> : <ChatInterface />}
    </div>
  )
}