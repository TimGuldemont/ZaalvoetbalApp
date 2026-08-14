import { useState } from "react"
import { useMatchen } from "../../context/useMatchen"
import { usePloegen } from "../../context/usePloegen"

function MatchStemmen({ match }) {
    const [geselecteerdeSpeler, setGeselecteerdeSpeler] = useState("")
    const { StemToevoegen } = useMatchen()
    const { ploegen } = usePloegen()
    const thuisploeg = ploegen.find((p) => p.naam === match?.thuisploeg)
    const uitploeg = ploegen.find((p) => p.naam === match?.uitploeg)
    const spelers = [
        ...(thuisploeg?.spelers.map((t) => ({ ...t, ploeg: thuisploeg.naam })) || []),
        ...(uitploeg?.spelers.map((u) => ({ ...u, ploeg: uitploeg.naam })) || [])
    ]
    const thuisSpelers = (thuisploeg?.spelers || []).map((speler) => ({ ...speler, ploeg: thuisploeg.naam }))
    const uitSpelers = (uitploeg?.spelers || []).map((speler) => ({ ...speler, ploeg: uitploeg.naam }))
    const stemmenPerSpeler = (match.stemmen ?? []).reduce((acc, stem) => {
        const sleutel = `${stem.spelernaam} (${stem.ploeg})`
        acc[sleutel] = (acc[sleutel] || 0) + 1
        return acc
    }, {})
    const stemmenAfgesloten = match.stemmen.length == spelers.length
    const manVanDeMatch = stemmenAfgesloten && Object.entries(stemmenPerSpeler).length > 0 ? Object.entries(stemmenPerSpeler).reduce((a, b) => a[1] > b[1] ? a : b)[0] : null
    return (
        <div>
            <div className="invoer-sectie">
                <h4>Stemmen voor de man van de match:</h4>
                {(match.stemmen ?? []).length < spelers.length && (
                    <div className="invoer-rij">
                        <select value={geselecteerdeSpeler} onChange={(e) => setGeselecteerdeSpeler(e.target.value)}>
                            <option value="">Selecteer een speler</option>
                            {spelers.map((speler) => (
                                <option key={speler.id} value={JSON.stringify({ naam: speler.naam, ploeg: speler.ploeg })}>
                                    {speler.naam} ({speler.ploeg})
                                </option>
                            ))}
                        </select>
                        <button onClick={() => {
                            if (geselecteerdeSpeler) {
                                const speler = JSON.parse(geselecteerdeSpeler)
                                StemToevoegen(match.id, { spelernaam: speler.naam, ploeg: speler.ploeg })
                                setGeselecteerdeSpeler("")
                            }
                        }}>Stem op speler</button>
                    </div>
                )}
            </div>
            <div className="twee-kolommen">
                {[{ naam: thuisploeg?.naam || 'Thuis', spelers: thuisSpelers }, { naam: uitploeg?.naam || 'Uit', spelers: uitSpelers }].map((ploeg) => (
                    <div key={ploeg.naam} className="kolom-card">
                        <h5>{ploeg.naam}</h5>
                        <ul>
                            {ploeg.spelers.map((speler) => {
                                const sleutel = `${speler.naam} (${speler.ploeg})`
                                return (
                                    <li key={speler.id}>
                                        {speler.naam} - {stemmenPerSpeler[sleutel] || 0} stemmen
                                        {stemmenAfgesloten && sleutel == manVanDeMatch && <span> ⭐ </span>}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ))}
            </div>
            {stemmenAfgesloten && manVanDeMatch && (
                <p className="invoer-sectie">⭐ Man van de match: {manVanDeMatch} ({stemmenPerSpeler[manVanDeMatch]} stemmen)</p>
            )}
        </div>
    )
}
export default MatchStemmen