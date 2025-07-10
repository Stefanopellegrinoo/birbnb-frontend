"use client";

import api from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Container,
  Card,
  Text,
  Title,
  Button,
  Loader,
  Group,
  Divider,
} from "@mantine/core";

const DetalleReserva = () => {
  const router = useRouter();
  const { id } = useParams();
  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReserva = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/reservas/${id}`);
      const data = response.data;
      setReserva(data);
    } catch (err) {
      const mensaje =
        err.response?.data?.message ||
        err.message ||
        "No se pudo obtener la reserva";
      setError(mensaje);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchReserva();
    }
  }, [id]);

  if (loading)
    return (
      <Container mt="xl">
        <Loader />
        <Text mt="sm">Cargando detalles de la reserva...</Text>
      </Container>
    );

  if (error)
    return (
      <Container mt="xl">
        <Text color="red">Error: {error}</Text>
        <Button variant="light" mt="md" onClick={() => router.push("/reservas")}>
          Volver a Mis Reservas
        </Button>
      </Container>
    );

  if (!reserva)
    return (
      <Container mt="xl">
        <Text>No se encontraron detalles para esta reserva.</Text>
        <Button variant="light" mt="md" onClick={() => router.push("/reservas")}>
          Volver a Mis Reservas
        </Button>
      </Container>
    );

  return (
    <Container size="sm" mt="xl">
      <Card shadow="md" padding="lg" radius="md" withBorder>
        <Title order={2} mb="md">
          Reserva #{reserva.id}
        </Title>

        <Divider mb="md" />

        <Text>
          <strong>Alojamiento:</strong> {reserva.alojamientoNombre || "Sin nombre"}
        </Text>

        <Text>
          <strong>Fechas:</strong>{" "}
          {reserva.rangoFechas?.fechaInicio} - {reserva.rangoFechas?.fechaFinal}
        </Text>

        <Text>
          <strong>Huéspedes:</strong> {reserva.cantHuespedes}
        </Text>

        <Text>
          <strong>Precio Total:</strong>{" "}
          {reserva.precioTotal ? `$${reserva.precioTotal}` : "No disponible"}
        </Text>

        <Text>
          <strong>Estado:</strong>{" "}
          <span style={{ textTransform: "capitalize" }}>
            {reserva.estadoReserva}
          </span>
        </Text>

        <Group position="right" mt="xl">
          <Button variant="outline" onClick={() => router.push("/reservas")}>
            Volver a Mis Reservas
          </Button>
        </Group>
      </Card>
    </Container>
  );
};

export default DetalleReserva;