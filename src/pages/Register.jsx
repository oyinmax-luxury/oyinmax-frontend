// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Registering:", formData);
//   };

//   return (
//     <div className="min-h-screen bg-brand-ivory flex items-center justify-center p-4 pt-24">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-md bg-white p-8 rounded-2xl shadow-luxury"
//       >
//         <h2 className="text-3xl font-light text-center text-brand-dark font-luxury mb-2">
//           Create Account
//         </h2>
//         <p className="text-center text-brand-muted mb-8 font-body">
//           Join the OYINMAX luxury experience
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-6 font-body">
//           <div>
//             <label className="block text-sm text-brand-dark mb-1">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               onChange={handleChange}
//               className="w-full p-3 border border-brand-muted/30 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition"
//               placeholder="John Doe"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-brand-dark mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               onChange={handleChange}
//               className="w-full p-3 border border-brand-muted/30 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition"
//               placeholder="name@example.com"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-brand-dark mb-1">Password</label>
//             <input
//               type="password"
//               name="password"
//               onChange={handleChange}
//               className="w-full p-3 border border-brand-muted/30 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition"
//               placeholder="••••••••"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-brand-dark text-white py-3 hover:bg-brand-brown transition duration-300 tracking-wider font-semibold"
//           >
//             CREATE ACCOUNT
//           </button>
//         </form>

//         <p className="text-center text-sm text-brand-muted mt-8 font-body">
//           Already have an account?{" "}
//           <Link to="/login" className="text-brand-gold hover:underline font-semibold">
//             Sign In
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // UPDATED: Added useNavigate
import { motion } from "framer-motion";
import { HiEye, HiEyeOff } from "react-icons/hi"; // UPDATED: Added icons for toggle
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  // UPDATED: Added confirmPassword to state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // UPDATED: States for UI feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Toggle state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation: Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // API call to register
      const { data } = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Store user info (token, role, etc.)
      localStorage.setItem("userInfo", JSON.stringify(data));

      // Role-based redirection
      if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      // Handle error message from backend
      setError(err.response?.data?.message || "Registration failed");
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
          Create Account
        </h2>
        <p className="text-center text-brand-muted mb-8 font-body">
          Join the OYINMAX luxury experience
        </p>

        {/* Display Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm font-body border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 font-body">
          <div>
            <label className="block text-sm text-brand-dark mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-brand-muted/30 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition rounded-lg"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-brand-dark mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-brand-muted/30 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition rounded-lg"
              placeholder="name@example.com"
              required
            />
          </div>

          {/* Password Fields with Toggle */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm text-brand-dark mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-brand-muted/30 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition rounded-lg"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-brand-muted hover:text-brand-gold"
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>
            
            <div>
              <label className="block text-sm text-brand-dark mb-1">Confirm</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-3 border border-brand-muted/30 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition rounded-lg"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-dark text-white py-3 hover:bg-brand-brown transition duration-300 tracking-wider font-semibold rounded-lg flex justify-center items-center"
          >
            {loading ? "CREATING..." : "CREATE ACCOUNT"}
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