"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

const THEME_KEY = "theme";

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(THEME_KEY) as "light" | "dark" | null;
  if (stored === "light" || stored === "dark") return stored;
  if (typeof window.matchMedia !== "function") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

type ThemeContextValue = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within Providers");
  return ctx;
}

type AppContextValue = {
  accessToken: string;
  setAccessToken: (token: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within Providers");
  return ctx;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setThemeState(getInitialTheme());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(THEME_KEY, theme);
  }, [mounted, theme]);

  const setTheme = (next: "light" | "dark") => setThemeState(next);

  const [accessToken, setAccessToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const appValue: AppContextValue = {
    accessToken,
    setAccessToken,
    searchTerm,
    setSearchTerm,
  };
  const themeValue: ThemeContextValue = { theme, setTheme };

  const showDark =
    mounted && theme === "dark";
  const wrapperClass = showDark
    ? "dark min-h-screen bg-zinc-900 text-zinc-200"
    : "min-h-screen bg-white text-zinc-900";

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={themeValue}>
        <div className={wrapperClass}>
          <AppContext.Provider value={appValue}>{children}</AppContext.Provider>
        </div>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}
