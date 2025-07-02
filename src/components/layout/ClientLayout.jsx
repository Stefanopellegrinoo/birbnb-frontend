'use client'

import Navbar from "@/components/layout/Navbar";
import { Footer } from "../footer/Footer";
import Header from "../header/Header";

export default function ClientLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />

    </>
  );
}