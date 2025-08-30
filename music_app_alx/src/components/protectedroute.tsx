import { Navigate } from "react-router-dom";
import { useSpotifyStore } from "../assets/store/store";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { profile } = useSpotifyStore();

  //   if (!profile) {
  //     return <Navigate to="/auth" replace />;
  //   }

  return children;
};

export default ProtectedRoute;
