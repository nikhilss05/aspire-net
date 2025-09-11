import { useEffect, useState } from 'react'
import type { Booking } from '../api/client'
import { listMyBookings } from '../api/client'

export function BookingHistory() {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    listMyBookings().then(setBookings)
  }, [])

  return (
    <div>
      <h3>Booking History</h3>
      <ol style={{ display: 'grid', gap: 8 }}>
        {bookings.map((b) => (
          <li key={b.id} style={{ borderLeft: '3px solid #555', paddingLeft: 8 }}>
            <div><strong>{new Date(b.scheduled_time).toLocaleString()}</strong> — {b.pickup_location} → {b.dropoff_location}</div>
            <div>Vehicle: {b.vehicle_type} | Status: <span aria-live="polite">{b.status}</span></div>
          </li>
        ))}
      </ol>
    </div>
  )
}

