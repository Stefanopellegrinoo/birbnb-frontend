import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Menu, ActionIcon, Divider } from "@mantine/core";
import { IconBell, IconBellFilled } from "@tabler/icons-react";
import NotificacionesTabs from "../ui/NotificacionesTabs";

export default function NotificationsMenu({
    notificaciones,
    tieneNotificacionesNuevas,
    setTieneNotificacionesNuevas,
}) {
    const [sinLeer, setSinLeer] = useState([]);
    const [leidas, setLeidas] = useState([]);

    useEffect(() => {
        setSinLeer(notificaciones.filter((n) => !n.leida));
        setLeidas(notificaciones.filter((n) => n.leida));
    }, [notificaciones]);

    const onMarkRead = async (notificacion) => {
        try {
            await api.patch(`/notificaciones/${notificacion._id}/marcar-leida`);

            setSinLeer((prev) =>
                prev.filter((n) => n._id !== notificacion._id)
            );
            setLeidas((prev) => [...prev, { ...notificacion, leida: true }]);
        } catch (error) {
            console.error("Error al marcar como leída:", error);
        }
    };

    return (
        <Menu
            withArrow
            offset={10}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
        >
            <Menu.Target>
                <ActionIcon
                    variant="subtle"
                    size="lg"
                    aria-label="Ver notificaciones"
                    onClick={() => setTieneNotificacionesNuevas(false)}
                >
                    {tieneNotificacionesNuevas ? (
                        <IconBellFilled size={22} color="#228be6" />
                    ) : (
                        <IconBell size={22} color="#228be6" />
                    )}
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Notificaciones</Menu.Label>
                <Divider />
                <NotificacionesTabs
                    sinLeer={sinLeer}
                    leidas={leidas}
                    onMarkRead={onMarkRead}
                />
            </Menu.Dropdown>
        </Menu>
    );
}
