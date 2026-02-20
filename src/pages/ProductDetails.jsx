import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: 1 },
    });
    toast.success(`${product.name} added to collection`);
  };

  if (loading) return <div className="min-h-screen bg-brand-ivory pt-40 text-center font-luxury tracking-widest text-brand-gold animate-pulse">REVEALING PIECE...</div>;
  if (!product) return <div className="min-h-screen bg-brand-ivory pt-40 text-center">Piece not found.</div>;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-ivory pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="mb-12 text-xs uppercase tracking-[0.2em] text-brand-muted hover:text-brand-gold transition-colors"
          >
            ← Back to Collection
          </button>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Image Gallery */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <img 
                src={product.images[0]?.url} 
                className="w-full h-[70vh] object-cover rounded-sm shadow-luxury"
                alt={product.name}
              />
            </motion.div>

            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="sticky top-40"
            >
              <span className="text-brand-gold text-xs uppercase tracking-[0.3em] font-body mb-4 block">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-light font-luxury text-brand-dark mb-6 leading-tight">
                {product.name}
              </h1>
              <p className="text-2xl font-body text-brand-dark mb-8">
                £{product.price?.toLocaleString()}
              </p>
              
              <div className="w-12 h-[1px] bg-brand-gold mb-8"></div>

              <p className="text-brand-muted font-body leading-relaxed mb-10 max-w-md text-lg">
                {product.description || "A masterfully crafted silhouette designed for the global woman. Each stitch carries the heritage of African artistry refined for the modern era."}
              </p>

              <button 
                onClick={addToCart}
                disabled={product.stock === 0}
                className={`w-full md:w-auto px-16 py-5 bg-brand-dark text-white uppercase tracking-[0.3em] text-[10px] hover:bg-brand-gold transition-all duration-500 shadow-xl ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {product.stock === 0 ? "Exhausted" : "Add to Collection"}
              </button>

              <div className="mt-12 border-t border-brand-muted/10 pt-8 grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-luxury text-xs uppercase tracking-widest text-brand-dark mb-2">Details</h4>
                  <p className="text-[10px] text-brand-muted uppercase tracking-tighter">Bespoke Fitting • Silk-Linened • Hand-Finished</p>
                </div>
                <div>
                  <h4 className="font-luxury text-xs uppercase tracking-widest text-brand-dark mb-2">Shipping</h4>
                  <p className="text-[10px] text-brand-muted uppercase tracking-tighter">Complimentary Global Delivery</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}