"use client"

import api from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const DetalleReserva = () => {
  const router = useRouter();
  const { id } =  useParams(); 
  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReserva = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/reservas/${id}`); 
      console.log(response)

      const data = response.data

      // if (!response.ok) {
      //   throw new Error('Reserva no encontrada');
      // }
      setReserva(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchReserva();
    }
  }, [id]);

  if (!loading) {
    return <p>Cargando detalles de la reserva...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!reserva) {
    return <p>No se encontraron detalles para esta reserva.</p>;
  }

  return (
    <div>
      <h1>Detalles de la Reserva #{reserva.id}</h1>
      <p>Alojamiento: {reserva.accommodationName}</p>
      <p>Fechas: {reserva.checkInDate} - {reserva.checkOutDate}</p>
      <p>Huéspedes: {reserva.guests}</p>
      <p>Precio Total: ${reserva.totalPrice}</p>
      <button onClick={() => router.push('/reservas')}>Volver a Mis Reservas</button>
    </div>
  );
};

export default DetalleReserva;