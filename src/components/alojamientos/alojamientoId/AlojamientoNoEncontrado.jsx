import { Box, Center, Text, Title, Button } from '@mantine/core';
import Link from 'next/link';

const AlojamientoNoEncontrado = () => {
  return (
    <Center h="60vh">
      <Box ta="center">
        <Title order={2} mb="xs">
          Alojamiento no encontrado
        </Title>
        <Text c="dimmed" size="sm" mb="md">
          El alojamiento que estás buscando no existe o fue eliminado.
        </Text>
        <Button component={Link} href="/alojamientos" variant="light" color="blue">
          Volver al listado
        </Button>
      </Box>
    </Center>
  );
};

export default AlojamientoNoEncontrado;
