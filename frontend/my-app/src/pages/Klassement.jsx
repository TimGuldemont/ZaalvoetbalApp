import { usePloegen } from '../context/usePloegen'
import { useMatchen } from '../context/useMatchen'

const Klassement = () => {
  const { ploegen } = usePloegen()
  const { matchen } = useMatchen()

  // Bereken klassement op basis van wedstrijdresultaten
  const berekenKlassement = () => {
    const klassement = ploegen.map((ploeg) => {
      let wins = 0
      let draws = 0
      let losses = 0
      let points = 0

      matchen.forEach((match) => {
        // Check of ploeg als thuisploeg speelt
        if (match.thuisploeg === ploeg.id) {
          if (match.scoreThuisploeg > match.scoreUitploeg) {
            wins++
            points += 3
          } else if (match.scoreThuisploeg === match.scoreUitploeg) {
            draws++
            points += 1
          } else {
            losses++
          }
        }
        // Check of ploeg als uitploeg speelt
        else if (match.uitploeg === ploeg.id) {
          if (match.scoreUitploeg > match.scoreThuisploeg) {
            wins++
            points += 3
          } else if (match.scoreUitploeg === match.scoreThuisploeg) {
            draws++
            points += 1
          } else {
            losses++
          }
        }
      })

      const played = wins + draws + losses

      return {
        name: ploeg.naam,
        points,
        played,
        wins,
        draws,
        losses,
      }
    })

    // Sorteer op punten (aflopend), dan op winstdoelsaldo
    return klassement
      .sort((a, b) => b.points - a.points || b.wins - a.wins)
      .map((team, index) => ({ ...team, rank: index + 1 }))
  }

  const teams = berekenKlassement()

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Klassement</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Ploeg</th>
            <th>P</th>
            <th>G</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.rank}>
              <td style={{ textAlign: "left" }}>{team.rank}</td>
              <td style={{ textAlign: "left" }}>{team.name}</td>
              <td>{team.points}</td>
              <td>{team.played}</td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.losses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Klassement;
