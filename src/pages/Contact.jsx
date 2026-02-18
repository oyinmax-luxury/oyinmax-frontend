
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlinePhone } from "react-icons/hi";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

export default function Contact() {
  return (
    <>
      <Navbar />
      
      {/* Main Content Wrapper */}
      <main className="min-h-screen bg-brand-ivory pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h1 className="text-5xl font-light font-luxury text-brand-dark mb-6 tracking-tight">
                  Get in Touch
                </h1>
                <p className="text-brand-muted font-body text-lg leading-relaxed">
                  For bespoke inquiries, bridal consultations, or private viewings.
                </p>
              </div>

              <div className="space-y-8">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white shadow-sm rounded-full text-brand-gold">
                    <HiOutlineLocationMarker size={24} />
                  </div>
                  <div>
                    <h3 className="font-luxury text-lg text-brand-dark">Visit Our Studio</h3>
                    <p className="text-brand-muted font-body">
                      13 The Grange, Wellingtonia Park,<br />Exeter, EX2 4SB
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white shadow-sm rounded-full text-brand-gold">
                    <HiOutlinePhone size={24} />
                  </div>
                  <div>
                    <h3 className="font-luxury text-lg text-brand-dark">Speak with Us</h3>
                    <p className="text-brand-muted font-body">+44 7756 120178</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white shadow-sm rounded-full text-brand-gold">
                    <HiOutlineMail size={24} />
                  </div>
                  <div>
                    <h3 className="font-luxury text-lg text-brand-dark">Email</h3>
                    <p className="text-brand-muted font-body">concierge@oyinmax.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-10 rounded-2xl shadow-luxury border border-brand-muted/10">
              <form className="space-y-6 font-body">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full p-3 border-b border-brand-muted/20 focus:border-brand-gold outline-none transition bg-transparent" />
                  <input type="text" placeholder="Last Name" className="w-full p-3 border-b border-brand-muted/20 focus:border-brand-gold outline-none transition bg-transparent" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full p-3 border-b border-brand-muted/20 focus:border-brand-gold outline-none transition bg-transparent" />
                <textarea placeholder="How can we assist you?" rows="4" className="w-full p-3 border-b border-brand-muted/20 focus:border-brand-gold outline-none transition resize-none bg-transparent"></textarea>
                
                <button 
                  type="submit"
                  className="w-full bg-brand-dark text-white py-4 rounded-sm uppercase tracking-[0.2em] text-xs hover:bg-brand-gold transition duration-500 mt-4"
                >
                  Send Message
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}