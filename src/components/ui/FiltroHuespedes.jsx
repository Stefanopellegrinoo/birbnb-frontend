import { Group, Text, Button } from '@mantine/core';

export function FiltroHuespedes({ value, onChange }) {
  return (
    <div>
      <Text size="sm" mb={4}>Huéspedes</Text>
      <Group spacing="xs">
        <Button variant="light" onClick={() => onChange(Math.max(1, value - 1))}>-</Button>
        <Text>{value}</Text>
        <Button variant="light" onClick={() => onChange(value + 1)}>+</Button>
      </Group>
    </div>
  );
}
