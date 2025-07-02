import { Image } from '@mantine/core'
import React from 'react'

const Img = ({src, alt}) => {
  return (
     <Image
      radius="md"
      h={500}
      w="auto"
      fit="contain"
      src={src}
      fallbackSrc="https://placehold.co/600x400?text=Placeholder"
      alt={alt}
    />
  )
}

export default Img