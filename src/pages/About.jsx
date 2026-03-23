


import hero2 from "../assets/hero-image2.jpg";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-brand-ivory">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <img 
            src={hero2}
            alt="Oyinmax Luxury Craft" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Luxury Overlay: Darkens the image for readability */}
          <div className="absolute inset-0 bg-brand-dark/40" />
          
          {/* Content */}
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-light font-luxury text-white mb-6 tracking-tighter uppercase">
              The Heritage
            </h1>
            <div className="w-20 h-[1px] bg-brand-gold mx-auto"></div>
          </div>
        </section>

              {/* Story Section */}
        <section className="max-w-4xl mx-auto py-24 px-6 text-center">
            <h2 className="text-sm uppercase tracking-[0.3em] text-brand-gold mb-6 font-body">Our Heritage</h2>
            <p className="text-2xl font-light font-body text-brand-dark leading-relaxed italic">
            "Oyinmax Luxury is more than just a fashion brand it is a visionary force dedicated to redefining style through purpose, culture and identity."
            </p>
            <div className="mt-12 space-y-6 text-brand-muted font-body leading-loose text-lg">
            <p>
                Founded on the principles of integrity, elegance, and cultural pride. Oyinmax Luxury seeks to restore morality to fashion while celebrating and preserving African heritage, even within the context of the modern Western world. 

Our mission is to bridge tradition and contemporary fashion, creating pieces that honor our roots and tell meaningful stories.

Every garment from the Oyinmax Luxury Collection is thoughtfully designed to reflect who we are and where we come from. Each style serves as a tribute to our origin, a reminder of our values, and a symbol of self-worth.

At Oyinmax Luxury, we believe that fashion should not only make you look good, but also make you feel confident, connected and proud of your heritage. Our brand inspires individuals to embrace their cultural identity and carry it with grace and dignity across the global stage.

When you wear Oyinmax Luxury, you don’t just wear fashion, you wear a story, a legacy and a vision of self respect.
            </p>
            <p>
                Based in Exeter, UK, with deep roots in Nigerian artistry, we curate collections that resonate with the modern elite. We don't just dress bodies; we drape stories.
            </p>
            </div>
            
        </section>
      </div>
      <Footer />
    </>
  );
}