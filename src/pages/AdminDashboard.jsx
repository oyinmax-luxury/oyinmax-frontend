import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineFolderAdd, HiOutlineClipboardList, HiOutlineUsers, HiOutlineTrendingUp, HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";


export default function AdminDashboard() {
  // Dummy data for statistics

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  const stats = [
    { name: "Total Products", value: "24", icon: HiOutlineFolderAdd },
    { name: "Pending Orders", value: "12", icon: HiOutlineClipboardList },
    { name: "Total Users", value: "156", icon: HiOutlineUsers },
    { name: "Revenue (MTD)", value: "£4,250", icon: HiOutlineTrendingUp },
  ];

  const adminLinks = [
    { name: "Manage Products", to: "/admin/products", icon: HiOutlineFolderAdd },
    { name: "Manage Orders", to: "/admin/orders", icon: HiOutlineClipboardList },
    { name: "Manage Users", to: "/admin/users", icon: HiOutlineUsers },
  ];

  return (
    <div className="min-h-screen bg-brand-ivory py-24 px-4 text-brand-dark">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* UPDATED: Title and Logout Button Layout */}
          <div className="flex justify-between items-center mb-10 border-b border-brand-muted/20 pb-6">
            <h1 className="text-4xl font-light font-luxury text-brand-dark">
              Admin Portal
            </h1>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-brand-muted hover:text-brand-gold transition font-body"
            >
              <HiOutlineLogout /> Logout
            </button>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 shadow-luxury rounded-xl border border-brand-muted/10"
              >
                <div className="flex justify-between items-start">
                  <p className="text-sm text-brand-muted font-body">{stat.name}</p>
                  <stat.icon className="text-2xl text-brand-gold" />
                </div>
                <p className="text-3xl font-semibold text-brand-dark mt-2 font-luxury">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Navigation Links Grid */}
          <h2 className="text-2xl font-light mb-6 font-luxury text-brand-dark">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {adminLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                <Link
                  to={link.to}
                  className="group block bg-white p-8 shadow-luxury hover:shadow-xl transition rounded-xl border border-brand-muted/10 hover:border-brand-gold/30"
                >
                  <div className="flex items-center gap-4">
                    <link.icon className="text-4xl text-brand-gold group-hover:scale-110 transition-transform" />
                    <span className="text-lg font-medium text-brand-dark font-body group-hover:text-brand-gold transition">
                      {link.name}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}