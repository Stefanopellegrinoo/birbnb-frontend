'use client'
import Link from "next/link";
import useAlojamientos from "@/hooks/alojamiento/useAlojamientos";
import { formatearUbicacion, formatearPrecio } from "@/lib/utils";
import "@/styles/Home.css"; 

function Home() {
 const { alojamientos, loading } = useAlojamientos({ limit: 6 });


  if (loading) return <p>Cargando alojamientos...</p>;

  return (
    <div className="home">
      <div className="home-container">
        <section className="hero">
          <h1>Encuentra tu alojamiento perfecto</h1>
          <p>Descubre los mejores lugares para hospedarte en tu próximo viaje</p>
        </section>

        <section className="featured-alojamientos">
          <h2>Alojamientos Destacados</h2>
          <div className="alojamientos-grid">
            {alojamientos?.map((alojamiento) => (
              <Link key={alojamiento.id} href={`/alojamientos/${alojamiento.id}`} className="alojamiento-card">
                <img
                  src={
                    alojamiento.fotos?.length
                      ? `http://localhost:3000/images/${alojamiento.fotos[0]}`
                      : "/file.svg?height=200&width=300"
                  }
                  alt={alojamiento.nombre}
                />
                <div className="card-content">
                  <h3>{alojamiento.nombre}</h3>
                  <p className="location">{formatearUbicacion(alojamiento.direccion)}</p>
                  <p className="price">{formatearPrecio(alojamiento.precioPorNoche, alojamiento.moneda)}/noche</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="view-all">
            <Link href="/alojamientos" className="view-all-button">
              Ver todos los alojamientos
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
