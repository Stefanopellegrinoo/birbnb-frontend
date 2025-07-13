'use client'
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';
import api, { URL } from '@/lib/api'

const NotificationsContext = createContext(null);

export function NotificationsProvider({ children }) {
    const { user } = useAuth();
    const [notificaciones, setNotificaciones] = useState([]);
    const [tieneNotificacionesNuevas, setTieneNotificacionesNuevas] = useState(false);
    const socketRef = useRef(null);

    useEffect(() => {
        if (!user) {
            setNotificaciones([]);
            setTieneNotificacionesNuevas(false);
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
            return;
        }

        api.get(`/usuarios/${user.id}/notificaciones/`)
            .then((res) => {
                setNotificaciones(res.data);
                const hayNuevas = res.data.some(n => !n.leida);
                setTieneNotificacionesNuevas(hayNuevas);
            })
            .catch(() => {
                setNotificaciones([]);
                setTieneNotificacionesNuevas(false);
            });

        const socket = io('wss://tp-cuatrimestral-jueves-manana-ju-ma-grupo-07-production.up.railway.app', {
            transports: ["websocket", "polling"],
            path: "/socket.io",
        });
        socketRef.current = socket;

        socket.emit("join", user.id);

        const handleNuevaNotificacion = (data) => {
            const { notificacion } = data;
            console.log("noti_socket:", notificacion)
            setNotificaciones((prev) => [notificacion, ...prev]);
            setTieneNotificacionesNuevas(true);
        };

        socket.on("nueva_notificacion", handleNuevaNotificacion);
        socket.on("cancelar_notificacion", handleNuevaNotificacion);
        socket.on("confirmar_notificacion", handleNuevaNotificacion);

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    }, [user]);


    const markAsRead = async (notificacionId) => {
        try {
            console.log("notificacionId:", notificacionId)
            await api.patch(`/notificaciones/${notificacionId}/marcar-leida`);
            setNotificaciones((prev) =>
                prev.map((n) =>
                    n._id === notificacionId ? { ...n, leida: true } : n
                )
            );
        } catch (error) {
            console.error("Error al marcar como leída:", error);
        }
    };
    const value = {
        notificaciones,
        tieneNotificacionesNuevas,
        setTieneNotificacionesNuevas,
        markAsRead,
    };

    return (
        <NotificationsContext.Provider value={value}>
            {children}
        </NotificationsContext.Provider>
    );
}

// El hook para consumir el contexto no cambia
export function useNotifications() {
    return useContext(NotificationsContext);
}