import { useState } from 'react'
function SpelerForm({ onSpelerToevoegen }) {
  const [spelernaam, setSpelernaam] = useState('')
  function handleSubmit(e) {
    e.preventDefault()
    if (spelernaam.trim() === '') return
    onSpelerToevoegen(spelernaam)
    setSpelernaam('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Spelersnaam:
        <input type="text" value={spelernaam} onChange={(e) => setSpelernaam(e.target.value)} />
      </label>
      <button type="submit">Voeg speler toe</button>
    </form>
  )
}
export default SpelerForm