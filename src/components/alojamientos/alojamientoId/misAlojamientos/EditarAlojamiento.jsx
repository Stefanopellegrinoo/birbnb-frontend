import React from "react";
import {
  Card,
  Stack,
  Group,
  TextInput,
  MultiSelect,
  Button,
  Divider,
  Center,
} from "@mantine/core";
import MultipleFiles from "@/components/ui/MultipleFiles";
import CamposBasicos from "../camposAlojamiento/CamposBasicos";
import LoaderUI from "@/components/ui/Loader";

const EditarAlojamiento = ({form, fotos, onChangeFotos, submit, loading }) => {

     if(loading){
        return <LoaderUI/>
    }

  return (
    <div>
      <Divider/>
         <Center py="xl">
      <Card shadow="sm" padding="lg" style={{ width: '100%', maxWidth: 940 }}>
        <form onSubmit={form.onSubmit(submit)}>
          <Stack spacing="lg">
            {/* Datos básicos */}
            <Divider label="Datos básicos" />
          
            <CamposBasicos form={form}/>
          
            {/* Dirección */}
            <Divider label="Dirección" />
            <Group grow>
              <TextInput label="Calle" {...form.getInputProps('calle')} />
              <TextInput label="Altura" {...form.getInputProps('altura')} />
            </Group>
            <Group grow>
              <TextInput label="Ciudad" {...form.getInputProps('ciudad')} />
              <TextInput label="País" {...form.getInputProps('pais')} />
            </Group>

            {/* Fotos */}
            <Divider label="Fotos" />
            <Group  sx={{ width: '100%', maxWidth: 640 }}>
             <MultipleFiles initialPhotos={fotos} onChange={onChangeFotos} />
             
            </Group>

            {/* Extras */}
            <Divider label="Extras" />
             <Group grow>

             
           <MultiSelect
              label="Características"
              data={[
                'wifi',
                'estacionamiento',
                'mascotas_permitidas',
                'piscina',
              ]}
              value={form.values.caracteristicas}
              onChange={(val) => form.setFieldValue('caracteristicas', val)}
              clearable
            />
            </Group>
            <Button disabled={!form.isTouched()} type="submit" fullWidth mt="md">
              Guardar cambios
            </Button>
          </Stack>
        </form>
      </Card>
    </Center>
    </div>
  )
}

export default EditarAlojamiento