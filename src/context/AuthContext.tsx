// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

type AuthContextType = {
  user: any;
  isLoggedIn: boolean;
  credits: number | null;
  fetchCredits: () => Promise<void>;
  updateCredits: (newCredits: number) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number | null>(null);

  // helper to fetch latest credits from DB
  const fetchCredits = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("users")
      .select("credits")
      .eq("id", user.id)
      .single();

    if (!error && data) {
      setCredits(data.credits);
    }
  }, [user]);

  // helper to update credits in state after RPC call
  const updateCredits = (newCredits: number) => {
    setCredits(newCredits);
  };

  useEffect(() => {
    // get current user
    supabase.auth.getUser().then(async ({ data }) => {
      setUser(data.user ?? null);
      if (data.user) {
        await fetchCredits();
      }
    });

    // listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchCredits();
        } else {
          setCredits(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [fetchCredits]);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCredits(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, credits, fetchCredits, updateCredits, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
