import { useEffect, useState } from 'react';
import { FileButton, Button, Group, Text } from '@mantine/core';

const MultipleFiles = ({onChange}) => {
 const [files, setFiles] = useState([]);

    useEffect(()=>{
        onChange(files)
    }, [files])


  return (
    <>
      <Group justify="center">
        <FileButton onChange={setFiles} accept="image/png,image/jpeg" multiple>
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
      </Group>

      {files.length > 0 && (
        <Text size="sm" mt="sm">
          Picked files:
        </Text>
      )}

      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </>
  );
}

export default MultipleFiles