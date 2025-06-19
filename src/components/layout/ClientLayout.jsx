'use client'

import Navbar from "@/components/layout/Navbar";

export default function ClientLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
