import { Navigate } from "react-router-dom";
// import { useUserStore } from "../assets/store/store";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  //   const { profile } = useUserStore();

  //   if (!profile) {
  //     return <Navigate to="/auth" replace />;
  //   }

  return children;
};

export default ProtectedRoute;
