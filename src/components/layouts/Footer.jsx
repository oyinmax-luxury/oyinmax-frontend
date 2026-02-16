export default function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-muted py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-white tracking-widest mb-4">OYINMAX</h3>
          <p className="text-sm">
            Premium African craftsmanship redefined for the modern global market.
          </p>
        </div>

        <div>
          <h4 className="text-white mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>Shop</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white mb-4">Newsletter</h4>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 bg-transparent border border-brand-muted focus:outline-none"
          />
        </div>
      </div>

      <div className="text-center mt-12 text-xs">
        © {new Date().getFullYear()} Oyinmax Luxury. All rights reserved.
      </div>
    </footer>
  );
}