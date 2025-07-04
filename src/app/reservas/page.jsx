"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import "../../styles/MisReservas.css"
import SinReservas from "@/components/reserva/SinReservas"
import ReservasUser from "@/components/reserva/ReservasUser"
import { useRouter } from 'next/navigation';


function MisReservas() {
  const { user } = useAuth()
  const [reservas, setReservas] = useState([])
  const router = useRouter()

  if(!user){
    router.push("auth/login")
    // return
  }

  useEffect(() => {
    if (user) {
      const todasLasReservas = JSON.parse(localStorage.getItem("reservas") || "[]")
      const reservasDelUsuario = todasLasReservas.filter((reserva) => reserva.usuarioId === user.id)
      setReservas(reservasDelUsuario)
    }
  }, [user])


  if (reservas.length === 0) {
    return (
        <SinReservas/>
    )
  }

  return (
    <div className="mis-reservas">
      <div className="container">
        <h1>Mis Reservas</h1>
        <p className="subtitle">
          Tienes {reservas.length} reserva{reservas.length !== 1 ? "s" : ""}
        </p>
      <ReservasUser reservas={reservas} user={user} onChange={setReservas}/>
    
      </div>
    </div>
  )
}

export default MisReservas
