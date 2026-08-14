import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import MatchenPage from './pages/MatchenPage'
import PloegenPage from './pages/PloegenPage'
import PloegDetail from './pages/PloegDetail'
import MatchDetail from './pages/MatchDetail'
import Klassement from './pages/Klassement'
import Navbar from './components/Navbar'

function AppContent() {
    const location = useLocation()
    const isLoginPagina = location.pathname === '/'
    return (
        <>
            {!isLoginPagina && (
                <div className="layout">
                    <div className="sidebar">
                        <Navbar />
                    </div>
                    <div className="content">
                        <Routes>
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/matchen" element={<MatchenPage />} />
                            <Route path="/matchen/:id" element={<MatchDetail />} />
                            <Route path="/ploegen" element={<PloegenPage />} />
                            <Route path="/ploegen/:id" element={<PloegDetail />} />
                            <Route path="/klassement" element={<Klassement />} />
                        </Routes>
                    </div>
                </div>
            )}
            {isLoginPagina && (
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                </Routes>
            )}
        </>
    )
}
function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    )
}

export default App