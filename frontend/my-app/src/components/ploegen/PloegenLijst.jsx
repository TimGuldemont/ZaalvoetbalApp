import { useNavigate } from 'react-router-dom'
function PloegenLijst({ ploegen, verwijderPloeg }) {
    const navigate = useNavigate()
    return (
        <>
            {ploegen.length === 0 ? (
                <p>Geen ploegen</p>
            ) : (
                <>
                    <h3>Ploegen Lijst</h3>
                    <ul>
                        {ploegen.map((ploeg) => (
                            <li key={ploeg.id}>
                                {ploeg.naam}
                                <button onClick={() => verwijderPloeg(ploeg.id)}>Verwijder</button>
                                <button onClick={() => navigate(`/ploegen/${ploeg.id}`)}>Bekijk ploeg</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    )
}
export default PloegenLijst
