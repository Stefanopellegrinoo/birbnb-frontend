import { Checkbox, Stack, Text } from '@mantine/core';

export function FiltroComodidades({ amenities, selected, onChange }) {
  return (
    <div>
      <Stack spacing={2}> <div className="ammenities-list">
        {amenities.map((amenity) => (
         
             <Checkbox
            key={amenity}
            label={amenity}
            checked={selected?.includes(amenity)}
            onChange={(e) => onChange(amenity, e.currentTarget.checked)}
          />
        
         
        ))} 
         </div>
      </Stack>
    </div>
  );
}
