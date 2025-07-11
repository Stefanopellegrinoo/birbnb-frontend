'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Text,
  Button,
  Paper,
  Group,
  Center,
  Loader,
} from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import Link from 'next/link';
import axios from '@/lib/api';

export default function ReservaConfirmada() {
  const searchParams = useSearchParams();
  const reservaId = searchParams.get('id');

  const [reserva, setReserva] = useState(null);
  const [alojamiento, setAlojamiento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!reservaId) return;

    setLoading(true);

    axios
      .get(`/reservas/${reservaId}`)
      .then((res) => {
        setReserva(res.data);
        
        return axios.get(`/alojamientos/${res.data.alojamiento}`);
      })
      .then((res) => {
        setAlojamiento(res.data);
      })
      .catch((err) => {
        console.error('Error al obtener datos:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [reservaId]);

  if (loading) {
    return (
      <Center py="xl">
        <Loader size="lg" />
      </Center>
    );
  }

  if (!reserva) {
    return (
      <Container size="sm" py="xl">
        <Paper shadow="md" p="xl" radius="md" withBorder>
          <Title order={2} align="center" color="red">
            Error al cargar la reserva
          </Title>
          <Text align="center" mt="sm" color="dimmed">
            No se pudo obtener la información de la reserva.
          </Text>
          <Center mt="lg">
            <Link href="/">
              <Button variant="outline" color="gray">
                Volver al inicio
              </Button>
            </Link>
          </Center>
        </Paper>
      </Container>
    );
  }

  const rangoFechas = reserva?.rangoFechas || {};
  const fechaInicio = rangoFechas?.fechaInicio || '';
  const fechaFin = rangoFechas?.fechaFin || '';
  const cantHuespedes = reserva?.cantHuespedes || 0;
  const precioPorNoche = reserva?.precioPorNoche || 0;

  const dias = calcularDias(fechaInicio, fechaFin);
  const total = dias * precioPorNoche;

  function calcularDias(inicio, fin) {
    if (!inicio || !fin) return 0;
    const start = new Date(inicio);
    const end = new Date(fin);
    const diff = end - start;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  return (
    <Container size="sm" py="xl">
      <Paper shadow="md" p="xl" radius="md" withBorder>
        <Center>
          <IconCheck size={60} color="green" />
        </Center>

        <Title order={2} align="center" mt="md">
          ¡Reserva confirmada!
        </Title>

        <Text align="center" mt="sm" color="dimmed">
          Has reservado en {' '}
          <strong>{alojamiento?.nombre || reserva.alojamiento}</strong> del{' '}
          <strong>{fechaInicio.slice(0, 10)}</strong> al{' '}
          <strong>{fechaFin.slice(0, 10)}</strong> para{' '}
          <strong>{cantHuespedes}</strong> huésped{cantHuespedes > 1 ? 'es' : ''}.
        </Text>

        <Text align="center" mt="sm" color="dimmed">
          Precio por noche: <strong>{precioPorNoche}</strong>
        </Text>

        <Text align="center" mt="xs" color="dimmed">
          Total por {dias} noche(s): <strong>{total}</strong>
        </Text>

        <Group position="center" mt="xl" spacing="md">
          <Link href="/alojamientos" passHref>
            <Button variant="light" color="blue">
              Ver más alojamientos
            </Button>
          </Link>

          <Link href="/" passHref>
            <Button color="gray" variant="outline">
              Volver al inicio
            </Button>
          </Link>
        </Group>
      </Paper>
    </Container>
  );
}
