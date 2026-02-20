
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebookF, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-muted pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Pillar */}
          <div className="md:col-span-1">
            <h3 className="text-white font-luxury text-2xl tracking-[0.4em] mb-8">
              OYINMAX LUXURY
            </h3>
            {/* <p className="text-xs uppercase tracking-[0.15em] leading-relaxed opacity-80">
              Promoting Culture and Heritage <br /> 
              African artistry through <br />
              modern silhouettes.
            </p> */}
            <p className="text-xs uppercase tracking-[0.15em] leading-relaxed opacity-80">
              Promoting Culture and Heritage <br /> 
            </p>
          </div>

          {/* Navigation Pillar */}
          <div>
            <h4 className="text-white font-luxury text-xs uppercase tracking-[0.3em] mb-8">
              The House
            </h4>
            <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em]">
              <li>
                <Link to="/shop" className="hover:text-brand-gold transition-colors duration-500">Collection</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-gold transition-colors duration-500">Our Story</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-brand-gold transition-colors duration-500">Bespoke</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-gold transition-colors duration-500">Concierge</Link>
              </li>
            </ul>
          </div>

          {/* Social & Legal Pillar */}
          <div>
            <h4 className="text-white font-luxury text-xs uppercase tracking-[0.3em] mb-8">
              Legal & Social
            </h4>
            <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em] mb-8">
              <li className="hover:text-brand-gold transition-colors duration-300">
                <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li className="hover:text-brand-gold transition-colors duration-300">
                <Link to="/terms-of-service">Terms of Service</Link>
            </li>
            </ul>
            <div className="flex gap-6 text-white/60">
              {/* <FaInstagram className="hover:text-brand-gold cursor-pointer transition-colors" /> */}
              <a 
                href="https://www.instagram.com/oyinmax_luxury?igsh=eWowOXd6a2xlb3E2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-brand-gold transition-colors duration-300"
                >
                <FaInstagram size={18} />
                </a>
                <a 
                href="https://www.tiktok.com/@oyinmax_luxury?_r=1&_t=ZS-944i8FKxmaK" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-brand-gold transition-colors duration-300"
                >
                <FaTiktok size={18} />
                </a>
              <FaFacebookF className="hover:text-brand-gold cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Newsletter Pillar */}
          <div className="md:col-span-1">
            <h4 className="text-white font-luxury text-xs uppercase tracking-[0.3em] mb-8">
              The Newsletter
            </h4>
            <p className="text-[10px] uppercase tracking-[0.1em] mb-6 opacity-60">
              Join the inner circle for exclusive previews.
            </p>
            <div className="relative group">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full pb-3 bg-transparent border-b border-brand-muted/30 text-[10px] tracking-[0.2em] focus:border-brand-gold focus:outline-none transition-colors duration-700 placeholder:text-brand-muted/40"
              />
              <button className="absolute right-0 bottom-3 text-[10px] tracking-[0.2em] text-brand-gold uppercase hover:text-white transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[9px] uppercase tracking-[0.4em] opacity-40">
            © {new Date().getFullYear()} Oyinmax Luxury • Crafted in Africa
          </div>
          <div className="text-[9px] uppercase tracking-[0.4em] opacity-40 italic">
            Defining the Modern Heirloom
          </div>
        </div>
      </div>
    </footer>
  );
}