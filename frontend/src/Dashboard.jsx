import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './api'

const STATUS_COLORS = {
  applied: 'primary',
  interview: 'warning',
  offer: 'success',
  rejected: 'danger',
}

function Dashboard() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    api
      .get('applications/')
      .then((res) => setApplications(res.data))
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false))
  }, [navigate])

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
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.company}</td>
                <td>{app.position}</td>
                <td>{app.location}</td>
                <td>
                  <span className={`badge bg-${STATUS_COLORS[app.status]}`}>
                    {app.status}
                  </span>
                </td>
                <td>{app.applied_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Dashboard