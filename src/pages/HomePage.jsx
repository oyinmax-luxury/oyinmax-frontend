

import { useState, useEffect } from "react";
import api from "../services/api";
import Hero from "../home/Hero";
import ProductGrid from "../home/ProductGrid";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { motion } from "framer-motion";
import { HiOutlineSparkles } from "react-icons/hi";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/products");
        // Safety check: ensure we are targeting the array
        const fetchedProducts = Array.isArray(data) ? data : data.products || [];
        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Our collection is temporarily unavailable.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      
      <main className="bg-brand-ivory">
        {loading ? (
          /* 1. LUXURY LOADING STATE */
          <section className="min-h-[400px] flex flex-col items-center justify-center py-20">
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center"
            >
              <p className="font-luxury text-brand-gold uppercase tracking-[0.4em] text-sm">
                Curating Excellence
              </p>
              <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-4"></div>
            </motion.div>
          </section>
        ) : error || products.length === 0 ? (
          /* 2. LUXURY ERROR / EMPTY STATE */
          <section id="featured-products" className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="max-w-md"
            >
              <div className="flex justify-center mb-8">
                <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                  <HiOutlineSparkles size={20} className="animate-pulse" />
                </div>
              </div>

              <h2 className="text-4xl font-light font-luxury text-brand-dark mb-6 tracking-tight">
                The Gallery is <br /> 
                <span className="italic">Being Refined</span>
              </h2>
              
              <div className="w-16 h-[1px] bg-brand-gold mx-auto mb-8"></div>

              <p className="text-brand-muted font-body text-xs uppercase tracking-[0.2em] leading-loose mb-10">
                {error || "Our latest masterpieces are currently being prepared for display."}
              </p>

              <button 
                onClick={() => window.location.reload()}
                className="px-10 py-4 border border-brand-dark text-brand-dark text-[10px] uppercase tracking-[0.3em] hover:bg-brand-dark hover:text-white transition-all duration-500"
              >
                Refresh Experience
              </button>
            </motion.div>
          </section>
        ) : (
          /* 3. SUCCESS STATE */
          <ProductGrid products={products} />
        )}
      </main>

      <Footer />
    </>
  );
}