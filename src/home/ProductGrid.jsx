import { motion } from "framer-motion";

export default function ProductGrid({ products }) {
  return (
    <section className="bg-brand-cream py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-12">
          Our Collection
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product, index) => (
            <motion.div
              key={product._id}
              className="group cursor-pointer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="overflow-hidden">
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="mt-4">
                <h3 className="text-sm tracking-wide">
                  {product.name}
                </h3>
                <p className="text-brand-gold mt-1">
                  £{product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}