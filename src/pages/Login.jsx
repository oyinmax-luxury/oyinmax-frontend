import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
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
          Welcome Back
        </h2>
        <p className="text-center text-brand-muted mb-8 font-body">
          Sign in to access your luxury collection
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 font-body">
          <div>
            <label className="block text-sm text-brand-dark mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-brand-muted/30 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition"
              placeholder="name@example.com"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm text-brand-dark">Password</label>
              <Link to="/forgot-password" className="text-xs text-brand-gold hover:underline">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-brand-muted/30 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-dark text-white py-3 hover:bg-brand-brown transition duration-300 tracking-wider font-semibold"
          >
            SIGN IN
          </button>
        </form>

        <p className="text-center text-sm text-brand-muted mt-8 font-body">
          Don't have an account?{" "}
          <Link to="/register" className="text-brand-gold hover:underline font-semibold">
            Register Now
          </Link>
        </p>
      </motion.div>
    </div>
  );
}