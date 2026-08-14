import { useState } from "react"
import { useMatchen } from "../../context/useMatchen"
import { usePloegen } from "../../context/usePloegen"

function MatchDoelpunten({ match }) {
    const [geselecteerdeDoelpuntenMaker, setGeselecteerdeDoelpuntenMaker] = useState("")
    const { DoelpuntToevoegen, ScoreAanpassen } = useMatchen()
    const { ploegen } = usePloegen()
    const thuisploeg = ploegen.find((p) => p.naam === match?.thuisploeg)
    const uitploeg = ploegen.find((p) => p.naam === match?.uitploeg)
    const huidigeThuisScore = Number(match?.scoreThuisploeg ?? 0)
    const huidigeUitScore = Number(match?.scoreUitploeg ?? 0)
    const spelers = [
        ...(thuisploeg?.spelers.map((t) => ({ ...t, ploeg: thuisploeg.naam, ploegId: thuisploeg.id })) || []),
        ...(uitploeg?.spelers.map((u) => ({ ...u, ploeg: uitploeg.naam, ploegId: uitploeg.id })) || [])
    ]

    return (
        <div>
            <div className="invoer-sectie">
                <h4>Doelpuntenmakers:</h4>
                <div className="invoer-rij">
                    <select value={geselecteerdeDoelpuntenMaker} onChange={(e) => setGeselecteerdeDoelpuntenMaker(e.target.value)}>
                        <option value="">Selecteer een speler</option>
                        {spelers.map((speler) => (
                            <option key={speler.id} value={JSON.stringify({ naam: speler.naam, ploeg: speler.ploeg })}>
                                {speler.naam} ({speler.ploeg})
                            </option>
                        ))}
                    </select>
                    <button onClick={async () => {
                        if (!geselecteerdeDoelpuntenMaker) {
                            return
                        }
                        const speler = JSON.parse(geselecteerdeDoelpuntenMaker)
                        const scoreThuisploeg = speler.ploeg === match?.thuisploeg ? huidigeThuisScore + 1 : huidigeThuisScore
                        const scoreUitploeg = speler.ploeg === match?.thuisploeg ? huidigeUitScore : huidigeUitScore + 1
                        await DoelpuntToevoegen(match.id, speler.naam, speler.ploeg)
                        await ScoreAanpassen(match.id, scoreThuisploeg, scoreUitploeg)
                        setGeselecteerdeDoelpuntenMaker("")
                    }}>Voeg doelpunt toe</button>
                </div>
            </div>
            <div className="twee-kolommen">
                <div className="kolom-card">
                    <h5>{thuisploeg?.naam}</h5>
                    <ul>
                        {thuisploeg?.spelers.map((speler) => {
                            const aantalGoals = (match?.doelpuntenmakers ?? []).filter(
                                (d) => (d.spelernaam ?? d.spelerNaam) === speler.naam && (d.ploeg ?? d.ploegNaam) === thuisploeg.naam
                            ).length
                            return (
                                <li key={speler.id}>
                                    {speler.naam} - {aantalGoals} goals
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="kolom-card">
                    <h5>{uitploeg?.naam}</h5>
                    <ul>
                        {uitploeg?.spelers.map((speler) => {
                            const aantalGoals = (match?.doelpuntenmakers ?? []).filter(
                                (d) => (d.spelernaam ?? d.spelerNaam) === speler.naam && (d.ploeg ?? d.ploegNaam) === uitploeg.naam
                            ).length
                            return (
                                <li key={speler.id}>
                                    {speler.naam} - {aantalGoals} goals
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default MatchDoelpunten