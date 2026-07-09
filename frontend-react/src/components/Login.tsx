import { useState } from "react";
import { login } from "../services/authService";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const success = await login(email, password);

    if (success) {
      setErrorMessage("");
      onLogin();
    } else {
      setErrorMessage("Credenciales incorrectas");
    }
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="text-primary fw-bold">
          🌦 Sistema de Gestión Climática
        </h1>
        <p className="text-muted">Acceso seguro con JWT</p>
      </div>

      <div className="card shadow mx-auto" style={{ maxWidth: "420px" }}>
        <div className="card-header bg-primary text-white fw-bold">
          🔐 Iniciar Sesión
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}

            <button className="btn btn-success w-100" type="submit">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}