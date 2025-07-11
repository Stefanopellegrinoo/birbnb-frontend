"use client";

import { AlojamientoCard } from "@/components/alojamientos/AlojamientoCard";
import CardSkeleton from "@/components/ui/CardSkeleton";
import useAlojamientoUser from "@/hooks/alojamiento/useAlojamientoUser";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import "../../../styles/Alojamientos.css";
import { Divider } from "@mantine/core";
import Loader from "@/components/ui/Loader";
import ComponenteVacio from "@/components/ui/ComponenteVacio";

const MisAlojamientos = () => {
    const { alojamientos, loading, error } = useAlojamientoUser();

    console.log(alojamientos.length)
    return (
        <div className="alojamientos">
            <div className="alojamientos-container">
                <p>Mis Alojamientos</p>
                <Divider />
                {/* {!error ? ( <Error/>): } */}
                <div>
                    {loading ? (
                        <Loader />
                    ) : (
                        <>
                        {alojamientos.length == 0 ? (
                            <ComponenteVacio  
                            mensaje={"No tienes alojamientos aún"} 
                            link={"alojamientos/create"} 
                            button={"crear alojamiento"} 
                            />
                        ) : (
                        <div className="alojamientos-grid">
                            {alojamientos?.map((alojamiento) => (
                                <AlojamientoCard edit={true} alojamiento={alojamiento} />
                            ))}
                           
                        </div> 
                        )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MisAlojamientos;
