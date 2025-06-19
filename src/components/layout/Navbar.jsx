"use client"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext"
import "../../styles/Navbar.css"

function Navbar() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-brand">
          Birbnb
        </Link>

        <div className="navbar-menu">
          <Link href="/" className="navbar-link">
            Inicio
          </Link>
          <Link href="/alojamientos" className="navbar-link">
            Alojamientos
          </Link>

          {user ? (
            <>
              <Link href="/reservas" className="navbar-link">
                Mis Reservas
              </Link>
              <span className="navbar-user">Hola, {user.name}</span>
              <button onClick={handleLogout} className="navbar-button">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="navbar-button">
                Iniciar Sesión
              </Link>
              <Link href="/auth/register" className="navbar-button navbar-button-secondary">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
