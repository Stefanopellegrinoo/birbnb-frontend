// components/FiltrosCompactos.jsx
import {
  Accordion,
  Button,
  TextInput,
  NumberInput,
  Checkbox,
  Stack,
  Group,
  ActionIcon,
  Box,
  Divider,
  Collapse,
  Text,
} from '@mantine/core'
import { useState } from 'react';
import { FiltroComodidades } from './FiltroComodidades';
import {
  IconAdjustments,
  IconSearch,
  IconPlus,
  IconMinus,
  IconX,
  IconChevronDown,
  IconChevronUp,
} from '@tabler/icons-react';

export function FiltrosCompactos({
  filters,
  setFilters,
  onSearch,
  clearFilters,
  amenities,
}) {
   const [opened, setOpened] = useState(false);
  const [showAmenities, setShowAmenities] = useState(false);

  const update = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const toggleAmenity = (name, checked) => {
    setFilters((prev) => ({
      ...prev,
      caracEspeciales: checked
        ? [...prev.caracEspeciales, name]
        : prev.caracEspeciales.filter((a) => a !== name),
    }));
  };

  const activeFilters =
    Object.values(filters).some((val) =>
      Array.isArray(val) ? val.length > 0 : val
    );

  return (
    <Box
      p="xs"
      bg="gray.1"
      sx={(theme) => ({
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.sm,
        fontSize: 14,
      })}
    >
      <Group position="apart" spacing="xs" mb="xs">
        <Button
          variant="subtle"
          size="xs"
          leftIcon={<IconAdjustments size={16} />}
          onClick={() => setOpened((o) => !o)}
        >
          Filtros
        </Button>

        <Group spacing={4}>
          <Button
            size="xs"
            leftIcon={<IconSearch size={14} />}
            onClick={onSearch}
          >
            Buscar
          </Button>
          {activeFilters && (
            <ActionIcon size="xs" onClick={clearFilters}>
              <IconX size={14} /> 
            </ActionIcon>
          )}
        </Group>
      </Group>

      <Collapse in={opened}>
        <Stack spacing="xs">
          <Group grow spacing="xs">
            <TextInput
              size="xs"
              placeholder="País"
              value={filters.pais}
              onChange={(e) => update('pais', e.target.value)}
            />
            <TextInput
              size="xs"
              placeholder="Ciudad"
              value={filters.ciudad}
              onChange={(e) => update('ciudad', e.target.value)}
            />
          </Group>

          <Group grow spacing="xs">
            <NumberInput
              size="xs"
              placeholder="Mín €"
              value={filters.precioMin}
              onChange={(v) => update('precioMin', v)}
              min={0}
            />
            <NumberInput
              size="xs"
              placeholder="Máx €"
              value={filters.precioMax}
              onChange={(v) => update('precioMax', v)}
              min={0}
            />
          </Group>

          <Group spacing="xs" noWrap>
            <Text size="xs" mr={4}>
              Huéspedes
            </Text>
            <ActionIcon
              variant="light"
              size="xs"
              onClick={() =>
                update('huespedMax', Math.max(1, filters.huespedMax - 1))
              }
            >
              <IconMinus size={14} />  
            </ActionIcon>
            <NumberInput
              size="xs"
              value={filters.huespedMax}
              readOnly
              hideControls
              styles={{ input: { textAlign: 'center' } }}
              w={50}
            />
            <ActionIcon
              variant="light"
              size="xs"
              onClick={() => update('huespedMax', filters.huespedMax + 1)}
            >
              <IconPlus size={14} /> 
            </ActionIcon>
          </Group>

          <Divider my={4} />
          <Button
            size="xs"
            variant="subtle"
            onClick={() => setShowAmenities((s) => !s)}
            rightIcon={
              showAmenities ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />
            }
          >
            Comodidades
          </Button>

          <Collapse in={showAmenities}>
          <FiltroComodidades 
          amenities={amenities} 
          selected={filters.caracEspeciales} 
          onChange={toggleAmenity}/>
          </Collapse>
        </Stack>
      </Collapse>
    </Box>
  );
}
