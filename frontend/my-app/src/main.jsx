import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PloegenProvider } from './context/PloegenContext.jsx'
import { MatchenProvider } from './context/MatchenContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PloegenProvider>
      <MatchenProvider>
        <App />
      </MatchenProvider>
    </PloegenProvider>
  </StrictMode>,
)
