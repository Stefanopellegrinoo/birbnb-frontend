"use client"

import React, { useState } from 'react';
import '../styles/Filtros.css'; // Asegúrate de tener este archivo CSS
import { FiltrosCompactos } from './ui/FiltrosCompactos';
;

// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
// import { Checkbox } from './ui/checkbox';
// import { Slider } from './ui/slider';
// import { Badge } from './ui/badge';
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
// import { ChevronDown, Filter, X } from 'lucide-react';


export function Filtros({ filters, onChange, onSearch }) {

 const precioMaximoDefault = 100000;

  const amenities = [
    'wifi','mascotas_permitidas','estacionamiento','piscina',
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    onChange(newFilters);
  };

 const handleAmenityChange = (amenity, checked) => {
    onChange(prev => {
      const newAmenities = checked
        ? [...prev.caracEspeciales, amenity]
        : prev.caracEspeciales.filter(a => a !== amenity);
      const updated = { ...prev, caracEspeciales: newAmenities };
      return updated;
    });
  };



  const handlePriceInputChange = (type, value) => {
    const numValue = Number.parseInt(value) || 0
    if (type === "min") {
      onChange((prev) => ({ ...prev, precioMin: Math.min(numValue, prev.precioMax) }))
    } else {
      onChange((prev) => ({ ...prev, precioMax: Math.max(numValue, prev.precioMin) }))
    }
  }


  const clearFilters = () => {
    const cleared = { pais: '', ciudad: '', precioMin: 0, precioMax: precioMaximoDefault, huespedMax: 1, caracEspeciales: [] };
    onChange(cleared);
  };

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'string') return value !== '';
    if (typeof value === 'number') return value !== 0 && value !== precioMaximoDefault && value !== 1;
    return false;
  }).length;

//     const handleSearch = (e) => {
//         e.preventDefault();
//    if (activeFiltersCount === 0) {
//     console.log('No se han aplicado filtros');
//     search({});
//     return
//    }
//     console.log('Filtros aplicados:', filters);
//     search(filters);
//   }




  return (
    // <div className="filtros-card">
    //   <div className="filtros-header">
    //     <h2 className="filtros-title">
    //       Filtros de búsqueda
    //       {/* {activeFiltersCount > 0 && {activeFiltersCount}} */}
    //     </h2>
    //   </div>

    //         {/* <Accordion1/> */}
    //       <div className="filtros-content">
    //         <div className="filtros-row">
    //           <div className="filtros-group">
    //             <label htmlFor="pais">País</label>
    //             <input type='text' id="pais" value={filters.pais} onChange={e => handleFilterChange('pais', e.target.value)} />
    //           </div>
    //           <div className="filtros-group">
    //             <label htmlFor="ciudad">Ciudad</label>
    //             <input type='text' id="ciudad" value={filters.ciudad} onChange={e => handleFilterChange('ciudad', e.target.value)} />
    //           </div>
    //         </div>
    //           <div className="filtros-row">
    //           <div className="filtros-group">
    //             <label htmlFor="precioMin">Precio mínimo (€)</label>
    //             <input
    //               id="precioMin"
    //               type="number"
    //               min="0"
    //               max={precioMaximoDefault}
    //               value={filters.precioMin}
    //               onChange={e => handlePriceInputChange('min', e.target.value)}
    //             />
    //           </div>
    //           <div className="filtros-group">
    //             <label htmlFor="precioMax">Precio máximo (€)</label>
    //             <input
    //               id="precioMax"
    //               type="number"
    //               min="0"
    //               max={precioMaximoDefault}
    //               value={filters.precioMax}
    //               onChange={e => handlePriceInputChange('max', e.target.value)}
    //             />
    //           </div>
    //         </div>
    //         <div className="filtros-group">
    //           <label>Huéspedes</label>
    //           <div className="filtros-guest-controls">
    //             <button onClick={() => handleFilterChange('huespedMax', Math.max(1, filters.huespedMax - 1))}>-</button>
    //             <span>{filters.huespedMax}</span>
    //             <button onClick={() => handleFilterChange('huespedMax', filters.huespedMax + 1)}>+</button>
    //           </div>
    //         </div>
    //         <div className="filtros-group">
    //           <label>Comodidades</label>
    //           <div className="filtros-amenities">
    //               {amenities.map(amenity => (
    //               <label key={amenity} className="filtros-amenity">
    //                 <input type='checkbox'
    //                   checked={filters.caracEspeciales.includes(amenity)}
    //                   onChange={e => handleAmenityChange(amenity,  e.target.checked)}
    //                 />
    //                 {amenity}
    //               </label>
    //             ))}
    //           </div>
    //         </div>
    //             <div className="flex gap-2 pt-4 border-t">
    //           <button onClick={onSearch} className="flex-1">
    //             Buscar Alojamientos
    //           </button>
    //           {activeFiltersCount > 0 && (
    //             <button variant="outline" onClick={clearFilters}>
    //               Limpiar
    //             </button>
    //           )}
    //         </div>
    //       </div>
    // </div>
    <div>
      <FiltrosCompactos
  filters={filters}
  setFilters={onChange}
  onSearch={onSearch}
  // clearFilters={resetFiltros}
  amenities={['WiFi', 'Cocina', 'Piscina']}
/>
    </div>
  )
}
export default Filtros