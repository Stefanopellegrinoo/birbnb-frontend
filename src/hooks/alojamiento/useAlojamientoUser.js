import { useState, useEffect } from "react";
import api from "@/lib/api";

export default function useAlojamientoUser() {
  const [alojamientos, setAlojamientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        const res = await api.get("/misAlojamientos");
        setAlojamientos(res.data.alojamientos);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);


  return { alojamientos, loading, error };
}
