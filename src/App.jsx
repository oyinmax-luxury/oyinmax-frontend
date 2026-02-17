
import { Routes, Route } from "react-router-dom";
// import Layout from "./components/layouts/Layout"; // Commented out for now
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    // UPDATED: Changed bg-luxuryIvory to bg-brand-ivory to match config
    <div className="bg-brand-ivory min-h-screen font-body text-brand-dark">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* UPDATED: Added Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;