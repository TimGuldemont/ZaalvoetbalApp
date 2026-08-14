import { Link } from "react-router-dom"
function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/ploegen">Ploegen</Link></li>
                <li><Link to="/matchen">Matchen</Link></li>
                {/* <li><link to='/klassement'>Klassement</link></li> */}
            </ul>
        </nav>
    )
}
export default Navbar