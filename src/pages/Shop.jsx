import { useState } from "react";
import ProductGrid from "../home/ProductGrid";
import { HiFilter } from "react-icons/hi";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

const categories = ["All", "Aso Ebi", "Agbada", "Couture Gowns", "Resort Wear", "Adire Luxury"];

export default function Shop({ products }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-brand-ivory pt-32 pb-20 px-4">
        <Navbar/>
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-light font-luxury text-brand-dark mb-4 uppercase tracking-tighter">
            The Collection
          </h1>
          <div className="w-24 h-[1px] bg-brand-gold mx-auto mb-8"></div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-8 font-body text-xs uppercase tracking-widest text-brand-muted">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`hover:text-brand-gold transition-colors pb-2 ${
                  activeCategory === cat ? "border-b border-brand-gold text-brand-dark" : ""
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}