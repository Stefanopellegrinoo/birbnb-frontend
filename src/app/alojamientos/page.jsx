'use client'
import useAlojamientos from "@/hooks/alojamiento/useAlojamientos";
import Link from "next/link";
import { useState } from "react";
import "@/styles/Alojamientos.css"; // Asegúrate de tener este archivo CSS
import { renderPagination } from "@/lib/utils";
import Loader from "@/components/ui/Loader";
import Filtros from "@/components/Filtros";

function Alojamientos() {
const [currentPage, setCurrentPage] = useState(1);
const [limit, setLimit] = useState(10);
  const [uiFilters, setUiFilters] = useState({
    pais: "",
    ciudad: "",
    precioMin: 0,
    precioMax: 100000,
    huespedMax: 1,
    caracEspeciales: [],
  });
  const [apiFilters, setApiFilters] = useState({});

const { alojamientos, loading, error, totalPages, alojamientosTotales } = useAlojamientos({
  page: currentPage,
  limit: 10,
  filtros: apiFilters,
});

const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }


  const clean = (f) => {
    const defaults = {  precioMin:0, precioMax: 100000, huespedMax: 1 };
    return Object.entries(f).reduce((acc, [k, v]) => {
      if (typeof v === "string" && !v) return acc;
      if (Array.isArray(v) && v.length === 0) return acc;
      if (
        typeof v === "number" &&
        defaults[k] !== undefined &&
        defaults[k] === v
      )
        return acc;
      acc[k] = v;
      console.log(k, v)
      return acc;
    }, {});
  };

  // Este handler se pasa a Filtros y sólo corre cuando hago clic en “Buscar”
  const handleSearch = () => {
    console.log(apiFilters)
    setApiFilters(clean(uiFilters));
  };

  if (loading){
     return(
        <Loader/>
     ) 
  }
  if (error) return <p>Error al cargar alojamientos</p>;

  return (
    <div className="alojamientos">
      <div className="alojamientos-container">
        <h1>Todos los Alojamientos</h1>
             <Filtros
        filters={uiFilters}
        onChange={setUiFilters}
        onSearch={handleSearch}
      />
        <p className="results-info">
          Mostrando {alojamientos?.length} de {alojamientosTotales} alojamientos
        </p>

        <div className="alojamientos-grid">
          {alojamientos?.map((alojamiento) => (
            <Link key={alojamiento.id} href={`/alojamientos/${alojamiento.id}`} className="alojamiento-card">
              <img
                src={
                  alojamiento.fotos?.[0]
                    ? `http://localhost:3000/images/${alojamiento.fotos[0]}`
                    : "/file.svg"
                }
                alt={alojamiento.nombre}
              />
              <div className="card-content">
                <h3>{alojamiento.nombre}</h3>
                <p className="location">{alojamiento.ubicacion}</p>
                <p className="description">{alojamiento.descripcion}</p>
                <div className="card-footer">
                  <span className="price">${alojamiento.precioPorNoche}/noche</span>
                  <span className="rating">⭐ {alojamiento.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              Anterior
            </button>

            {renderPagination(currentPage, limit, totalPages)}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Alojamientos;
