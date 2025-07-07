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

    return (
        <>
        <div className="form-alojamiento">
            <div className="caja-alojamiento">
                    <AlojamientoFormStepper/>
            </div>
        </div>
        </>
        
    );
}
