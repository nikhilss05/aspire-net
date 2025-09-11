import { useEffect, useState } from 'react'
import type { Hotel } from '../api/client'
import { listHotels } from '../api/client'

export function HotelFinder() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [filters, setFilters] = useState({
    has_ramps: true,
    has_accessible_toilets: true,
    has_braille_signage: false,
    has_auditory_cues: false,
    has_elevators: true,
  })

  useEffect(() => {
    listHotels(filters).then(setHotels)
  }, [filters])

  return (
    <div>
      <h3>Hotel Finder</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(240px, 1fr))', gap: 12 }}>
        {Object.entries(filters).map(([key, value]) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={value as boolean}
              onChange={(e) => setFilters({ ...filters, [key]: e.target.checked })}
            /> {key.replaceAll('_', ' ')}
          </label>
        ))}
      </div>
      <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
        {hotels.map(h => (
          <div key={h.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12 }}>
            <strong>{h.name}</strong>
            <div>{h.address}</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>
              Features: {['has_ramps','has_accessible_toilets','has_braille_signage','has_auditory_cues','has_elevators'].filter((k) => (h as any)[k]).join(', ') || 'None'}
            </div>
            <button disabled title="MVP placeholder">Book hotel</button>
          </div>
        ))}
      </div>
    </div>
  )
}

