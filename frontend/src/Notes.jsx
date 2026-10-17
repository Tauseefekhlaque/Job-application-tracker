import { useEffect, useState } from 'react'
import api from './api'

function Notes({ applicationId }) {
  const [notes, setNotes] = useState([])
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get(`applications/${applicationId}/notes/`)
      .then((res) => setNotes(res.data))
      .catch(() => setError('Could not load notes.'))
  }, [applicationId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post(`applications/${applicationId}/notes/`, { text })
      setNotes([res.data, ...notes])
      setText('')
    } catch {
      setError('Could not save the note.')
    }
  }

  return (
    <div className="p-3 bg-light rounded">
      {error && <div className="alert alert-danger py-2">{error}</div>}

      <form onSubmit={handleSubmit} className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Write a note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button className="btn btn-primary">Add Note</button>
      </form>

      {notes.length === 0 && <p className="text-muted mb-0">No notes yet.</p>}

      <ul className="list-group">
        {notes.map((n) => (
          <li key={n.id} className="list-group-item">
            <div>{n.text}</div>
            <small className="text-muted">
              {new Date(n.created_at).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Notes