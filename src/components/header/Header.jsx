'use client';

import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Text,
  Title,
  Menu,
  ActionIcon
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { IconBell } from '@tabler/icons-react';
import classes from '../header/HeaderMegaMenu.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import axios from "@/lib/api";

export default function Header() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const pathname = usePathname();
    const { user, logout } = useAuth()
    const [notificaciones, setNotificaciones] = useState([]);

    
    const handleLogout = () => {
        logout()
        router.push("/")
    }
    useEffect(() => {
        if (!user) {
            setNotificaciones([]);
            return;
        }
        axios
            .get(`usuarios/682a6b741871e5f4f2920882/notificaciones/no-leidas`)
            .then(res => setNotificaciones(res.data))
            .catch(() => setNotificaciones([]));
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
            <Link
                href="/"
                className={`${classes.link} ${pathname === '/' ? classes.active : ''}`}
            >
                Home
            </Link>

            <Link
                href="/alojamientos"
                className={`${classes.link} ${pathname === '/alojamientos' ? classes.active : ''}`}
            >
                Alojamientos
            </Link>
            </Group>

            <Group visibleFrom="sm">
                {user?(
                    <>
                                    <Menu
                    withArrow
                    offset={10}
                    position="bottom-end"
                    transitionProps={{ transition: 'pop-top-right' }}
                >
                    <Menu.Target>
                    <ActionIcon variant="subtle" size="lg" aria-label="Ver notificaciones">
                        <IconBell size={22} />
                    </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                    <Menu.Label>Notificaciones</Menu.Label>
                    {notificaciones.length === 0 ? (
                        <Menu.Item disabled>No tienes notificaciones</Menu.Item>
                    ) : (
                        notificaciones.map((n, i) => (
                            <Menu.Item key={i}>{n.mensaje}</Menu.Item>
                        ))
                    )}
                    <Menu.Divider />
                    <Menu.Item component={Link} href="/notificaciones">
                        Ver todas las notificaciones
                    </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
                    </>
                ):null}

                {user ? (
                <>
                <Link href="/reservas" className="navbar-button">
                    <Button variant="default">Mis Reservas</Button>
                </Link>
                <Button onClick={handleLogout}>Cerrar Sesión</Button>

                </>
                ) : (
                <>
                    <Link href="/auth/login" className="navbar-button">
                        <Button variant="default">Login</Button>
                    </Link>
                    <Link href="/auth/register" className="navbar-button navbar-button-secondary">
                        <Button>Registrar</Button>
                    </Link>
                </>
                )}
            </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
        </header>

        <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navegación"
        hiddenFrom="sm"
        zIndex={1000000}
        >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
            <Divider my="sm" />
            <Link href="/" className={classes.link} onClick={closeDrawer}>
            Home
            </Link>
            <Link href="/alojamientos" className={classes.link} onClick={closeDrawer}>
            Alojamientos
            </Link>
            <Divider my="sm" />
            <Group justify="center" grow pb="xl" px="md">
            <Link href="/auth/login" className="navbar-button" onClick={closeDrawer}>
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