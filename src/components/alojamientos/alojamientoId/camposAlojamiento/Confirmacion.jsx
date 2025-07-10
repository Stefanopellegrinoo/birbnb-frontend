// components/Confirmacion.jsx
import { Stack, Text, Group } from '@mantine/core';

export default function Confirmacion({ formValues, ubicacion, fotos }) {
  const items = [
    ...Object.entries(formValues),
    ['Calle', ubicacion.calle],
    ['Altura', ubicacion.altura],
    ['Ciudad', ubicacion.ciudad],
    ['País', ubicacion.pais],
    ['Fotos', fotos.join(', ')],
  ];

  return (
    <Stack spacing="xs">
      <Text weight={500}>Por favor verifica los datos:</Text>
      {items.map(([label, val]) => (
        <Group key={label}>
          <Text
            size="sm"
            style={{ flex: 1, textTransform: 'capitalize' }}
          >
            {label}
          </Text>
          <Text size="sm" style={{ flex: 2 }}>
            {String(val)}
          </Text>
        </Group>
      ))}
    </Stack>
  );
}

