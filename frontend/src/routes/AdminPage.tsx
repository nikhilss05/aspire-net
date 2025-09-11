import { useEffect, useState } from 'react'
import type { Booking, Hotel } from '../api/client'
import type { FormEvent } from 'react'
import { createHotel, listAllBookings, listHotels, updateBookingStatus } from '../api/client'

export function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [newHotel, setNewHotel] = useState({
    name: '',
    address: '',
    has_ramps: true,
    has_accessible_toilets: true,
    has_braille_signage: false,
    has_auditory_cues: false,
    has_elevators: true,
  })

  useEffect(() => {
    listAllBookings().then(setBookings).catch(() => {})
    listHotels().then(setHotels).catch(() => {})
  }, [])

  async function onCreateHotel(e: FormEvent) {
    e.preventDefault()
    const hotel = await createHotel(newHotel as any)
    setHotels([hotel, ...hotels])
    setNewHotel({ ...newHotel, name: '', address: '' })
  }

  async function mark(bookingId: number, status: 'confirmed' | 'completed' | 'cancelled') {
    const updated = await updateBookingStatus(bookingId, status)
    setBookings((prev) => prev.map(b => b.id === bookingId ? updated : b))
  }

  return (
    <div>
      <h3>Admin Dashboard</h3>

      <section style={{ marginTop: 16 }}>
        <h4>Booking Management</h4>
        <div style={{ display: 'grid', gap: 8 }}>
          {bookings.map(b => (
            <div key={b.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 8 }}>
              <div><strong>{new Date(b.scheduled_time).toLocaleString()}</strong> — {b.pickup_location} → {b.dropoff_location}</div>
              <div>Vehicle: {b.vehicle_type} | Status: {b.status}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => mark(b.id, 'confirmed')}>Approve</button>
                <button onClick={() => mark(b.id, 'cancelled')}>Reject</button>
                <button onClick={() => mark(b.id, 'completed')}>Mark Completed</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <h4>Hotel Management</h4>
        <form onSubmit={onCreateHotel} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, alignItems: 'center' }}>
          <input placeholder="Hotel name" value={newHotel.name} onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })} required />
          <input placeholder="Address" value={newHotel.address} onChange={(e) => setNewHotel({ ...newHotel, address: e.target.value })} required />
          {(['has_ramps','has_accessible_toilets','has_braille_signage','has_auditory_cues','has_elevators'] as const).map(k => (
            <label key={k} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <input type="checkbox" checked={(newHotel as any)[k]} onChange={(e) => setNewHotel({ ...newHotel, [k]: e.target.checked })} />
              {k.replaceAll('_',' ')}
            </label>
          ))}
          <div style={{ gridColumn: '1 / -1' }}>
            <button type="submit">Add hotel</button>
          </div>
        </form>
        <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
          {hotels.map(h => (
            <div key={h.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 8 }}>
              <strong>{h.name}</strong> — {h.address}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

