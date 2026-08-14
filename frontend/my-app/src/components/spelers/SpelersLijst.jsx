function SpelersLijst({ spelers, verwijderSpeler }) {
    return (
        <>
            {spelers.length === 0 ? (
                <p>Geen spelers in deze ploeg</p>
            ) : (
                <>
                    <p>Spelers Lijst</p>
                    <ul>
                        {spelers.map((speler) => (
                            <li key={speler.id}>
                                {speler.naam}
                                <button onClick={() => verwijderSpeler(speler.id)}>Verwijder</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    )
}
export default SpelersLijst