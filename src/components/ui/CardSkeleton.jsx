import { Card, Skeleton, Group, Stack, Text } from '@mantine/core';


export default function CardSkeleton({n}) {
  return (
    <> 
      {Array.from({ length: n }).map((_, i) => (
        <div className="alojamiento-card" key={i} style={{ width: 400 }} >
          <Skeleton
            height={200}
            radius={0}
            mb="sm"
          />

          <div className="card-content">
         
            <Skeleton height={24} width="60%" radius="sm" mb="xs" />

           
            <Skeleton height={16} width="40%" radius="sm" mb="sm" />

          
            <Skeleton height={14} radius="xs" mb={4} />
            <Skeleton height={14} radius="xs" width="80%" mb="md" />

            <Skeleton height={18} width="30%" radius="sm" />
          </div>
        </div>
      ))}
      </>
  );
}