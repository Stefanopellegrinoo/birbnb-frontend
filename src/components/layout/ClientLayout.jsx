'use client'
import "@/styles/globals.css";
import { Footer } from "../footer/Footer";
import Header from "../header/Header";

export default function ClientLayout({ children }) {
  return (
    <div className="layout-root">
      <Header />
      <main className="layout-main">{children}</main>
      <Footer />
    </div>
  );
}