

import { Routes, Route } from "react-router-dom";
// import Layout from "./components/layouts/Layout"; // Commented out for now
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./pages/Products";
import { Toaster } from "react-hot-toast";
import Cart from "./context/Cart";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LegalLayout from "./pages/LegalLayout";


function App() {
  return (
    <div className="bg-brand-ivory min-h-screen font-body text-brand-dark">
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<LegalLayout />} />
        

        {/* User Route */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Admin Route */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Admin Product Management Route */}
        <Route 
          path="/admin/products" 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Products />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/orders" 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminOrders />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminUsers />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;