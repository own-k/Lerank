import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { ThemeProvider } from "@/hooks/use-theme";
import { LanguageProvider } from "@/hooks/use-language";
import { useEffect } from "react";

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

function ProtectedRoute({ component: Component, allowedRoles }: { component: any; allowedRoles?: string[] }) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isLoading === false && user === null) {
      setLocation("/compare");
    }
  }, [isLoading, user, setLocation]);

  if (isLoading || user === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (allowedRoles && allowedRoles.includes(user.role) === false) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">403 Unauthorized Role</div>;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/compare" component={Compare} />
      <Route path="/dashboard">{() => <ProtectedRoute component={StudentDashboard} allowedRoles={["student"]} />}</Route>
      <Route path="/admin/company">{() => <ProtectedRoute component={CompanyAdmin} allowedRoles={["company_admin"]} />}</Route>
      <Route path="/admin/super">{() => <ProtectedRoute component={SuperAdmin} allowedRoles={["super_admin"]} />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function normalizedBasePath(path: string) {
  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <WouterRouter base={normalizedBasePath(import.meta.env.BASE_URL)}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
