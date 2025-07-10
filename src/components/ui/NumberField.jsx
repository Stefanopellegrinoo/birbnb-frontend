import { NumberInput } from '@mantine/core';

export function NumberField({ label, value, onChange, min, max }) {
  return (
    <NumberInput
      label={label}
      value={value}
      min={min}
      max={max}
      onChange={onChange}
    />
  );
}
