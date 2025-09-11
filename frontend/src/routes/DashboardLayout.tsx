import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { me } from '../api/client'

export function DashboardLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [welcome, setWelcome] = useState('')

  useEffect(() => {
    me().then((u) => {
      setWelcome(`Welcome, ${u.email}`)
    }).catch(() => {
      navigate('/login')
    })
  }, [navigate])

  function logout() {
    localStorage.removeItem('access_token')
    navigate('/login')
  }

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Accessible Travel Dashboard</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span aria-live="polite">{welcome}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </header>
      <nav style={{ display: 'flex', gap: 12, margin: '12px 0' }}>
        <Link to="/app/ride" aria-current={location.pathname.endsWith('/ride')}>Ride</Link>
        <Link to="/app/hotels" aria-current={location.pathname.endsWith('/hotels')}>Hotels</Link>
        <Link to="/app/history" aria-current={location.pathname.endsWith('/history')}>History</Link>
        <Link to="/app/navigation" aria-current={location.pathname.endsWith('/navigation')}>Navigation</Link>
        <Link to="/app/admin" aria-current={location.pathname.endsWith('/admin')}>Admin</Link>
      </nav>
      <Outlet />
    </div>
  )
}

