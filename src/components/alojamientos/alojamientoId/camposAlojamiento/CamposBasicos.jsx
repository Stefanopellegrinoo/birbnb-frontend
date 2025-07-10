import { TextInput, Textarea, Group, NumberInput, Select } from "@mantine/core";
import { getTimeRange, TimePicker } from "@mantine/dates";
import React from "react";

const CamposBasicos = ({ form }) => {
    return (
        <>
            <TextInput
                label="Nombre"
                {...form.getInputProps("nombre")}
                required
            />

            <Textarea
                label="Descripción"
                autosize
                minRows={3}
                {...form.getInputProps("descripcion")}
            />

            <Group grow>
                <NumberInput
                    label="Precio por noche"
                    {...form.getInputProps("precioPorNoche")}
                    precision={2}
                    required
                />
                <Select
                    label="Moneda"
                    data={["peso", "dolar"]}
                    {...form.getInputProps("moneda")}
                />
                <NumberInput
                    label="Máx. huéspedes"
                    {...form.getInputProps("cantHuespedesMax")}
                    min={1}
                />
            </Group>

           <Group grow>
        <TimePicker
          label="Check-in"
          withDropdown
          presets={getTimeRange({
            startTime: '06:00:00',
            endTime: '11:00:00',
            interval: '01:00:00',
          })}
          value={form.values.horarioChkIn}
          onChange={(val) => form.setFieldValue('horarioChkIn', val)}
          required
        />
        <TimePicker
          label="Check-out"
          withDropdown
          presets={getTimeRange({
            startTime: '06:00:00',
            endTime: '23:00:00',
            interval: '01:00:00',
          })}
          value={form.values.horarioChkOut}
          onChange={(val) => form.setFieldValue('horarioChkOut', val)}
          required
        />
      </Group>
        </>
    );
};

export default CamposBasicos;
