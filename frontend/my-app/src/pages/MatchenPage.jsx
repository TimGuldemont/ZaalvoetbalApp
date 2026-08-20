import MatchenLijst from '../components/matchen/MatchenLijst'
import { useMatchen } from '../context/useMatchen'
import MatchForm from '../components/matchen/MatchForm'
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