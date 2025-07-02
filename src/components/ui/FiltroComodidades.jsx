import { Checkbox, Stack, Text } from '@mantine/core';

export function FiltroComodidades({ amenities, selected, onChange }) {
  return (
    <div>
      <Text size="sm" mb={4}>Comodidades</Text>
      <Stack spacing={4}>
        {amenities.map((amenity) => (
          <Checkbox
            key={amenity}
            label={amenity}
            checked={selected.includes(amenity)}
            onChange={(e) => onChange(amenity, e.target.checked)}
          />
        ))}
      </Stack>
    </div>
  );
}
