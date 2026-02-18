

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
 
const images = [
    "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?q=80&w=2000", // Luxury Dress
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000", // High Fashion
    "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=2000"  // African Textile Detail
  ];

  const texts = [
    "Where African Craft Meets Modern Elegance",
    "Timeless Heritage, Contemporary Design",
    "Exquisite Fashion for the Global Woman"
  ];

  const scrollToProducts = () => {
    const productsSection = document.getElementById('featured-products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigate = useNavigate()

  const [displayed, setDisplayed] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [imgIndex, setImgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // LOGIC: Image Slider Timer
  useEffect(() => {
    const imgTimer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % images.length);
    }, 6000); // Change image every 6 seconds
    return () => clearInterval(imgTimer);
  }, []);

  // LOGIC: Typing Text (Your existing logic)
  useEffect(() => {
    const currentText = texts[textIndex];
    const timer = setTimeout(() => {
      if (isDeleting) {
        setDisplayed(currentText.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      } else {
        setDisplayed(currentText.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }

      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, isDeleting ? 30 : 50);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section className="relative h-screen flex items-center justify-center bg-brand-dark text-white overflow-hidden">
      
      {/* BACKGROUND IMAGE SLIDER */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={imgIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.4, scale: 1 }} // Keep opacity low for text readability
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[imgIndex]})` }}
          />
        </AnimatePresence>
        {/* Overlay to ensure text pops */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-transparent to-brand-dark/80" />
      </div>

      {/* CONTENT */}
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl md:text-6xl font-light leading-tight tracking-wide font-luxury min-h-[2.4em] max-w-4xl mx-auto">
          {displayed}
          <span className="text-brand-gold animate-pulse ml-1">|</span>
        </h1>

        <p className="mt-8 text-brand-muted max-w-xl mx-auto font-body text-lg">
          Designed for the global woman who values heritage, elegance and timeless sophistication.
        </p>

        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
          <button onClick={scrollToProducts} className="px-10 py-4 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition-all duration-500 tracking-[0.2em] text-xs uppercase font-body">
            Discover Collection
          </button>
          <button onClick={() => navigate('/about')} className="px-10 py-4 text-white hover:text-brand-gold transition-colors tracking-[0.2em] text-xs uppercase font-body border border-transparent">
            Our Story
          </button>
        </div>
      </motion.div>

      {/* Slide Indicators (Dots) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, i) => (
          <div 
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              imgIndex === i ? "bg-brand-gold w-8" : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}