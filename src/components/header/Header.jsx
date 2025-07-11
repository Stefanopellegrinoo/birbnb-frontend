"use client";

import { Box, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../header/HeaderMegaMenu.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import NotificationsMenu from "./NotificationsMenu";
import MainNav from "./MainNav";
import UserMenu from "./UserMenu";
import DrawerHeader from "./DrawerHeader";
import { useNotifications } from "@/context/NotificationsContext";
export default function Header() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const router = useRouter();
    

    const handleLogout = () => {
        logout();
        router.push("/");
    };

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
                            <NotificationsMenu />
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
