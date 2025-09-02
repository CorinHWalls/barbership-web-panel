"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
  user: User | null;
  userProfile: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    invitationCode: string,
  ) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  generateInvitationCode: (email: string) => Promise<{ data: any; error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    // Get initial session
    const initializeAuth = async () => {
      try {
        // Set a timeout to prevent infinite loading
        timeoutId = setTimeout(() => {
          if (mounted) {
            console.warn(
              "Auth initialization timeout - setting loading to false",
            );
            setLoading(false);
          }
        }, 10000); // 10 second timeout

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;

        clearTimeout(timeoutId);
        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        if (mounted) {
          clearTimeout(timeoutId);
          setLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      console.log("Auth state changed:", event, session?.user?.email);
      setUser(session?.user ?? null);

      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Fetching user profile for user:", userId);

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        // If user doesn't exist in users table, create a basic one
        if (error.code === "PGRST116") {
          console.log("User profile not found, user can still access the app");
        }
        setUserProfile(null);
      } else {
        console.log("User profile fetched successfully:", data);
        setUserProfile(data);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUserProfile(null);
    } finally {
      console.log("Setting loading to false");
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string,
    invitationCode: string,
  ) => {
    try {
      // Verify the invitation code
      const { data: invitation, error: invitationError } = await supabase
        .from("barber_invitations")
        .select("*")
        .eq("email", email)
        .eq("invitation_code", invitationCode)
        .eq("used", false)
        .gt("expires_at", new Date().toISOString())
        .single();

      if (invitationError || !invitation) {
        return { error: { message: "Invalid or expired invitation code" } };
      }

      // Create the user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: "barber",
          },
        },
      });

      if (authError) {
        return { error: authError };
      }

      if (authData.user) {
        // Create user profile
        const { error: userProfileError } = await supabase
          .from("users")
          .insert({
            id: authData.user.id,
            email: authData.user.email!,
            roles: ["barber", "client"],
          });

        if (userProfileError) {
          console.error("Error creating user profile:", userProfileError);
        }

        // Mark invitation as used
        const { data: invitationData } = await supabase
          .from("barber_invitations")
          .select("id")
          .eq("email", email)
          .eq("invitation_code", invitationCode)
          .single();

        if (invitationData) {
          await supabase
            .from("barber_invitations")
            .update({ used: true })
            .eq("id", invitationData.id);
        }
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const generateInvitationCode = async (email: string) => {
    try {
      // Generate a unique invitation code
      const invitationCode = `BARBER${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

      // Set expiration to 30 days from now
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30);

      const { data, error } = await supabase
        .from("barber_invitations")
        .insert({
          email,
          invitation_code: invitationCode,
          expires_at: expiresAt.toISOString(),
          used: false,
        })
        .select()
        .single();

      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    generateInvitationCode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
