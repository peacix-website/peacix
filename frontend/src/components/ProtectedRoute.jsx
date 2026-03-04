import React from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);
  const [userRole, setUserRole] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchUserRole(session.user.id);
      } else {
        setIsAuthenticated(false);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);
      await fetchUserRole(user.id);
    } catch (error) {
      console.error("Auth error:", error);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const fetchUserRole = async (userId) => {
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      setUserRole(profile?.role || "patient");
    } catch (error) {
      console.error("Error fetching user role:", error);
      setUserRole("patient");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
