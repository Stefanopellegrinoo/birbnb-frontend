import { useState, useEffect } from "react";
import axios from "@/lib/api";
import { mockAlojamientos } from "@/data/mockData";

export default function useAlojamientoById(id) {
  const [alojamiento, setAlojamiento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/alojamientos/${id}`);
        setAlojamiento(res.data);
        // setAlojamiento(mockAlojamientos.find(a => a.id === parseInt(id))); // Usar mock data para pruebas
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  return { alojamiento, loading, error };
}
