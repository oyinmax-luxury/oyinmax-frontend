

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

function App() {
  return (
    <div className="bg-brand-ivory min-h-screen font-body text-brand-dark">
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
      </Routes>
    </div>
  );
}

export default App;