import {
    Drawer,
    ScrollArea,
    Flex,
    Title,
    Divider,
    Group,
    Button,
} from "@mantine/core";
import Link from "next/link";

export default function DrawerHeader({
    opened,
    closeDrawer,
    classes,
    handleLogout,
    user,
}) {
    return (
        <Drawer
            opened={opened}
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
                <Link href="/" className={classes.link} onClick={closeDrawer}>
                    Home
                </Link>
                <Link
                    href="/alojamientos"
                    className={classes.link}
                    onClick={closeDrawer}
                >
                    Alojamientos
                </Link>

                {user ? (
                    <>
                        <Link
                            href="/notificaciones"
                            className={classes.link}
                            onClick={closeDrawer}
                        >
                            Notificaciones
                        </Link>
                        <Divider my="sm" />

                        {user.tipo === "anfitrion" ? (
                            <>
                                <Link
                                    href="/alojamientos/create"
                                    className="navbar-button"
                                    onClick={closeDrawer}
                                >
                                    <Button variant="default">
                                        Crear Alojamiento
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/reservas"
                                    className="navbar-button"
                                    onClick={closeDrawer}
                                >
                                    <Button variant="default">
                                        Mis Reservas
                                    </Button>
                                </Link>
                            </>
                        )}
                        <Button onClick={handleLogout}>Cerrar Sesión</Button>
                    </>
                ) : (
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
                )}
            </ScrollArea>
        </Drawer>
    );
}
