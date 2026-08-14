import { usePloegen } from "../../context/usePloegen"
import { useMatchen } from "../../context/useMatchen"
import { useState } from "react"
function MatchForm() {
    const [thuisPloeg, setThuisPloeg] = useState("")
    const [uitPloeg, setUitPloeg] = useState("")
    const [uur, setUur] = useState("")
    const [datum, setDatum] = useState("")
    const { ploegen } = usePloegen()
    const { MatchToevoegen } = useMatchen()
    function handleSubmit(e) {
        e.preventDefault()
        if (!thuisPloeg || !uitPloeg || !uur || !datum) return
        MatchToevoegen(thuisPloeg, uitPloeg, uur, datum)
        setThuisPloeg("")
        setUitPloeg("")
        setUur("")
        setDatum("")
    }
    return (
        <form onSubmit={handleSubmit}>
            <select value={thuisPloeg} onChange={(e) => setThuisPloeg(e.target.value)}>
                <option value="">Selecteer een thuisploeg</option>
                {ploegen.map((ploeg) => (
                    <option key={ploeg.id} value={ploeg.naam}>
                        {ploeg.naam}
                    </option>
                ))}
            </select>
            <select value={uitPloeg} onChange={(e) => setUitPloeg(e.target.value)}>
                <option value="">Selecteer een uitploeg</option>
                {ploegen.map((ploeg) => (
                    <option key={ploeg.id} value={ploeg.naam}>
                        {ploeg.naam}
                    </option>
                ))}
            </select>
            <label>
                Uur:
                <input type="time" name="uur" value={uur} onChange={(e) => setUur(e.target.value)} />
            </label>
            <label>
                Datum:
                <input type="date" name="datum" value={datum} onChange={(e) => setDatum(e.target.value)} />
            </label>
            <button type="submit">Match Toevoegen</button>
        </form>
    )
}
export default MatchForm