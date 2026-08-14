import { useContext } from 'react'
import { PloegenContext } from './PloegenContext'

export function usePloegen() {
  return useContext(PloegenContext)
}