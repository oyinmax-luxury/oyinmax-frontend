import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  // Retrieve user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 1. Check if user is logged in (token exists)
  if (!userInfo || !userInfo.token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check if user has required role
  if (!allowedRoles.includes(userInfo.role)) {
    // Redirect to home if they don't have access
    return <Navigate to="/" replace />;
  }

  // 3. User is authorized, render the protected component
  return children;
}