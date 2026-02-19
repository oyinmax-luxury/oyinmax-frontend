import { motion } from "framer-motion";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import hero2 from "../assets/hero-image2.jpg"

export default function About() {
  return (
    <div className="min-h-screen bg-white">
        <Navbar/>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
        //   src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070" 
          src={hero2}
          alt="Luxury Craft" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-brand-dark/20" />
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative text-6xl md:text-8xl font-luxury text-white text-center"
        >
          Oyinmax Luxury
        </motion.h1>
      </section>

      {/* Story Section */}
      <section className="max-w-4xl mx-auto py-24 px-6 text-center">
        <h2 className="text-sm uppercase tracking-[0.3em] text-brand-gold mb-6 font-body">Our Heritage</h2>
        <p className="text-2xl font-light font-body text-brand-dark leading-relaxed italic">
          "Bridging the vibrant soul of Nigerian craftsmanship with the timeless elegance of global high fashion."
        </p>
        <div className="mt-12 space-y-6 text-brand-muted font-body leading-loose text-lg">
          <p>
            Founded on the principles of exclusivity and meticulous detail, Oyinmax serves as a sanctuary for those who view fashion as an art form. Every piece from our hand-dyed Adire to our bespoke couture gowns is a celebration of culture and contemporary luxury.
          </p>
          <p>
            Based in Exeter, UK, with deep roots in Nigerian artistry, we curate collections that resonate with the modern elite. We don't just dress bodies; we drape stories.
          </p>
        </div>
        
      </section>
      <Footer/>
    </div>
  );
}