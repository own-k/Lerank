import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface User {
  id: number;
  email: string;
  fullName: string;
  role: "student" | "company_admin" | "super_admin";
  avatarUrl?: string | null;
  onboardingCompleted: boolean;
  companyId?: number | null;
  userCode?: string | null;
  emailVerified?: boolean;
  createdAt: string;
  profile?: any | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<{ requiresVerification: boolean; email: string; simulatedCode?: string }>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  resendCode: (email: string) => Promise<{ simulatedCode?: string }>;
  forgotPassword: (email: string) => Promise<{ simulatedCode?: string }>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
  updateSettings: (data: { fullName?: string; currentPassword?: string; newPassword?: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const TOKEN_KEY = "lerank_token";

async function extractErrorMessage(res: Response, fallback: string): Promise<string> {
  try {
    const payload = await res.json();
    if (payload && typeof payload.message === "string") return payload.message;
    if (payload && typeof payload.error === "string") return payload.error;
    return fallback;
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const queryClient = useQueryClient();

  useEffect(() => {
    if (token === null) {
      setIsLoading(false);
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: "Bearer " + token },
    })
      .then(async (res) => {
        if (res.ok === false) {
          throw new Error(await extractErrorMessage(res, "Unauthorized"));
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok === false) {
      const message = await extractErrorMessage(res, "Login failed");
      throw new Error(message);
    }

    const data = await res.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
    queryClient.clear();
  };

  const register = async (fullName: string, email: string, password: string) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password }),
    });

    if (res.ok === false) {
      const message = await extractErrorMessage(res, "Registration failed");
      throw new Error(message);
    }

    const data = await res.json();
    return {
      requiresVerification: data.requiresVerification || false,
      email: data.email || email,
      simulatedCode: data.simulatedCode,
    };
  };

  const verifyEmail = async (email: string, code: string) => {
    const res = await fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    if (res.ok === false) {
      const message = await extractErrorMessage(res, "Verification failed");
      throw new Error(message);
    }

    const data = await res.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    setToken(data.token);
    setUser(data.user);
    queryClient.clear();
  };

  const resendCode = async (email: string) => {
    const res = await fetch("/api/auth/resend-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok === false) {
      const message = await extractErrorMessage(res, "Failed to resend code");
      throw new Error(message);
    }

    const data = await res.json();
    return { simulatedCode: data.simulatedCode };
  };

  const forgotPassword = async (email: string) => {
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok === false) {
      const message = await extractErrorMessage(res, "Failed");
      throw new Error(message);
    }

    const data = await res.json();
    return { simulatedCode: data.simulatedCode };
  };

  const resetPassword = async (email: string, code: string, newPassword: string) => {
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code, newPassword }),
    });

    if (res.ok === false) {
      const message = await extractErrorMessage(res, "Password reset failed");
      throw new Error(message);
    }
  };

  const updateSettings = async (data: { fullName?: string; currentPassword?: string; newPassword?: string }) => {
    const res = await fetch("/api/auth/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
      body: JSON.stringify(data),
    });

    if (res.ok === false) {
      const message = await extractErrorMessage(res, "Update failed");
      throw new Error(message);
    }

    const updated = await res.json();
    setUser(updated);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, token, login, register, verifyEmail, resendCode, forgotPassword, resetPassword, updateSettings, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
