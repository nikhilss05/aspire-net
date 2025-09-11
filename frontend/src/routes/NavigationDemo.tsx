import { useEffect, useState } from 'react'

type Mode = 'map' | 'ar'

export function NavigationDemo() {
  const [mode, setMode] = useState<Mode>('map')
  const [caption, setCaption] = useState('Accessible route highlighted')

  useEffect(() => {
    if (mode === 'ar') {
      setCaption('Ramp ahead in 10 meters. Take right towards elevator.')
      try {
        const synth = window.speechSynthesis
        const utter = new SpeechSynthesisUtterance('Ramp ahead in 10 meters')
        synth.speak(utter)
      } catch {}
      if (navigator.vibrate) navigator.vibrate([50, 50, 50])
    } else {
      setCaption('Accessible route highlighted')
    }
  }, [mode])

  return (
    <div>
      <h3>Navigation (Map / AR Demo)</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button onClick={() => setMode('map')} aria-pressed={mode==='map'}>Map View</button>
        <button onClick={() => setMode('ar')} aria-pressed={mode==='ar'}>AR Simulation</button>
      </div>
      {mode === 'map' ? (
        <div style={{ border: '1px solid #ddd', borderRadius: 8, height: 240, display:'grid', placeItems: 'center' }}>
          <div>
            <span role="img" aria-label="wheelchair">♿</span> Route to elevator and ramps is highlighted.
          </div>
        </div>
      ) : (
        <div style={{ border: '1px solid #ddd', borderRadius: 8, height: 240, display:'grid', placeItems: 'center' }}>
          <div>
            <span role="img" aria-label="wheelchair">♿</span> <span role="img" aria-label="restroom">🚻</span> Overlays show accessible entrance.
          </div>
        </div>
      )}
      <div style={{ marginTop: 12 }} aria-live="polite">{caption}</div>
    </div>
  )
}

