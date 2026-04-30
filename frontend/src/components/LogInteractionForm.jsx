import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createInteraction } from '../store/interactionSlice'

const inputStyle = {
  width: '100%', padding: '10px 14px', borderRadius: '8px',
  border: '1.5px solid #e2e8f0', fontFamily: "'Inter', sans-serif",
  fontSize: '14px', outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 0.2s'
}
const labelStyle = {
  display: 'block', marginBottom: '6px', fontWeight: '500',
  color: '#374151', fontSize: '14px'
}

export default function LogInteractionForm() {
  const dispatch = useDispatch()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    hcp_name: '', hcp_specialty: '', interaction_type: 'visit',
    date: new Date().toISOString().split('T')[0], products_discussed: '',
    notes: '', follow_up_required: 'No', follow_up_notes: '',
    sentiment: 'Neutral', summary: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(createInteraction(form))
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setForm({
      hcp_name: '', hcp_specialty: '', interaction_type: 'visit',
      date: new Date().toISOString().split('T')[0], products_discussed: '',
      notes: '', follow_up_required: 'No', follow_up_notes: '',
      sentiment: 'Neutral', summary: ''
    })
  }

  return (
    <div style={{
      backgroundColor: 'white', borderRadius: '16px',
      padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
    }}>
      {submitted && (
        <div style={{
          backgroundColor: '#d1fae5', border: '1px solid #6ee7b7',
          borderRadius: '8px', padding: '12px 16px', marginBottom: '20px',
          color: '#065f46', fontWeight: '500'
        }}>
          ✅ Interaction logged successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

          <div>
            <label style={labelStyle}>Doctor Name *</label>
            <input style={inputStyle} name="hcp_name" value={form.hcp_name}
              onChange={handleChange} required placeholder="Dr. Sarah Johnson" />
          </div>

          <div>
            <label style={labelStyle}>Specialty</label>
            <input style={inputStyle} name="hcp_specialty" value={form.hcp_specialty}
              onChange={handleChange} placeholder="Cardiologist" />
          </div>

          <div>
            <label style={labelStyle}>Interaction Type</label>
            <select style={inputStyle} name="interaction_type" value={form.interaction_type}
              onChange={handleChange}>
              <option value="visit">🏥 In-Person Visit</option>
              <option value="call">📞 Phone Call</option>
              <option value="email">📧 Email</option>
              <option value="conference">🎤 Conference</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Date</label>
            <input style={inputStyle} type="date" name="date" value={form.date}
              onChange={handleChange} />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Products / Medicines Discussed</label>
            <input style={inputStyle} name="products_discussed" value={form.products_discussed}
              onChange={handleChange} placeholder="Metformin, Lisinopril, etc." />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Interaction Notes</label>
            <textarea style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
              name="notes" value={form.notes} onChange={handleChange}
              placeholder="What was discussed during the interaction..." />
          </div>

          <div>
            <label style={labelStyle}>Sentiment</label>
            <select style={inputStyle} name="sentiment" value={form.sentiment}
              onChange={handleChange}>
              <option value="Positive">😊 Positive</option>
              <option value="Neutral">😐 Neutral</option>
              <option value="Negative">😞 Negative</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Follow-up Required?</label>
            <select style={inputStyle} name="follow_up_required" value={form.follow_up_required}
              onChange={handleChange}>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {form.follow_up_required === 'Yes' && (
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Follow-up Notes</label>
              <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                name="follow_up_notes" value={form.follow_up_notes} onChange={handleChange}
                placeholder="What needs to be done..." />
            </div>
          )}
        </div>

        <button type="submit" style={{
          marginTop: '24px', padding: '12px 32px',
          backgroundColor: '#1a56db', color: 'white',
          border: 'none', borderRadius: '8px', cursor: 'pointer',
          fontFamily: "'Inter', sans-serif", fontWeight: '600', fontSize: '15px',
          width: '100%', transition: 'background-color 0.2s'
        }}>
          💾 Save Interaction
        </button>
      </form>
    </div>
  )
}