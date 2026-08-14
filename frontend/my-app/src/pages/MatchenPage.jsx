import MatchenLijst from '../components/matchen/matchenlijst'
import { useMatchen } from '../context/useMatchen'
import MatchForm from '../components/matchen/matchform'
function MatchenPage() {
  const { matchen } = useMatchen()
  return (
    <div>
      <MatchForm />
      <MatchenLijst matchen={matchen} />
    </div>
  )
}
export default MatchenPage