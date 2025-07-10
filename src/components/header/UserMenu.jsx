import Link from "next/link";
import { Menu, Button, Divider, Group } from '@mantine/core';
import Dropdown from "../ui/Dropdown";
import {
  IconSettings,
  IconHome ,
  IconPhoto,
  IconMessageCircle,
  IconCompass ,
  IconLogout ,
  IconHomeDollar 
} from '@tabler/icons-react';

export default function UserMenu({ user, handleLogout }) {

    if (!user) {
    return (
      <Group spacing="sm">
        <Link href="/auth/login" passHref>
          <Button variant="default">
            Login
          </Button>
        </Link>
        <Link href="/auth/register" passHref>
          <Button variant="outline">
            Registrar
          </Button>
        </Link>
      </Group>
    );
  }

  return (
    <Menu shadow="md" width={240} trigger="hover" openDelay={100} closeDelay={400}>
      <Menu.Target>
        <Button  variant="light">Perfil</Button>
      </Menu.Target>

      <Menu.Dropdown>
        {user.tipo === 'anfitrion' ? (
            <>
                <Link href="/alojamientos/create" >
            <Menu.Item leftSection={<IconHome size={14} />}>
              Crear Alojamiento
            </Menu.Item>
          </Link>
          <Link href="/alojamientos/misAlojamientos" >
            <Menu.Item leftSection={<IconHomeDollar size={14} />}>
              Mis Alojamiento
            </Menu.Item>
            </Link>
            </>
        ) : (
          <Link href="/reservas" >
            <Menu.Item  leftSection={<IconCompass  size={14} />}>
              Mis Reservas
            </Menu.Item>
          </Link>
        )}
          <Link href="/perfil" >
            <Menu.Item  leftSection={<IconSettings size={14} />}>
             Perfil
            </Menu.Item>
            </Link>
        <Divider my="sm" />

        <Menu.Item  leftSection={<IconLogout size={14} />} onClick={handleLogout} variant="outline">
          Cerrar Sesión
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
