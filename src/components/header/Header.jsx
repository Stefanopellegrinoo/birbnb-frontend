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
} from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
// import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './HeaderMegaMenu.module.css';
import  Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function Header() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const pathname = usePathname();
    return (
    <Box >
        <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <MantineLogo size={30} />

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
                <Link href="/auth/login" className="navbar-button">
                    <Button variant="default">Login</Button>
                </Link>
                <Link href="/auth/register" className="navbar-button navbar-button-secondary">
                    <Button>Registrar</Button>
                </Link>
            </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
        </header>

        <Drawer
            opened={drawerOpened}
            onClose={closeDrawer}
            size="100%"
            padding="md"
            title="Navegacion"
            hiddenFrom="sm"
            zIndex={1000000}
        >
            <ScrollArea h="calc(100vh - 80px" mx="-md">
                <Divider my="sm" />
                <Link href="/"  className={classes.link} onClick={closeDrawer}>
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
                    <Link href="/auth/register" className="navbar-button navbar-button-secondary" onClick={closeDrawer}>
                        <Button>Registrar</Button>
                    </Link>
                </Group>
            </ScrollArea>
        </Drawer>
    </Box>
  );
}