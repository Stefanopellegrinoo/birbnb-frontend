import { Card, Image, Text, Group, Badge, Stack } from '@mantine/core';
import Link from 'next/link';

export function AlojamientoCard({ alojamiento }){
  const imageUrl = alojamiento.fotos?.[0]
    ? `http://localhost:3000/images/${alojamiento.fotos[0]}`
    : '/file.svg';
  return (
       <Link key={alojamiento.id} href={`/alojamientos/${alojamiento.id}`} passHref>
    <Card shadow="sm" padding="lg" radius="md" withBorder>
    
           <Card.Section>
          <Image
            src={imageUrl}
            alt={alojamiento.nombre}
            height={200}
            fit="cover"
            withPlaceholder
          />
        </Card.Section>

        <Stack spacing="xs" mt="sm">
          <Text weight={600} size="lg">
            {alojamiento.nombre}
          </Text>
          <Text color="dimmed" size="sm">
            {alojamiento.ubicacion}
          </Text>
          <Text size="sm" lineClamp={2}>
            {alojamiento.descripcion}
          </Text>
        </Stack>

        <Group position="apart" mt="md">
          <Badge color="green" variant="light">
            ${alojamiento.precioPorNoche}/noche
          </Badge>
          <Text size="sm">⭐ {alojamiento.rating}</Text>
        </Group>
    </Card>
    </Link>
  );
}