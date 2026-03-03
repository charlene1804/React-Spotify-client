"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

function setThemeCookie(value: "light" | "dark") {
  document.cookie = `theme=${value}; path=/; max-age=31536000; SameSite=Lax`;
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

type ProvidersProps = {
  children: React.ReactNode;
  initialTheme?: "light" | "dark" | null;
};

export function Providers({ children, initialTheme = null }: ProvidersProps) {
  const [theme, setThemeState] = useState<"light" | "dark">(
    () => initialTheme ?? "light"
  );

  const setTheme = (next: "light" | "dark") => {
    setThemeState(next);
    setThemeCookie(next);
  };

  const [accessToken, setAccessToken] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const appValue: AppContextValue = {
    accessToken,
    setAccessToken,
    searchTerm,
    setSearchTerm,
  };
  const themeValue: ThemeContextValue = { theme, setTheme };

  const showDark = theme === "dark";
  const wrapperClass = showDark
    ? "dark min-h-screen bg-zinc-900 text-zinc-200"
    : "min-h-screen bg-white text-zinc-900";

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={themeValue}>
        <div className={`transition-colors duration-300 ease-in-out ${wrapperClass}`}>
          <AppContext.Provider value={appValue}>{children}</AppContext.Provider>
        </div>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}
