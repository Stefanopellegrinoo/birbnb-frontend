"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import "../../styles/MisReservas.css"
import SinReservas from "@/components/reserva/SinReservas"
import ReservasUser from "@/components/reserva/ReservasUser"
import { useRouter } from 'next/navigation';
import { Loader } from "@mantine/core"
import api from "@/lib/api"


function MisReservas() {
  const { user } = useAuth()
  const router = useRouter()
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)
  const [message, setMessage] = useState("")

  if(!user){
    router.push("auth/login")
    // return
  }

    const fetchReservas = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/reservas`); 
      console.log(response)

      const data = response.data
      console.log(data)
      // if (!response.ok) {
      //   throw new Error('Reserva no encontrada');
      // }
      setReservas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchReservas()
    }
  }, [user])

  if (loading) return <Loader />;


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
        <ReservasUser 
        reservas={reservas} 
        user={user} 
        onChange={setReservas}/>
    
      </div>
    </div>
  )
}

export default MisReservas
