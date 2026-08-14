import { useContext } from 'react'
import { MatchenContext } from './MatchenContext'

export function useMatchen() {
  return useContext(MatchenContext)
}