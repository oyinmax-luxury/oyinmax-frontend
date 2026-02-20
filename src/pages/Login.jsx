
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // UPDATED: Added useNavigate
import { motion } from "framer-motion";
import api from "../services/api";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // UPDATED: Added loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const navigate = useNavigate(); // UPDATED: Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // API call using your customized instance
      const { data } = await api.post("/auth/login", { email, password });
      
      // Store user info in localStorage (token, role, etc.)
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Role-based redirection
      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      // Handle error message from backend
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-ivory flex items-center justify-center p-4 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-luxury border border-brand-muted/10"
      >
        <h2 className="text-3xl font-light text-center text-brand-dark font-luxury mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-brand-muted mb-8 font-body">
          Sign in to access your luxury collection
        </p>

        {/* UPDATED: Display Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-body border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 font-body">
          <div>
            <label className="block text-sm text-brand-dark mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-brand-muted/30 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition rounded-lg"
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
            {/* <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-brand-muted/30 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition rounded-lg"
              placeholder="••••••••"
              required
            /> */}

            <div className="space-y-2">
            <div className="relative">
                <input
                // DYNAMIC TYPE: Switches between 'password' and 'text'
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pr-12 border border-brand-muted/30 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition rounded-sm bg-brand-ivory/50 font-body placeholder:text-brand-muted/50"
                placeholder="••••••••"
                required
                />
                
                {/* Toggle Button */}
                <button
                type="button" // Critical: prevents form submission when clicking the eye
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-gold transition-colors duration-300"
                >
                {showPassword ? (
                    <HiOutlineEyeOff size={20} />
                ) : (
                    <HiOutlineEye size={20} />
                )}
                </button>
            </div>
            </div>
          </div>

          {/* UPDATED: Loading State Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-dark text-white py-3 hover:bg-brand-brown transition duration-300 tracking-wider font-semibold rounded-lg flex justify-center items-center"
          >
            {loading ? "SIGNING IN..." : "SIGN IN"}
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