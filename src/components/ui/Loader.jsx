"use client";
import "../../styles/Loader.css";
import React from "react";

const Loader = () => {
  return (
    <div className="loading-container">
      <div className="lc">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    </div>
  );
};

export default Loader;
