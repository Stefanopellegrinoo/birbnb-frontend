"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../styles/MisReservas.css";
import SinReservas from "@/components/reserva/SinReservas";
import ReservasUser from "@/components/reserva/ReservasUser";
import { useRouter } from "next/navigation";
import { Divider, Loader, Stack, Tabs, Text } from "@mantine/core";
import api from "@/lib/api";
import ComponenteVacio from "@/components/ui/ComponenteVacio";

function MisReservas() {
    const { user } = useAuth();
    const router = useRouter();
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user && !loading) {
            router.push("/auth/login");
        }
    }, [user, loading, router]);

    const fetchReservas = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/usuarios/${user.id}/reservas`);
            const reservas = res.data;
            setReservas(reservas);
        } catch (err) {
            const mensaje =
                err.response?.data?.message ||
                err.message ||
                "No se pudieron obtener las reservas";
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchReservas();
        }
    }, [user]);

    if (error)
        return <Text color="red">Error al cargar las reservas: {error}</Text>;

    if (!user) return <Loader />;

    const handleReservasChange = (reservasActualizadas) => {
        setReservas(reservasActualizadas);
    };

    const reservasPendientes = reservas.filter(
        (r) => r.estadoReserva === "pendiente"
    );
    const reservasAceptadas = reservas.filter(
        (r) => r.estadoReserva === "confirmada"
    );
    const reservasCanceladas = reservas.filter(
        (r) => r.estadoReserva === "cancelada"
    );

    return (
        <div className="mis-reservas">
            <div className="container">
                <h1>Mis Reservas</h1>
                {loading ? (
                    <>
                        <Divider />
                        <Stack justify="center" align="center" h={300}>
                            <Loader />
                        </Stack>
                    </>
                ) : (
                    <>
                        {reservas.length === 0 ? (
                            <ComponenteVacio
                                mensaje={"No tienes reservas aún"}
                                link={"alojamientos"}
                                button={"Explorar alojamientos"}
                            />
                        ) : (
                            <Tabs defaultValue="pendientes" keepMounted={false}>
                                <Tabs.List>
                                    <Tabs.Tab value="pendientes">
                                        Pendientes ({reservasPendientes.length})
                                    </Tabs.Tab>
                                    <Tabs.Tab value="aceptadas">
                                        Aceptadas ({reservasAceptadas.length})
                                    </Tabs.Tab>
                                    <Tabs.Tab value="canceladas">
                                        Canceladas ({reservasCanceladas.length})
                                    </Tabs.Tab>
                                </Tabs.List>

                                <Tabs.Panel value="pendientes" pt="xs">
                                    {reservasPendientes.length > 0 ? (
                                        <ReservasUser
                                            reservas={reservasPendientes}
                                            user={user}
                                            onChange={handleReservasChange}
                                        />
                                    ) : (
                                        <Text mt="md">
                                            No tienes reservas pendientes.
                                        </Text>
                                    )}
                                </Tabs.Panel>

                                <Tabs.Panel value="aceptadas" pt="xs">
                                    {reservasAceptadas.length > 0 ? (
                                        <ReservasUser
                                            reservas={reservasAceptadas}
                                            user={user}
                                            onChange={handleReservasChange}
                                        />
                                    ) : (
                                        <Text mt="md">
                                            No tienes reservas aceptadas
                                        </Text>
                                    )}
                                </Tabs.Panel>

                                <Tabs.Panel value="canceladas" pt="xs">
                                    {reservasCanceladas.length > 0 ? (
                                        <ReservasUser
                                            reservas={reservasCanceladas}
                                            user={user}
                                            onChange={handleReservasChange}
                                        />
                                    ) : (
                                        <Text mt="md">
                                            No tienes reservas canceladas.
                                        </Text>
                                    )}
                                </Tabs.Panel>
                            </Tabs>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default MisReservas;
