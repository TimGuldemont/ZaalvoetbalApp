import { createContext, useEffect, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const PloegenContext = createContext()

export function PloegenProvider({ children }) {
  const [ploegen, setPloegen] = useState([])

  useEffect(() => {
    fetch('https://localhost:7001/api/ploegen')
      .then((res) => res.json())
      .then((data) => setPloegen(data))
  }, [])

  async function PloegToevoegen(ploegnaam) {
    const response = await fetch('https://localhost:7001/api/ploegen',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ naam: ploegnaam, spelers: [] })
      }
    )
    const nieuwePloeg = await response.json()
    setPloegen([...ploegen, nieuwePloeg])
  }

  async function VerwijderPloeg(id) {
    await fetch(`https://localhost:7001/api/ploegen/${id}`, {
      method: 'DELETE'
    })
    setPloegen(ploegen.filter((ploeg) => ploeg.id !== id))
  }

  async function SpelerToevoegen(ploegId, spelernaam) {
    const response = await fetch('https://localhost:7001/api/spelers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ naam: spelernaam, ploegId: ploegId })
    })
    const nieuweSpeler = await response.json()
    setPloegen(ploegen.map((ploeg) => {
      if (ploeg.id === ploegId) {
        return { ...ploeg, spelers: [...ploeg.spelers, nieuweSpeler] }
      }
      return ploeg
    }))
  }

  async function VerwijderSpeler(ploegId, spelerId) {
    await fetch(`https://localhost:7001/api/spelers/${spelerId}`, {
      method: 'DELETE'
    })
    setPloegen(ploegen.map((ploeg) => {
      if (ploeg.id === ploegId) {
        return { ...ploeg, spelers: ploeg.spelers.filter((s) => s.id !== spelerId) }
      }
      return ploeg
    }))
  }

  function ManVanDeMatchToevoegen(ploegId, spelerId) {
    setPloegen(ploegen.map((ploeg) => {
      if (ploeg.id === ploegId) {
        return {
          ...ploeg, spelers: ploeg.spelers.map((speler) => {
            if (speler.id === spelerId) {
              return { ...speler, manVanDeMatch: speler.manVanDeMatch + 1 }
            }
            return speler
          })
        }
      }
      return ploeg
    }))
  }

  return (
    <PloegenContext.Provider value={{ ploegen, PloegToevoegen, VerwijderPloeg, SpelerToevoegen, VerwijderSpeler, ManVanDeMatchToevoegen }}>
      {children}
    </PloegenContext.Provider>
  )
}