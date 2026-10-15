import React, { createContext, useState, useEffect, ReactNode } from "react";
import { AuthContextType, AuthState, User } from "@/types";
import { getDemoMode, getDemoUser, setDemoMode } from "@/demo/demoMode";

// Cookie consent state
// Create the context with a default value
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * The AuthProvider component is responsible for managing the authentication state
 * and providing it to the rest of the application.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // null = not decided yet, true = accepted, false = declined
  const [cookieConsent, setCookieConsentState] = useState<boolean | null>(
    () => {
      try {
        const v = localStorage.getItem("cookieConsent");
        if (v === "true") return true;
        if (v === "false") return false;
        return null;
      } catch (e) {
        return null;
      }
    }
  );

  // cookieSettings allow per-category choices; null means undecided
  const [cookieSettings, setCookieSettingsState] = useState<{
    necessary: true;
    preferences: boolean;
    analytics: boolean;
    marketing: boolean;
  } | null>(() => {
    try {
      const raw = localStorage.getItem("cookieSettings");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  });

  const [cookieModalOpen, setCookieModalOpen] = useState(false);

  useEffect(() => {
    const demoUser = getDemoUser();
    setUser(demoUser);
    setToken(demoUser ? "academic-vault-demo-token" : null);
    setIsLoading(false);
  }, []);

  // Function to handle user login
  const login = (data: AuthState) => {
    if (data.user && data.token) {
      const roles = data.user.role ?? [];
      const mode = roles.includes("admin")
        ? roles.includes("teacher")
          ? "admin-teacher"
          : "admin"
        : roles.includes("teacher")
          ? "teacher"
          : "student";
      setDemoMode(mode);
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
    }
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.setItem("academic-vault-demo-mode", "logged-out");
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Function to update the user's profile
  const updateProfile = (profile: Partial<User["profile"]>) => {
    if (user) {
      const updatedUser = {
        ...user,
        profile: { ...user.profile, ...profile },
        updatedAt: new Date().toISOString(), // Update the timestamp
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  // Function to update the entire user object
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = {
        ...user,
        ...userData,
        updatedAt: new Date().toISOString(),
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const verifyPassword = async (password: string): Promise<boolean> => {
    if (!user || !token) {
      throw new Error("You must be logged in to perform this action");
    }
    return password.trim().length > 0;
  };

  const refreshToken = async (): Promise<string | null> => {
    return token;
  };

  // Function to refresh user data from server
  const refreshUser = async (): Promise<void> => {
    if (!token) {
      throw new Error("No authentication token available");
    }
    setUser(getDemoUser(getDemoMode()));
  };

  const value = {
    user,
    token,
    login,
    logout,
    isLoading,
    refreshToken,
    updateProfile,
    updateUser,
    refreshUser,
    verifyPassword,
    cookieConsent,
    setCookieConsent: (v: boolean) => {
      try {
        localStorage.setItem("cookieConsent", v ? "true" : "false");
        // also set cookieSettings defaults for accepted/declined
        const defaults = v
          ? ({
            necessary: true,
            preferences: true,
            analytics: true,
            marketing: true,
          } as const)
          : ({
            necessary: true,
            preferences: false,
            analytics: false,
            marketing: false,
          } as const);
        localStorage.setItem("cookieSettings", JSON.stringify(defaults));
        setCookieSettingsState(defaults as any);
      } catch (e) {
        // ignore
      }
      setCookieConsentState(v);
    },
    cookieSettings,
    setCookieSettings: (
      s: { preferences: boolean; analytics: boolean; marketing: boolean } | null
    ) => {
      try {
        if (s === null) {
          localStorage.removeItem("cookieSettings");
        } else {
          localStorage.setItem("cookieSettings", JSON.stringify(s));
        }
      } catch (e) {
        // ignore
      }
      setCookieSettingsState(s as any);
    },
    cookieModalOpen,
    setCookieModalOpen,
  };

  // Provide the context value to child components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
