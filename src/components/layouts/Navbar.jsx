

import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiX, HiOutlineShoppingBag } from "react-icons/hi"; // UPDATED: Added icon
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { state } = useCart(); // UPDATED: Get cart state
  const cartItemCount = state.cartItems.reduce((acc, item) => acc + item.qty, 0); // Calculate total items

  return (
    <header className="fixed top-0 w-full bg-brand-dark/90 backdrop-blur-sm z-50 border-b border-brand-gold/20 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold tracking-widest font-luxury text-white">
          OYINMAX
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-8 text-sm tracking-wide font-body text-white">
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
          
          <div className="flex items-center gap-6 text-sm font-body">
            {/* UPDATED: Cart Icon for Desktop */}
            <Link to="/cart" className="relative hover:text-brand-gold transition">
              <HiOutlineShoppingBag className="text-xl" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-dark text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link to="/login" className="hover:text-brand-gold transition">
              Login
            </Link>
            <Link to="/register" className="px-4 py-2 border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark transition rounded-full">
              Register
            </Link>
          </div>
        </div>

        {/* Mobile Buttons */}
        {/* UPDATED: Container for Mobile Icons */}
        <div className="flex items-center gap-4 md:hidden">
          {/* UPDATED: Cart Icon for Mobile */}
          <Link to="/cart" className="relative hover:text-brand-gold transition text-2xl">
            <HiOutlineShoppingBag />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-dark text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                {cartItemCount}
              </span>
            )}
          </Link>
          <button
            className="text-2xl text-white"
            onClick={() => setOpen(true)}
          >
            <HiMenuAlt3 />
          </button>
        </div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 h-full w-64 bg-brand-dark text-white p-6 z-50 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-end">
                <HiX
                  className="text-2xl cursor-pointer hover:text-brand-gold"
                  onClick={() => setOpen(false)}
                />
              </div>

              <nav className="mt-10 flex flex-col gap-6 text-lg font-luxury">
                <Link to="/shop" onClick={() => setOpen(false)}>Shop</Link>
                <Link to="/about" onClick={() => setOpen(false)}>About</Link>
                <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
                
                <div className="border-t border-brand-gold/20 pt-6 mt-auto flex flex-col gap-4 text-lg">
                  <Link to="/login" onClick={() => setOpen(false)} className="hover:text-brand-gold">Login</Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="text-brand-gold hover:underline">Register</Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}