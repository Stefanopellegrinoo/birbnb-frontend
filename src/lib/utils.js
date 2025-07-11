  export const formatearUbicacion = (direccion) => {
    return `${direccion.ciudad.nombre}, ${direccion.ciudad.pais.nombre}`
  }

 export  const formatearPrecio = (precio, moneda) => {
    const simbolo = moneda === "dolar" ? "$" : "$"
    return `${simbolo}${precio}`
  }

  export const  formatearCaracteristicas = (caracteristicas) => {
    const caracteristicasMap = {
      wifi: "WiFi gratuito",
      piscina: "Piscina",
      aire_acondicionado: "Aire acondicionado",
    };

    return caracteristicas.map((car) => caracteristicasMap[car] || car);
  };

  export const renderPagination = (currentPage, limit, totalPages ) => {
    const pages = []

    let startPage = Math.max(1, currentPage - Math.floor(limit / 2))
    const endPage = Math.min(totalPages, startPage + limit - 1)

    if (endPage - startPage + 1 < limit) {
      startPage = Math.max(1, endPage - limit + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`pagination-button ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>,
      )
    }

    return pages
  }

 export const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString("es-ES", {
            timeZone: "UTC",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

export const calcularPrecioTotal = (fechaInicio, fechaFin, precioPorNoche) => {
        if (!fechaInicio || !fechaFin) return 0;

        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        const dias = Math.ceil((fin - inicio) / (1000 * 60 * 60 * 24));

        return dias * precioPorNoche;
    };