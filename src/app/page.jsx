'use client'
import Link from "next/link";
import useAlojamientos from "@/hooks/alojamiento/useAlojamientos";
import "@/styles/Home.css"; 
import { Presentacion } from "@/components/home/Presentacion";
import AlojamientosDestacados from "@/components/home/AlojamientosDestacados";

function Home() {
 const { alojamientos, loading } = useAlojamientos({ limit: 6 });


  if (loading) return <p>Cargando alojamientos...</p>;

  return (
    <div className="home">
      <div className="home-container">
       <Presentacion/>
      <AlojamientosDestacados/>
      </div>
    </div>
  );
}

export default Home;
