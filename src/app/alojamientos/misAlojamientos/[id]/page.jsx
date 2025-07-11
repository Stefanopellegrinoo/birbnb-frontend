"use client";

import AlojamientoNoEncontrado from "@/components/alojamientos/alojamientoId/AlojamientoNoEncontrado";
import LoaderUI from "@/components/ui/Loader";
import useAlojamientoById from "@/hooks/alojamiento/useAlojamientoById";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Center, Stack, Tabs } from "@mantine/core";
import MultipleFiles from "@/components/ui/MultipleFiles";
import api from "@/lib/api";
import CamposBasicos from "@/components/alojamientos/alojamientoId/camposAlojamiento/CamposBasicos";
import EditarAlojamiento from "@/components/alojamientos/alojamientoId/misAlojamientos/EditarAlojamiento";
import ReservasDashboard from "@/components/alojamientos/alojamientoId/misAlojamientos/ReservasAlojamiento";

const page = () => {
    const { id } = useParams();
    const { alojamiento, loading, error } = useAlojamientoById(id);
    const [fotos, setFotos] = useState([]);
    const [reservas, setReservas] = useState([]);
    const [errorReserva, setErrorReserva] = useState(false);

    const form = useForm({
        initialValues: {
            nombre: "",
            descripcion: "",
            precioPorNoche: 0,
            moneda: "peso",
            horarioChkIn: "",
            horarioChkOut: "",
            cantHuespedesMax: 1,
            calle: "",
            altura: "",
            ciudad: "",
            pais: "",
            caracteristicas: [],
        },
    });

    useEffect(() => {
        if (!alojamiento) return;
        setFotos(alojamiento.fotos ?? []);

        form.setValues({
            nombre: alojamiento.nombre || "",
            descripcion: alojamiento.descripcion || "",
            precioPorNoche: alojamiento.precioPorNoche || 0,
            moneda: alojamiento.moneda || "peso",
            horarioChkIn: alojamiento.horarioChkIn || "",
            horarioChkOut: alojamiento.horarioChkOut || "",
            cantHuespedesMax: alojamiento.cantHuespedesMax || 1,
            calle: alojamiento.direccion.calle || "",
            altura: alojamiento.direccion.altura || "",
            ciudad: alojamiento.direccion.ciudad.nombre || "",
            pais: alojamiento.direccion.ciudad.pais.nombre || "",
            caracteristicas: alojamiento.caracteristicas || [],
        });
    }, [alojamiento]);

    useEffect(() => {
        if (alojamiento?.fotos) {
            setFotos(alojamiento.fotos);
        }
    }, [alojamiento]);



  useEffect(() => {
    const fetchReservas = async () => {
        try {
            const res = await api.get(`/reserva/${id}/alojamiento`);
            console.log(res.data);
            setReservas(res.data);
        } catch (err) {
          setErrorReserva(true);
          console.error("Error fetching reservas:", err);
        }
    };
    fetchReservas();
  }, [id]);


    if (loading) return <LoaderUI />;
    if (error || !alojamiento) return <AlojamientoNoEncontrado />;

    const handleSubmit = async (values) => {
        try {
            await api.put(`/alojamientos/${id}`, { ...values, fotos });
            //TODO NOTIFICACION GUARDADO
        } catch (err) {
            console.error("Error actualizando alojamiento", err);
        }
    };

    const handleAcceptReserva = async (reservaId) => {
      // if (!reservaId) return;
        try {
            await api.patch(`/reservas/${reservaId}/confirmacion`);
            //TODO NOTIFICACION GUARDADO
        } catch (err) {
            console.error("Error actualizando alojamiento", err);
        }


    };

    const handleCancelReserva = async (reservaId) => {
      if (!reservaId) return;
        try {
            await api.put(`/alojamientos/${id}`, { ...values, fotos });
            //TODO NOTIFICACION GUARDADO
        } catch (err) {
            console.error("Error actualizando alojamiento", err);
        }
    };

    return (
        <Center>
          
      <Stack spacing="xl" style={{ width: '80%' }}>
        <Tabs
          defaultValue="reservas"
          variant="pills"      
          grow                 
          color="gray"        
          style={{ marginTop: '2%' }} 
        >
          <Tabs.List>
            <Tabs.Tab value="reservas">Reservas</Tabs.Tab>
            <Tabs.Tab value="editar">Editar Alojamiento</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="reservas" pt="md">
            <ReservasDashboard
              reservas={reservas}
              onAccept={handleAcceptReserva}
              onCancel={handleCancelReserva}
            />
          </Tabs.Panel>

          <Tabs.Panel value="editar" pt="md">
            <EditarAlojamiento
              form={form}
              fotos={fotos}
              onChangeFotos={setFotos}
              submit={handleSubmit}
            />
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Center>
    );
};

export default page;
