import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { motion } from "framer-motion";

const LegalLayout = ({ title, subtitle, children }) => {
  return (
    <>
      <Navbar />
      <main className="bg-brand-ivory min-h-screen pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-5xl font-luxury font-light text-brand-dark tracking-tighter mb-4 italic">
              {title}
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-body">
              {subtitle}
            </p>
            <div className="w-12 h-[1px] bg-brand-gold mx-auto mt-8"></div>
          </motion.div>

          <div className="prose prose-sm max-w-none text-brand-muted font-body leading-relaxed space-y-12 text-justify">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LegalLayout;