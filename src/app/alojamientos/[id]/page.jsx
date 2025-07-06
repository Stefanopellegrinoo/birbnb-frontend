"use client";

import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext";
// import { mockAlojamientos } from "../data/mockData"
import axios from "axios";
import "../../../styles/AlojamientoDetalle.css";
import { useParams, useRouter } from "next/navigation";
import useAlojamientoById from "@/hooks/alojamiento/useAlojamientoById";
import Loader from "@/components/ui/Loader";
import Servicios from "@/components/alojamientos/alojamientoId/Servicios";
import ReservaInfo from "@/components/alojamientos/alojamientoId/ReservaInfo";
import Img from "@/components/ui/Img";
import Volver from "@/components/ui/Volver";
import AlojamientoNoEncontrado from "@/components/alojamientos/alojamientoId/AlojamientoNoEncontrado";
import AlojamientoFotos from "@/components/alojamientos/alojamientoId/AlojamientoFotos";
import { Divider } from "@mantine/core";

// async function obtenerAlojamiento(id) {
//   try {
//     const response = await axios.get('http://localhost:3000/alojamientos/' + id);
//     return response.data;
//   } catch (error) {
//     throw new Error('Error al obtener alojamiento');
//   }
// }
function AlojamientoDetalle() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useRouter();

  const { alojamiento, loading, error } = useAlojamientoById(id);


  if (loading) return <Loader />;

  if (!alojamiento || error) {
    return <AlojamientoNoEncontrado />;
  }


  return (
    <div className="alojamiento-detalle">
      <div className="container">
        <Volver navigate={navigate} />
        <div className="detalle-content">
          <div className="imagen-detalle">
            <AlojamientoFotos alojamiento={alojamiento}/>
          </div>
             <Divider my="md" />
          <div className="detalle-main">
            <Servicios alojamiento={alojamiento} />
           <ReservaInfo alojamiento={alojamiento} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlojamientoDetalle;
