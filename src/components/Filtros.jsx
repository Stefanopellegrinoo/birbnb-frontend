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
    onSearch();
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
 
    <div>
      <FiltrosCompactos
  filters={filters}
  setFilters={onChange}
  onSearch={onSearch}
  // clearFilters={resetFiltros}
  amenities={['wifi', 'estacionamiento', 'piscina', "mascotas_permitidas"]}
/>
    </div>
  )
}
export default Filtros
