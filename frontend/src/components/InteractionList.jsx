import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInteractions } from '../store/interactionSlice'

const sentimentColor = {
  Positive: { bg: '#d1fae5', text: '#065f46' },
  Negative: { bg: '#fee2e2', text: '#991b1b' },
  Neutral: { bg: '#f1f5f9', text: '#475569' }
}

export default function InteractionList() {
  const dispatch = useDispatch()
  const { list, loading } = useSelector(s => s.interactions)

  useEffect(() => { dispatch(fetchInteractions()) }, [])

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '60px', color: '#64748b' }}>
      Loading interactions...
    </div>
  )

  return (
    <div>
      <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#1e293b',
                   marginBottom: '20px' }}>
        📋 Interaction History ({list.length})
      </h2>

      {list.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#64748b',
                      backgroundColor: 'white', borderRadius: '16px' }}>
          No interactions logged yet. Go log one!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {list.map(item => {
            const colors = sentimentColor[item.sentiment] || sentimentColor.Neutral
            return (
              <div key={item.id} style={{
                backgroundColor: 'white', borderRadius: '12px',
                padding: '20px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                borderLeft: `4px solid ${item.sentiment === 'Positive' ? '#10b981'
                  : item.sentiment === 'Negative' ? '#ef4444' : '#94a3b8'}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between',
                               alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <span style={{ fontWeight: '700', fontSize: '16px', color: '#1e293b' }}>
                      {item.hcp_name}
                    </span>
                    {item.hcp_specialty && (
                      <span style={{ marginLeft: '8px', color: '#64748b', fontSize: '14px' }}>
                        • {item.hcp_specialty}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: '12px', fontSize: '12px',
                      fontWeight: '600', backgroundColor: colors.bg, color: colors.text
                    }}>
                      {item.sentiment}
                    </span>
                    <span style={{ color: '#94a3b8', fontSize: '13px' }}>
                      {item.date}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>
                    📌 {item.interaction_type}
                  </span>
                  {item.products_discussed && (
                    <span style={{ fontSize: '13px', color: '#64748b' }}>
                      💊 {item.products_discussed}
                    </span>
                  )}
                  {item.follow_up_required === 'Yes' && (
                    <span style={{ fontSize: '13px', color: '#d97706', fontWeight: '500' }}>
                      ⚠️ Follow-up needed
                    </span>
                  )}
                </div>

                {item.notes && (
                  <p style={{ fontSize: '14px', color: '#475569', margin: 0,
                              lineHeight: '1.5' }}>
                    {item.notes.slice(0, 150)}{item.notes.length > 150 ? '...' : ''}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}