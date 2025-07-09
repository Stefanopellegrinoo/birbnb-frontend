import api from '@/lib/api'
import React, { useEffect, useState } from 'react'

const ReservasUser = ({reservas, user, onChange}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("")

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
  
    const cancelarReserva = async (reservaId) => {
      if (window.confirm("¿Estás seguro de que quieres cancelar esta reserva?")) {
      

        try {
          console.log(reservaId)
          const response = await api.patch(`/reservas/${reservaId}/cancelacion`); 
          const reservasActualizadas = reservas.filter((reserva) => reserva.id !== reservaId)
  
        onChange(reservasActualizadas)
        } catch (error) {
          console.log(error)
        }
      }
    }

  
    return (
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
                      {formatearFecha(reserva.rangoFechas.fechaInicio)} - {formatearFecha(reserva.rangoFechas.fechaFin)}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="label">Duración:</span>
                    <span>
                      {calcularDias(reserva.rangoFechas.fechaInicio, reserva.rangoFechas.fechaFin)} noche
                      {calcularDias(reserva.rangoFechas.fechaInicio, reserva.rangoFechas.fechaFin) !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="label">Huéspedes:</span>
                    <span>
                      {reserva.cantHuespedes} persona{reserva.cantHuespedes !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="label">Reservado el:</span>
                    <span>{formatearFecha(reserva.fechaAlta)}</span>
                  </div>
                </div>
              </div>

              <div className="reserva-actions">
                <div className="precio-total">
                  <span className="total-label">Total pagado</span>
                  <span className="total-amount">${reserva.precioPorNoche}</span>
                </div>

                {reserva.estadoReserva !== 'cancelada' && reserva.estadoReserva !== 'confirmada' && (
                  <button onClick={() => cancelarReserva(reserva.id)} className="cancel-button">
                    Cancelar reserva
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
  )
}

export default ReservasUser