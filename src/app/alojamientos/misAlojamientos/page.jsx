"use client";

import { AlojamientoCard } from "@/components/alojamientos/AlojamientoCard";
import CardSkeleton from "@/components/ui/CardSkeleton";
import useAlojamientoUser from "@/hooks/alojamiento/useAlojamientoUser";
import api from "@/lib/api";
import React, { useEffect, useState } from "react";
import "../../../styles/Alojamientos.css";
import { Divider } from "@mantine/core";
import Loader from "@/components/ui/Loader";

const MisAlojamientos = () => {
    const { alojamientos, loading, error } = useAlojamientoUser();


    return (
        <div className="alojamientos">
            <div className="alojamientos-container">
                <p>Mis Alojamientos</p>
                <Divider />
                <div>
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="alojamientos-grid">
                            {alojamientos?.map((alojamiento) => (
                                <AlojamientoCard edit={true} alojamiento={alojamiento} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MisAlojamientos;
