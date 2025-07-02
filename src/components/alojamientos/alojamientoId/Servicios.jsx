import { formatearCaracteristicas, formatearUbicacion } from '@/lib/utils'
import React from 'react'

const Servicios = ({alojamiento}) => {
  return (
            <div className="info-section">
              <h1>{alojamiento.nombre}</h1>
              <p className="location">📍 {formatearUbicacion(alojamiento.direccion)}</p>
              <div className="capacity">
                👥 Hasta {alojamiento.cantHuespedesMax} huéspedes
              </div>

              <div className="horarios">
                <div className="horario-item">
                  <span className="horario-label">Check-in:</span>
                  <span>{alojamiento.horarioChkIn}</span>
                </div>
                <div className="horario-item">
                  <span className="horario-label">Check-out:</span>
                  <span>{alojamiento.horarioChkOut}</span>
                </div>
              </div>

              <div className="description">
                <h3>Descripción</h3>
                <p>{alojamiento.descripcion}</p>
              </div>

              <div className="amenities">
                <h3>Servicios incluidos</h3>
                <ul>
                  {formatearCaracteristicas(alojamiento.caracteristicas).map((caracteristica, index) => (
                    <li key={index}>{caracteristica}</li>
                  ))}
                </ul>
              </div>
            </div>
  )
}

export default Servicios