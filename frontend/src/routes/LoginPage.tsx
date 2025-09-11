import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, me } from '../api/client'

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('user@example.com')
  const [password, setPassword] = useState('user1234')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    try {
      await login(email, password)
      const user = await me()
      if (user.role === 'admin') {
        navigate('/app/admin')
      } else {
        navigate('/app')
      }
    } catch (err) {
      setError('Invalid credentials')
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
      </label>
      <label>
        Password
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
      </label>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button type="submit">Login</button>
    </form>
  )
}

