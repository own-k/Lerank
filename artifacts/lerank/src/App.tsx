import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { useEffect } from "react";

// Pages
import Landing from "@/pages/Landing";
import Compare from "@/pages/Compare";
import StudentDashboard from "@/pages/StudentDashboard";
import CompanyAdmin from "@/pages/CompanyAdmin";
import SuperAdmin from "@/pages/SuperAdmin";
import NotFound from "@/pages/not-found";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Guard component to ensure user is logged in
function ProtectedRoute({ component: Component, allowedRoles }: { component: any, allowedRoles?: string[] }) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/compare");
    }
  }, [isLoading, user, setLocation]);

  if (isLoading) {
    return <div className="min-h-screen bg-[#1A0F0A] flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-[#C4956A]" /></div>;
  }

  if (!user) {
    return <div className="min-h-screen bg-[#1A0F0A] flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-[#C4956A]" /></div>;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <div className="min-h-screen flex items-center justify-center bg-[#1A0F0A] text-white">403 Unauthorized Role</div>;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/compare" component={Compare} />
      
      {/* Protected Routes */}
      <Route path="/dashboard">
        {() => <ProtectedRoute component={StudentDashboard} allowedRoles={['student']} />}
      </Route>
      <Route path="/admin/company">
        {() => <ProtectedRoute component={CompanyAdmin} allowedRoles={['company_admin']} />}
      </Route>
      <Route path="/admin/super">
        {() => <ProtectedRoute component={SuperAdmin} allowedRoles={['super_admin']} />}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
