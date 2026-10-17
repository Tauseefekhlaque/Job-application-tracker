import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './api'

const EMPTY_FORM = {
  company: '',
  position: '',
  location: '',
  status: 'applied',
  applied_date: '',
}

function Dashboard() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    api
      .get('applications/')
      .then((res) => setApplications(res.data))
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false))
  }, [navigate])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('applications/', form)
      setApplications([res.data, ...applications])
      setForm(EMPTY_FORM)
    } catch {
      setError('Could not save. Please check the fields and try again.')
    }
  }

  const handleStatusChange = async (id, status) => {
    setError('')
    try {
      const res = await api.patch(`applications/${id}/`, { status })
      setApplications(applications.map((a) => (a.id === id ? res.data : a)))
    } catch {
      setError('Could not update the status.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this application?')) return
    setError('')
    try {
      await api.delete(`applications/${id}/`)
      setApplications(applications.filter((a) => a.id !== id))
    } catch {
      setError('Could not delete the application.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    navigate('/login')
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>My Applications</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Add a new application</h5>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <input
                  className="form-control"
                  name="company"
                  placeholder="Company"
                  value={form.company}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  className="form-control"
                  name="position"
                  placeholder="Position"
                  value={form.position}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <input
                  className="form-control"
                  name="location"
                  placeholder="Location"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <select
                  className="form-select"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control"
                  name="applied_date"
                  value={form.applied_date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <button className="btn btn-primary w-100">Add Application</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {loading && <p className="text-muted">Loading...</p>}

      {!loading && applications.length === 0 && (
        <p className="text-muted">No applications yet.</p>
      )}

      {applications.length > 0 && (
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Location</th>
              <th>Status</th>
              <th>Applied Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.company}</td>
                <td>{app.position}</td>
                <td>{app.location}</td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    style={{ width: '140px' }}
                    value={app.status}
                    onChange={(e) => handleStatusChange(app.id, e.target.value)}
                  >
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td>{app.applied_date}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(app.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Dashboard