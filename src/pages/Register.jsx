import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering:", formData);
  };

  return (
    <div className="min-h-screen bg-brand-ivory flex items-center justify-center p-4 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-luxury"
      >
        <h2 className="text-3xl font-light text-center text-brand-dark font-luxury mb-2">
          Create Account
        </h2>
        <p className="text-center text-brand-muted mb-8 font-body">
          Join the OYINMAX luxury experience
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 font-body">
          <div>
            <label className="block text-sm text-brand-dark mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="w-full p-3 border border-brand-muted/30 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-brand-dark mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full p-3 border border-brand-muted/30 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition"
              placeholder="name@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-brand-dark mb-1">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-full p-3 border border-brand-muted/30 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-dark text-white py-3 hover:bg-brand-brown transition duration-300 tracking-wider font-semibold"
          >
            CREATE ACCOUNT
          </button>
        </form>

        <p className="text-center text-sm text-brand-muted mt-8 font-body">
          Already have an account?{" "}
          <Link to="/login" className="text-brand-gold hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}