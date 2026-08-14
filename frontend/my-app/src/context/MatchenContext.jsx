import { createContext, useState, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const MatchenContext = createContext()

export function MatchenProvider({ children }) {
    const normalizeMatch = (match) => ({
        ...match,
        scoreThuisploeg: match?.scoreThuisploeg ?? match?.thuisploegScore ?? 0,
        scoreUitploeg: match?.scoreUitploeg ?? match?.uitploegScore ?? 0,
        doelpuntenmakers: (match?.doelpuntenmakers ?? []).map((doelpunt) => ({
            ...doelpunt,
            spelernaam: doelpunt?.spelernaam ?? doelpunt?.spelerNaam ?? '',
            ploeg: doelpunt?.ploeg ?? doelpunt?.ploegNaam ?? ''
        })),
        kaarten: (match?.kaarten ?? []).map((kaart) => ({
            ...kaart,
            spelernaam: kaart?.spelernaam ?? kaart?.spelerNaam ?? '',
            ploeg: kaart?.ploeg ?? kaart?.ploegNaam ?? ''
        })),
        stemmen: (match?.stemmen ?? []).map((stem) => ({
            ...stem,
            spelernaam: stem?.spelernaam ?? stem?.spelerNaam ?? '',
            ploeg: stem?.ploeg ?? stem?.ploegNaam ?? ''
        }))
    })

    const [matchen, setMatchen] = useState(() => {
        try {
            const opgeslagenMatchen = localStorage.getItem('matchen')
            return opgeslagenMatchen ? JSON.parse(opgeslagenMatchen).map(normalizeMatch) : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem('matchen', JSON.stringify(matchen))
    }, [matchen])

    // Matchen ophalen bij opstarten
    useEffect(() => {
        fetch('https://localhost:7001/api/matchen')
            .then((res) => res.json())
            .then((data) => {
                const serverMatchen = Array.isArray(data) ? data.map(normalizeMatch) : []
                setMatchen((vorigeMatchen) => {
                    const vorigeMap = new Map(vorigeMatchen.map((match) => [match.id, match]))
                    return serverMatchen.map((serverMatch) => {
                        const vorigeMatch = vorigeMap.get(serverMatch.id)
                        return normalizeMatch({
                            ...serverMatch,
                            ...vorigeMatch,
                            scoreThuisploeg: serverMatch.scoreThuisploeg ?? vorigeMatch?.scoreThuisploeg ?? 0,
                            scoreUitploeg: serverMatch.scoreUitploeg ?? vorigeMatch?.scoreUitploeg ?? 0,
                            doelpuntenmakers: (vorigeMatch?.doelpuntenmakers?.length ? vorigeMatch.doelpuntenmakers : serverMatch.doelpuntenmakers) ?? [],
                            kaarten: (vorigeMatch?.kaarten?.length ? vorigeMatch.kaarten : serverMatch.kaarten) ?? [],
                            stemmen: (vorigeMatch?.stemmen?.length ? vorigeMatch.stemmen : serverMatch.stemmen) ?? []
                        })
                    })
                })
            })
            .catch(() => { })
    }, [])

    async function MatchToevoegen(thuisploeg, uitploeg, uur, datum) {
        const response = await fetch('https://localhost:7001/api/matchen', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                thuisploeg,
                uitploeg,
                uur,
                datum,
                scoreThuisploeg: 0,
                scoreUitploeg: 0,
                thuisploegScore: 0,
                uitploegScore: 0,
                doelpuntenmakers: [],
                kaarten: [],
                stemmen: []
            })
        })
        const nieuweMatch = await response.json()
        setMatchen(prev => [...prev, normalizeMatch(nieuweMatch)])
    }

    async function ScoreAanpassen(id, scoreThuisploeg, scoreUitploeg) {
        await fetch(`https://localhost:7001/api/matchen/${id}/score`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ scoreThuisploeg, scoreUitploeg, thuisploegScore: scoreThuisploeg, uitploegScore: scoreUitploeg })
        })
        setMatchen(prev => prev.map((match) => {
            if (match.id === id) {
                return { ...match, scoreThuisploeg, scoreUitploeg, thuisploegScore: scoreThuisploeg, uitploegScore: scoreUitploeg }
            }
            return match
        }))
    }

    async function MatchVerwijderen(id) {
        await fetch(`https://localhost:7001/api/matchen/${id}`, {
            method: 'DELETE'
        })
        setMatchen(prev => prev.filter((match) => match.id !== id))
    }

    async function DoelpuntToevoegen(id, spelernaam, ploeg) {
        const response = await fetch(`https://localhost:7001/api/matchen/${id}/doelpunten`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ doelpunt: { spelernaam, ploeg } })
        })

        // eslint-disable-next-line no-useless-assignment
        let responseData = null
        try {
            responseData = await response.json()
        } catch {
            responseData = null
        }

        const doelpunt = responseData?.doelpunt ?? responseData ?? {}
        const normDoelpunt = {
            ...doelpunt,
            id: doelpunt?.id ?? responseData?.id ?? Date.now(),
            spelernaam: doelpunt?.spelernaam ?? doelpunt?.spelerNaam ?? spelernaam,
            ploeg: doelpunt?.ploeg ?? doelpunt?.ploegNaam ?? ploeg
        }

        setMatchen(prev => prev.map((match) => {
            if (match.id === id) {
                return {
                    ...match,
                    doelpuntenmakers: [
                        ...(match.doelpuntenmakers ?? []),
                        normDoelpunt
                    ]
                }
            }
            return match
        }))
    }

    async function KaartToevoegen(id, spelernaam, ploeg, kleur) {
        const response = await fetch(`https://localhost:7001/api/matchen/${id}/kaarten`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ spelernaam, ploeg, kleur })
        })
        const nieuweKaart = await response.json()
        setMatchen(prev => prev.map((match) => {
            if (match.id === id) {
                return { ...match, kaarten: [...(match.kaarten ?? []), nieuweKaart] }
            }
            return match
        }))
    }

    async function KaartVerwijderen(matchId, kaartId) {
        await fetch(`https://localhost:7001/api/matchen/${matchId}/kaarten/${kaartId}`, {
            method: 'DELETE'
        })
        setMatchen(prev => prev.map((match) => {
            if (match.id === matchId) {
                return { ...match, kaarten: (match.kaarten ?? []).filter((k) => k.id !== kaartId) }
            }
            return match
        }))
    }

    async function StemToevoegen(id, stem) {
        const response = await fetch(`https://localhost:7001/api/matchen/${id}/stemmen`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ spelernaam: stem.spelernaam, ploeg: stem.ploeg })
        })

        // eslint-disable-next-line no-useless-assignment
        let responseData = null
        try {
            responseData = await response.json()
        } catch {
            responseData = null
        }

        const nieuweStem = responseData ?? {
            id: Date.now(),
            spelernaam: stem.spelernaam,
            ploeg: stem.ploeg
        }

        setMatchen(prev => prev.map((match) => {
            if (match.id === id) {
                return {
                    ...match,
                    stemmen: [
                        ...(match.stemmen ?? []),
                        {
                            ...nieuweStem,
                            spelernaam: nieuweStem?.spelernaam ?? nieuweStem?.spelerNaam ?? stem.spelernaam,
                            ploeg: nieuweStem?.ploeg ?? nieuweStem?.ploegNaam ?? stem.ploeg
                        }
                    ]
                }
            }
            return match
        }))
    }

    return (
        <MatchenContext.Provider value={{ matchen, MatchToevoegen, MatchVerwijderen, ScoreAanpassen, DoelpuntToevoegen, KaartToevoegen, KaartVerwijderen, StemToevoegen }}>
            {children}
        </MatchenContext.Provider>
    )
}