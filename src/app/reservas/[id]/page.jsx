"use client"

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const DetalleReserva = () => {
  const router = useRouter();
  const { id } = router.query; 
  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchReserva = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/reservas/${id}`); 
          if (!response.ok) {
            throw new Error('Reserva no encontrada');
          }
          const data = await response.json();
          setReserva(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchReserva();
    }
  }, [id]);

  if (loading) {
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