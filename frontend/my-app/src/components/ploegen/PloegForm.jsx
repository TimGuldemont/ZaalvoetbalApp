import { useState } from 'react'
function PloegForm({ onPloegToevoegen }) {
  const [ploegnaam, setPloegnaam] = useState('')
  function handleSubmit(e) {
    e.preventDefault()
    if (ploegnaam.trim() === '') return
    onPloegToevoegen(ploegnaam)
    setPloegnaam('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Ploegnaam:
        <input type="text" value={ploegnaam} onChange={(e) => setPloegnaam(e.target.value)} />
      </label>
      <button type="submit">Voeg ploeg toe</button>
    </form>
  )
}
export default PloegForm