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
    // return (
    //     <>
    //         {user ? (
    //             <>
                
    //                 {user.tipo === "anfitrion" ? (
    //                 <>
    //                     <Link
    //                         href="/alojamientos/create"
    //                         className="navbar-button"
    //                     >
    //                         <Button variant="default">Crear Alojamiento</Button>
    //                     </Link>
    //                 </>
    //                 ) : (
    //                 <>
    //                     <Link href="/reservas" className="navbar-button">
    //                         <Button variant="default">Mis Reservas</Button>
    //                     </Link>
    //                 </>
    //                 )}
    //                 <Button onClick={handleLogout}>Cerrar Sesión</Button>
    //             </>
    //         ) : (
    //             <>
    //                 <Link href="/auth/login" className="navbar-button">
    //                     <Button variant="default">Login</Button>
    //                 </Link>
    //                 <Link
    //                     href="/auth/register"
    //                     className="navbar-button navbar-button-secondary"
    //                 >
    //                     <Button>Registrar</Button>
    //                 </Link>
    //             </>
    //         )}
            
    //     </>
        
    // );
    if (!user) {
    // Usuario no logueado: mostrar botones de Login y Registrar sin menú
    return (
      <Group spacing="sm">
        <Link href="/auth/login" passHref>
          <Button component="a" variant="default">
            Login
          </Button>
        </Link>
        <Link href="/auth/register" passHref>
          <Button component="a" variant="outline">
            Registrar
          </Button>
        </Link>
      </Group>
    );
  }

  // Usuario logueado: mostrar menú según tipo
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
            <Menu.Item leftSection={<IconHomeDollar size={14} />}>
              Mis Alojamiento
            </Menu.Item>
            </>
        ) : (
          <Link href="/reservas" passHref>
            <Menu.Item  leftSection={<IconCompass  size={14} />}>
              Mis Reservas
            </Menu.Item>
          </Link>
        )}
            <Menu.Item  leftSection={<IconSettings size={14} />}>
             Perfil
            </Menu.Item>
        <Divider my="sm" />

        <Menu.Item  leftSection={<IconLogout size={14} />} onClick={handleLogout} variant="outline" fullWidth>
          Cerrar Sesión
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
