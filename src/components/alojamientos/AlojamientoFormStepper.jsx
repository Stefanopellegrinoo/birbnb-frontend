import React, { useEffect, useState } from "react";
import {
    Stepper,
    Button,
    Group,
    Stack,
    TextInput,
    Textarea,
    NumberInput,
    Select,
    Divider,
    Card,
    Text,
    Box,
    MultiSelect,
} from "@mantine/core";
import { getTimeRange, TimePicker } from "@mantine/dates";
import SelectorUbicacion from "./SelectorUbicacion";
import api from "@/lib/api";
import MultipleFiles from "../ui/MultipleFiles";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import CamposBasicos from "./alojamientoId/camposAlojamiento/CamposBasicos";
import { useForm } from "@mantine/form";
import Confirmacion from "./alojamientoId/camposAlojamiento/Confirmacion";

export default function AlojamientoFormStepper() {
    const [active, setActive] = useState(0);
    const { user } = useAuth();
    const router = useRouter();
    const [error, setError] = useState("");

    const form = useForm({
        nombre: "",
        descripcion: "",
        precioPorNoche: 0,
        moneda: "peso",
        horarioChkIn: "",
        horarioChkOut: "",
        cantHuespedesMax: 1,
        caracteristicas: [],
        direccion: {
            calle: "",
            altura: "",
            ciudad: "",
            pais: "",
            lat: "",
            lon: "",
        },
    });
    const [ubicacion, setUbicacion] = useState({
        calle: "",
        altura: "",
        ciudad: "",
        provincia: "",
        pais: "",
        lat: null,
        lon: null,
    });
    const [direccionInput, setDireccionInput] = useState("");

    const [fotos, setFotos] = useState([]);

    const nextStep = () => setActive((current) => Math.min(current + 1, 3));
    const prevStep = () => setActive((current) => Math.max(current - 1, 0));

    const handleConfirm = async (e) => {
        e.preventDefault();
        const payload = {
            ...form.values,
            precioPorNoche: Number(form.values.precioPorNoche),
            cantHuespedesMax: Number(form.values.cantHuespedesMax),
            direccion: {
                calle: ubicacion.calle,
                altura: Number(ubicacion.altura),
                ciudad: {
                    nombre: ubicacion.ciudad,
                    pais: { nombre: ubicacion.pais },
                },
                lat: parseFloat(ubicacion.lat),
                lon: parseFloat(ubicacion.lon),
            },
            fotos,
        };
        // const payload = {
        //     nombre: formData.nombre,
        //     descripcion: formData.descripcion,
        //     precioPorNoche: Number(formData.precioPorNoche),
        //     moneda: formData.moneda,
        //     horarioChkIn: formData.horarioChkIn,
        //     horarioChkOut: formData.horarioChkOut,
        //     cantHuespedesMax: Number(formData.cantHuespedesMax),
        //     direccion: {
        //         calle: ubicacion.calle,
        //         altura: Number(ubicacion.altura),
        //         ciudad: {
        //             nombre: ubicacion.ciudad,
        //             pais: {
        //                 nombre: ubicacion.pais,
        //             },
        //         },
        //         lat: parseFloat(ubicacion.lat),
        //         lon: parseFloat(ubicacion.lon),
        //     },
        //     caracteristicas: formData.caracteristicas,
        //     fotos: fotos,
        // };

        try {
            const res = await api.post("/alojamientos", payload);
            if (!res.ok) {
                console.log("Error al crear alojamiento:", res);
                router.push("/alojamientos");
            }
            const alojamientoCreado = res.data;

            console.log("Alojamiento creado:", res.datalojamientoCreado);
            router.push("/alojamientos");
        } catch (err) {
            console.error("Error:", err.message);
        }
    };

    return (
        <Box>
            <Card shadow="sm" padding="lg" mih={500}>
                {" "}
                {/* altura fija */}
                <Stepper
                    active={active}
                    onStepClick={setActive}
                    allowNextStepsSelect={false}
                >
                    <Stepper.Step label="Datos básicos">
                        <Stack>
                            <CamposBasicos form={form} />
                        </Stack>
                    </Stepper.Step>

                    <Stepper.Step label="Dirección">
                        <Stack>
                            <Divider label="Dirección" />
                            <SelectorUbicacion
            
                                onSeleccion={setUbicacion}
                            />
                        </Stack>
                    </Stepper.Step>

                    <Stepper.Step label="Extras">
                        <Stack>
                            <Divider label="Extras" />
                            <MultiSelect
                                label="Características"
                                data={[
                                    "wifi",
                                    "estacionamiento",
                                    "mascotas_permitidas",
                                    "piscina",
                                ]}
                                {...form.getInputProps("caracteristicas")}
                                clearable
                            />
                            <MultipleFiles
                                initialPhotos={fotos}
                                onChange={setFotos}
                            />
                        </Stack>
                    </Stepper.Step>

                    <Stepper.Step label="Confirmación">
                        <Stack spacing="xs">
                            <Confirmacion
                                formValues={form.values}
                                ubicacion={ubicacion}
                                fotos={fotos}
                            />
                        </Stack>
                    </Stepper.Step>
                </Stepper>
                <Group position="apart" mt="xl">
                    <Button
                        variant="default"
                        disabled={active === 0}
                        onClick={prevStep}
                    >
                        Volver
                    </Button>
                    {active < 3 ? (
                        <Button onClick={nextStep}>Siguiente</Button>
                    ) : (
                        <Button onClick={handleConfirm}>Confirmar</Button>
                    )}
                </Group>
            </Card>
        </Box>
    );
}
