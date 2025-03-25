import React from "react";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Footer from "../components/Footer";
import Mission from "./Mission";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Mission />
    </div>
  );
}
