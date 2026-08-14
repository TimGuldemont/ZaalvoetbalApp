import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const navigate = useNavigate()

  function handleLogin() {
    navigate('/home')
  }

  return (
    <div>
      <h1>Zaalvoetbal App</h1>
      <h2>Inloggen</h2>
      <input type="text" placeholder="Gebruikersnaam" />
      <input type="password" placeholder="Wachtwoord" />
      <button onClick={handleLogin}>Inloggen</button>
    </div>
  )
}

export default LoginPage