import React, { useState } from "react";
import { formatearCaracteristicas, formatearPrecio } from "@/lib/utils";
import { useRouter } from "next/router";
import { Button } from "@mantine/core";

const ReservaInfo = ({ alojamiento, user }) => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [huespedes, setHuespedes] = useState(1);
  const [loading, setLoading] = useState(false);
  // const navigate = useRouter();
  console.log(user);

  const handleReserva = (e) => {
    e.preventDefault();

    if (!user) {
      //   navigate.push("/auth/login");
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

  return (
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
                min={fechaInicio || new Date().toISOString().split("T")[0]}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Huéspedes (máx. {alojamiento.cantHuespedesMax})</label>
            <select
              value={huespedes}
              onChange={(e) => setHuespedes(Number.parseInt(e.target.value))}
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
                {formatearPrecio(calcularPrecioTotal(), alojamiento.moneda)}
              </strong>
            </div>
          )}
          <div>
            
          </div>
          {!user ? (
            <p className="login-notice">
              <a href="/auth/login"> 
              <Button variant="filled" color="indigo" radius="lg">
                Inicia sesión
                </Button>
              </a> para hacer una reserva
            </p>
          ) : (
            // <button
            //   type="submit"
            //   className="reservar-button"
            //   disabled={loading}
            // >
            //   {loading ? "Procesando..." : "Reservar ahora"}
            // </button>
            <Button variant="filled" color="indigo" radius="lg">
                {loading ? "Procesando..." : "Reservar ahora"}
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReservaInfo;
