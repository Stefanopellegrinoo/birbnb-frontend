"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import {Form} from "../../../components/form/Form.jsx";
import { TextInput, PasswordInput } from "@mantine/core";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Por favor completa todos los campos");
            return;
        }

        const success = await login(email, password);
        console.log(success)
        if (success) {
            router.push("/");
        } else {
            setError("Credenciales inválidas");
        }
    };

    return (
        <Form
            title="Iniciar Sesión"
            onSubmit={handleSubmit}
            error={error}
            submitLabel="Iniciar Sesión"
        >
            <TextInput
                label="Email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                mt="md"
            />
            <PasswordInput
                label="Contraseña"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                mt="md"
            />
        </Form>
    );
}

export default Login;
