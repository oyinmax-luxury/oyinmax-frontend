import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Assuming you want to link to product details

export default function ProductGrid({ products }) {
  // If no products, show a clean message
  if (!products || products.length === 0) {
    return (
      <section className="bg-brand-ivory py-20 px-4 text-center">
        <p className="text-brand-muted font-body">No products found in this collection.</p>
      </section>
    );
  }

  return (
    <section className="bg-brand-ivory py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-light text-center mb-16 font-luxury text-brand-dark tracking-wide">
          Our Collection
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product, index) => {
            const isOutOfStock = product.stock === 0;

            return (
              <motion.div
                key={product._id}
                className={`group ${isOutOfStock ? "opacity-75" : "cursor-pointer"}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                {/* Image Container with Luxury Effects */}
                <Link to={`/product/${product._id}`} className="block overflow-hidden rounded-sm relative">
                  <img
                    src={product.images[0]?.url || "/placeholder-image.jpg"}
                    alt={product.name}
                    className="w-full h-72 md:h-80 object-cover group-hover:scale-105 transition duration-700 ease-out"
                  />
                  
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/5 transition-colors duration-300" />
                  
                  {/* Out of Stock Label */}
                  {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/30">
                      <span className="bg-white/90 text-brand-dark text-xs uppercase tracking-widest px-3 py-1 font-body">
                        Sold Out
                      </span>
                    </div>
                  )}
                </Link>

                {/* Product Details */}
                <div className="mt-5 space-y-1 text-center">
                  <h3 className="text-sm tracking-wider font-body text-brand-dark uppercase group-hover:text-brand-gold transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-brand-dark font-body font-light text-sm">
                    £{product.price.toLocaleString()}
                  </p>
                  
                  {/* Optional: Stock indicator if low */}
                  {product.stock > 0 && product.stock < 5 && (
                    <p className="text-xs text-red-600 font-body">
                      Only {product.stock} left
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}