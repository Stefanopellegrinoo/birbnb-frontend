"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TextInput, PasswordInput, Select, Text } from "@mantine/core";
import { useAuth } from "../../../context/AuthContext";
import { Form } from "../../../components/form/Form";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        tipo: "huesped",
    });
    const [error, setError] = useState("");
    const { register } = useAuth();
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value) => {
        setFormData((prev) => ({ ...prev, tipo: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const { name, email, password, confirmPassword, tipo } = formData;
        console.log(formData)
        if (!name || !email || !password || !confirmPassword || !tipo) {
            setError("Por favor completa todos los campos");
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        const success = await register(email, password, name, tipo);
        if (success) {
            router.push("/");
        } else {
            setError("Error al crear la cuenta");
        }
    };

    return (
        <Form
            title="Crear Cuenta"
            onSubmit={handleSubmit}
            error={error}
            submitLabel="Registrarse"
        >
            <TextInput
                label="Nombre completo"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                required
                mt="sm"
            />

            <TextInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
                mt="md"
            />
            <Select
                label="Tipo de usuario"
                data={[
                    { value: "huesped", label: "Huésped" },
                    { value: "anfitrion", label: "Anfitrión" },
                ]}
                value={formData.tipo}
                onChange={handleSelectChange}
                placeholder="Selecciona una opción"
                required
                mt="md"
            />

            <PasswordInput
                label="Contraseña"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                required
                mt="md"
            />

            <PasswordInput
                label="Confirmar contraseña"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
                required
                mt="md"
            />

            <Text ta="center" mt="md">
                ¿Ya tienes cuenta?{" "}
                <Link href="/auth/login">Inicia sesión aquí</Link>
            </Text>
        </Form>
    );
}

export default Register;
