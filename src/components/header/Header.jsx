"use client";

import {
    Box,
    Burger,
    Button,
    Divider,
    Drawer,
    Group,
    ScrollArea,
    Text,
    Flex,
    Title,
    Menu,
    ActionIcon,
} from "@mantine/core";
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

            // Desconectar socket si existe
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }

            return;
        }
        const endpointNotificacionesNoLeidas = `/usuarios/${user.id}/notificaciones/no-leidas`;
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

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h="calc(100vh - 80px)" mx="-md">
                    <Flex justify="center" mb="md">
                        <Title order={2} className={classes.title}>
                            Navegacion
                        </Title>
                    </Flex>

                    <Divider my="sm" />
                    <Link
                        href="/"
                        className={classes.link}
                        onClick={closeDrawer}
                    >
                        Home
                    </Link>
                    <Link
                        href="/alojamientos"
                        className={classes.link}
                        onClick={closeDrawer}
                    >
                        Alojamientos
                    </Link>
                    <Link
                        href="/notificaciones"
                        className={classes.link}
                        onClick={closeDrawer}
                    >
                        Notificaciones
                    </Link>
                    <Divider my="sm" />
                    <Group justify="center" grow pb="xl" px="md">
                        <Link
                            href="/auth/login"
                            className="navbar-button"
                            onClick={closeDrawer}
                        >
                            <Button variant="default">Login</Button>
                        </Link>
                        <Link
                            href="/auth/register"
                            className="navbar-button navbar-button-secondary"
                            onClick={closeDrawer}
                        >
                            <Button>Registrar</Button>
                        </Link>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}
