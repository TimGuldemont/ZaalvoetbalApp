import { useState } from "react"
import { useMatchen } from "../../context/useMatchen"
import { usePloegen } from "../../context/usePloegen"

function MatchKaarten({ match }) {
    const [geselecteerdeKaartSpeler, setGeselecteerdeKaartSpeler] = useState("")
    const [kaartKleur, setKaartKleur] = useState("")
    const { KaartToevoegen, KaartVerwijderen } = useMatchen()
    const { ploegen } = usePloegen()
    const thuisploeg = ploegen.find((p) => p.naam === match?.thuisploeg)
    const uitploeg = ploegen.find((p) => p.naam === match?.uitploeg)
    const spelers = [
        ...(thuisploeg?.spelers.map((t) => ({ ...t, ploeg: thuisploeg.naam })) || []),
        ...(uitploeg?.spelers.map((u) => ({ ...u, ploeg: uitploeg.naam })) || [])
    ]

    const thuisSpelers = (thuisploeg?.spelers || []).map((speler) => ({ ...speler, ploeg: thuisploeg.naam }))
    const uitSpelers = (uitploeg?.spelers || []).map((speler) => ({ ...speler, ploeg: uitploeg.naam }))
    const kaartenPerPloeg = {
        [thuisploeg?.naam || 'Thuis']: (match.kaarten ?? []).filter((kaart) => kaart.ploeg === thuisploeg?.naam),
        [uitploeg?.naam || 'Uit']: (match.kaarten ?? []).filter((kaart) => kaart.ploeg === uitploeg?.naam)
    }

    return (
        <div>
            <div className="invoer-sectie">
                <h4>Kaarten:</h4>
                <div className="invoer-rij">
                    <select value={geselecteerdeKaartSpeler} onChange={(e) => setGeselecteerdeKaartSpeler(e.target.value)}>
                        <option value="">Selecteer een speler</option>
                        {spelers.map((speler) => (
                            <option key={speler.id} value={JSON.stringify({ naam: speler.naam, ploeg: speler.ploeg })}>
                                {speler.naam} ({speler.ploeg})
                            </option>
                        ))}
                    </select>
                    <select value={kaartKleur} onChange={(e) => setKaartKleur(e.target.value)}>
                        <option value="">Kleur</option>
                        <option value="geel">Geel</option>
                        <option value="rood">Rood</option>
                    </select>
                    <button onClick={() => {
                        if (geselecteerdeKaartSpeler && kaartKleur) {
                            const speler = JSON.parse(geselecteerdeKaartSpeler)
                            KaartToevoegen(match.id, speler.naam, speler.ploeg, kaartKleur)
                            setGeselecteerdeKaartSpeler("")
                            setKaartKleur("")
                        }
                    }}>Voeg kaart toe</button>
                </div>
            </div>
            <div className="twee-kolommen">
                {[{ naam: thuisploeg?.naam || 'Thuis', spelers: thuisSpelers, kaarten: kaartenPerPloeg[thuisploeg?.naam || 'Thuis'] }, { naam: uitploeg?.naam || 'Uit', spelers: uitSpelers, kaarten: kaartenPerPloeg[uitploeg?.naam || 'Uit'] }].map((ploeg) => (
                    <div key={ploeg.naam} className="kolom-card">
                        <h5>{ploeg.naam}</h5>
                        <ul>
                            {ploeg.kaarten.length > 0 ? (
                                ploeg.kaarten.map((kaart, index) => (
                                    <li key={`${kaart.id || index}-${kaart.spelernaam}`}>
                                        {kaart.spelernaam} - {kaart.kleur}
                                        <button onClick={() => KaartVerwijderen(match.id, kaart.id)}>Verwijder kaart</button>
                                    </li>
                                ))
                            ) : (
                                <li>Geen kaarten</li>
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default MatchKaarten