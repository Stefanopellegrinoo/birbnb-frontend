'use client'
import Link from "next/link";
import "@/styles/Home.css"; 
import { Presentacion } from "@/components/home/Presentacion";
import AlojamientosDestacados from "@/components/home/AlojamientosDestacados";

function Home() {

  return (
    <div className="home">
      <div className="home-container">
       <Presentacion/>
      <AlojamientosDestacados/>
      </div>
    </div>
  );
}

export default Home;
