import { useState } from 'react';
import ClimateList from './components/ClimateList';
import Login from './components/Login';
import { isLoggedIn, logout } from './services/authService';

function App() {
  const [authenticated, setAuthenticated] = useState(isLoggedIn());

  function handleLogout() {
    logout();
    setAuthenticated(false);
  }

  if (!authenticated) {
    return <Login onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="text-primary fw-bold">
            🌦 Sistema de Gestión Climática
          </h1>
          <p className="text-muted mb-0">
            Frontend React protegido con JWT
          </p>
        </div>

        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      <ClimateList />
    </div>
  );
}

export default App;