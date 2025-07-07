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
import AlojamientoFormStepper from "@/components/alojamientos/AlojamientoFormStepper";
import "../../../styles/AlojamientoCrear.css"
import { LoadScript } from "@react-google-maps/api";

const libraries = ["places"];


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

 

    return (
        <>
        <div className="form-alojamiento">
            <div className="caja-alojamiento">
                    <AlojamientoFormStepper/>
            </div>
        </div>
        </>
        // <Form
        //     title="Crear Alojamiento"
        //     onSubmit={handleSubmit}
        //     error={error}
        //     submitLabel="Crear"
        // >
        //     <Stack>
        //         <TextInput
        //             label="ID de anfitrión"
        //             value={formData.usuarioAnfitrion}
        //             onChange={(e) =>
        //                 handleChange("usuarioAnfitrion")(e.currentTarget.value)
        //             }
        //         />
        //         <TextInput
        //             label="Nombre"
        //             value={formData.nombre}
        //             onChange={(e) =>
        //                 handleChange("nombre")(e.currentTarget.value)
        //             }
        //         />
        //         <Textarea
        //             label="Descripción"
        //             autosize
        //             value={formData.descripcion}
        //             onChange={(e) =>
        //                 handleChange("descripcion")(e.currentTarget.value)
        //             }
        //         />
        //         <NumberInput
        //             label="Precio por noche"
        //             value={formData.precioPorNoche}
        //             onChange={handleChange("precioPorNoche")}
        //         />
        //         <Select
        //             label="Moneda"
        //             data={["peso", "dolar", "euro"]}
        //             value={formData.moneda}
        //             onChange={handleChange("moneda")}
        //         />
        //         <Group grow>
        //             <TextInput
        //                 label="Check-in"
        //                 value={formData.horarioChkIn}
        //                 onChange={(e) =>
        //                     handleChange("horarioChkIn")(e.currentTarget.value)
        //                 }
        //             />
        //             <TextInput
        //                 label="Check-out"
        //                 value={formData.horarioChkOut}
        //                 onChange={(e) =>
        //                     handleChange("horarioChkOut")(e.currentTarget.value)
        //                 }
        //             />
        //         </Group>
        //         <NumberInput
        //             label="Máx. huéspedes"
        //             value={formData.cantHuespedesMax}
        //             onChange={handleChange("cantHuespedesMax")}
        //         />
        //         <Divider label="Dirección" />
        //         <TextInput
        //             label="Calle"
        //             value={formData.calle}
        //             onChange={(e) =>
        //                 handleChange("calle")(e.currentTarget.value)
        //             }
        //         />
        //         <TextInput
        //             label="Altura"
        //             value={formData.altura}
        //             onChange={(e) =>
        //                 handleChange("altura")(e.currentTarget.value)
        //             }
        //         />
        //         <TextInput
        //             label="Ciudad"
        //             value={formData.ciudad}
        //             onChange={(e) =>
        //                 handleChange("ciudad")(e.currentTarget.value)
        //             }
        //         />
        //         <TextInput
        //             label="País"
        //             value={formData.pais}
        //             onChange={(e) =>
        //                 handleChange("pais")(e.currentTarget.value)
        //             }
        //         />
        //         <TextInput
        //             label="Latitud"
        //             value={formData.lat}
        //             onChange={(e) => handleChange("lat")(e.currentTarget.value)}
        //         />
        //         <TextInput
        //             label="Longitud"
        //             value={formData.lon}
        //             onChange={(e) => handleChange("lon")(e.currentTarget.value)}
        //         />
        //         <Divider label="Extras" />
        //         <TextInput
        //             label="Características (coma separadas)"
        //             value={formData.caracteristicas}
        //             onChange={(e) =>
        //                 handleChange("caracteristicas")(e.currentTarget.value)
        //             }
        //         />
        //         <Textarea
        //             label="URLs de fotos (coma separadas)"
        //             value={formData.fotos}
        //             onChange={(e) =>
        //                 handleChange("fotos")(e.currentTarget.value)
        //             }
        //         />
        //     </Stack>
        // </Form>
    );
}
