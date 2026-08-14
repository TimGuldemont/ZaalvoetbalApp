import { useState } from "react"
import { useMatchen } from "../context/useMatchen"

function berekenSeizoen(datum) {
  const d = new Date(datum)
  const maand = d.getMonth() + 1
  const jaar = d.getFullYear()
  return maand >= 9 ? `${jaar}-${jaar + 1}` : `${jaar - 1}-${jaar}`
}

function HomePage() {
  const { matchen } = useMatchen()
  const huidigSeizoen = berekenSeizoen(new Date())
  const [geselecteerdSeizoen, setGeselecteerdSeizoen] = useState(huidigSeizoen)
  const seizoenen = [...new Set(matchen.map((m) => berekenSeizoen(m.datum)))]
  const gefilteredeMatchen = matchen.filter((m) => berekenSeizoen(m.datum) === geselecteerdSeizoen)
  const datumFormatteren = (datum) => {
    return new Date(datum).toLocaleDateString("nl-NL", {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  }

  return (
    <div>
      <h1>Welkom!</h1>
      <select value={geselecteerdSeizoen} onChange={(e) => setGeselecteerdSeizoen(e.target.value)}>
        {seizoenen.map((seizoen) => (
          <option key={seizoen} value={seizoen}>
            {seizoen}
          </option>
        ))}
      </select>
      <h2>Matchen van seizoen {geselecteerdSeizoen}:</h2>
      <ul>
        {gefilteredeMatchen.map((match) => (
          <div key={match.id} className="match-card">
            <div>
              <div className="datum">{datumFormatteren(match.datum)} om {match.uur}</div>
              <div className="teams">{match.thuisploeg} vs {match.uitploeg}</div>
            </div>
            <div className="score">
              {match.scoreThuisploeg} - {match.scoreUitploeg}
            </div>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default HomePage