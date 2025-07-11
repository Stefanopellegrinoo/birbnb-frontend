'use client'
import useAlojamientos from "@/hooks/alojamiento/useAlojamientos";
import Link from "next/link";
import { useState } from "react";
import "@/styles/Alojamientos.css"; // Asegúrate de tener este archivo CSS
import { renderPagination } from "@/lib/utils";
import Loader from "@/components/ui/Loader";
import Filtros from "@/components/Filtros";
import { AlojamientoCard } from "@/components/alojamientos/AlojamientoCard";
import { Pagination } from "@mantine/core";
import CardSkeleton from "@/components/ui/CardSkeleton";

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


  return (
    <div className="alojamientos">
      <div className="alojamientos-container">
  
             <Filtros
        filters={uiFilters}
        onChange={setUiFilters}
        onSearch={handleSearch}
      />


    {error ? (
       <p>Error al cargar alojamientos</p>
      
    ) :( 
      <> 
        <p className="results-info">
          Mostrando {alojamientos?.length} de {alojamientosTotales} alojamientos
        </p>

        <div className="alojamientos-grid">
         {loading ? (
             <CardSkeleton n={6}/>
           ) : (
             alojamientos?.map((alojamiento) => (
               <AlojamientoCard alojamiento={alojamiento} key={alojamiento.id} />
             ))
           )}
        </div>
        </>
)}
        {totalPages > 1 && (
          <div className="pagination">
            <Pagination
              total={totalPages}
              value={currentPage}
              onChange={handlePageChange}
              siblings={1}
              boundaries={1}
              mt="xl"
              radius="md"
              color="blue"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Alojamientos;
