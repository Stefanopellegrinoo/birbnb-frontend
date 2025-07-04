import { Menu, ActionIcon } from '@mantine/core';
import { IconBell, IconBellFilled } from '@tabler/icons-react';
import Link from 'next/link';

export default function NotificationsMenu({ notificaciones, tieneNotificacionesNuevas, setTieneNotificacionesNuevas }) {
  const ultimasNotificaciones = notificaciones
    .filter(n => !n.leida)
    .slice(0, 5);

  return (
    <Menu
      withArrow
      offset={10}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
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
        {ultimasNotificaciones.length === 0 ? (
          <Menu.Item disabled>No tienes notificaciones nuevas</Menu.Item>
        ) : (
          ultimasNotificaciones.map((n) => (
            <Menu.Item key={n._id}>{n.mensaje}</Menu.Item>
          ))
        )}
        <Menu.Divider />
        <Menu.Item component={Link} href="/notificaciones">
          Ver todas las notificaciones
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}