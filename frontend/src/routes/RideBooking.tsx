import { useState } from 'react'
import type { FormEvent } from 'react'
import { createBooking } from '../api/client'
import type { VehicleType } from '../api/client'

const vehicleTypes: VehicleType[] = ['Standard', 'Wheelchair Van', 'Lift-Enabled Taxi']

export function RideBooking() {
  const [pickup, setPickup] = useState('123 Main St')
  const [dropoff, setDropoff] = useState('City Center')
  const [datetime, setDatetime] = useState<string>(new Date(Date.now() + 3600 * 1000).toISOString().slice(0, 16))
  const [vehicle, setVehicle] = useState<VehicleType>('Wheelchair Van')
  const [special, setSpecial] = useState('')
  const [result, setResult] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const iso = new Date(datetime).toISOString()
    const booking = await createBooking({
      pickup_location: pickup,
      dropoff_location: dropoff,
      scheduled_time: iso,
      vehicle_type: vehicle,
      special_requirements: special || undefined,
    })
    setResult(`Ride confirmed for ${new Date(booking.scheduled_time).toLocaleString()} - ${booking.vehicle_type}`)
    if (navigator.vibrate) navigator.vibrate(200)
    try {
      const synth = window.speechSynthesis
      const utter = new SpeechSynthesisUtterance(`Ride booked successfully to ${dropoff}`)
      synth.speak(utter)
    } catch {}
  }

  return (
    <div>
      <h3>Accessible Ride Booking</h3>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
        <label>Pickup <input value={pickup} onChange={(e) => setPickup(e.target.value)} /></label>
        <label>Drop-off <input value={dropoff} onChange={(e) => setDropoff(e.target.value)} /></label>
        <label>Date & Time <input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} /></label>
        <label>Vehicle
          <select value={vehicle} onChange={(e) => setVehicle(e.target.value as VehicleType)}>
            {vehicleTypes.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </label>
        <label>Special requirements (optional)
          <input value={special} onChange={(e) => setSpecial(e.target.value)} />
        </label>
        <button type="submit">Book Ride</button>
      </form>
      {result && <div role="status" aria-live="polite" style={{ marginTop: 12, color: 'green' }}>{result}</div>}
    </div>
  )
}

