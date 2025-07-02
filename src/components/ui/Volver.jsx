import React from "react";

const Volver = ({navigate}) => {
  return (
    <button onClick={() => navigate.back(-1)} className="back-button">
      ← Volver
    </button>
  );
};

export default Volver;
