"use client";

import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext";
// import { mockAlojamientos } from "../data/mockData"
import axios from "axios";
import "../../../styles/AlojamientoDetalle.css";
import { useParams, useRouter } from "next/navigation";
import useAlojamientoById from "@/hooks/alojamiento/useAlojamientoById";
import Loader from "@/components/ui/Loader";
import Servicios from "@/components/alojamientos/alojamientoId/Servicios";
import ReservaInfo from "@/components/alojamientos/alojamientoId/ReservaInfo";
import Img from "@/components/ui/Img";
import Volver from "@/components/ui/Volver";
import AlojamientoNoEncontrado from "@/components/alojamientos/alojamientoId/AlojamientoNoEncontrado";
import AlojamientoFotos from "@/components/alojamientos/alojamientoId/AlojamientoFotos";
import { Divider } from "@mantine/core";

// async function obtenerAlojamiento(id) {
//   try {
//     const response = await axios.get('http://localhost:3000/alojamientos/' + id);
//     return response.data;
//   } catch (error) {
//     throw new Error('Error al obtener alojamiento');
//   }
// }
function AlojamientoDetalle() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useRouter();
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [huespedes, setHuespedes] = useState(1);
  const [loading, setLoading] = useState(false);

  const { alojamiento, loadingA, error } = useAlojamientoById(id);

  const formatearUbicacion = (direccion) => {
    return `${direccion.calle} ${direccion.altura}, ${direccion.ciudad.nombre}, ${direccion.ciudad.pais.nombre}`;
  };

  const formatearPrecio = (precio, moneda) => {
    const simbolo = moneda === "dolar" ? "$" : "$";
    return `${simbolo}${precio}`;
  };

  const handleReserva = (e) => {
    e.preventDefault();

    if (!user) {
      navigate.push("/auth/login");
      return;
    }

    if (!fechaInicio || !fechaFin) {
      alert("Por favor selecciona las fechas de tu estadía");
      return;
    }

    if (huespedes > alojamiento.cantHuespedesMax) {
      alert(
        `Este alojamiento permite máximo ${alojamiento.cantHuespedesMax} huéspedes`
      );
      return;
    }

    setLoading(true);

    // Simular reserva
    setTimeout(() => {
      const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
      const nuevaReserva = {
        id: Date.now(),
        alojamientoId: alojamiento.id,
        alojamientoNombre: alojamiento.nombre,
        alojamientoImagen:
          alojamiento.fotos && alojamiento.fotos.length > 0
            ? alojamiento.fotos[0]
            : null,
        fechaInicio,
        fechaFin,
        huespedes,
        precioTotal: calcularPrecioTotal(),
        fechaReserva: new Date().toISOString(),
        usuarioId: user.id,
        direccion: alojamiento.direccion,
      };

      reservas.push(nuevaReserva);
      localStorage.setItem("reservas", JSON.stringify(reservas));

      setLoading(false);
      alert("¡Reserva realizada con éxito!");
      navigate.push("/reservas");
    }, 1000);
  };

  const calcularPrecioTotal = () => {
    if (!fechaInicio || !fechaFin) return 0;

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const dias = Math.ceil((fin - inicio) / (1000 * 60 * 60 * 24));

    return dias * alojamiento.precioPorNoche;
  };

  if (loadingA) return <Loader />;
  // if (error) return <p>Error al cargar alojamientos</p>;
  if (!alojamiento || error) {
    return <AlojamientoNoEncontrado />;
  }

  console.log(user)

  return (
    <div className="alojamiento-detalle">
      <div className="container">
        <Volver navigate={navigate} />
        <div className="detalle-content">
          <div className="imagen-detalle">
            <AlojamientoFotos alojamiento={alojamiento}/>
          </div>
             <Divider my="md" />
          <div className="detalle-main">
            <Servicios alojamiento={alojamiento} />
           <ReservaInfo alojamiento={alojamiento} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlojamientoDetalle;
