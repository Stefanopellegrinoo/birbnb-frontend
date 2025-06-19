  export const formatearUbicacion = (direccion) => {
    return `${direccion.ciudad.nombre}, ${direccion.ciudad.pais.nombre}`
  }

 export  const formatearPrecio = (precio, moneda) => {
    const simbolo = moneda === "dolar" ? "$" : "$"
    return `${simbolo}${precio}`
  }

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

 