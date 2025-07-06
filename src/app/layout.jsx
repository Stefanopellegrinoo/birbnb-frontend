import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import '@mantine/core/styles.css';
import ClientLayout from "@/components/layout/ClientLayout";

import '@mantine/dates/styles.css';

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';

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
             <MantineProvider withGlobalStyles withNormalizeCSS>
                <ClientLayout>{children}</ClientLayout>
             </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
