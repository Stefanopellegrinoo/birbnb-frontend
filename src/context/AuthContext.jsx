"use client";

import api from "@/lib/api";
import { createContext, useContext, useState, useEffect } from "react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { set } from "cypress/types/lodash";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const initAuth = async () => {
            try {
                setLoading(true);
                const res = await api.get("/me");
                const user = res.data;
                setUser(user);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

   
    const login = async (email, password) => {
        const u = {
            email,
            password,
        };
        try {
            const res = await api.post("/login", {
                user: u,
            });
            const userData = res.data;
            setUser(userData.user);
            localStorage.setItem("token", userData.accessToken);
            return true;
        } catch (error) {
            const mensaje =
                error.response?.data?.message || "Error al iniciar sesión";

            return false;
        }
    };

    const register = async (email, password, name, tipo) => {
        const u = {
            email,
            nombre: name,
            password,
            tipo,
        };
        try {
            const res = await api.post("/register", { user: u });
            const userData = res.user;
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            return true;
        } catch (error) {
            const mensaje =
                error.response?.data?.message || "Error al registrarse";

            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
