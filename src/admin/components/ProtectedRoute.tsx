import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LoadingState } from "@/components/ui/LoadingState";

export function ProtectedRoute() {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingState message="Verificando sessão..." />;
  if (!session) return <Navigate to="/admin/login" state={{ from: location }} replace />;

  return <Outlet />;
}
