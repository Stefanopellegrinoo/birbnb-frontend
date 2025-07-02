import { Card, Image, Text, Group, Badge, Stack } from '@mantine/core';
import Link from 'next/link';

export function AlojamientoCard({ alojamiento }){
  const imageUrl = alojamiento.fotos?.[0]
    ? `http://localhost:3000/images/${alojamiento.fotos[0]}`
    : '/file.svg';
  return (
        <Link key={alojamiento.id} href={`/alojamientos/${alojamiento.id}`} className="alojamiento-card">
            <img
              src={
                alojamiento.fotos?.[0]
                  ? `http://localhost:3000/images/${alojamiento.fotos[0]}`
                  : "/file.svg"
              }
              alt={alojamiento.nombre}
            />
            <div className="card-content">
              <h3>{alojamiento.nombre}</h3>
              <p className="location">{alojamiento.ubicacion}</p>
              <p className="description">{alojamiento.descripcion}</p>
              <div className="card-footer">
                <span className="price">${alojamiento.precioPorNoche}/noche</span>
              </div>
            </div>
          </Link>
  );
}