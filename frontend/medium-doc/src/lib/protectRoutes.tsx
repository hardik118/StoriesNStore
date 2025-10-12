import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: JSX.Element;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token"); // check if user is logged in

  if (!token) {
    // Not logged in, redirect to signin
    return <Navigate to="/signin" replace />;
  }

  // Logged in, render the protected page
  return children;
};
