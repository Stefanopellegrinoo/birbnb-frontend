import React, { useState } from "react";
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
import SelectorUbicacion from "./SelectorUbicacion";
import api from "@/lib/api";
import MultipleFiles from "../ui/MultipleFiles";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AlojamientoFormStepper() {
    const [active, setActive] = useState(0);
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        precioPorNoche: 0,
        moneda: "peso",
        horarioChkIn: "",
        horarioChkOut: "",
        cantHuespedesMax: 1,
        caracteristicas: [],
    });
    const [error, setError] = useState("");
    const router = useRouter();
    const [ubicacion, setUbicacion] = useState({
        calle: "",
        altura: "",
        ciudad: "",
        pais: "",
        lat: "",
        lon: "",
    });

    const [fotos, setFotos] = useState({});

    const nextStep = () => setActive((current) => Math.min(current + 1, 3));
    const prevStep = () => setActive((current) => Math.max(current - 1, 0));

    const handleChange = (field) => (value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleConfirm = async (e) => {
        e.preventDefault();
        const payload = {
            usuarioAnfitrion: user.id,
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            precioPorNoche: Number(formData.precioPorNoche),
            moneda: formData.moneda,
            horarioChkIn: formData.horarioChkIn,
            horarioChkOut: formData.horarioChkOut,
            cantHuespedesMax: Number(formData.cantHuespedesMax),
            direccion: {
                calle: ubicacion.calle,
                altura: Number(ubicacion.altura),
                ciudad: {
                    nombre: ubicacion.ciudad,
                    pais: {
                        nombre: ubicacion.pais,
                    },
                },
                lat: parseFloat(ubicacion.lat),
                lon: parseFloat(ubicacion.lon),
            },
            caracteristicas: formData.caracteristicas,
            fotos: fotos,
        };
        console.log(payload);

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
        <Box sx={{ minHeight: 500 }}>
            <Card shadow="sm" padding="lg" mih={500}>
                {" "}
                {/* altura fija */}
                <Stepper
                    active={active}
                    onStepClick={setActive}
                    allowNextStepsSelect={false}
                >
                    <Stepper.Step label="Datos básicos">
                        <Stack
                            sx={{
                                minHeight: 300,
                                justifyContent: "space-between",
                            }}
                        >
                            <TextInput
                                label="Nombre"
                                value={formData.nombre}
                                onChange={(e) =>
                                    handleChange("nombre")(
                                        e.currentTarget.value
                                    )
                                }
                            />
                            <Textarea
                                label="Descripción"
                                autosize
                                value={formData.descripcion}
                                onChange={(e) =>
                                    handleChange("descripcion")(
                                        e.currentTarget.value
                                    )
                                }
                            />
                            <Group grow>
                                <NumberInput
                                    label="Precio por noche"
                                    value={formData.precioPorNoche}
                                    onChange={handleChange("precioPorNoche")}
                                />
                                <Select
                                    label="Moneda"
                                    data={["peso", "dolar", "euro"]}
                                    value={formData.moneda}
                                    onChange={handleChange("moneda")}
                                />
                                <NumberInput
                                    label="Máx. huéspedes"
                                    value={formData.cantHuespedesMax}
                                    onChange={handleChange("cantHuespedesMax")}
                                />
                            </Group>
                            <Group grow>
                                <TextInput
                                    label="Check-in"
                                    value={formData.horarioChkIn}
                                    onChange={(e) =>
                                        handleChange("horarioChkIn")(
                                            e.currentTarget.value
                                        )
                                    }
                                />
                                <TextInput
                                    label="Check-out"
                                    value={formData.horarioChkOut}
                                    onChange={(e) =>
                                        handleChange("horarioChkOut")(
                                            e.currentTarget.value
                                        )
                                    }
                                />
                            </Group>
                        </Stack>
                    </Stepper.Step>

                    <Stepper.Step label="Dirección">
                        <Stack
                            sx={{
                                minHeight: 300,
                                justifyContent: "space-between",
                            }}
                        >
                            <Divider label="Dirección" />
                            <SelectorUbicacion onSeleccion={setUbicacion} />
                        </Stack>
                    </Stepper.Step>

                    <Stepper.Step label="Extras">
                        <Stack>
                            <Divider label="Extras" />
                            <MultiSelect
                                label="Características del Alojamiento"
                                data={[
                                    "wifi",
                                    "estacionamiento",
                                    "mascotas_permitidas",
                                    "piscina",
                                ]}
                                value={formData.caracteristicas}
                                onChange={handleChange("caracteristicas")}
                                clearable
                            />
                            <MultipleFiles onChange={setFotos} />
                        </Stack>
                    </Stepper.Step>

                    <Stepper.Step label="Confirmación">
                        <Stack spacing="xs">
                            <Text weight={500}>
                                Por favor verifica los datos:
                            </Text>
                            {Object.entries(formData).map(([key, val]) => (
                                <Group key={key} noWrap>
                                    <Text
                                        size="sm"
                                        style={{
                                            flex: 1,
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {key.replace(/([A-Z])/g, " $1")}:
                                    </Text>
                                    <Text size="sm" style={{ flex: 2 }}>
                                        {String(val)}
                                    </Text>
                                </Group>
                            ))}
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
