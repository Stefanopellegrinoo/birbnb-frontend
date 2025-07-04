import Link from 'next/link';
import { Button } from '@mantine/core';

export default function UserMenu({ user, handleLogout }) {
  if (user) {
    return (
      <>
        <Link href="/reservas" className="navbar-button">
          <Button variant="default">Mis Reservas</Button>
        </Link>
        <Button onClick={handleLogout}>Cerrar Sesión</Button>
      </>
    );
  }
  return (
    <>
      <Link href="/auth/login" className="navbar-button">
        <Button variant="default">Login</Button>
      </Link>
      <Link href="/auth/register" className="navbar-button navbar-button-secondary">
        <Button>Registrar</Button>
      </Link>
    </>
  );
}