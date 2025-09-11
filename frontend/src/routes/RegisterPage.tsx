import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { DisabilityType } from '../api/client'
import { register } from '../api/client'

const disabilities: DisabilityType[] = ['Blind', 'Deaf', 'Wheelchair', 'Cognitive', 'Other']

export function RegisterPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [disability, setDisability] = useState<DisabilityType | ''>('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await register({ email, password, disability_type: disability || undefined })
      setSuccess('Registration successful. You can now login.')
      setTimeout(() => navigate('/login'), 800)
    } catch (err) {
      setError('Registration failed. Email may already be used.')
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
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={6} />
      </label>
      <label>
        Disability Type
        <select value={disability} onChange={(e) => setDisability(e.target.value as DisabilityType | '')}>
          <option value="">Select...</option>
          {disabilities.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </label>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <button type="submit">Register</button>
    </form>
  )
}

