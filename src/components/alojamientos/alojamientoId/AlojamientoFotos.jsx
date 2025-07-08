import Img from '@/components/ui/Img'
import React from 'react'
import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';

const AlojamientoFotos = ({alojamiento}) => {
    const img =  alojamiento.fotos && alojamiento.fotos.length > 0
                  ? `/placeholder.svg?height=400&width=600&text=${alojamiento.fotos[0]}`
                  : "/file.svg?height=400&width=600"

        console.log(alojamiento)
  return (
<Carousel
  slideSize="70%"
  height={500}
  slideGap="md"
  controlsOffset="sm"
  controlSize={26}
  withControls
  withIndicators
>
  {(alojamiento.fotos?.length > 0
    ? alojamiento.fotos
    : ["/file.svg?height=400&width=600", "/file.svg?height=400&width=600", "/file.svg?height=400&width=600", "/file.svg?height=400&width=600"] // imagen por defecto
  ).map((a, i) => (
    <Carousel.Slide key={i}>
      <Img
        src={a}
        alt={`Foto ${i + 1}`}
      />
    </Carousel.Slide>
  ))}
</Carousel>

  )
}

export default AlojamientoFotos