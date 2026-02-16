import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-brand-cream/80 backdrop-blur-md z-50 border-b border-brand-muted/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold tracking-widest">
          OYINMAX
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex gap-8 text-sm tracking-wide">
          <Link to="/shop" className="hover:text-brand-gold transition">
            Shop
          </Link>
          <Link to="/about" className="hover:text-brand-gold transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-brand-gold transition">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(true)}
        >
          <HiMenuAlt3 />
        </button>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-64 bg-brand-dark text-white p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-end">
                <HiX
                  className="text-2xl cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>

              <nav className="mt-10 flex flex-col gap-6 text-lg">
                <Link to="/shop">Shop</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}