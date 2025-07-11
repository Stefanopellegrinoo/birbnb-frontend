import { useEffect, useState } from 'react';
import {  Card,
  Title,
  Stack,
  Group,
  TextInput,
  Textarea,
  NumberInput,
  Select,
  MultiSelect,
  Button,
  Divider,
  SimpleGrid,
  ActionIcon,
  FileButton,
  Center,
  Text,
  Image as MantineImage
  ,Popover  } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';


const MultipleFiles = ({initialPhotos, onChange}) => {
   const [photos, setPhotos] = useState(initialPhotos);
  const [urlInput, setUrlInput] = useState('');


  useEffect(() => {
    // if(initialPhotos?.length == 0) return
    
   setPhotos(Array.isArray(initialPhotos) ? initialPhotos : []);
  }, [initialPhotos]);


  useEffect(() => {
    onChange(photos);
  }, [photos, onChange]);

  const removePhoto = (i) => {
    setPhotos((prev) => prev.filter((_, f) => f !== i));
  };


  const addUrl = () => {
    const url = urlInput.trim();
    if (!url) return;
    setPhotos((prev) => [...prev, url]);
    setUrlInput('');
  };
  return (
    <>
    <Stack>
      <SimpleGrid cols={3} spacing="sm" mb="md">
        {photos?.map((item, i) => {
          return (
            <div key={item + i} style={{ position: 'relative' }}>
              <MantineImage
                src={item}
                alt={`Foto ${i + 1}`}
                height={100}
                fit="cover"
              />
              <ActionIcon
                color="red"
                size="sm"
                variant="filled"
                onClick={() => removePhoto(i)}
                sx={{ position: 'absolute', top: 5, right: 5 }}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </div>
          );
        })}
      </SimpleGrid>

          <Group >
              <TextInput
                placeholder="URL de la imagen"
                value={urlInput}
                onChange={(e) => setUrlInput(e.currentTarget.value)}
                 size="lg"
                 radius="lg"
                />
              <Button    variant="outline" onClick={addUrl}>Agregar</Button>
             
            </Group>
    </Stack>
    </>
  );
}

export default MultipleFiles