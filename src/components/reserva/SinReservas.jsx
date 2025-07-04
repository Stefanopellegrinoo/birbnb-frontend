import React from 'react'
import Link from 'next/link'

const SinReservas = () => {
  return (
       <div className="mis-reservas">
        <div className="container">
          <h1>Mis Reservas</h1>
          <div className="empty-state">
            <p>No tienes reservas aún</p>
            <Link href="/alojamientos" className="browse-button">
              Explorar alojamientos
            </Link>
          </div>
        </div>
      </div>
  )
}

export default SinReservas