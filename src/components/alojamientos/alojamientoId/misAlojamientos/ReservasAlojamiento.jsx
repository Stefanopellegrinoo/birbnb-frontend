import React, { useState } from "react";
import {
    SegmentedControl,
    ScrollArea,
    Table,
    Text,
    Badge,
    Button,
    Stack,
    Group,
    Loader,
} from "@mantine/core";
import { calcularPrecioTotal, formatearFecha } from "@/lib/utils";
import LoaderUI from "@/components/ui/Loader";

const statusOptions = [
    { label: "Pendientes", value: "pendiente" },
    { label: "Confirmadas", value: "confirmada" },
    { label: "Canceladas", value: "cancelada" },
    { label: "Todas", value: "todas" },
];

const statusColor = {
    aceptada: "green",
    cancelada: "red",
    pendiente: "yellow",
};

const ReservasDashboard = ({ reservas, onAccept, onCancel, loading }) => {
    const [filter, setFilter] = useState("pendiente");
    const filtered = reservas.filter(
        (r) => filter === "todas" || r.estadoReserva === filter
    );

    const rows = filtered.map((reserva) => {
        const {
            id,
            estadoReserva,
            cantHuespedes,
            fechaAlta,
            rangoFechas,
            precioPorNoche,
            huespedReservador,
        } = reserva;

        return (
            <Table.Tr key={id}>
                <Table.Td>
                    <Badge color={statusColor[estadoReserva]} variant="light">
                        {estadoReserva.charAt(0).toUpperCase() +
                            estadoReserva.slice(1)}
                    </Badge>
                </Table.Td>
                <Table.Td>
                    <Text component="a" variant="link">
                        {huespedReservador.nombre}
                    </Text>
                    <Text size="xs" color="dimmed">
                        {`${cantHuespedes} huesped/es`}
                    </Text>
                </Table.Td>
                <Table.Td>{formatearFecha(rangoFechas?.fechaInicio)}</Table.Td>
                <Table.Td>{formatearFecha(rangoFechas?.fechaFin)}</Table.Td>
                <Table.Td>{formatearFecha(fechaAlta)}</Table.Td>
                <Table.Td>
                    $
                    {calcularPrecioTotal(
                        rangoFechas?.fechaInicio,
                        rangoFechas?.fechaFin,
                        precioPorNoche
                    )}
                </Table.Td>
                {estadoReserva === "pendiente" ? (
                    <Table.Td>
                        <Group spacing="xs">
                            <Button
                                compact
                                size="xs"
                                color="green"
                                onClick={() => onAccept(id)}
                            >
                                Aceptar
                            </Button>
                            <Button
                                compact
                                size="xs"
                                color="red"
                                variant="outline"
                                onClick={() => onCancel(id)}
                            >
                                Cancelar
                            </Button>
                        </Group>
                    </Table.Td>
                ) : (
                    <Table.Td>
                        <Text size="xs" color="dimmed">
                            {estadoReserva === "confirmada"
                                ? "Confirmada"
                                : "Cancelada"}
                        </Text>
                    </Table.Td>
                )}
            </Table.Tr>
        );
    });

    if(loading){
        return <LoaderUI/>
    }

    return (
        <Stack spacing="lg">
            <SegmentedControl
                fullWidth
                data={statusOptions}
                value={filter}
                onChange={setFilter}
            />
            <ScrollArea>
                <Table.ScrollContainer minWidth={200}>
                    <Table
                        horizontalSpacing="lg"
                        verticalSpacing="sm"
                        highlightOnHover
                    >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Estado</Table.Th>
                                <Table.Th>Huespedes</Table.Th>
                                <Table.Th>Check-in</Table.Th>
                                <Table.Th>Check-out</Table.Th>
                                <Table.Th>Reservada</Table.Th>
                                <Table.Th>Total</Table.Th>
                                <Table.Th>Acciones</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {filtered.length === 0 ? (
                                <Table.Tr>
                                    <Table.Td
                                        colSpan={7}
                                        style={{ textAlign: "center" }}
                                    >
                                        <Text color="dimmed">
                                    {filter === 'todas' ?
                                      `No tienes reservas para este alojamiento` :
                                      `No hay reservas ${filter} para mostrar`}
                                        </Text>
                                    </Table.Td>
                                </Table.Tr>
                            ) : (
                                <>{rows} </>
                            )}
                        </Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </ScrollArea>
        </Stack>
    );
};

export default ReservasDashboard;
