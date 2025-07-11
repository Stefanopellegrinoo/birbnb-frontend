"use client";

import AlojamientoNoEncontrado from "@/components/alojamientos/alojamientoId/AlojamientoNoEncontrado";
import LoaderUI from "@/components/ui/Loader";
import useAlojamientoById from "@/hooks/alojamiento/useAlojamientoById";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  Card,
  Title,
  Stack,
  Group,
  TextInput,
  Textarea,
  NumberInput,
  Select,
  MultiSelect,
  Button,
  Divider,
  SimpleGrid,
  Image,
  ActionIcon,
  FileButton,
  Center,
  Text,
} from "@mantine/core";
import { IconTrash } from '@tabler/icons-react';
import MultipleFiles from "@/components/ui/MultipleFiles";
import AlojamientoFotos from "@/components/alojamientos/alojamientoId/AlojamientoFotos";
import api from "@/lib/api";
import CamposBasicos from "@/components/alojamientos/alojamientoId/camposAlojamiento/CamposBasicos";




const page = () => {
    const { id } = useParams();
    const { alojamiento, loading, error } = useAlojamientoById(id);
    const [fotos, setFotos] = useState([]);

  const form = useForm({
    initialValues: {
      nombre: '',
      descripcion: '',
      precioPorNoche: 0,
      moneda: 'peso',
      horarioChkIn: '',
      horarioChkOut: '',
      cantHuespedesMax: 1,
      calle: '',
      altura: '',
      ciudad: '',
      pais: '',
      caracteristicas: [],
    },
  });

  useEffect(() => {
    if (!alojamiento) return;
    console.log(alojamiento)
    setFotos(alojamiento.fotos ?? [])

    form.setValues({
      nombre: alojamiento.nombre || '',
      descripcion: alojamiento.descripcion || '',
      precioPorNoche: alojamiento.precioPorNoche || 0,
      moneda: alojamiento.moneda || 'peso',
      horarioChkIn: alojamiento.horarioChkIn || '',
      horarioChkOut: alojamiento.horarioChkOut || '',
      cantHuespedesMax: alojamiento.cantHuespedesMax || 1,
      calle: alojamiento.direccion.calle || '',
      altura: alojamiento.direccion.altura || '',
      ciudad: alojamiento.direccion.ciudad.nombre || '',
      pais: alojamiento.direccion.ciudad.pais.nombre || '',
      caracteristicas: alojamiento.caracteristicas || [],
    });
    console.log(alojamiento.fotos)
  }, [alojamiento]);

  useEffect(() => {
  if (alojamiento?.fotos) {
    setFotos(alojamiento.fotos);   
  }
}, [alojamiento]);

  if (loading) return <LoaderUI />;
  if (error || !alojamiento) return <AlojamientoNoEncontrado />;

  const handleSubmit = async (values) => {
    try {
      await api.put(`/alojamientos/${id}`, { ...values, fotos });
      //TODO NOTIFICACION GUARDADO
    } catch (err) {
      console.error('Error actualizando alojamiento', err);
    }
  };

  return (
    <Center py="xl">
      <Card shadow="sm" padding="lg" sx={{ width: '100%', maxWidth: 640 }}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack spacing="lg">
            {/* Datos básicos */}
            <Divider label="Datos básicos" />
          
            <CamposBasicos form={form}/>
          
            {/* Dirección */}
            <Divider label="Dirección" />
            <Group grow>
              <TextInput label="Calle" {...form.getInputProps('calle')} />
              <TextInput label="Altura" {...form.getInputProps('altura')} />
            </Group>
            <Group grow>
              <TextInput label="Ciudad" {...form.getInputProps('ciudad')} />
              <TextInput label="País" {...form.getInputProps('pais')} />
            </Group>

            {/* Fotos */}
            <Divider label="Fotos" />
            <Group  sx={{ width: '100%', maxWidth: 640 }}>
             <MultipleFiles initialPhotos={fotos} onChange={setFotos} />
             
            </Group>

            {/* Extras */}
            <Divider label="Extras" />
             <Group grow>

             
           <MultiSelect
              label="Características"
              data={[
                'wifi',
                'estacionamiento',
                'mascotas_permitidas',
                'piscina',
              ]}
              value={form.values.caracteristicas}
              onChange={(val) => form.setFieldValue('caracteristicas', val)}
              clearable
            />
            </Group>
            <Button type="submit" fullWidth mt="md">
              Guardar cambios
            </Button>
          </Stack>
        </form>
      </Card>
    </Center>
  )
};

export default page;
