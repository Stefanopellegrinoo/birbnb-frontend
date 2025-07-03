// src/hooks/alojamiento/useAlojamientos.js
import { useState, useEffect } from "react";
import axios from "@/lib/api";

export default function useAlojamientos({ page = 1, limit = null, filtros = {} } = {}) {
  const [alojamientos, setAlojamientos] = useState([]);
  const [alojamientosTotales, setAlojamientosTotales] = useState(0);

  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);

        const params = { ...filtros };
        if (limit !== null) params.limit = limit;
        if (page !== null) params.page = page;

        const res = await axios.get("/alojamientos", { params });

        setAlojamientos(res.data.alojamientos);
        setTotalPages(res.data.totalPages || 0);
        setAlojamientosTotales(res.data.total || 0);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [page, limit, JSON.stringify(filtros)]);

  return { alojamientos, loading, error, totalPages, alojamientosTotales };
}
