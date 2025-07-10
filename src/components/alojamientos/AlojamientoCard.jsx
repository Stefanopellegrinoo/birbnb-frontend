import { Card, Image, Text, Group, Badge, Stack } from '@mantine/core';
import Link from 'next/link';

export function AlojamientoCard({ alojamiento, edit }){

      const href = edit
    ? `/alojamientos/misAlojamientos/${alojamiento.id}`
    : `/alojamientos/${alojamiento.id}
    `
    const targetAttr = edit ? undefined : '_blank';
  return (
        <Link key={alojamiento.id} href={href} passHref target={targetAttr} className="alojamiento-card">
            <img
              src={
                alojamiento.fotos?.[0]
                  ? alojamiento.fotos[0]
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