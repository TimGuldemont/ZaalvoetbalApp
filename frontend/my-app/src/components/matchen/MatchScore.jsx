import { usePloegen } from "../../context/usePloegen"
function MatchScore({ match }) {
    const { ploegen } = usePloegen()
    const thuisploeg = ploegen.find((p) => p.naam === match?.thuisploeg)
    const uitploeg = ploegen.find((p) => p.naam === match?.uitploeg)
    return (
        <div className="match-header">
            <p>{thuisploeg?.naam} - {uitploeg?.naam}</p>
            <p>Uur: {match.uur}</p>
            <p>Datum: {match.datum}</p>
            <p className="match-score-display">{match.scoreThuisploeg} - {match.scoreUitploeg}</p>
        </div>
    )
}
export default MatchScore