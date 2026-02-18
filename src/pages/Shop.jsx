import { useState, useEffect } from "react";
import ProductGrid from "../home/ProductGrid";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import api from "../services/api";

const categories = ["All", "Aso Ebi", "Agbada", "Couture Gowns", "Resort Wear", "Adire Luxury"];

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // 1. Fetch products directly if they aren't passed from App.jsx
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        // 2. Safety check: Ensure we are setting an array
        // If your backend returns { products: [...] }, use data.products
        const actualData = Array.isArray(data) ? data : data.products || [];
        setProducts(actualData);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 3. Add a fallback to products to prevent the .filter error
  const safeProducts = Array.isArray(products) ? products : [];

  // 2. Filter Logic (Case Sensitive Check)
  // We use .trim() to ensure no accidental spaces break the match
  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category?.trim() === activeCategory.trim());

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-brand-ivory pt-32 pb-20 px-4">
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
                  className={`hover:text-brand-gold transition-colors pb-2 transition-all duration-300 ${
                    activeCategory === cat ? "border-b border-brand-gold text-brand-dark font-bold" : "border-b border-transparent"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </header>

          {loading ? (
            <div className="text-center py-20 font-luxury text-brand-muted">Curating pieces...</div>
          ) : filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="text-center py-20">
              <p className="text-brand-muted font-body">No pieces found in {activeCategory}.</p>
              <button 
                onClick={() => setActiveCategory("All")}
                className="mt-4 text-brand-gold underline text-sm"
              >
                View all collections
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}