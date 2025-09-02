"use client";

import React from "react";
import { useAuth } from "./AuthProvider";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Card className="bg-zinc-900 border-zinc-800 p-8">
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="bg-red-600 p-3 rounded-full animate-pulse">
            <Scissors className="h-8 w-8 text-white" />
          </div>
          <p className="text-white text-lg">Loading...</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const [authMode, setAuthMode] = React.useState<"login" | "signup">("login");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Always show loading screen until mounted and auth is resolved
  if (!mounted || loading) {
    return <LoadingScreen />;
  }

  // Only render auth forms or children after mounting is complete
  if (!user) {
    return authMode === "login" ? (
      <LoginForm onToggleMode={() => setAuthMode("signup")} />
    ) : (
      <SignUpForm onToggleMode={() => setAuthMode("login")} />
    );
  }

  return <>{children}</>;
}
