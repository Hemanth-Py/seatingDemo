import { useState } from 'react'
import { SeatsioSeatingChart } from '@seatsio/seatsio-react'

function App() {
  // The selectedSeats state is used to store the seats that the user has selected.
  const [selectedSeats, setSelectedSeats] = useState([])
  // In a real application, the hold token would be fetched from a backend service.
  // For this demo, we are using a dummy token.
  const [holdToken, setHoldToken] = useState('a-dummy-hold-token')

  function handleObjectSelected(seat) {
    setSelectedSeats(prev => [...prev, seat])
  }

  function handleObjectDeselected(seat) {
    setSelectedSeats(prev => prev.filter(s => s.id !== seat.id))
  }

  // This function is called when seats are successfully held.
  function handleHoldSuccess(holdToken, selectedObjects) {
    console.log('hold succeeded', holdToken, selectedObjects)
  }

  // This function is called when an error occurs while holding seats.
  function handleHoldFailed(holdToken, selectedObjects) {
    console.log('hold failed', holdToken, selectedObjects)
  }

  // This function simulates a booking.
  function bookSeats() {
    console.log('Booking seats:', selectedSeats)
    console.log('Hold token:', holdToken)
    // In a real application, you would make an API call to your backend here
    // to book the seats using the holdToken.
    setSelectedSeats([])
  }

  // This function simulates releasing held seats.
  function releaseSeats() {
    console.log('Releasing seats:', selectedSeats)
    // In a real application, you would make an API call to your backend here
    // to release the seats using the holdToken.
    setSelectedSeats([])
  }

  return (
    <div style={{ height: '100%' }}>
      <h1>Seats.io Seating Chart</h1>
      {holdToken && <div>Hold token: {holdToken}</div>}
      <div style={{ height: '640px', width: '90vw' }}>
        <SeatsioSeatingChart
          workspaceKey={import.meta.env.VITE_SEATSIO_WORKSPACE_KEY}
          event={import.meta.env.VITE_SEATSIO_EVENT_KEY}
          region="eu"
          // The holdToken is passed to the chart to hold seats.
          holdToken={holdToken}
          onObjectSelected={handleObjectSelected}
          onObjectDeselected={handleObjectDeselected}
          onHoldSucceeded={handleHoldSuccess}
          onHoldFailed={handleHoldFailed}
          // The holdOnSelect prop is used to automatically hold seats when they are selected.
          holdOnSelect={true}
        />
      </div>
      <div>
        <h2>Selected Seats</h2>
        <ul>
          {selectedSeats.map(seat => (
            <li key={seat.id}>{seat.label}</li>
          ))}
        </ul>
      </div>
      <button onClick={bookSeats} disabled={selectedSeats.length === 0}>
        Book now
      </button>
      <button onClick={releaseSeats} disabled={selectedSeats.length === 0}>
        Release seats
      </button>
    </div>
  )
}

export default App
