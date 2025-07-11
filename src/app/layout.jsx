import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import ClientLayout from "@/components/layout/ClientLayout";
import {
    ColorSchemeScript,
    MantineProvider,
    mantineHtmlProps,
} from "@mantine/core";
import { NotificationsProvider } from "@/context/NotificationsContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Birbnb",
    description: "Creado para el TP de desarrollo de software",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <AuthProvider>
                    <NotificationsProvider>
                        <MantineProvider withGlobalStyles withNormalizeCSS>
                            <ClientLayout>{children}</ClientLayout>
                        </MantineProvider>
                    </NotificationsProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
