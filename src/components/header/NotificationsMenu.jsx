
import { Menu, ActionIcon, Divider } from "@mantine/core";
import { IconBell, IconBellFilled } from "@tabler/icons-react";
import NotificacionesTabs from "../ui/NotificacionesTabs";
import { useNotifications } from "@/context/NotificationsContext";

export default function NotificationsMenu() {
    const { 
        notificaciones, 
        tieneNotificacionesNuevas, 
        setTieneNotificacionesNuevas, 
        markAsRead 
    } = useNotifications();

    // Calculamos las listas directamente.
    const sinLeer = notificaciones.filter((n) => !n.leida);
    const leidas = notificaciones.filter((n) => n.leida);
    
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
                    onMarkRead={(notificacion) => markAsRead(notificacion._id)}
                />
            </Menu.Dropdown>
        </Menu>
    );
}
