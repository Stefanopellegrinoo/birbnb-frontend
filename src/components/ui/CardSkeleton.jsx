import { Card, Skeleton, Group, Stack, Text } from '@mantine/core';

// function CardSkeleton() {
//   return (
//     <Card shadow="sm" padding="md" withBorder style={{ width: 300 }}>
//       {/* Imagen */}
//       <Skeleton height={180} radius="md" mb="sm" />

//       {/* Contenido: título + ubicación */}
//       <Stack spacing="xs">
//         <Skeleton height={20} radius="sm" width="80%" />
//         <Skeleton height={14} radius="sm" width="60%" />

//         {/* Grupo precio + rating */}
//         <Group position="apart" align="center" mt="sm">
//           <Skeleton height={18} radius="sm" width="40%" />
//           <Skeleton height={18} radius="xl" width={50} />
//         </Group>
//       </Stack>
//     </Card>
//   );
// }

// Uso en un grid de loading
export default function CardSkeleton({n}) {
  return (
    <> 
      {Array.from({ length: n }).map((_, i) => (
        <div className="alojamiento-card" key={i} style={{ width: 400 }} >
          {/* Imagen */}
          <Skeleton
            height={200}
            radius={0}
            mb="sm"
          />

          <div className="card-content">
            {/* Título */}
            <Skeleton height={24} width="60%" radius="sm" mb="xs" />

            {/* Ubicación */}
            <Skeleton height={16} width="40%" radius="sm" mb="sm" />

            {/* Descripción (2 líneas) */}
            <Skeleton height={14} radius="xs" mb={4} />
            <Skeleton height={14} radius="xs" width="80%" mb="md" />

            {/* Footer: precio */}
            <Skeleton height={18} width="30%" radius="sm" />
          </div>
        </div>
      ))}
      </>
  );
}