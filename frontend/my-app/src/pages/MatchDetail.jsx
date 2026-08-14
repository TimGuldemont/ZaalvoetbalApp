import MatchScore from "../components/matchen/MatchScore";
import MatchDoelpunten from "../components/matchen/MatchDoelpunten";
import MatchKaarten from "../components/matchen/MatchKaarten";
import MatchStemmen from "../components/matchen/MatchStemmen";
import { useParams } from "react-router-dom";
import { useMatchen } from "../context/useMatchen";
function MatchDetail() {
    const { id } = useParams()
    const { matchen } = useMatchen()
    const match = matchen.find((m) => m.id === parseInt(id))
    if (!match) {
        return <p>Match niet gevonden</p>
    }

    return (
        <div>
            <MatchScore match={match} />
            <MatchDoelpunten match={match} />
            <MatchKaarten match={match} />
            <MatchStemmen match={match} />
        </div>
    )
}
export default MatchDetail