export default function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav style={{
      backgroundColor: '#1a56db',
      padding: '16px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '24px' }}>🏥</span>
        <span style={{ color: 'white', fontSize: '20px', fontWeight: '700' }}>
          HCP CRM
        </span>
        <span style={{
          backgroundColor: 'rgba(255,255,255,0.2)',
          color: 'white',
          fontSize: '11px',
          padding: '2px 8px',
          borderRadius: '12px'
        }}>AI-Powered</span>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        {[
          { id: 'log', label: '➕ Log Interaction' },
          { id: 'history', label: '📋 History' }
        ].map(btn => (
          <button
            key={btn.id}
            onClick={() => setCurrentPage(btn.id)}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              fontWeight: '500',
              backgroundColor: currentPage === btn.id
                ? 'white' : 'rgba(255,255,255,0.15)',
              color: currentPage === btn.id ? '#1a56db' : 'white',
              transition: 'all 0.2s'
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </nav>
  )
}