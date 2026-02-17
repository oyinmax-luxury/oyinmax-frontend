import { motion } from "framer-motion";
import { HiUserCircle, HiShoppingBag, HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";

export default function UserDashboard() {
  // Dummy data for demonstration
  const user = { name: "Aisha Bello", email: "aisha.b@example.com" };
  const orders = [
    { id: "ORD-7732", status: "Delivered", total: "£150.00", date: "Jan 15, 2026" },
    { id: "ORD-9901", status: "Processing", total: "£85.50", date: "Feb 10, 2026" },
  ];


  const navigate = useNavigate()

  // UPDATED: State to hold user profile data
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UPDATED: Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/users/profile");
        setUserProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile");
        // Optional: Redirect to login if token expired
        // navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);


  // UPDATED: Logout function
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  if (loading) return <div className="min-h-screen bg-brand-ivory flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen bg-brand-ivory flex items-center justify-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-brand-ivory py-24 px-4 text-brand-dark">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-10 border-b border-brand-muted/20 pb-6"
        >
          <div>
            <h1 className="text-4xl font-light font-luxury text-brand-dark">
              Welcome Back, {userProfile.name.split(" ")[0]}
            </h1>
            <p className="text-brand-muted font-body mt-1">{userProfile.email}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-brand-muted hover:text-brand-gold transition font-body">
            <HiOutlineLogout /> Logout
          </button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-8 shadow-luxury rounded-xl border border-brand-muted/10"
          >
            <div className="flex items-center gap-4 mb-6">
              <HiUserCircle className="text-5xl text-brand-gold" />
              <h2 className="text-xl font-medium font-luxury text-brand-dark">Account Details</h2>
            </div>
            <div className="space-y-3 text-sm font-body text-brand-dark">
              <p><strong>Name:</strong> {userProfile.name}</p>
              <p><strong>Email:</strong> {userProfile.email}</p>
              <p><strong>Member Since:</strong> Jan 2025</p>
            </div>
            <button className="mt-8 text-sm text-brand-gold hover:text-brand-brown font-body font-semibold">
              Edit Profile
            </button>
          </motion.div>

          {/* Orders Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 shadow-luxury rounded-xl md:col-span-2 border border-brand-muted/10"
          >
            <div className="flex items-center gap-4 mb-6">
              <HiShoppingBag className="text-5xl text-brand-gold" />
              <h2 className="text-xl font-medium font-luxury text-brand-dark">Recent Orders</h2>
            </div>
            
            <div className="space-y-4 font-body text-sm">
              {orders.map((order) => (
                <div key={order.id} className="flex justify-between items-center p-4 bg-brand-gray/50 rounded-lg">
                  <div>
                    <p className="font-semibold text-brand-dark">{order.id}</p>
                    <p className="text-xs text-brand-muted">{order.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-brand-gold/10 text-brand-brown'}`}>
                    {order.status}
                  </span>
                  <p className="font-semibold text-brand-dark">{order.total}</p>
                </div>
              ))}
            </div>

            <button className="mt-8 text-sm text-brand-gold hover:text-brand-brown font-body font-semibold">
              View All Orders
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}