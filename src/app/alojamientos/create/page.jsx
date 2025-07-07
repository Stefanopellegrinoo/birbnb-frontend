"use client";
import {
    TextInput,
    NumberInput,
    Select,
    Textarea,
    Group,
    Stack,
    Divider,
} from "@mantine/core";
import { useState } from "react";
import { Form } from "../../../components/form/Form";
import api from "@/lib/api";
export default function CrearAlojamientoForm() {
    const [formData, setFormData] = useState({
        usuarioAnfitrion: "",
        nombre: "",
        descripcion: "",
        precioPorNoche: "",
        moneda: "",
        horarioChkIn: "",
        horarioChkOut: "",
        cantHuespedesMax: "",
        calle: "",
        altura: "",
        ciudad: "",
        pais: "",
        lat: "",
        lon: "",
        caracteristicas: "",
        fotos: "",
    });
    const [error, setError] = useState("");

    const handleChange = (field) => (value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            usuarioAnfitrion: formData.usuarioAnfitrion,
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            precioPorNoche: Number(formData.precioPorNoche),
            moneda: formData.moneda,
            horarioChkIn: formData.horarioChkIn,
            horarioChkOut: formData.horarioChkOut,
            cantHuespedesMax: Number(formData.cantHuespedesMax),
            direccion: {
                calle: formData.calle,
                altura: Number(formData.altura),
                ciudad: {
                    nombre: formData.ciudad,
                    pais: {
                        nombre: formData.pais,
                    },
                },
                lat: parseFloat(formData.lat),
                lon: parseFloat(formData.lon),
            },
            caracteristicas: formData.caracteristicas
                .split(",")
                .map((c) => c.trim())
                .filter((c) => c),
            fotos: formData.fotos
                .split(",")
                .map((url) => url.trim())
                .filter((url) => url),
        };

        try {
            const res = await api.post("/alojamientos", payload);

            if (!res.ok) {
                const { message } = await res.json();
                console.log("Error al crear alojamiento:", message);
                return;
            }
            console.log("Alojamiento creado:", res.data);
            router.push("/");
        } catch (err) {
            console.error("Error:", err.message);
        }
    };

    return (
        <Form
            title="Crear Alojamiento"
            onSubmit={handleSubmit}
            error={error}
            submitLabel="Crear"
        >
            <Stack>
                <TextInput
                    label="ID de anfitrión"
                    value={formData.usuarioAnfitrion}
                    onChange={(e) =>
                        handleChange("usuarioAnfitrion")(e.currentTarget.value)
                    }
                />
                <TextInput
                    label="Nombre"
                    value={formData.nombre}
                    onChange={(e) =>
                        handleChange("nombre")(e.currentTarget.value)
                    }
                />
                <Textarea
                    label="Descripción"
                    autosize
                    value={formData.descripcion}
                    onChange={(e) =>
                        handleChange("descripcion")(e.currentTarget.value)
                    }
                />
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
                <Group grow>
                    <TextInput
                        label="Check-in"
                        value={formData.horarioChkIn}
                        onChange={(e) =>
                            handleChange("horarioChkIn")(e.currentTarget.value)
                        }
                    />
                    <TextInput
                        label="Check-out"
                        value={formData.horarioChkOut}
                        onChange={(e) =>
                            handleChange("horarioChkOut")(e.currentTarget.value)
                        }
                    />
                </Group>
                <NumberInput
                    label="Máx. huéspedes"
                    value={formData.cantHuespedesMax}
                    onChange={handleChange("cantHuespedesMax")}
                />
                <Divider label="Dirección" />
                <TextInput
                    label="Calle"
                    value={formData.calle}
                    onChange={(e) =>
                        handleChange("calle")(e.currentTarget.value)
                    }
                />
                <TextInput
                    label="Altura"
                    value={formData.altura}
                    onChange={(e) =>
                        handleChange("altura")(e.currentTarget.value)
                    }
                />
                <TextInput
                    label="Ciudad"
                    value={formData.ciudad}
                    onChange={(e) =>
                        handleChange("ciudad")(e.currentTarget.value)
                    }
                />
                <TextInput
                    label="País"
                    value={formData.pais}
                    onChange={(e) =>
                        handleChange("pais")(e.currentTarget.value)
                    }
                />
                <TextInput
                    label="Latitud"
                    value={formData.lat}
                    onChange={(e) => handleChange("lat")(e.currentTarget.value)}
                />
                <TextInput
                    label="Longitud"
                    value={formData.lon}
                    onChange={(e) => handleChange("lon")(e.currentTarget.value)}
                />
                <Divider label="Extras" />
                <TextInput
                    label="Características (coma separadas)"
                    value={formData.caracteristicas}
                    onChange={(e) =>
                        handleChange("caracteristicas")(e.currentTarget.value)
                    }
                />
                <Textarea
                    label="URLs de fotos (coma separadas)"
                    value={formData.fotos}
                    onChange={(e) =>
                        handleChange("fotos")(e.currentTarget.value)
                    }
                />
            </Stack>
        </Form>
    );
}
