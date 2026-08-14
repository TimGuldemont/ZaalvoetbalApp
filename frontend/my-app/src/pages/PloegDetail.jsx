import SpelersLijst from "../components/spelers/spelerslijst";
import SpelerForm from "../components/spelers/spelerform";
import { useParams } from "react-router-dom";
import { usePloegen } from "../context/usePloegen";

function PloegDetail() {
    const { ploegen, SpelerToevoegen, VerwijderSpeler } = usePloegen()
    const { id } = useParams()
    const ploeg = ploegen.find((p) => p.id === parseInt(id))
    if (!ploeg) {
        return <div>Ploeg niet gevonden</div>
    }
    return (
        <div>
            <h2>{ploeg.naam}</h2>
            <SpelerForm onSpelerToevoegen={(spelernaam) => SpelerToevoegen(ploeg.id, spelernaam)} />
            <SpelersLijst spelers={ploeg.spelers} verwijderSpeler={(spelerId) => VerwijderSpeler(ploeg.id, spelerId)} />
        </div>
    )
}
export default PloegDetail