"use client";
import { Center, Stack, Loader, Text } from "@mantine/core";
import "../../styles/Loader.css";
import React from "react";

// const Loader = () => {
//   return (
//     <div className="loading-container">
//       <div className="lc">
//         <div className="spinner"></div>
//         <p>Cargando...</p>
//       </div>
//     </div>
//   );
// };

const LoaderUI = () => {
  return (
    <Center h={200}>
      <Stack align="center" spacing="xs">
        <Loader color="blue" size="lg" />
        <Text size="sm" c="dimmed">
          Cargando...
        </Text>
      </Stack>
    </Center>
  );
};

export default LoaderUI;
