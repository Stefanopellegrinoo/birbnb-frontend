"use client";

import React, { useState } from "react";
import { calcularPrecioTotal, formatearCaracteristicas, formatearPrecio } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@mantine/core";
import axios from "@/lib/api";
import ErrorAlert from "@/components/alert/ErrorAlert";
import SelectorFecha from "@/components/ui/SelectorFecha";

const ReservaInfo = ({ alojamiento, user }) => {

    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [huespedes, setHuespedes] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useRouter();

    const handleReserva = async (e) => {
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

        const nuevaReserva = {
            alojamiento,
            rangoFechaInicio: fechaInicio,
            rangoFechaFinal: fechaFin,
            cantHuespedes: huespedes,
            precioTotal: calcularPrecioTotal(fechaInicio, fechaFin, alojamiento.precioPorNoche),
            fechaReserva: new Date().toISOString(),
        };
            console.log("Enviando al backend:", nuevaReserva);
        try {
            const res = await axios.post("/reservas", nuevaReserva);
            //FALTARIA MANEJO DE ERRORES

            const reservaId = res.data.id;

            setLoading(false);

             
            navigate.push(`/reservas/confirmacion?id=${reservaId}`);

        } catch (error) {
            console.log(error.response.data.message);
            setMessage(error.response.data.message);
            setError(true);
            setLoading(false);
        }
    };


    return (
        <div className="reserva-sidebar">
            <div className="reserva-card">
                <div className="precio-info">
                    <span className="precio">
                        {formatearPrecio(
                            alojamiento.precioPorNoche,
                            alojamiento.moneda
                        )}
                    </span>
                    <span className="por-noche">/noche</span>
                </div>

                <form onSubmit={handleReserva} className="reserva-form">
                    <div className="form-row">
                        <div className="form-group">
                            <SelectorFecha
                                changeFechaInicio={setFechaInicio}
                                changeFechafin={setFechaFin}
                                diasNoDisponibles={alojamiento.fechasOcupadas}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>
                            Huéspedes (máx. {alojamiento.cantHuespedesMax})
                        </label>
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
                                    calcularPrecioTotal(fechaInicio, fechaFin, alojamiento.precioPorNoche),
                                    alojamiento.moneda
                                )}
                            </strong>
                        </div>
                    )}
                    <div></div>
                    {!user ? (
                        <p className="login-notice">
                            <a href="/auth/login">
                                <Button
                                    variant="filled"
                                    color="indigo"
                                    radius="lg"
                                >
                                    Inicia sesión
                                </Button>
                            </a>{" "}
                            para hacer una reserva
                        </p>
                    ) : (
                        <Button
                            type="submit"
                            variant="filled"
                            color="indigo"
                            radius="lg"
                        >
                            {loading ? "Procesando..." : "Reservar ahora"}
                        </Button>
                    )}
                </form>
            </div>
            {error && (
                <ErrorAlert
                    message={message}
                    title={"error"}
                    onChange={setError}
                />
            )}
        </div>
    );

}
export default ReservaInfo;