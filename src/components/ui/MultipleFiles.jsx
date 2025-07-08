import { useEffect, useState } from 'react';
import { FileButton, Button, Group, ActionIcon, SimpleGrid, Image as MantineImage,   } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
const MultipleFiles = ({initialPhotos = [], onChange}) => {
     const [photos, setPhotos] = useState(initialPhotos);

  useEffect(() => {
    onChange(photos);
  }, [photos, onChange]);

  const removePhoto = (idx) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const addFiles = (fileList) => {
    if (!fileList) return;
    const arr = Array.from(fileList);
    setPhotos((prev) => [...prev, ...arr]);
  };

  return (
    <>
      <SimpleGrid cols={3} spacing="sm">
        {photos.map((item, idx) => {
          const src =
            typeof item === 'string'
              ? `http://localhost:3000/images/${item}`
              : URL.createObjectURL(item);
          return (
            <div key={idx} style={{ position: 'relative' }}>
              <MantineImage
                src={src}
                alt={`Foto ${idx + 1}`}
                
                maw={200}
                mah={100}
                fit="cover"
                withPlaceholder
              />
              <ActionIcon
                color="red"
                size="sm"
                variant="filled"
                onClick={() => removePhoto(idx)}
                sx={{ position: 'absolute', top: 5, right: 5 }}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </div>
          );
        })}
      </SimpleGrid>

      <FileButton multiple accept="image/*" onChange={addFiles}>
        {(props) => (
          <Button mt="sm" {...props} fullWidth>
            Agregar fotos
          </Button>
        )}
      </FileButton>
    </>
  );
}

export default MultipleFiles