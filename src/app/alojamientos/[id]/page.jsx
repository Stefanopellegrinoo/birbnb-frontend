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

  const formatearCaracteristicas = (caracteristicas) => {
    const caracteristicasMap = {
      wifi: "WiFi gratuito",
      piscina: "Piscina",
      aire_acondicionado: "Aire acondicionado",
    };

    return caracteristicas.map((car) => caracteristicasMap[car] || car);
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
  if (loadingA)
    return (
    <Loader/>
    );
  if (error) return <p>Error al cargar alojamientos</p>;
  if (!alojamiento) {
    return (
      <div className="alojamiento-detalle">
        <div className="container">
          <div className="detalle-main">
            <p>Alojamiento no encontrado</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="alojamiento-detalle">
      <div className="container">
        <button onClick={() => navigate.back(-1)} className="back-button">
          ← Volver
        </button>

        <div className="detalle-content">
          <div className="detalle-main">
            <img
              src={
                alojamiento.fotos && alojamiento.fotos.length > 0
                  ? `/placeholder.svg?height=400&width=600&text=${alojamiento.fotos[0]}`
                  : "/file.svg?height=400&width=600"
              }
              alt={alojamiento.nombre}
              className="main-image"
            />

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
          </div>

          <div className="reserva-sidebar">
            <div className="reserva-card">
              <div className="precio-info">
                <span className="precio">
                  {formatearPrecio(alojamiento.precioPorNoche, alojamiento.moneda)}
                </span>
                <span className="por-noche">/noche</span>
              </div>

              <form onSubmit={handleReserva} className="reserva-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Fecha de entrada</label>
                    <input
                      type="date"
                      value={fechaInicio}
                      onChange={(e) => setFechaInicio(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Fecha de salida</label>
                    <input
                      type="date"
                      value={fechaFin}
                      onChange={(e) => setFechaFin(e.target.value)}
                      min={
                        fechaInicio || new Date().toISOString().split("T")[0]
                      }
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Huéspedes (máx. {alojamiento.cantHuespedesMax})</label>
                  <select
                    value={huespedes}
                    onChange={(e) =>
                      setHuespedes(Number.parseInt(e.target.value))
                    }
                  >
                    {Array.from(
                      { length: alojamiento.cantHuespedesMax },
                      (_, i) => i + 1
                    ).map((num) => (
                      <option key={num} value={num}>
                        {num} huésped{num > 1 ? "es" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {fechaInicio && fechaFin && (
                  <div className="precio-total">
                    <strong>
                      Total:{" "}
                      {formatearPrecio(
                        calcularPrecioTotal(),
                        alojamiento.moneda
                      )}
                    </strong>
                  </div>
                )}

                <button
                  type="submit"
                  className="reservar-button"
                  disabled={loading}
                >
                  {loading ? "Procesando..." : "Reservar ahora"}
                </button>
              </form>

              {!user && (
                <p className="login-notice">
                  <a href="/auth/login">Inicia sesión</a> para hacer una reserva
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlojamientoDetalle;
