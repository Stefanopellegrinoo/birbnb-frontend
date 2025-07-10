"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import "@/styles/PerfilUsuario.css";

const PerfilUsuario = () => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading]);

  if (loading || !user) {
    return <div className="perfil-cargando">Cargando perfil...</div>;
  }

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <h1 className="perfil-titulo">Mi Perfil</h1>

        <div className="perfil-info">
          <p><strong>Nombre:</strong> {user.nombre || "No disponible"}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Tipo de cuenta:</strong> {user.tipo || "Invitado"}</p>
        </div>

        <div className="perfil-acciones">
          <button className="btn-editar" onClick={() => alert("Funcionalidad aún no implementada")}>
            Editar Perfil
          </button>

          <button className="btn-logout" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;
