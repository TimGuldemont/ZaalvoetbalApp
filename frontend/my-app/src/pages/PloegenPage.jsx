import { usePloegen } from '../context/usePloegen'
import PloegForm from '../components/ploegen/PloegForm'
import PloegenLijst from '../components/ploegen/PloegenLijst'

function PloegenPage() {
  const { ploegen, PloegToevoegen, VerwijderPloeg } = usePloegen()
  return (
    <div>
      <PloegForm onPloegToevoegen={PloegToevoegen} />
      <PloegenLijst ploegen={ploegen} verwijderPloeg={VerwijderPloeg} />
    </div>
  )
}
export default PloegenPage