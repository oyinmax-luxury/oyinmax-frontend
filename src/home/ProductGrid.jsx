import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";


export default function ProductGrid({ products }) {
    const { dispatch } = useCart(); // 2. GET DISPATCH FROM CONTEXT

    const addToCart = (product) => {
        // 3. DEFINE THE FUNCTION
        dispatch({
        type: "ADD_TO_CART",
        payload: {
            ...product,
            quantity: 1, // Default quantity to 1 when adding from grid
        },
        });
        toast.success(`${product.name} added to cart`);
    };



  // If no products, show a clean message
//   if (!products || products.length === 0) {
//     return (
//       <section id="featured-products" className="bg-brand-ivory py-20 px-4 text-center">
//         <p className="text-brand-muted font-body">No products found in this collection.</p>
//       </section>
//     );
//   }

if (!products || products.length === 0) {
  return (
    <section 
      id="featured-products" 
      className="bg-brand-ivory min-h-[60vh] flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-md"
      >
        {/* Subtle Decorative Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold">
            <HiOutlineSparkles size={20} className="animate-pulse" />
          </div>
        </div>

        {/* Elegant Typography */}
        <h2 className="text-4xl font-light font-luxury text-brand-dark mb-6 tracking-tight">
          A Curated Selection <br /> 
          <span className="italic">Coming Soon</span>
        </h2>
        
        <div className="w-16 h-[1px] bg-brand-gold mx-auto mb-8"></div>

        <p className="text-brand-muted font-body text-base leading-relaxed mb-10 uppercase tracking-[0.15em]">
          Our artisans are currently finalizing new pieces. <br />
          Please check back momentarily or explore our bespoke services.
        </p>

        {/* Call to Action to keep them on the site */}
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-brand-dark text-white text-[10px] uppercase tracking-[0.3em] hover:bg-brand-gold transition-colors duration-500"
        >
          Refresh Gallery
        </button>
      </motion.div>
    </section>
  );
}

  return (
    <section id="featured-products" className="bg-brand-ivory py-20 px-4">
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

                  {/* Add to Cart Button (Appears on hover) */}
                    {!isOutOfStock && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                        <button 
                            className="w-full bg-white text-brand-dark text-sm uppercase tracking-widest py-3 font-body font-medium hover:bg-brand-gold hover:text-white transition duration-300 shadow-lg"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent navigating to product page
                                addToCart(product)
                                console.log("Added to cart:", product.name);
                            }}
                        >
                            Add to Cart
                        </button>
                        </div>
                    )}
                  
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