import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const text = "Where African Craft Meets Modern Elegance";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, index));
      index++;
      if (index > text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center bg-brand-dark text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520975922203-b3b6f7f49b83')] bg-cover bg-center opacity-40" />

      <motion.div
        className="relative text-center px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl md:text-5xl font-light leading-tight tracking-wide">
          {displayed}
          <span className="text-brand-gold">|</span>
        </h1>

        <p className="mt-6 text-brand-muted max-w-xl mx-auto">
          Designed for the global woman who values heritage, elegance and timeless sophistication.
        </p>

        <button className="mt-8 px-8 py-3 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black transition duration-300 tracking-wider">
          Discover Collection
        </button>
      </motion.div>
    </section>
  );
}