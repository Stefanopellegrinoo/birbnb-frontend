"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import "../../styles/MisReservas.css"

function MisReservas() {
  const { user } = useAuth()
  const [reservas, setReservas] = useState([])

  useEffect(() => {
    if (user) {
      const todasLasReservas = JSON.parse(localStorage.getItem("reservas") || "[]")
      const reservasDelUsuario = todasLasReservas.filter((reserva) => reserva.usuarioId === user.id)
      setReservas(reservasDelUsuario)
    }
  }, [user])

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const calcularDias = (fechaInicio, fechaFin) => {
    const inicio = new Date(fechaInicio)
    const fin = new Date(fechaFin)
    return Math.ceil((fin - inicio) / (1000 * 60 * 60 * 24))
  }

  const cancelarReserva = (reservaId) => {
    if (window.confirm("¿Estás seguro de que quieres cancelar esta reserva?")) {
      const todasLasReservas = JSON.parse(localStorage.getItem("reservas") || "[]")
      const reservasActualizadas = todasLasReservas.filter((reserva) => reserva.id !== reservaId)
      localStorage.setItem("reservas", JSON.stringify(reservasActualizadas))

      const reservasDelUsuario = reservasActualizadas.filter((reserva) => reserva.usuarioId === user.id)
      setReservas(reservasDelUsuario)
    }
  }

  if (reservas.length === 0) {
    return (
      <div className="mis-reservas">
        <div className="container">
          <h1>Mis Reservas</h1>
          <div className="empty-state">
            <p>No tienes reservas aún</p>
            <a href="/alojamientos" className="browse-button">
              Explorar alojamientos
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mis-reservas">
      <div className="container">
        <h1>Mis Reservas</h1>
        <p className="subtitle">
          Tienes {reservas.length} reserva{reservas.length !== 1 ? "s" : ""}
        </p>

        <div className="reservas-list">
          {reservas.map((reserva) => (
            <div key={reserva.id} className="reserva-card">
              <img
                src={reserva.alojamientoImagen || "/placeholder.svg"}
                alt={reserva.alojamientoNombre}
                className="reserva-image"
              />

              <div className="reserva-info">
                <h3>{reserva.alojamientoNombre}</h3>

                <div className="reserva-details">
                  <div className="detail-item">
                    <span className="label">Fechas:</span>
                    <span>
                      {formatearFecha(reserva.fechaInicio)} - {formatearFecha(reserva.fechaFin)}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="label">Duración:</span>
                    <span>
                      {calcularDias(reserva.fechaInicio, reserva.fechaFin)} noche
                      {calcularDias(reserva.fechaInicio, reserva.fechaFin) !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="label">Huéspedes:</span>
                    <span>
                      {reserva.huespedes} persona{reserva.huespedes !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="label">Reservado el:</span>
                    <span>{formatearFecha(reserva.fechaReserva)}</span>
                  </div>
                </div>
              </div>

              <div className="reserva-actions">
                <div className="precio-total">
                  <span className="total-label">Total pagado</span>
                  <span className="total-amount">${reserva.precioTotal}</span>
                </div>

                <button onClick={() => cancelarReserva(reserva.id)} className="cancel-button">
                  Cancelar reserva
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MisReservas
