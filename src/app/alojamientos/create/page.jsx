"use client";

import AlojamientoFormStepper from "@/components/alojamientos/AlojamientoFormStepper";
import "../../../styles/AlojamientoCrear.css"


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
