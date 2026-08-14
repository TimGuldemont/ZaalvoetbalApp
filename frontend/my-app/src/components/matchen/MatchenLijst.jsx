import { useNavigate } from 'react-router-dom'
import { useMatchen } from '../../context/useMatchen'

function MatchenLijst({ matchen }) {
    const navigate = useNavigate()
    const { MatchVerwijderen } = useMatchen()

    return (
        <>
            {matchen.length === 0 ? (
                <p>Geen matchen</p>
            ) : (
                <>
                    <h3>Matchen Lijst</h3>
                    <ul>
                        {matchen.map((match) => (
                            <li key={match.id}>
                                {match.thuisploeg} vs {match.uitploeg} om {match.uur} op {match.datum}
                                <button onClick={() => navigate(`/matchen/${match.id}`)}>Bekijk match</button>
                                <button onClick={() => MatchVerwijderen(match.id)}>Verwijder</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    )
}
export default MatchenLijst
