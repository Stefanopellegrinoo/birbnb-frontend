"use client";

import { useAuth } from "../../../context/AuthContext";
import "../../../styles/AlojamientoDetalle.css";
import { useParams, useRouter } from "next/navigation";
import useAlojamientoById from "@/hooks/alojamiento/useAlojamientoById";
import Loader from "@/components/ui/Loader";
import Servicios from "@/components/alojamientos/alojamientoId/Servicios";
import ReservaInfo from "@/components/alojamientos/alojamientoId/ReservaInfo";
import AlojamientoNoEncontrado from "@/components/alojamientos/alojamientoId/AlojamientoNoEncontrado";
import AlojamientoFotos from "@/components/alojamientos/alojamientoId/AlojamientoFotos";
import { Divider } from "@mantine/core";


function AlojamientoDetalle() {
  const { id } = useParams();
  const { user } = useAuth();

  const { alojamiento, loading, error } = useAlojamientoById(id);


  if (loading) return <Loader />;

  if (!alojamiento || error) {
    return <AlojamientoNoEncontrado />;
  }


  return (
    <div className="alojamiento-detalle">
      <div className="container">
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
