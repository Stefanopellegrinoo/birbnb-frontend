"use client";

import { Box, Burger, Group, Title } from "@mantine/core";
import { useEffect, useState, useRef } from "react";
import { useDisclosure } from "@mantine/hooks";
import classes from "../header/HeaderMegaMenu.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import axios from "@/lib/api";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";
import NotificationsMenu from "./NotificationsMenu";
import MainNav from "./MainNav";
import UserMenu from "./UserMenu";
import DrawerHeader from "./DrawerHeader";

export default function Header() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
        useDisclosure(false);
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [notificaciones, setNotificaciones] = useState([]);
    const [tieneNotificacionesNuevas, setTieneNotificacionesNuevas] =
        useState(false);
    const router = useRouter();
    const socketRef = useRef(null);

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    useEffect(() => {
        if (!user) {
            setNotificaciones([]);
            setTieneNotificacionesNuevas(false);

            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }

            return;
        }
        const endpointNotificacionesNoLeidas = `/usuarios/${user.id}/notificaciones/`;
        axios
            .get(endpointNotificacionesNoLeidas)
            .then((res) => {
                setNotificaciones(res.data);
                setTieneNotificacionesNuevas(res.data.length > 0);
            })
            .catch(() => {
                setNotificaciones([]);
                setTieneNotificacionesNuevas(false);
            });
        const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL, {
            transports: ["websocket", "polling"],
            path: "/socket.io",
        });
        socketRef.current = socket;

        socket.emit("join", user.id);

        socket.on("nueva_notificacion", (nuevaNotificacion) => {
            const { notificacion } = nuevaNotificacion;
            console.log("Nueva notificación recibida:", notificacion);
            setNotificaciones((prev) => [notificacion, ...prev]);
            setTieneNotificacionesNuevas(true);
        });

        socket.on("cancelar_notificacion", (nuevaNotificacion) => {
            const { notificacion } = nuevaNotificacion;
            console.log("Nueva notificación recibida:", notificacion);
            setNotificaciones((prev) => [notificacion, ...prev]);
            setTieneNotificacionesNuevas(true);
        });

        socket.on("confirmar_notificacion", (nuevaNotificacion) => {
            const { notificacion } = nuevaNotificacion;
            console.log("Nueva notificación recibida:", notificacion);
            setNotificaciones((prev) => [notificacion, ...prev]);
            setTieneNotificacionesNuevas(true);
        });

        // Cleanup al desmontar o cambiar usuario
        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    }, [user]);

    return (
        <Box>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <Group h="100%" gap={0} visibleFrom="sm">
                        <Link href="/" className={classes.link}>
                            <Title order={2}>Birbnb</Title>
                        </Link>
                    </Group>

                    <Group h="100%" gap={0} visibleFrom="sm">
                        <MainNav pathname={pathname} classes={classes} />
                    </Group>

                    <Group visibleFrom="sm">
                        {user && (
                            <NotificationsMenu
                                notificaciones={notificaciones}
                                tieneNotificacionesNuevas={
                                    tieneNotificacionesNuevas
                                }
                                setTieneNotificacionesNuevas={
                                    setTieneNotificacionesNuevas
                                }
                            />
                        )}
                        <UserMenu user={user} handleLogout={handleLogout} />
                    </Group>

                    <Burger
                        opened={drawerOpened}
                        onClick={toggleDrawer}
                        hiddenFrom="sm"
                    />
                </Group>
            </header>
            <DrawerHeader
                opened={drawerOpened}
                closeDrawer={closeDrawer}
                classes={classes}
                handleLogout={handleLogout}
                user={user}
            ></DrawerHeader>
        </Box>
    );
}
