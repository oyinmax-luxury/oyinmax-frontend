

// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// export default function Hero() {
//   const text = "Where African Craft Meets Modern Elegance";
//   const [displayed, setDisplayed] = useState("");

//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       setDisplayed(text.slice(0, index));
//       index++;
//       if (index > text.length) clearInterval(interval);
//     }, 40);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative h-screen flex items-center justify-center bg-brand-dark text-white">
//       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520975922203-b3b6f7f49b83')] bg-cover bg-center opacity-40" />

//       <motion.div
//         className="relative text-center px-6"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         <h1 className="text-3xl md:text-5xl font-light leading-tight tracking-wide font-luxury">
//           {displayed}
//           <span className="text-brand-gold">|</span>
//         </h1>

//         <p className="mt-6 text-brand-muted max-w-xl mx-auto font-body">
//           Designed for the global woman who values heritage, elegance and timeless sophistication.
//         </p>

//         <button className="mt-8 px-8 py-3 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition duration-300 tracking-wider font-body">
//           Discover Collection
//         </button>
//       </motion.div>
//     </section>
//   );
// }

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  // UPDATED: Array of texts for dynamic animation
  const texts = [
    "Where African Craft Meets Modern Elegance",
    "Timeless Heritage, Contemporary Design",
    "Exquisite Fashion for the Global Woman"
  ];
  
  const [displayed, setDisplayed] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    // Typing/Deleting logic
    const timer = setTimeout(() => {
      if (isDeleting) {
        setDisplayed(currentText.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      } else {
        setDisplayed(currentText.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }

      // Handle pause at end of text and start deleting
      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 1500); // Pause before deleting
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length); // Move to next text
      }
    }, isDeleting ? 30 : 50); // Speed of typing/deleting

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section className="relative h-screen flex items-center justify-center bg-brand-dark text-white">
      {/* UPDATED: New working background image link */}
      {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596708304910-c0b89b4f7e2d?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-40" /> */}

      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40" 
        style={{ backgroundImage: "url('/hero-image.jpg')" }} 
      />

      <motion.div
        className="relative text-center px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl md:text-5xl font-light leading-tight tracking-wide font-luxury min-h-[1.2em]">
          {displayed}
          <span className="text-brand-gold animate-pulse">|</span>
        </h1>

        <p className="mt-6 text-brand-muted max-w-xl mx-auto font-body">
          Designed for the global woman who values heritage, elegance and timeless sophistication.
        </p>

        <button className="mt-8 px-8 py-3 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition duration-300 tracking-wider font-body">
          Discover Collection
        </button>
      </motion.div>
    </section>
  );
}