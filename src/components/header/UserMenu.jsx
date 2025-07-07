import Link from "next/link";
import { Button } from "@mantine/core";

export default function UserMenu({ user, handleLogout }) {
    return (
        <>
            {user ? (
                <>
                    {user.data.tipo === "anfitrion" ? (
                    <>
                        <Link
                            href="/alojamientos/create"
                            className="navbar-button"
                        >
                            <Button variant="default">Crear Alojamiento</Button>
                        </Link>
                    </>
                    ) : (
                    <>
                        <Link href="/reservas" className="navbar-button">
                            <Button variant="default">Mis Reservas</Button>
                        </Link>
                    </>
                    )}
                    <Button onClick={handleLogout}>Cerrar Sesión</Button>
                </>
            ) : (
                <>
                    <Link href="/auth/login" className="navbar-button">
                        <Button variant="default">Login</Button>
                    </Link>
                    <Link
                        href="/auth/register"
                        className="navbar-button navbar-button-secondary"
                    >
                        <Button>Registrar</Button>
                    </Link>
                </>
            )}
        </>
    );
}
