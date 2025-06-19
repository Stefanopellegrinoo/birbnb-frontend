"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext"
import "../../../styles/Login.css"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Por favor completa todos los campos")
      return
    }

    const success = login(email, password)
    if (success) {
      router.push("/");
    } else {
      setError("Credenciales inválidas")
    }
  }

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-form">
          <h2>Iniciar Sesión</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tu contraseña"
              />
            </div>

            <button type="submit" className="submit-button">
              Iniciar Sesión
            </button>
          </form>

          <p className="auth-link">
            ¿No tienes cuenta? <Link href="/auth/register">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
