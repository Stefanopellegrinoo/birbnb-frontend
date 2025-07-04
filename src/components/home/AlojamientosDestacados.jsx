import useAlojamientos from "@/hooks/alojamiento/useAlojamientos";
import React from "react";
import Link from "next/link";
import { formatearUbicacion, formatearPrecio } from "@/lib/utils";
import Loader from "../ui/Loader";
import CardSkeleton from "../ui/CardSkeleton";
import { AlojamientoCard } from "../alojamientos/AlojamientoCard";

const AlojamientosDestacados = () => {
  const { alojamientos, loading } = useAlojamientos({ limit: 6 });

  return (
    <section className="featured-alojamientos">
      <h2>Alojamientos Destacados</h2>
      <div className="alojamientos-grid">
        {loading ? (
          <CardSkeleton n={3}/>
        ) : (
          alojamientos?.map((alojamiento) => (
            <AlojamientoCard alojamiento={alojamiento} />
          ))
        )}
      </div>

      <div className="view-all">
        <Link href="/alojamientos" className="view-all-button">
          Ver todos los alojamientos
        </Link>
      </div>
    </section>
  );
};

export default AlojamientosDestacados;
